"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

// Resend client initialization
const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting için basit bir Map (production'da Redis kullanılmalı)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 5; // 5 dakikada max 5 istek
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 dakika

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
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
  formData: FormData
) {
  try {
    // Rate limiting check
    const clientId = "anonymous";
    if (!checkRateLimit(clientId)) {
      return {
        success: false,
        message: "Çok fazla istek gönderdiniz. Lütfen 5 dakika sonra tekrar deneyin.",
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
      "seo": "SEO",
      "branding": "Logo ve Kurumsal Kimlik",
      "content": "İçerik Üretimi",
      "consulting": "Dijital Danışmanlık",
    };

    // Seçilen hizmetleri parse et (virgülle ayrılmış)
    const selectedServices = service
      ? service.split(",").filter((s) => s.trim() !== "")
      : [];

    const serviceNamesList =
      selectedServices.length > 0
        ? selectedServices
            .map((s) => serviceNames[s] || s)
            .join(", ")
        : "Belirtilmemiş";

    // Resend ile email gönder
    const recipientEmail = process.env.RECIPIENT_EMAIL;
    const resendApiKey = process.env.RESEND_API_KEY;
    
    // Environment variable kontrolü
    if (!resendApiKey) {
      console.error("RESEND_API_KEY tanımlı değil");
      return {
        success: false,
        message: "Sunucu yapılandırma hatası: Email servisi ayarlanmamış. Lütfen daha sonra tekrar deneyin.",
        errors: {},
      };
    }
    
    if (!recipientEmail) {
      console.error("RECIPIENT_EMAIL tanımlı değil");
      return {
        success: false,
        message: "Sunucu yapılandırma hatası: Alıcı email adresi ayarlanmamış.",
        errors: {},
      };
    }
    
    const { data, error } = await resend.emails.send({
      from: "Bey Digital Media <onboarding@resend.dev>",
      to: [recipientEmail],
      subject: `Yeni İletişim Formu: ${name}`,
      html: `
        <h2>Yeni İletişim Formu Gönderimi</h2>
        <p><strong>Ad Soyad:</strong> ${name}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || "Belirtilmemiş"}</p>
        <p><strong>İlgilenen Hizmetler:</strong> ${serviceNamesList}</p>
        <p><strong>Mesaj:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p><small>Bey Digital Media - İletişim Formu</small></p>
      `,
      replyTo: email,
    });

    if (error) {
      console.error("Email gönderim hatası:", error);
      // Resend domain doğrulama hatası kontrolü
      if (error.message && error.message.includes("domain")) {
        return {
          success: false,
          message: "Email gönderimi için domain doğrulaması gerekiyor. Lütfen bizimle telefon ile iletişime geçin.",
          errors: {},
        };
      }
      return {
        success: false,
        message: "Mesajınız gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
        errors: {},
      };
    }

    console.log("Email başarıyla gönderildi:", data);

    revalidatePath("/");

    return {
      success: true,
      message: "Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.",
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
