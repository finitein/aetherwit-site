// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.GIT_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    publicFolder: "public",
    outputFolder: "admin"
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads"
    }
  },
  schema: {
    collections: [
      // ─── Projects (项目卡片) ───
      {
        name: "project",
        label: "\u9879\u76EE Projects",
        path: "content/projects",
        format: "json",
        fields: [
          { type: "string", name: "expId", label: "\u5B9E\u9A8C\u7F16\u53F7 Experiment ID", required: true },
          { type: "string", name: "title_zh", label: "\u6807\u9898\uFF08\u4E2D\u6587\uFF09", required: true },
          { type: "string", name: "title_en", label: "Title (English)", required: true },
          {
            type: "string",
            name: "status",
            label: "\u72B6\u6001 Status",
            required: true,
            options: [
              { value: "Running", label: "\u8FD0\u884C\u4E2D Running" },
              { value: "Compiling...", label: "\u7F16\u8BD1\u4E2D Compiling" },
              { value: "Simulating...", label: "\u6A21\u62DF\u4E2D Simulating" }
            ]
          },
          { type: "string", name: "description_zh", label: "\u63CF\u8FF0\uFF08\u4E2D\u6587\uFF09", ui: { component: "textarea" } },
          { type: "string", name: "description_en", label: "Description (English)", ui: { component: "textarea" } },
          { type: "string", name: "href", label: "\u94FE\u63A5 Link (\u7559\u7A7A\u5219\u663E\u793A\u300C\u5373\u5C06\u63A8\u51FA\u300D)" }
        ]
      },
      // ─── Logs (观测日志) ───
      {
        name: "log",
        label: "\u65E5\u5FD7 Logs",
        path: "content/logs",
        format: "json",
        fields: [
          { type: "string", name: "dateLabel", label: "\u65E5\u671F\u6807\u7B7E Date Label", required: true },
          { type: "string", name: "fullDate", label: "\u5B8C\u6574\u65E5\u671F Full Date (\u5982 2026.03.14)" },
          { type: "string", name: "title_zh", label: "\u6807\u9898\uFF08\u4E2D\u6587\uFF09", required: true },
          { type: "string", name: "title_en", label: "Title (English)", required: true },
          { type: "string", name: "description_zh", label: "\u6458\u8981\uFF08\u4E2D\u6587\uFF09", ui: { component: "textarea" } },
          { type: "string", name: "description_en", label: "Summary (English)", ui: { component: "textarea" } },
          {
            type: "object",
            name: "details",
            label: "\u8BE6\u60C5\u5217\u8868 Detail Items",
            list: true,
            fields: [
              { type: "string", name: "text_zh", label: "\u8BE6\u60C5\uFF08\u4E2D\u6587\uFF09", ui: { component: "textarea" } },
              { type: "string", name: "text_en", label: "Detail (English)", ui: { component: "textarea" } }
            ]
          }
        ]
      },
      // ─── Page Content (页面文案) ───
      {
        name: "pageContent",
        label: "\u9875\u9762\u6587\u6848 Pages",
        path: "content/pages",
        format: "json",
        fields: [
          { type: "string", name: "pageId", label: "\u9875\u9762\u6807\u8BC6 Page ID", required: true },
          {
            type: "object",
            name: "sections",
            label: "\u5185\u5BB9\u533A\u5757 Sections",
            list: true,
            fields: [
              { type: "string", name: "sectionId", label: "\u533A\u5757\u6807\u8BC6 Section ID", required: true },
              { type: "string", name: "label_zh", label: "\u6807\u7B7E\uFF08\u4E2D\u6587\uFF09" },
              { type: "string", name: "label_en", label: "Label (English)" },
              { type: "string", name: "title_zh", label: "\u6807\u9898\uFF08\u4E2D\u6587\uFF09" },
              { type: "string", name: "title_en", label: "Title (English)" },
              { type: "string", name: "subtitle_zh", label: "\u526F\u6807\u9898\uFF08\u4E2D\u6587\uFF09", ui: { component: "textarea" } },
              { type: "string", name: "subtitle_en", label: "Subtitle (English)", ui: { component: "textarea" } },
              { type: "string", name: "body_zh", label: "\u6B63\u6587\uFF08\u4E2D\u6587\uFF09", ui: { component: "textarea" } },
              { type: "string", name: "body_en", label: "Body (English)", ui: { component: "textarea" } }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
