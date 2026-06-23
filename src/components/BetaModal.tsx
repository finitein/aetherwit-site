"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { submitBetaSignup } from "@/actions/beta-signup";
import { useTranslations } from "next-intl";

interface BetaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BetaModal({ isOpen, onClose }: BetaModalProps) {
  const t = useTranslations("betaModal");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setError(null);
    }
  }, [isOpen]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const result = await submitBetaSignup(formData);

    setLoading(false);

    if (result.success) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3000);
    } else {
      setError(result.error || t("error"));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="w-full max-w-md mx-4 pointer-events-auto bg-[var(--card-bg)] backdrop-blur-2xl border border-[var(--border-color)] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <button
                onClick={onClose}
                aria-label={t("close")}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-[var(--foreground)]/10 transition-colors text-[var(--foreground)] opacity-50 hover:opacity-100"
              >
                <X className="w-5 h-5" />
              </button>
              
              {!submitted ? (
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-silicon)]/20 flex items-center justify-center">
                      <span className="text-3xl">🚀</span>
                    </div>
                    <h3 className="text-2xl font-bold font-sans text-[var(--foreground)]">{t("title")}</h3>
                    <p className="font-mono text-sm opacity-60 mt-2">{t("subtitle")}</p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider opacity-60 mb-2">{t("nameLabel")}</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        minLength={2}
                        maxLength={100}
                        className="w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-3 focus:border-[var(--color-silicon)] outline-none transition-colors text-[var(--foreground)]"
                        placeholder={t("namePlaceholder")}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider opacity-60 mb-2">{t("emailLabel")}</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        maxLength={255}
                        className="w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-3 focus:border-[var(--color-silicon)] outline-none transition-colors text-[var(--foreground)]"
                        placeholder={t("emailPlaceholder")}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider opacity-60 mb-2">{t("messageLabel")}</label>
                      <textarea 
                        name="message"
                        rows={3}
                        maxLength={1000}
                        className="w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-3 focus:border-[var(--color-silicon)] outline-none transition-colors text-[var(--foreground)] resize-none"
                        placeholder={t("messagePlaceholder")}
                      />
                    </div>

                    {error && (
                      <p className="text-red-500 text-sm font-mono">{error}</p>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="w-full mt-4 flex items-center justify-center gap-2 bg-[var(--color-silicon)] text-[var(--background)] font-bold font-mono px-8 py-4 rounded-lg uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {t("submitting")}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          {t("submit")}
                        </>
                      )}
                    </motion.button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
                  >
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">{t("successTitle")}</h3>
                  <p className="font-serif opacity-80">
                    {t("successMessage")}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}