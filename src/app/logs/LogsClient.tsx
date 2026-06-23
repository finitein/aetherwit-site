"use client";

import { motion } from "framer-motion";
import { Radio } from "lucide-react";
import { Timeline } from "@/components/Timeline";
import { PageHeader } from "@/components/PageHeader";
import { useTranslations } from "next-intl";
import type { TinaLog } from "@/lib/tina";

interface LogsClientProps {
  logs: (TinaLog & { id: string })[];
}

export function LogsClient({ logs }: LogsClientProps) {
  const t = useTranslations("logs");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center font-sans relative overflow-x-hidden selection:bg-[var(--color-silicon)]/20 selection:text-current pt-24">
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-16 flex flex-col items-center">

        <PageHeader
          icon={Radio}
          label={t("label")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-3xl"
        >
          <Timeline logs={logs} />
        </motion.div>

      </div>
    </main>
  );
}
