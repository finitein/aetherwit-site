"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Loader2, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";
import { useTranslations } from "next-intl";

export default function ConfirmPage() {
  const t = useTranslations("auth");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState(t("confirm.verifyingMessage"));

  useEffect(() => {
    const supabase = createClient();
    
    // Handle the confirmation result from URL hash
    const handleVerify = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        setStatus("error");
        setMessage(t("confirm.verifying") + error.message);
        return;
      }

      if (data.session) {
        setStatus("success");
        setMessage(t("confirm.successMessage"));
      } else {
        // Try to get user directly in case confirmation happened
        const { data: user } = await supabase.auth.getUser();
        if (user.user) {
          setStatus("success");
          setMessage(t("confirm.successMessage"));
        } else {
          // If no session/user, it might be that email confirmation is not required
          // or the user needs to check their email
          setStatus("success");
          setMessage(t("confirm.successMessageAlt"));
        }
      }
    };

    handleVerify();
  }, [t]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center font-sans relative overflow-x-hidden selection:bg-[var(--color-silicon)]/20 selection:text-current">
      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] p-10 rounded-3xl shadow-xl relative overflow-hidden text-center"
        >
          {status === "loading" && (
            <>
              <Loader2 className="w-16 h-16 mx-auto mb-6 text-[var(--color-silicon)] animate-spin" />
              <h1 className="text-2xl font-bold mb-4 text-[var(--foreground)]">{t("confirm.verifying")}</h1>
              <p className="font-serif opacity-80">{message}</p>
            </>
          )}

          {status === "success" && (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
              >
                <CheckCircle className="w-10 h-10 text-green-500" />
              </motion.div>
              <h1 className="text-3xl font-black tracking-tighter mb-4 text-[var(--foreground)]">
                {t("confirm.successTitle")}
              </h1>
              <p className="font-serif opacity-80 mb-8 leading-relaxed">
                {message}
              </p>
              <Link 
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-[var(--color-silicon)] text-[var(--background)] font-bold font-mono px-8 py-4 rounded-lg uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                {t("confirm.goHome")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
                <span className="text-3xl">⚠️</span>
              </div>
              <h1 className="text-2xl font-bold mb-4 text-red-500">{t("confirm.errorTitle")}</h1>
              <p className="font-serif opacity-80 mb-8">{message}</p>
              <Link 
                href="/auth"
                className="inline-flex items-center justify-center gap-2 bg-[var(--foreground)] text-[var(--background)] font-bold font-mono px-8 py-4 rounded-lg uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                {t("confirm.backToLogin")}
              </Link>
            </>
          )}

        </motion.div>
      </div>
    </main>
  );
}