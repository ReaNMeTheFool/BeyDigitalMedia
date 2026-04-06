"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, ChevronDown, Check } from "lucide-react";
import emailjs from "@emailjs/browser";

const services = [
  { id: "social-media", label: "Sosyal Medya Yönetimi" },
  { id: "meta-ads", label: "Meta Ads" },
  { id: "google-ads", label: "Google Ads" },
  { id: "web-design", label: "Web Tasarım" },
  { id: "seo", label: "SEO" },
  { id: "branding", label: "Logo ve Kurumsal Kimlik" },
  { id: "content", label: "İçerik Üretimi" },
  { id: "consulting", label: "Dijital Danışmanlık" },
];

interface ServiceDropdownProps {
  selectedServices: string[];
  onToggle: (serviceId: string) => void;
}

function ServiceDropdown({ selectedServices, onToggle }: ServiceDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dışarı tıklayınca kapanma
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getButtonText = () => {
    if (selectedServices.length === 0) {
      return "Hizmet seçin...";
    } else if (selectedServices.length === 1) {
      const service = services.find((s) => s.id === selectedServices[0]);
      return service?.label || "1 hizmet seçildi";
    } else {
      return `${selectedServices.length} hizmet seçildi`;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 rounded-xl border transition-all bg-[#181825] text-[#cdd6f4] flex items-center justify-between ${
          isOpen
            ? "border-[#0040ff] ring-2 ring-[#0040ff]/20"
            : "border-[#2d2d44] hover:border-[#0040ff]/50"
        }`}
      >
        <span className={selectedServices.length === 0 ? "text-[#6c7086]" : ""}>
          {getButtonText()}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={20} className="text-[#6c7086]" />
        </motion.span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-2 bg-[#181825] border border-[#2d2d44] rounded-xl shadow-xl overflow-hidden"
          >
            <div className="max-h-64 overflow-y-auto py-1">
              {services.map((service) => {
                const isSelected = selectedServices.includes(service.id);
                return (
                  <label
                    key={service.id}
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-all hover:bg-[#0040ff]/5"
                  >
                    <input
                      type="checkbox"
                      name="services"
                      value={service.id}
                      checked={isSelected}
                      onChange={() => onToggle(service.id)}
                      className="sr-only"
                    />
                    <span className={`text-sm flex-1 transition-colors ${
                      isSelected ? "text-[#0040ff] font-medium" : "text-[#cdd6f4]"
                    }`}>
                      {service.label}
                    </span>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: isSelected ? 1 : 0, scale: isSelected ? 1 : 0.5 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <Check size={16} className="text-[#0040ff]" />
                    </motion.div>
                  </label>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactForm() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    success: boolean;
    message: string;
    errors: Record<string, string[]>;
  } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  // Hizmet adlarını Türkçe'ye çevir
  const getServiceNames = () => {
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

    if (selectedServices.length === 0) return "Belirtilmemiş";
    return selectedServices
      .map((s) => serviceNames[s] || s)
      .join(", ");
  };

  const validateForm = (formData: FormData): Record<string, string[]> => {
    const errors: Record<string, string[]> = {};
    
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || name.trim().length < 2) {
      errors.name = ["Adınız en az 2 karakter olmalıdır"];
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.email = ["Geçerli bir e-posta adresi giriniz"];
    }

    if (!message || message.trim().length < 10) {
      errors.message = ["Mesajınız en az 10 karakter olmalıdır"];
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
      setStatus({
        success: false,
        message: "Lütfen form alanlarını kontrol edin.",
        errors,
      });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    // EmailJS environment variables
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({
        success: false,
        message: "Email servisi yapılandırılmamış. Lütfen daha sonra tekrar deneyin.",
        errors: {},
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const templateParams = {
        from_name: formData.get("name"),
        from_email: formData.get("email"),
        phone: formData.get("phone") || "Belirtilmemiş",
        services: getServiceNames(),
        message: formData.get("message"),
        to_email: "Beydigitalmedia@gmail.com",
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setStatus({
        success: true,
        message: "Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.",
        errors: {},
      });
      
      // Formu temizle
      formRef.current.reset();
      setSelectedServices([]);
    } catch (error) {
      console.error("Email gönderim hatası:", error);
      setStatus({
        success: false,
        message: "Mesajınız gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
        errors: {},
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-[#cdd6f4] mb-2 pl-1"
        >
          Adınız Soyadınız *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-3 rounded-xl border border-[#2d2d44] focus:border-[#0040ff] focus:ring-2 focus:ring-[#0040ff]/20 outline-none transition-all bg-[#181825] text-[#cdd6f4] placeholder-[#6c7086]"
          placeholder="Örn: Ahmet Yılmaz"
        />
        {status?.errors?.name && (
          <p className="mt-1 text-red-400 text-sm flex items-center gap-1">
            <AlertCircle size={14} />
            {status.errors.name[0]}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-[#cdd6f4] mb-2 pl-1"
        >
          E-posta Adresiniz *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 rounded-xl border border-[#2d2d44] focus:border-[#0040ff] focus:ring-2 focus:ring-[#0040ff]/20 outline-none transition-all bg-[#181825] text-[#cdd6f4] placeholder-[#6c7086]"
          placeholder="ornek@email.com"
        />
        {status?.errors?.email && (
          <p className="mt-1 text-red-400 text-sm flex items-center gap-1">
            <AlertCircle size={14} />
            {status.errors.email[0]}
          </p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-semibold text-[#cdd6f4] mb-2 pl-1"
        >
          Telefon Numaranız
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full px-4 py-3 rounded-xl border border-[#2d2d44] focus:border-[#0040ff] focus:ring-2 focus:ring-[#0040ff]/20 outline-none transition-all bg-[#181825] text-[#cdd6f4] placeholder-[#6c7086]"
          placeholder="05XX XXX XX XX"
        />
        {status?.errors?.phone && (
          <p className="mt-1 text-red-400 text-sm flex items-center gap-1">
            <AlertCircle size={14} />
            {status.errors.phone[0]}
          </p>
        )}
      </div>

      {/* Service Field - Custom Multiple Select Dropdown */}
      <div>
        <label className="block text-sm font-semibold text-[#cdd6f4] mb-2 pl-1">
          İlgilendiğiniz Hizmetler
        </label>
        <ServiceDropdown
          selectedServices={selectedServices}
          onToggle={handleServiceToggle}
        />
      </div>

      {/* Message Field */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-[#cdd6f4] mb-2 pl-1"
        >
          Mesajınız *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-[#2d2d44] focus:border-[#0040ff] focus:ring-2 focus:ring-[#0040ff]/20 outline-none transition-all bg-[#181825] text-[#cdd6f4] placeholder-[#6c7086] resize-none"
          placeholder="Projeniz hakkında kısa bir bilgi verin..."
        />
        {status?.errors?.message && (
          <p className="mt-1 text-red-400 text-sm flex items-center gap-1">
            <AlertCircle size={14} />
            {status.errors.message[0]}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#0040ff] text-[#cdd6f4] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#0033cc] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-[#cdd6f4]/30 border-t-[#cdd6f4] rounded-full animate-spin" />
            <span>Gönderiliyor...</span>
          </>
        ) : (
          <>
            <Send size={20} />
            <span>Mesaj Gönder</span>
          </>
        )}
      </motion.button>

      {/* Success Message */}
      {status?.success && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-green-400 bg-green-400/10 p-4 rounded-xl"
        >
          <CheckCircle size={20} />
          <span>{status.message}</span>
        </motion.div>
      )}

      {/* Error Message */}
      {!status?.success && status?.message && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl"
        >
          <AlertCircle size={20} />
          <span>{status.message}</span>
        </motion.div>
      )}
    </form>
  );
}
