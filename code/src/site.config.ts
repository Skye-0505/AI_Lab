export const siteConfig = {
  name: 'AI 时代个人定位实验室',
  tagline: '用研究笔记、内容复盘和小工具，帮助知识工作者在技术变化中重新找到自己的位置。',
  description:
    '结合研究内容与小工具，帮助知识工作者理解 AI 时代的外部变化、看清自身位置，并形成可执行的低风险探索路径。',
  coreQuestion: '个体如何在 AI 时代重新找到自己的位置？',
  url: 'http://localhost:4321', // 部署后改为正式域名，见 docs/deploy.md
  footerNote: '个人研究项目 · 持续更新',
};

export const navItems = [
  { label: '研究笔记', href: '/notes' },
  { label: '访谈复盘', href: '/reviews' },
] as const;

export const valueProps = [
  {
    title: '看清外部变化',
    description: '理解 AI、劳动市场、组织形态与技能价值如何重塑知识工作。',
  },
  {
    title: '看清自身位置',
    description: '梳理经济、能力、认知、关系与作品储备，以及兴趣与组织偏好。',
  },
  {
    title: '形成下一步实验',
    description: '不是直接给人生答案，而是生成低风险、可执行、可复盘的探索路径。',
  },
] as const;

export const targetUsers = [
  '程序员和技术从业者',
  '知识工作者',
  '正在经历职业不确定感的人',
  '对 AI 时代社会变化感兴趣的人',
  '想探索副业、独立开发或新职业路径的人',
] as const;
