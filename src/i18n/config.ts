export const locales = ['zh-CN', 'en-US'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'zh-CN';

export const localeLabels: Record<Locale, { label: string; flag: string }> = {
  'zh-CN': { label: '简体中文', flag: '🇨🇳' },
  'en-US': { label: 'English', flag: '🇺🇸' },
};