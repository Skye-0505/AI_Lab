import { ArrowRight, BookOpen, Mic2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';

type ArticleCardProps = {
  href: string;
  title: string;
  description: string;
  date: Date;
  tags: string[];
  meta?: string;
  type: 'note' | 'review';
};

export function ArticleCard({ href, title, description, date, tags, meta, type }: ArticleCardProps) {
  const Icon = type === 'note' ? BookOpen : Mic2;

  return (
    <a href={href} className="group block h-full">
      <Card className="h-full transition-all duration-200 hover:border-primary/30 hover:shadow-md">
        <CardHeader>
          <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Icon className="h-3.5 w-3.5 text-primary" />
            <span>{type === 'note' ? '研究笔记' : '访谈复盘'}</span>
            {meta && (
              <>
                <span>·</span>
                <span>{meta}</span>
              </>
            )}
          </div>
          <CardTitle className="group-hover:text-primary transition-colors">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="justify-between text-sm text-muted-foreground">
          <span>{formatDate(date)}</span>
          <span className="inline-flex items-center gap-1 text-primary opacity-0 transition-opacity group-hover:opacity-100">
            阅读
            <ArrowRight className="h-4 w-4" />
          </span>
        </CardFooter>
      </Card>
    </a>
  );
}
