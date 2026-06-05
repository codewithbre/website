import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    substackUrl: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
