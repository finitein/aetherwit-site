"use client";

import { motion } from "framer-motion";
import { Fingerprint } from "lucide-react";
import { generateFrequencyBars } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface FrequencyVisualizationProps {
  residentId: string;
}

export function FrequencyVisualization({ residentId }: FrequencyVisualizationProps) {
  const t = useTranslations("profile.frequency");
  const frequencyBars = generateFrequencyBars(residentId);

  return (
    <div className="w-full bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-3xl p-8 md:p-10 relative overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <Fingerprint className="w-5 h-5 text-[var(--color-ai)] opacity-70" />
        <span className="font-mono text-xs uppercase tracking-widest opacity-60">
          {t("label")}
        </span>
      </div>

      <p className="font-serif text-sm opacity-50 mb-8 leading-relaxed">
        {t("description")}
      </p>

      {/* Frequency Bars */}
      <div className="flex items-end justify-center gap-[3px] h-32 w-full">
        {frequencyBars.map((height, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.5 + i * 0.02,
              ease: "easeOut",
            }}
            className="frequency-bar flex-1 rounded-t-sm origin-bottom"
            style={
              {
                height: `${height * 100}%`,
                "--bar-index": i,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="font-mono text-xs opacity-30 tracking-wider">0 Hz</span>
        <span className="font-mono text-xs opacity-30 tracking-wider">
          {residentId}
        </span>
        <span className="font-mono text-xs opacity-30 tracking-wider">∞ Hz</span>
      </div>
    </div>
  );
}