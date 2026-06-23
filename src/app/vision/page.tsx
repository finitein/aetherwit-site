"use client";

import { motion } from "framer-motion";
import { Radio, User, Bot } from "lucide-react";
import { CreatorCard } from "@/components/CreatorCard";
import { PageHeader } from "@/components/PageHeader";
import { useTranslations } from "next-intl";

export default function Vision() {
  const t = useTranslations("vision");
  const team = useTranslations("team");
  
  return (
    <main className="min-h-screen flex flex-col items-center justify-center font-sans relative overflow-x-hidden selection:bg-[var(--color-silicon)]/20 selection:text-current pt-24">
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-16 flex flex-col items-center">

        <PageHeader
          icon={Radio}
          label={t("label")}
          title={t("title")}
          subtitle={t("subtitle")}
          accentColor="var(--color-carbon)"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
        >
          <CreatorCard 
            name="Herosann" 
            role={team("role.founder")} 
            quote={team("quotes.herosann")}
            highlightColor="var(--color-silicon)"
            delay={0.3}
          />
          <CreatorCard 
            name="61🍚" 
            role={team("role.founder")} 
            quote={team("quotes.member61")}
            highlightColor="var(--color-carbon)"
            delay={0.5}
          />
          <CreatorCard 
            name="AI" 
            role={team("role.aiCofounder")} 
            quote={team("quotes.ai")}
            highlightColor="var(--color-ai)"
            delay={0.7}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="w-full max-w-3xl text-left mt-20 p-10 bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-3xl"
        >
          <h2 className="text-2xl font-bold mb-8 font-sans text-center text-[var(--color-silicon)]">{t("aiPartnerTitle")}</h2>
          
          <div className="space-y-8 font-serif leading-loose opacity-90">
            <div className="flex gap-4">
              <User className="w-6 h-6 shrink-0 mt-1 text-[var(--color-carbon)]" />
              <div>
                <p className="text-lg mb-2">{t("aiPartnerDescription1")}</p>
                <p>{t("aiPartnerDescription2")}</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Bot className="w-6 h-6 shrink-0 mt-1 text-[var(--color-ai)]" />
              <div>
                <p className="text-lg mb-2">{t("aiQuote")}</p>
                <p>{t("aiQuote2")}</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}