"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, ChevronDown, Check } from "lucide-react";
import { submitContactForm } from "@/app/actions";
import ActionStamp from "@/components/document/ActionStamp";

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

const fieldLabelClass =
  "block font-mono text-[11px] uppercase tracking-[0.18em] text-pencil mb-1";
const fieldClass =
  "w-full rounded-none border-0 border-b border-dashed border-ink/40 bg-transparent px-0 py-2.5 text-ink placeholder:text-pencil/70 outline-none transition-colors duration-150 focus:border-solid focus:border-ink focus-visible:outline-none";

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
        aria-label="Hizmet seçin"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`w-full px-0 py-2.5 rounded-none border-0 border-b border-dashed bg-transparent flex items-center justify-between outline-none focus-visible:outline-none transition-colors duration-150 ${
          isOpen
            ? "border-solid border-ink"
            : "border-ink/40 hover:border-ink"
        }`}
      >
        <span
          className={`text-sm ${selectedServices.length === 0 ? "text-pencil/70" : "text-ink"}`}
        >
          {getButtonText()}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} className="text-pencil" aria-hidden="true" />
        </motion.span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            role="listbox"
            className="absolute z-50 w-full mt-2 rounded-[3px] border border-ink/40 bg-paper shadow-doc overflow-hidden"
          >
            <div className="max-h-64 overflow-y-auto py-1">
              {services.map((service) => {
                const isSelected = selectedServices.includes(service.id);
                return (
                  <label
                    key={service.id}
                    role="option"
                    aria-selected={isSelected}
                    className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors hover:bg-paper-alt"
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
                      isSelected ? "text-kase font-bold" : "text-ink"
                    }`}>
                      {service.label}
                    </span>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: isSelected ? 1 : 0, scale: isSelected ? 1 : 0.5 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <Check size={16} className="text-kase" aria-hidden="true" />
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

    // Add selected services to formData
    if (selectedServices.length > 0) {
      formData.set("service", selectedServices.join(","));
    }

    // Client-side quick validation
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

    try {
      const result = await submitContactForm(
        { success: false, message: "", errors: {} },
        formData
      );

      setStatus({
        success: result.success,
        message: result.message,
        errors: result.errors || {},
      });

      if (result.success) {
        formRef.current.reset();
        setSelectedServices([]);
      }
    } catch (error) {
      console.error("Form gönderim hatası:", error);
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
          className={fieldLabelClass}
        >
          Adınız Soyadınız *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className={fieldClass}
          placeholder="Örn: Ahmet Yılmaz"
        />
        {status?.errors?.name && (
          <p className="mt-1.5 text-action font-mono text-xs flex items-center gap-1">
            <AlertCircle size={13} aria-hidden="true" />
            {status.errors.name[0]}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className={fieldLabelClass}
        >
          E-posta Adresiniz *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className={fieldClass}
          placeholder="ornek@email.com"
        />
        {status?.errors?.email && (
          <p className="mt-1.5 text-action font-mono text-xs flex items-center gap-1">
            <AlertCircle size={13} aria-hidden="true" />
            {status.errors.email[0]}
          </p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label
          htmlFor="phone"
          className={fieldLabelClass}
        >
          Telefon Numaranız
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className={fieldClass}
          placeholder="05XX XXX XX XX"
        />
        {status?.errors?.phone && (
          <p className="mt-1.5 text-action font-mono text-xs flex items-center gap-1">
            <AlertCircle size={13} aria-hidden="true" />
            {status.errors.phone[0]}
          </p>
        )}
      </div>

      {/* Service Field - Custom Multiple Select Dropdown */}
      <div>
        <label className={fieldLabelClass}>
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
          className={fieldLabelClass}
        >
          Mesajınız *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className={`${fieldClass} resize-none`}
          placeholder="Projeniz hakkında kısa bir bilgi verin..."
        />
        {status?.errors?.message && (
          <p className="mt-1.5 text-action font-mono text-xs flex items-center gap-1">
            <AlertCircle size={13} aria-hidden="true" />
            {status.errors.message[0]}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <ActionStamp
        type="submit"
        disabled={isSubmitting}
        size="lg"
        className="w-full disabled:opacity-60 disabled:pointer-events-none"
      >
        {isSubmitting ? (
          <>
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-paper/30 border-t-paper" aria-hidden="true" />
            <span>Gönderiliyor...</span>
          </>
        ) : (
          <>
            <Send size={18} aria-hidden="true" />
            <span>Mesaj Gönder</span>
          </>
        )}
      </ActionStamp>

      {/* Success Message: damgali onay */}
      {status?.success && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2.5 rounded-[3px] border-[2.5px] border-kase text-kase p-4 shadow-[inset_0_0_0_2px_var(--color-paper)]"
        >
          <CheckCircle size={20} aria-hidden="true" />
          <span className="font-bold text-sm">{status.message}</span>
        </motion.div>
      )}

      {/* Error Message */}
      {!status?.success && status?.message && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2.5 rounded-[3px] border-2 border-action text-action bg-action/5 p-4"
        >
          <AlertCircle size={20} aria-hidden="true" />
          <span className="font-bold text-sm">{status.message}</span>
        </motion.div>
      )}
    </form>
  );
}
