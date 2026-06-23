# CTA 按钮复用指南

## 概述

本项目详情页的 CTA（Call-to-Action）按钮模块设计为可复用组件，支持两种使用场景：

1. **已上线项目**：直接外链到项目地址
2. **未上线项目**：使用内测申请表单收集用户信息

## 已上线项目（参考：Aetherwit Town）

```tsx
// src/app/projects/aetherwit-town/page.tsx

import Link from "next/link";

<Link 
  href="https://town.aetherwit.com"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center justify-center gap-2 bg-[var(--color-silicon)] text-[var(--background)] font-bold font-mono px-8 py-4 rounded-lg uppercase tracking-widest hover:opacity-90 transition-opacity"
>
  {t("experience.cta")}
</Link>
```

**特点**：
- 使用 Next.js Link 组件
- 新标签页打开（target="_blank"）
- 安全性增强（rel="noopener noreferrer"）

## 未上线项目（参考模板）

```tsx
// src/app/projects/[project-name]/page.tsx

"use client";

import { useState } from "react";
import { BetaModal } from "@/components/BetaModal";
import { useTranslations } from "next-intl";

export default function ProjectDetail() {
  const t = useTranslations("[projectKey]");
  const [betaModalOpen, setBetaModalOpen] = useState(false);

  return (
    <main>
      {/* 其他内容 */}
      
      <button 
        onClick={() => setBetaModalOpen(true)}
        className="inline-flex items-center justify-center gap-2 bg-[var(--color-silicon)] text-[var(--background)] font-bold font-mono px-8 py-4 rounded-lg uppercase tracking-widest hover:opacity-90 transition-opacity"
      >
        {t("experience.cta")}
      </button>

      <BetaModal isOpen={betaModalOpen} onClose={() => setBetaModalOpen(false)} />
    </main>
  );
}
```

**特点**：
- 使用 useState 管理模态框状态
- 点击按钮打开 BetaModal
- BetaModal 自动处理表单提交和状态

## 按钮样式类

```
bg-[var(--color-silicon)] text-[var(--background)] font-bold font-mono px-8 py-4 rounded-lg uppercase tracking-widest hover:opacity-90 transition-opacity
```

**样式说明**：
- `bg-[var(--color-silicon)]`: 背景色使用主题变量
- `text-[var(--background)]`: 文字颜色使用主题背景色
- `font-bold font-mono`: 粗体等宽字体
- `px-8 py-4`: 内边距
- `rounded-lg`: 圆角
- `uppercase tracking-widest`: 大写和字间距
- `hover:opacity-90 transition-opacity`: 悬停效果

## BetaModal 组件

位置：`src/components/BetaModal.tsx`

**功能**：
- 收集用户姓名、邮箱、留言
- 表单验证
- 提交到后端 API
- 成功/失败状态展示

**无需修改**：BetaModal 已封装完整功能，直接使用即可。

## 翻译配置

在 `src/i18n/locales/zh-CN.json` 和 `en-US.json` 中添加项目翻译：

```json
{
  "[projectKey]": {
    "backToProjects": "返回项目站",
    "title": "项目名称",
    "subtitle": "项目副标题",
    "concept": {
      "title": "核心概念",
      "content": "概念描述内容"
    },
    "userRole": {
      "title": "用户角色",
      "content": "角色描述内容"
    },
    "experience": {
      "title": "体验标题",
      "content": "体验描述内容",
      "cta": "按钮文字"
    }
  }
}
```

## 文件结构参考

```
src/
├── app/
│   └── projects/
│       ├── aetherwit-town/
│       │   └── page.tsx         # 已上线项目示例
│       └── [new-project]/
│           └── page.tsx         # 新项目（未上线）
├── components/
│   └── BetaModal.tsx            # 内测申请表单组件
└── i18n/
    └── locales/
        ├── zh-CN.json           # 中文翻译
        └── en-US.json           # 英文翻译
```
