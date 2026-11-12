import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const modules = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/modules' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    order: z.number().int().min(1).max(16),
    difficulty: z.enum(['dasar', 'menengah', 'lanjut']),
    estimatedDuration: z.number().int().positive(),
    prerequisites: z.array(z.string()).default([]),
    objectives: z.array(z.string().min(1)).min(1),
    summary: z.string().optional(),
    quizId: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { modules };
