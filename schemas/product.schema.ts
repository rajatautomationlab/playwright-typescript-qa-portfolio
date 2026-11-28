import { z } from 'zod';

export const productSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  description: z.string(),
  category: z.string().min(1),
  price: z.number().positive(),
  rating: z.number(),
  stock: z.number(),
  thumbnail: z.string(),
  brand: z.string().optional(),
  sku: z.string().optional(),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string()).optional()
});

export const productListSchema = z.object({
  products: z.array(productSchema).min(1),
  total: z.number().positive(),
  skip: z.number(),
  limit: z.number()
});

export const errorSchema = z.object({
  message: z.string().min(1)
});

export type Product = z.infer<typeof productSchema>;