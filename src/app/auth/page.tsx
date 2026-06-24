"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Terminal, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";
import { isValidEmail, sanitizeText } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function Auth() {
  const t = useTranslations("auth");
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  
  const router = useRouter();
  const supabase = createClient();

  // 获取 redirect 参数，用于登录后回跳
  const redirectUrl = searchParams.get("redirect");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (!isValidEmail(email)) {
      setError(t("errors.invalidEmail"));
      setLoading(false);
      return;
    }

    if (!isLogin) {
      if (password.length < 8) {
        setError(t("errors.passwordLength"));
        setLoading(false);
        return;
      }
      const cleanUsername = sanitizeText(username, 50);
      if (!cleanUsername || cleanUsername.length < 2) {
        setError(t("errors.usernameLength"));
        setLoading(false);
        return;
      }
    }

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        const translated = t(`errors.supabaseErrors.${error.message}` as any);
        setError(typeof translated === 'string' ? translated : error.message);
      } else {
        // 登录成功，跳转到回调接口处理 token 回跳
        const callbackUrl = redirectUrl 
          ? `/api/auth/callback?final_redirect=${encodeURIComponent(redirectUrl)}`
          : "/";
        router.push(callbackUrl);
        router.refresh();
      }
    } else {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: sanitizeText(username, 50),
          },
        },
      });

      if (signUpError) {
        const translated = t(`errors.supabaseErrors.${signUpError.message}` as any);
        setError(typeof translated === 'string' ? translated : signUpError.message);
      } else {
        setMessage(t("errors.registerSuccess"));
        setIsLogin(true);
      }
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center font-sans relative overflow-x-hidden selection:bg-[var(--color-silicon)]/20 selection:text-current">
      <div className="relative z-10 w-full max-w-md mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] p-8 rounded-3xl shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-silicon)]/10 rounded-full blur-[80px] -z-10"></div>
          
          <div className="flex items-center gap-3 mb-8 text-[var(--color-silicon)] font-mono text-sm tracking-widest uppercase">
            <Terminal className="w-4 h-4" />
            <span>{t("protocol")}</span>
          </div>

          <h1 className="text-3xl font-black tracking-tighter mb-2 text-[var(--foreground)]">
            {isLogin ? t("login") : t("register")}
          </h1>
          <p className="text-sm opacity-60 mb-8 font-serif">
            {isLogin 
              ? t("welcomeBack") 
              : t("joinUs")}
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-500 text-sm font-mono">{error}</p>
            </div>
          )}

          {message && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-green-500 text-sm font-mono">{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="auth-username" className="block text-xs font-mono uppercase tracking-wider opacity-60 mb-2">
                  {t("form.username")}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                  <input
                    id="auth-username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required={!isLogin}
                    minLength={2}
                    maxLength={50}
                    className="w-full bg-transparent border border-[var(--border-color)] rounded-lg pl-11 pr-4 py-3 focus:border-[var(--color-silicon)] outline-none transition-colors text-[var(--foreground)]"
                    placeholder={t("form.usernamePlaceholder")}
                  />
                </div>
              </div>
            )}
            
            <div>
              <label htmlFor="auth-email" className="block text-xs font-mono uppercase tracking-wider opacity-60 mb-2">
                {t("form.email")}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                <input
                  id="auth-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full bg-transparent border border-[var(--border-color)] rounded-lg pl-11 pr-4 py-3 focus:border-[var(--color-silicon)] outline-none transition-colors text-[var(--foreground)]"
                  placeholder={t("form.emailPlaceholder")}
                />
              </div>
            </div>

            <div>
              <label htmlFor="auth-password" className="block text-xs font-mono uppercase tracking-wider opacity-60 mb-2">
                {t("form.password")}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                <input
                  id="auth-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  className="w-full bg-transparent border border-[var(--border-color)] rounded-lg pl-11 pr-4 py-3 focus:border-[var(--color-silicon)] outline-none transition-colors text-[var(--foreground)]"
                  placeholder={t("form.passwordPlaceholder")}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full mt-6 flex items-center justify-center gap-2 bg-[var(--color-silicon)] text-[var(--background)] font-bold font-mono px-8 py-4 rounded-lg uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{t("form.processing")}</span>
                </>
              ) : (
                <>
                  {isLogin ? t("login") : t("register")}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          {isLogin && (
            <div className="mt-4 text-center">
              <Link
                href="/auth/forgot-password"
                className="text-xs font-mono text-[var(--color-carbon)] hover:underline underline-offset-4"
              >
                {t("form.forgotPassword")}
              </Link>
            </div>
          )}

          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
                setMessage(null);
              }}
              className="text-sm font-mono text-[var(--color-silicon)] hover:underline underline-offset-4"
            >
              {isLogin ? (
                <>{t("form.noAccount")}<span className="font-bold">{t("form.registerNow")}</span></>
              ) : (
                <>{t("form.hasAccount")}<span className="font-bold">{t("form.loginNow")}</span></>
              )}
            </button>
          </div>

        </motion.div>

        <Link href="/" className="block text-center mt-8 text-sm font-mono opacity-40 hover:opacity-100 transition-opacity">
          ← {t("backToHome")}
        </Link>
      </div>
    </main>
  );
}