// src/utils/CatsFactsSchema.ts
import { z } from 'zod';

// Esquema para los datos de la API de hechos de gatos
export const CatFactSchema = z.object({
  fact: z.string(),
  length: z.number(),
});

// Esquema para los datos de la API de usuarios aleatorios
export const RandomUserNameSchema = z.object({
  first: z.string(),
  last: z.string(),
});

export const RandomUserPictureSchema = z.object({
  thumbnail: z.string(),
});

export const RandomUserSchema = z.object({
  name: RandomUserNameSchema,
  email: z.string(),
  picture: RandomUserPictureSchema,
});

export const RandomUserResponseSchema = z.object({
  results: z.array(RandomUserSchema),
});

// Esquema para los datos combinados
export const CombinedDataSchema = z.object({
  id: z.string(),
  catFact: CatFactSchema,
  user: RandomUserSchema,
});

// Esquema para los parámetros de paginación
export const PaginationParamsSchema = z.object({
  page: z.number(),
  maxPages: z.number(),
});