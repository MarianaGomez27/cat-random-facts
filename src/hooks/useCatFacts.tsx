import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useCatFactsStore } from '../stores/catFactsStore';
import { getCatFacts, getRandomUser } from '../services/CatFacts';
import type { CombinedData } from '../types/Index';

// Hook principal
export const useCatFacts = () => {
  const { data, addData, setLoading, setError, pagination, setPagination } = useCatFactsStore();

  const {
    data: queryData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['catFacts'],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const catFacts = await getCatFacts(pageParam, 10);
        const combinedData: CombinedData[] = [];
        
        for (const catFact of catFacts) {
          try {
            const user = await getRandomUser();
            combinedData.push({
              id: `${pageParam}-${catFact.length}-${user.email}-${Date.now()}`,
              catFact,
              user,
            });
          } catch (userError) {
            console.error('Failed to fetch user for cat fact:', userError);
          }
        }
        
        return {
          data: combinedData,
          page: pageParam,
        };
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        throw new Error(`Failed to fetch data: ${errorMessage}`);
      }
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page >= pagination.maxPages) return undefined;
      return lastPage.page + 1;
    },
    initialPageParam: 1,
  });

  // Efecto para actualizar el store cuando cambian los datos de la query
  useEffect(() => {
    if (queryData) {
      const allData = queryData.pages.flatMap(page => page.data);
      addData(allData);
    }
  }, [queryData, addData]);

  // Efecto para manejar estados de carga y error
  useEffect(() => {
    setLoading(isLoading || isFetchingNextPage);
  }, [isLoading, isFetchingNextPage, setLoading]);

  useEffect(() => {
    if (error) {
      setError(error.message);
    } else {
      setError(null);
    }
  }, [error, setError]);

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
      setPagination({ page: pagination.page + 1 });
    }
  };

  // Función para reintentar la obtención de datos
  const refetchData = () => {
    refetch();
  };

  return {
    data,
    loadMore,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetchData,
  };
};