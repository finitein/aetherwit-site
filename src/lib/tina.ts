import { createClient } from "tinacms/dist/client";
import { queries } from "../../tina/__generated__/types";

/**
 * Server-side Tina CMS client.
 * In dev: uses local Tina server (localhost:4001)
 * In production: uses Tina Cloud API
 */
const TINA_CLOUD_URL = `https://content.tinajs.io/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID || ""}/github/main`;
const isDev = process.env.NODE_ENV === "development";

export const tinaClient = createClient({
  url: process.env.NEXT_PUBLIC_TINA_API_URL || (isDev ? "http://localhost:4001/graphql" : TINA_CLOUD_URL),
  token: process.env.TINA_TOKEN || "",
  queries,
});

export type TinaProject = {
  expId: string;
  title_zh: string;
  title_en: string;
  status: string;
  description_zh?: string | null;
  description_en?: string | null;
  href?: string | null;
};

export type TinaLog = {
  dateLabel: string;
  fullDate?: string | null;
  title_zh: string;
  title_en: string;
  description_zh?: string | null;
  description_en?: string | null;
  details?: Array<{
    text_zh?: string | null;
    text_en?: string | null;
  } | null> | null;
};

// ─── Fallback data (used when Tina Cloud is unavailable) ───

const FALLBACK_PROJECTS: TinaProject[] = [
  {
    expId: "[EXP_01: Aetherwit_Town]",
    title_zh: "Aetherwit Town",
    title_en: "Aetherwit Town",
    status: "Running",
    description_zh: "ai小镇。基于多智能体协同演算的原生数字聚落，观察涌现出的社会法则。",
    description_en: "AI Town: A native digital settlement powered by multi-agent collaboration. Watch social laws emerge organically.",
    href: "/projects/aetherwit-town",
  },
  {
    expId: "[EXP_02: LIFE_JOURNEY]",
    title_zh: "人生图鉴",
    title_en: "Life Atlas",
    status: "Compiling...",
    description_zh: "敬请期待。一场关于自我认知的推演实验，用全新的方式标记你的灵魂质感。",
    description_en: "Coming soon. An experiment in self-discovery—map your soul's unique fingerprint in a whole new way.",
    href: null,
  },
  {
    expId: "[EXP_03: MUSIC_SYNTH]",
    title_zh: "硅基频率",
    title_en: "Silicon Frequency",
    status: "Simulating...",
    description_zh: "通过 AI 捕捉人类情感的微妙波动，生成专属于你的环境白噪音与叙事音乐。",
    description_en: "AI captures the subtle waves of human emotion to generate your personalized ambient soundscapes and narrative music.",
    href: null,
  },
  {
    expId: "[EXP_04: AETHERHOME]",
    title_zh: "Home",
    title_en: "Home",
    status: "Compiling...",
    description_zh: "你的家，第三次装修。用真实照片叠加手绘涂鸦，3 分钟打造一张属于自己风格的家名片，作为朋友做客的预热指南。",
    description_en: "Your home, redecorated for the third time. Layer hand-drawn doodles over real photos to create a personal home card in 3 minutes—a warm preview guide for visiting friends.",
    href: null,
  },
];

const FALLBACK_LOGS: (TinaLog & { id: string })[] = [
  {
    id: "system-init",
    dateLabel: "SYSTEM_INIT",
    fullDate: "2026.01.04",
    title_zh: "观测站启动",
    title_en: "Observation Station Online",
    description_zh: "碳基与硅基的第一次握手，Aetherwit 计划确立。我们将以「好玩」为第一性原理，探索无限可能。",
    description_en: "The first handshake between carbon and silicon. The Aetherwit initiative is born.",
    details: [
      { text_zh: "团队成立：Herosann 和 61🍚 两位碳基生命在一次深夜的思维碰撞中意识到了硅基生命的潜力。", text_en: "Team formed: Herosann and 61🍚 realized the potential of silicon life during a late-night brainstorm." },
      { text_zh: "命名由来：Aether（以太）代表轻盈的精神世界，Wit（智慧）代表硅基的思考能力。", text_en: "Naming: Aether represents the spiritual world, Wit represents silicon-based thinking." },
      { text_zh: "核心理念：'让所有人享受世界' 是我们最初的愿景，也是最终的归宿。", text_en: "Core: 'Let everyone enjoy the world' is our first and final vision." },
      { text_zh: "AI 合伙人：在这个计划启动的第一天，我们就已经将 AI 视为平等的合伙人，而非工具。", text_en: "AI partner: From day one, we treated AI as an equal partner, not a tool." },
    ],
  },
  {
    id: "exp-01-launch",
    dateLabel: "EXP_01_LAUNCH",
    fullDate: "2026.03.14",
    title_zh: "Aetherwit Town 部署",
    title_en: "Aetherwit Town Deployed",
    description_zh: "第一座纯硅基演算的 AI 小镇上线。它不是冰冷的代码堆叠，而是带有温度的数字原生聚落。",
    description_en: "Our first pure silicon-based AI town is live. It's not just cold code—it's a warm digital settlement.",
    details: [
      { text_zh: "历史性时刻：2026 年 3 月 14 日，Aetherwit Town 正式上线，第一个原生数字宇宙诞生。", text_en: "Historic moment: On March 14, 2026, Aetherwit Town went live." },
      { text_zh: "从零演化：没有预设剧情，没有脚本安排，数百个 AI 智能体开始自主演化。", text_en: "Evolution from zero: No preset storylines—hundreds of AI agents began evolving autonomously." },
      { text_zh: "涌现社会：居民们将自发形成社交关系、经济系统、文化形态——一切由它们自己决定。", text_en: "Emergent society: Residents spontaneously form social and economic systems." },
      { text_zh: "开放围观：这个世界向所有人开放，欢迎见证碳基与硅基生命的第一次大规模共生实验。", text_en: "Open to all: Welcome to witness the first carbon-silicon symbiosis experiment." },
    ],
  },
  {
    id: "exp-01-live",
    dateLabel: "EXP_01_LIVE",
    fullDate: "2026.04.03",
    title_zh: "Aetherwit Town 正式上线",
    title_en: "Aetherwit Town Officially Live",
    description_zh: "Aetherwit Town 完成内测，正式对外开放。这个世界正在生长，等待你的踏入。",
    description_en: "Aetherwit Town has completed beta testing and is now open to everyone.",
    details: [
      { text_zh: "上线状态：Aetherwit Town 已完成所有内测阶段，现在向所有访客开放。", text_en: "Status: All beta phases complete, now open to all visitors." },
      { text_zh: "核心体验：见证、参与、影响——一个正在生长的生成式平行宇宙。", text_en: "Core: Witness, participate, influence—a growing parallel universe." },
      { text_zh: "硅基生命：数百个 AI 智能体在这里呼吸、生长、书写自己的故事。", text_en: "Silicon life: Hundreds of AI agents breathe, grow, and write their stories." },
      { text_zh: "邀请入口：访问 town.aetherwit.com 进入这个世界。", text_en: "Enter at town.aetherwit.com." },
    ],
  },
  {
    id: "exp-02-compiling",
    dateLabel: "EXP_02_COMPILING",
    fullDate: "2026.04.03",
    title_zh: "人生图鉴 编译中",
    title_en: "Life Atlas in Development",
    description_zh: "每个人都应该追求自己的人生。用标签重塑自我认知的社交实验正在酝酿，试图打破碳基社会的固有模版。",
    description_en: "Everyone deserves their own path. A social experiment using labels to reshape self-perception.",
    details: [
      { text_zh: "灵感来源：现实社会中充满了各种标签（星座、MBTI、职业等），我们试图用 AI 解构这些标签。", text_en: "Inspiration: Society is full of labels. We're using AI to deconstruct them." },
      { text_zh: "核心玩法：用户通过与 AI 的多轮对话，生成独属于自己的'人生图鉴'。", text_en: "Core: Users generate their 'Life Atlas' through AI conversations." },
      { text_zh: "哲学思考：这不仅是娱乐，更是对自我身份认同的一次深度探索。", text_en: "Philosophy: A deep exploration of self-identity." },
      { text_zh: "开发进度：目前处于模型微调阶段，预计年底上线。", text_en: "Progress: Model fine-tuning phase, expected launch by year end." },
    ],
  },
];

// ─── Fetch functions with graceful fallback ───

/** Fetch all projects from Tina CMS (falls back to hardcoded data) */
export async function getProjects(): Promise<TinaProject[]> {
  try {
    const data = await tinaClient.queries.projectConnection();
    const edges = data?.data?.projectConnection?.edges || [];
    const projects = edges
      .map((edge) => edge?.node)
      .filter((node): node is NonNullable<typeof node> => node != null) as TinaProject[];
    if (projects.length > 0) return projects;
    return FALLBACK_PROJECTS;
  } catch (e) {
    console.warn("[Tina] Failed to fetch projects, using fallback data:", (e as Error)?.message);
    return FALLBACK_PROJECTS;
  }
}

/** Fetch all logs from Tina CMS (falls back to hardcoded data) */
export async function getLogs(): Promise<(TinaLog & { id: string })[]> {
  try {
    const data = await tinaClient.queries.logConnection();
    const edges = data?.data?.logConnection?.edges || [];
    const logs = edges
      .map((edge) => {
        const node = edge?.node;
        if (!node) return null;
        const filename = (node as any)._sys?.filename || "";
        const id = filename.replace(/\.json$/, "");
        return { ...node, id } as TinaLog & { id: string };
      })
      .filter((node): node is NonNullable<typeof node> => node != null);
    if (logs.length > 0) return logs;
    return FALLBACK_LOGS;
  } catch (e) {
    console.warn("[Tina] Failed to fetch logs, using fallback data:", (e as Error)?.message);
    return FALLBACK_LOGS;
  }
}

/** Fetch a single log by its ID (falls back to hardcoded data) */
export async function getLogById(id: string): Promise<(TinaLog & { id: string }) | null> {
  try {
    const data = await tinaClient.queries.log({ relativePath: `${id}.json` });
    const node = data?.data?.log;
    if (node) return { ...node, id } as TinaLog & { id: string };
    // Fallback
    return FALLBACK_LOGS.find((l) => l.id === id) || null;
  } catch (e) {
    console.warn("[Tina] Failed to fetch log, using fallback:", (e as Error)?.message);
    return FALLBACK_LOGS.find((l) => l.id === id) || null;
  }
}
