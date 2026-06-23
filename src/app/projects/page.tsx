"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Cpu } from "lucide-react";
import { ExperimentCard } from "@/components/ExperimentCard";
import { Modal } from "@/components/Modal";
import { PageHeader } from "@/components/PageHeader";
import { useTranslations } from "next-intl";

export default function Projects() {
  const t = useTranslations("projects");
  const m = useTranslations("modal");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const handleCardClick = (id: string, title: string) => {
    if (id === "[EXP_01: Aetherwit_Town]") {
      return;
    }
    setModalTitle(title);
    setModalOpen(true);
  };

  // Project data with translation keys
  const projects = [
    {
      id: "[EXP_01: Aetherwit_Town]",
      title: "Aetherwit Town",
      status: "Running" as const,
      description: t("projects.aetherwitTown.description"),
      href: "/projects/aetherwit-town"
    },
    {
      id: "[EXP_02: LIFE_JOURNEY]",
      title: t("projects.lifeJourney.title"),
      status: "Compiling..." as const,
      description: t("projects.lifeJourney.description"),
      href: null
    },
    {
      id: "[EXP_03: MUSIC_SYNTH]",
      title: t("projects.musicSynth.title"),
      status: "Simulating..." as const,
      description: t("projects.musicSynth.description"),
      href: null
    },
    {
      id: "[EXP_04: AETHERHOME]",
      title: t("projects.aetherHome.title"),
      status: "Compiling..." as const,
      description: t("projects.aetherHome.description"),
      href: null
    }
  ];

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
          {projects.map((project) => (
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