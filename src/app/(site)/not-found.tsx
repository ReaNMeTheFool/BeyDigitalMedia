"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className="text-[120px] sm:text-[180px] font-bold text-primary/10 leading-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-primary/20 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Sayfa Bulunamadı
          </h1>
          <p className="text-text-muted text-lg mb-8 max-w-md mx-auto">
            Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış
            olabilir. Ana sayfaya dönebilir veya başka bir sayfa arayabilirsiniz.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Geri Dön</span>
            </motion.button>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-600 transition-colors"
              >
                <Home size={20} />
                <span>Ana Sayfa</span>
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-gray-200"
        >
          <p className="text-text-muted mb-4">Yardımcı olabilecek sayfalar:</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { name: "Hizmetler", href: "/#services" },
              { name: "Portfolyo", href: "/#portfolio" },
              { name: "Hakkımızda", href: "/#about" },
              { name: "Blog", href: "/#blog" },
              { name: "İletişim", href: "/#contact" },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-primary hover:underline font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
