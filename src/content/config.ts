import { defineCollection, z } from 'astro:content';

const practiceAreas = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    icon: z.enum(['home', 'briefcase', 'users', 'scale']),
    summary: z.string(),
    order: z.number(),
    category: z.enum(['Property', 'Corporate', 'Family', 'Disputes']).optional(),
  }),
});

const people = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    photo: z.string(),
    focusAreas: z.array(z.string()),
    education: z.array(z.string()),
    barYear: z.number(),
    languages: z.array(z.string()),
    order: z.number(),
    practiceAreaSlugs: z.array(z.string()).optional(),
  }),
});

const insights = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum(['Property', 'Corporate', 'Family', 'Disputes', 'General']),
    excerpt: z.string(),
    publishDate: z.coerce.date(),
    author: z.string(),
    ogImage: z.string().optional(),
  }),
});

export const collections = {
  'practice-areas': practiceAreas,
  people,
  insights,
};
