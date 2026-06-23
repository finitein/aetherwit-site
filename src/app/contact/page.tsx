"use client";

import { motion } from "framer-motion";
import { Terminal, Send, Mail, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { submitContactMessage } from "@/actions/contact";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const result = await submitContactMessage(formData);

    setLoading(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error || t("form.error"));
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center font-sans relative overflow-x-hidden selection:bg-[var(--color-silicon)]/20 selection:text-current">
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 py-32 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] p-10 rounded-3xl shadow-xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-carbon)]/10 rounded-full blur-[80px] -z-10 group-hover:bg-[var(--color-carbon)]/20 transition-all duration-700"></div>
          
          <div className="flex items-center gap-3 mb-8 text-[var(--color-carbon)] font-mono text-sm tracking-widest uppercase">
            <Terminal className="w-4 h-4" />
            <span>{t("protocol")}</span>
          </div>

          {!submitted ? (
            <>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4 text-[var(--foreground)]">
                {t("title")}
              </h1>
              <p className="text-lg opacity-80 mb-10 font-serif leading-relaxed">
                {t("subtitle")}
              </p>

              <div className="mb-10 p-6 bg-[var(--foreground)]/5 rounded-xl border border-[var(--border-color)]">
                <div className="flex items-center gap-3 mb-2 text-[var(--color-silicon)]">
                  <Mail className="w-5 h-5" />
                  <span className="font-mono text-sm uppercase tracking-widest opacity-60">{t("directChannel")}</span>
                </div>
                <a 
                  href="mailto:hi@aetherwit.com" 
                  className="text-2xl md:text-3xl font-bold hover:text-[var(--color-silicon)] transition-colors underline underline-offset-4 decoration-[var(--color-silicon)]/30 hover:decoration-[var(--color-silicon)]"
                >
                  hi@aetherwit.com
                </a>
              </div>

              <form className="space-y-6 flex flex-col" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 font-mono">
                  <label className="text-sm opacity-60 uppercase tracking-widest">{t("form.name")}</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    maxLength={100}
                    className="w-full bg-transparent border-b border-[var(--border-color)] focus:border-[var(--color-silicon)] py-2 outline-none transition-colors text-[var(--foreground)]" 
                    placeholder={t("form.namePlaceholder")} 
                  />
                </div>
                
                <div className="flex flex-col gap-2 font-mono">
                  <label className="text-sm opacity-60 uppercase tracking-widest">{t("form.email")}</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    maxLength={255}
                    className="w-full bg-transparent border-b border-[var(--border-color)] focus:border-[var(--color-carbon)] py-2 outline-none transition-colors text-[var(--foreground)]" 
                    placeholder={t("form.emailPlaceholder")} 
                  />
                </div>
                
                <div className="flex flex-col gap-2 font-mono">
                  <label className="text-sm opacity-60 uppercase tracking-widest">{t("form.message")}</label>
                  <textarea 
                    name="message"
                    rows={4} 
                    required
                    minLength={10}
                    maxLength={2000}
                    className="w-full bg-transparent border-b border-[var(--border-color)] focus:border-[var(--color-ai)] py-2 outline-none transition-colors resize-none text-[var(--foreground)]" 
                    placeholder={t("form.messagePlaceholder")}
                  ></textarea>
                </div>

                {error && (
                  <p className="text-red-500 text-sm font-mono">{error}</p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="mt-6 flex items-center justify-center gap-3 bg-[var(--foreground)] text-[var(--background)] font-mono px-8 py-4 rounded-sm tracking-widest uppercase text-sm hover:bg-[var(--color-silicon)] hover:text-white transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="font-bold">{t("form.sending")}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span className="font-bold">{t("form.submit")}</span>
                    </>
                  )}
                </motion.button>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-[var(--foreground)]">{t("form.success")}</h2>
              <p className="font-serif text-lg opacity-80">
                {t("form.successMessage")}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  );
}