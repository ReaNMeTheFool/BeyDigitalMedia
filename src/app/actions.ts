"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { Resend } from "resend";
import { countRecentSubmissions, createContactSubmission } from "@/lib/content";

const RATE_LIMIT = 5; // 5 dakikada max 5 talep (IP basina, D1 uzerinden)

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Adınız en az 2 karakter olmalıdır")
    .max(100, "Adınız çok uzun")
    .trim(),
  email: z
    .string()
    .email("Geçerli bir e-posta adresi giriniz")
    .min(5, "E-posta adresi çok kısa")
    .max(255, "E-posta adresi çok uzun")
    .trim(),
  phone: z
    .string()
    .max(20, "Telefon numarası çok uzun")
    .regex(/^[0-9\s\-\+\(\)]*$/, "Telefon numarası sadece rakam içerebilir")
    .optional()
    .or(z.literal("")),
  service: z.string().optional(),
  message: z
    .string()
    .min(10, "Mesajınız en az 10 karakter olmalıdır")
    .max(2000, "Mesajınız çok uzun")
    .trim(),
});

export async function submitContactForm(
  prevState: {
    success: boolean;
    message: string;
    errors: Record<string, string[]>;
  },
  formData: FormData,
) {
  try {
    // Rate limiting: created_at > datetime('now','-5 minutes') araliginda
    // ayni IP'den kayitli talep sayisi RATE_LIMIT'e ulastiysa reddet.
    const hdrs = await headers();
    const clientIp =
      hdrs.get("Cf-Connecting-Ip") ||
      hdrs.get("x-forwarded-for") ||
      hdrs.get("x-real-ip") ||
      "anonymous";
    const recentCount = await countRecentSubmissions(clientIp);
    if (recentCount >= RATE_LIMIT) {
      return {
        success: false,
        message:
          "Çok fazla istek gönderdiniz. Lütfen 5 dakika sonra tekrar deneyin.",
        errors: {},
      };
    }

    // Form verilerini al
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      service: formData.get("service") as string,
      message: formData.get("message") as string,
    };

    // Validasyon
    const validatedData = contactFormSchema.safeParse(rawData);

    if (!validatedData.success) {
      const errors: Record<string, string[]> = {};
      validatedData.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(issue.message);
      });

      return {
        success: false,
        message: "Lütfen form alanlarını kontrol edin.",
        errors,
      };
    }

    const { name, email, phone, service, message } = validatedData.data;

    // Hizmet adlarını Türkçe'ye çevir
    const serviceNames: Record<string, string> = {
      "social-media": "Sosyal Medya Yönetimi",
      "meta-ads": "Meta Ads",
      "google-ads": "Google Ads",
      "web-design": "Web Tasarım",
      seo: "SEO",
      branding: "Logo ve Kurumsal Kimlik",
      content: "İçerik Üretimi",
      consulting: "Dijital Danışmanlık",
    };

    // Seçilen hizmetleri parse et (virgülle ayrılmış)
    const selectedServices = service
      ? service.split(",").filter((s) => s.trim() !== "")
      : [];

    const serviceNamesList =
      selectedServices.length > 0
        ? selectedServices.map((s) => serviceNames[s] || s).join(", ")
        : "Belirtilmemiş";

    // Talebi önce veritabanına kaydet
    const submissionId = await createContactSubmission({
      name,
      email,
      phone: phone || null,
      service: service ?? null,
      message,
      ip: clientIp,
    });

    if (submissionId == null) {
      console.error("Form talebi veritabanına kaydedilemedi");
      return {
        success: false,
        message: "Bir hata oluştu. Lütfen tekrar deneyin.",
        errors: {},
      };
    }

    // Email bildirimi (başarısız olsa da talep veritabanında kayıtlı)
    const recipientEmail = process.env.RECIPIENT_EMAIL;
    const resendApiKey = process.env.RESEND_API_KEY;

    let emailSent = false;

    if (resendApiKey && recipientEmail) {
      try {
        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safePhone = escapeHtml(phone || "Belirtilmemiş");
        const safeServices = escapeHtml(serviceNamesList);
        const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

        const resend = new Resend(resendApiKey);
        const { error } = await resend.emails.send({
          from:
            process.env.RESEND_FROM_EMAIL ||
            "Bey Digital Media <onboarding@resend.dev>",
          to: [recipientEmail],
          subject: `Yeni İletişim Formu: ${name}`,
          html: `
            <h2>Yeni İletişim Formu Gönderimi</h2>
            <p><strong>Ad Soyad:</strong> ${safeName}</p>
            <p><strong>E-posta:</strong> ${safeEmail}</p>
            <p><strong>Telefon:</strong> ${safePhone}</p>
            <p><strong>İlgilenen Hizmetler:</strong> ${safeServices}</p>
            <p><strong>Mesaj:</strong></p>
            <p>${safeMessage}</p>
            <hr>
            <p><small>Bey Digital Media - İletişim Formu</small></p>
          `,
          replyTo: email,
        });

        if (error) {
          console.error("Email gönderim hatası:", error);
        } else {
          emailSent = true;
        }
      } catch (emailError) {
        console.error("Email gönderim hatası:", emailError);
      }
    } else {
      console.error("RESEND_API_KEY veya RECIPIENT_EMAIL tanımlı değil");
    }

    return {
      success: true,
      message: emailSent
        ? "Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız."
        : "Talebiniz alındı ve kaydedildi. En kısa sürede size dönüş yapacağız.",
      errors: {},
    };
  } catch (error) {
    console.error("Form gönderim hatası:", error);
    return {
      success: false,
      message: "Bir hata oluştu. Lütfen tekrar deneyin.",
      errors: {},
    };
  }
}
