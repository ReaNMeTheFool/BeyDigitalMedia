"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, ChevronDown, Check } from "lucide-react";
import { submitContactForm } from "@/app/actions";

const initialState = {
  success: false,
  message: "",
  errors: {} as Record<string, string[]>,
};

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

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="submit"
      disabled={pending}
      className="w-full bg-[#0040ff] text-[#cdd6f4] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#0033cc] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {pending ? (
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
  );
}

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
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    if (state.success) {
      // Form başarıyla gönderildiğinde formu resetle
      const form = document.getElementById("contact-form") as HTMLFormElement;
      if (form) {
        form.reset();
      }
      // Seçili hizmetleri de temizle
      setSelectedServices([]);
    }
  }, [state.success]);

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <form id="contact-form" action={formAction} className="space-y-6">
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-[#cdd6f4] mb-2"
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
        {state.errors?.name && (
          <p className="mt-1 text-red-400 text-sm flex items-center gap-1">
            <AlertCircle size={14} />
            {state.errors.name[0]}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-[#cdd6f4] mb-2"
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
        {state.errors?.email && (
          <p className="mt-1 text-red-400 text-sm flex items-center gap-1">
            <AlertCircle size={14} />
            {state.errors.email[0]}
          </p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-semibold text-[#cdd6f4] mb-2"
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
        {state.errors?.phone && (
          <p className="mt-1 text-red-400 text-sm flex items-center gap-1">
            <AlertCircle size={14} />
            {state.errors.phone[0]}
          </p>
        )}
      </div>

      {/* Service Field - Custom Multiple Select Dropdown */}
      <div>
        <label className="block text-sm font-semibold text-[#cdd6f4] mb-3">
          İlgilendiğiniz Hizmetler
        </label>
        <ServiceDropdown
          selectedServices={selectedServices}
          onToggle={handleServiceToggle}
        />
        {/* Hidden input to track selected services */}
        <input
          type="hidden"
          name="service"
          value={selectedServices.join(",")}
        />
      </div>

      {/* Message Field */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-[#cdd6f4] mb-2"
        >
          Mesajınız *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 rounded-xl border border-[#2d2d44] focus:border-[#0040ff] focus:ring-2 focus:ring-[#0040ff]/20 outline-none transition-all bg-[#181825] text-[#cdd6f4] placeholder-[#6c7086] resize-none"
          placeholder="Projeniz hakkında kısa bir bilgi verin..."
        />
        {state.errors?.message && (
          <p className="mt-1 text-red-400 text-sm flex items-center gap-1">
            <AlertCircle size={14} />
            {state.errors.message[0]}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <SubmitButton />

      {/* Success Message */}
      {state.success && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-green-400 bg-green-400/10 p-4 rounded-xl"
        >
          <CheckCircle size={20} />
          <span>{state.message}</span>
        </motion.div>
      )}

      {/* Error Message */}
      {!state.success && state.message && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl"
        >
          <AlertCircle size={20} />
          <span>{state.message}</span>
        </motion.div>
      )}
    </form>
  );
}
