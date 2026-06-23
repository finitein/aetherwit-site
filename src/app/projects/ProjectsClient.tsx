"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Cpu } from "lucide-react";
import { ExperimentCard } from "@/components/ExperimentCard";
import { Modal } from "@/components/Modal";
import { PageHeader } from "@/components/PageHeader";
import { useTranslations, useLocale } from "next-intl";
import type { TinaProject } from "@/lib/tina";

interface ProjectsClientProps {
  projects: TinaProject[];
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
  const t = useTranslations("projects");
  const m = useTranslations("modal");
  const locale = useLocale();
  const isZh = locale.startsWith("zh");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const handleCardClick = (id: string, title: string) => {
    setModalTitle(title);
    setModalOpen(true);
  };

  // Map Tina data to display format based on current locale
  const displayProjects = projects.map((p) => ({
    id: p.expId,
    title: isZh ? p.title_zh : p.title_en,
    status: p.status as "Running" | "Compiling..." | "Simulating...",
    description: isZh ? (p.description_zh || "") : (p.description_en || ""),
    href: p.href || null,
  }));

  return (
    <main className="min-h-screen flex flex-col items-center justify-center font-sans relative overflow-x-hidden selection:bg-[var(--color-silicon)]/20 selection:text-current pt-24">
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-16 flex flex-col items-center">

        <PageHeader
          icon={Cpu}
          label={t("label")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
        >
          {displayProjects.map((project) => (
            project.href ? (
              <Link key={project.id} href={project.href} className="block">
                <ExperimentCard
                  id={project.id}
                  title={project.title}
                  status={project.status}
                  description={project.description}
                />
              </Link>
            ) : (
              <div
                key={project.id}
                onClick={() => handleCardClick(project.id, project.title)}
                className="cursor-pointer"
              >
                <ExperimentCard
                  id={project.id}
                  title={project.title}
                  status={project.status}
                  description={project.description}
                />
              </div>
            )
          ))}
        </motion.div>

      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
        {m("comingSoon")}
      </Modal>
    </main>
  );
}
