import {z} from 'zod'
import { CatFactSchema, RandomUserSchema, CombinedDataSchema, PaginationParamsSchema } from '../utils/CatsFactSchema'

export type CatFact = z.infer<typeof CatFactSchema>;
export type RandomUser = z.infer<typeof RandomUserSchema>;
export type CombinedData = z.infer<typeof CombinedDataSchema>;
export type PaginationParams = z.infer<typeof PaginationParamsSchema>;
