import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CatFactList from "./components/CatFactList";
import Header from "./components/Header";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Mantiene datos “frescos” por 5 min
      staleTime: 5 * 60 * 1000,
      // Evita refetch al volver a la pestaña/ventana
      refetchOnWindowFocus: false,
      // Reintenta hasta 2 veces si falla
      retry: 2,
      // Opcional: tiempo de recolección de basura (cache) más largo
      gcTime: 30 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <CatFactList />
      </QueryClientProvider>
    </>
  );
}

export default App;
