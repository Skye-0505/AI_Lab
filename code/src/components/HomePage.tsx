import { ArrowRight, Compass, FlaskConical, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { siteConfig, targetUsers, valueProps } from '@/site.config';

export function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(152_20%_36%_/_0.08),transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              研究 · 复盘 · 小工具
            </div>
            <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {siteConfig.name}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">{siteConfig.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/notes">
                <Button size="lg" className="gap-2">
                  阅读研究笔记
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="/reviews">
                <Button size="lg" variant="outline" className="gap-2">
                  浏览访谈复盘
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Card className="border-primary/15 bg-primary/[0.03]">
          <CardHeader className="pb-2">
            <div className="mb-2 flex items-center gap-2 text-sm text-primary">
              <Compass className="h-4 w-4" />
              核心问题
            </div>
            <CardTitle className="text-2xl sm:text-3xl">{siteConfig.coreQuestion}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              技术时代的社会结构正在变化，个体需要的不是标准答案，而是理解变化、看清自身、再形成可执行的小实验。
            </CardDescription>
          </CardContent>
        </Card>
      </section>

      <section className="border-y border-border/60 bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="mb-10 text-center font-serif text-2xl font-semibold">产品帮你完成三件事</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {valueProps.map((item, index) => (
              <Card key={item.title} className="border-border/70">
                <CardHeader>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                    {index + 1}
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="mb-10 text-center font-serif text-2xl font-semibold">从这里开始</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <a href="/notes" className="group block">
            <Card className="h-full transition-all hover:border-primary/30 hover:shadow-md">
              <CardHeader>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FlaskConical className="h-5 w-5" />
                </div>
                <CardTitle>研究笔记</CardTitle>
                <CardDescription>
                  分析 AI 如何重塑知识工作、技能价值与组织形态。每篇沉淀一个概念、判断或框架。
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span className="inline-flex items-center gap-1 text-sm text-primary transition-all group-hover:gap-2">
                  进入列表
                  <ArrowRight className="h-4 w-4" />
                </span>
              </CardContent>
            </Card>
          </a>
          <a href="/reviews" className="group block">
            <Card className="h-full transition-all hover:border-primary/30 hover:shadow-md">
              <CardHeader>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Compass className="h-5 w-5" />
                </div>
                <CardTitle>访谈 / 播客复盘</CardTitle>
                <CardDescription>
                  把高质量访谈转译成个人定位视角：外部变化、启发、概念与可行动问题。
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span className="inline-flex items-center gap-1 text-sm text-primary transition-all group-hover:gap-2">
                  进入列表
                  <ArrowRight className="h-4 w-4" />
                </span>
              </CardContent>
            </Card>
          </a>
        </div>
      </section>

      <section className="border-t border-border/60 bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="mb-6 font-serif text-xl font-semibold">为谁而写</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {targetUsers.map((user) => (
              <li key={user} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                {user}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
