import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || process.env.GIT_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },

  schema: {
    collections: [
      // ─── Projects (项目卡片) ───
      {
        name: "project",
        label: "项目 Projects",
        path: "content/projects",
        format: "json",
        fields: [
          { type: "string", name: "expId", label: "实验编号 Experiment ID", required: true },
          { type: "string", name: "title_zh", label: "标题（中文）", required: true },
          { type: "string", name: "title_en", label: "Title (English)", required: true },
          {
            type: "string",
            name: "status",
            label: "状态 Status",
            required: true,
            options: [
              { value: "Running", label: "运行中 Running" },
              { value: "Compiling...", label: "编译中 Compiling" },
              { value: "Simulating...", label: "模拟中 Simulating" },
            ],
          },
          { type: "string", name: "description_zh", label: "描述（中文）", ui: { component: "textarea" } },
          { type: "string", name: "description_en", label: "Description (English)", ui: { component: "textarea" } },
          { type: "string", name: "href", label: "链接 Link (留空则显示「即将推出」)" },
        ],
      },

      // ─── Logs (观测日志) ───
      {
        name: "log",
        label: "日志 Logs",
        path: "content/logs",
        format: "json",
        fields: [
          { type: "string", name: "dateLabel", label: "日期标签 Date Label", required: true },
          { type: "string", name: "fullDate", label: "完整日期 Full Date (如 2026.03.14)" },
          { type: "string", name: "title_zh", label: "标题（中文）", required: true },
          { type: "string", name: "title_en", label: "Title (English)", required: true },
          { type: "string", name: "description_zh", label: "摘要（中文）", ui: { component: "textarea" } },
          { type: "string", name: "description_en", label: "Summary (English)", ui: { component: "textarea" } },
          {
            type: "object",
            name: "details",
            label: "详情列表 Detail Items",
            list: true,
            fields: [
              { type: "string", name: "text_zh", label: "详情（中文）", ui: { component: "textarea" } },
              { type: "string", name: "text_en", label: "Detail (English)", ui: { component: "textarea" } },
            ],
          },
        ],
      },

      // ─── Page Content (页面文案) ───
      {
        name: "pageContent",
        label: "页面文案 Pages",
        path: "content/pages",
        format: "json",
        fields: [
          { type: "string", name: "pageId", label: "页面标识 Page ID", required: true },
          {
            type: "object",
            name: "sections",
            label: "内容区块 Sections",
            list: true,
            fields: [
              { type: "string", name: "sectionId", label: "区块标识 Section ID", required: true },
              { type: "string", name: "label_zh", label: "标签（中文）" },
              { type: "string", name: "label_en", label: "Label (English)" },
              { type: "string", name: "title_zh", label: "标题（中文）" },
              { type: "string", name: "title_en", label: "Title (English)" },
              { type: "string", name: "subtitle_zh", label: "副标题（中文）", ui: { component: "textarea" } },
              { type: "string", name: "subtitle_en", label: "Subtitle (English)", ui: { component: "textarea" } },
              { type: "string", name: "body_zh", label: "正文（中文）", ui: { component: "textarea" } },
              { type: "string", name: "body_en", label: "Body (English)", ui: { component: "textarea" } },
            ],
          },
        ],
      },
    ],
  },
});
