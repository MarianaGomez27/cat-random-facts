import { create } from 'zustand';
import type { CombinedData, PaginationParams } from '../types/Index';


interface CatFactsState {
  data: CombinedData[];
  pagination: PaginationParams;
  isLoading: boolean;
  error: string | null;
  setData: (data: CombinedData[]) => void;
  addData: (newData: CombinedData[]) => void;
  setPagination: (pagination: Partial<PaginationParams>) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useCatFactsStore = create<CatFactsState>((set) => ({
  data: [],
  pagination: {
    page: 1,
    maxPages: 5, // Límite para la demostración
  },
  isLoading: false,
  error: null,
  setData: (data) => set({ data }),
  addData: (newData) => set((state) => ({ data: [...state.data, ...newData] })),
  setPagination: (pagination) => 
    set((state) => ({ pagination: { ...state.pagination, ...pagination } })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));