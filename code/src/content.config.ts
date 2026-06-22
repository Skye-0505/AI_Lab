import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    relatedReviews: z.array(z.string()).default([]),
  }),
});

const reviews = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reviews' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    source: z.string(),
    sourceUrl: z.string().url().optional(),
    guest: z.string().optional(),
    publishedAt: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    relatedNotes: z.array(z.string()).default([]),
  }),
});

export const collections = { notes, reviews };
