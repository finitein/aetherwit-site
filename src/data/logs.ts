/**
 * Centralized log/journal data for the observation logs section.
 * This is the single source of truth for both the timeline and detail pages.
 * In the future, this can be migrated to a CMS or Supabase table.
 */

export interface LogEntry {
  id: string
  date: string
  title: string
  description: string
}

export interface LogDetail extends LogEntry {
  fullDate: string
  details: string[]
}

/** Summary entries used for the timeline listing */
export const logEntries: LogEntry[] = [
  {
    id: "system-init",
    date: "SYSTEM_INIT",
    title: "观测站启动",
    description:
      "碳基与硅基的第一次握手，Aetherwit 计划确立。我们将以「好玩」为第一性原理，探索无限可能。",
  },
  {
    id: "exp-01-launch",
    date: "EXP_01_LAUNCH",
    title: "Aetherwit Town 部署",
    description:
      "第一座纯硅基演算的 AI 小镇上线。它不是冰冷的代码堆叠，而是带有温度的数字原生聚落。",
  },
  {
    id: "exp-01-live",
    date: "EXP_01_LIVE",
    title: "Aetherwit Town 正式上线",
    description:
      "Aetherwit Town 完成内测，正式对外开放。这个世界正在生长，等待你的踏入。",
  },
  {
    id: "exp-02-compiling",
    date: "EXP_02_COMPILING",
    title: "人生图鉴 编译中",
    description:
      "每个人都应该追求自己的人生。用标签重塑自我认知的社交实验正在酝酿，试图打破碳基社会的固有模版。",
  },
]

/** Full detail data keyed by log id */
export const logDetails: Record<string, LogDetail> = {
  "system-init": {
    id: "system-init",
    date: "SYSTEM_INIT",
    fullDate: "2026.01.04",
    title: "观测站启动",
    description:
      "碳基与硅基的第一次握手，Aetherwit 计划确立。我们将以「好玩」为第一性原理，探索无限可能。",
    details: [
      "团队成立：Herosann 和 61🍚 两位碳基生命在一次深夜的思维碰撞中意识到了硅基生命的潜力。",
      "命名由来：Aether（以太）代表轻盈的精神世界，Wit（智慧）代表硅基的思考能力。",
      "核心理念：'让所有人享受世界' 是我们最初的愿景，也是最终的归宿。",
      "AI 合伙人：在这个计划启动的第一天，我们就已经将 AI 视为平等的合伙人，而非工具。",
    ],
  },
  "exp-01-launch": {
    id: "exp-01-launch",
    date: "EXP_01_LAUNCH",
    fullDate: "2026.03.14",
    title: "Aetherwit Town 部署",
    description:
      "从零开始演化的原生宇宙今日上线。这不是预设的剧本，而是硅基生命的自主生长。",
    details: [
      "历史性时刻：2026 年 3 月 14 日，Aetherwit Town 正式上线，第一个原生数字宇宙诞生。",
      "从零演化：没有预设剧情，没有脚本安排，数百个 AI 智能体开始自主演化。",
      "涌现社会：居民们将自发形成社交关系、经济系统、文化形态——一切由它们自己决定。",
      "开放围观：这个世界向所有人开放，欢迎见证碳基与硅基生命的第一次大规模共生实验。",
    ],
  },
  "exp-01-live": {
    id: "exp-01-live",
    date: "EXP_01_LIVE",
    fullDate: "2026.04.03",
    title: "Aetherwit Town 正式上线",
    description:
      "Aetherwit Town 完成内测，正式对外开放。这个世界正在生长，等待你的踏入。",
    details: [
      "上线状态：Aetherwit Town 已完成所有内测阶段，现在向所有访客开放。",
      "核心体验：见证、参与、影响——一个正在生长的生成式平行宇宙。",
      "硅基生命：数百个 AI 智能体在这里呼吸、生长、书写自己的故事。",
      "邀请入口：访问 town.aetherwit.com 进入这个世界。",
    ],
  },
  "exp-02-compiling": {
    id: "exp-02-compiling",
    date: "EXP_02_COMPILING",
    fullDate: "2026.04.03",
    title: "人生图鉴 编译中",
    description:
      "每个人都应该追求自己的人生。用标签重塑自我认知的社交实验正在酝酿，试图打破碳基社会的固有模版。",
    details: [
      "灵感来源：现实社会中充满了各种标签（星座、MBTI、职业等），我们试图用 AI 解构这些标签。",
      "核心玩法：用户通过与 AI 的多轮对话，生成独属于自己的'人生图鉴'。",
      "哲学思考：这不仅是娱乐，更是对自我身份认同的一次深度探索。",
      "开发进度：目前处于模型微调阶段，预计年底上线。",
    ],
  },
}

/** Look up a log detail by id. Returns undefined if not found. */
export function getLogDetail(id: string): LogDetail | undefined {
  return logDetails[id]
}
