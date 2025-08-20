import axios from "axios";
import { CatFactSchema, RandomUserResponseSchema } from "../utils/CatsFactSchema";
import type { CatFact, RandomUser } from "../types/Index";



export async function getCatFacts(page = 1, limit = 10): Promise<CatFact[]> {
  const url = `https://catfact.ninja/facts?page=${page}&limit=${limit}`;
  const { data } = await axios.get(url);
  
  // Validar cada hecho de gato individualmente
  if (data.data && Array.isArray(data.data)) {
    const validatedFacts: CatFact[] = [];
    
    for (const item of data.data) {
      const result = CatFactSchema.safeParse(item);
      if (result.success) {
        validatedFacts.push(result.data);
      } else {
        console.warn('Invalid cat fact data:', result.error);
      }
    }
    
    return validatedFacts;
  }
  
  throw new Error('Invalid response structure from cat facts API');
}


export async function getRandomUsers(count: number): Promise<RandomUser[]> {
  const url = `https://randomuser.me/api/?results=${count}`;
  const { data } = await axios.get(url);

  const result = RandomUserResponseSchema.safeParse(data);
  if (result.success) {
    return result.data.results;
  }
  
  console.error('RandomUser schema validation failed:', result.error);
  throw new Error("RandomUser schema validation failed");
}

// Función para obtener un único usuario aleatorio
export async function getRandomUser(): Promise<RandomUser> {
  const users = await getRandomUsers(1);
  return users[0];
}
