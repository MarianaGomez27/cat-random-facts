import { useEffect, useRef } from "react";
import { useCatFacts } from "../hooks/useCatFacts";
import ErrorDisplay from "./ErrorDisplay";
import { useCatFactsStore } from "../stores/catFactsStore";

const CatFactList = () => {
  const { data, loadMore, hasNextPage, isFetchingNextPage, refetchData } =
    useCatFacts();
  const { isLoading, error } = useCatFactsStore();
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          loadMore();
        }
      },
      { threshold: 0.2 }
    );
    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => {
      if (observerTarget.current) observer.unobserve(observerTarget.current);
    };
  }, [loadMore, hasNextPage, isFetchingNextPage]);

  // Loading inicial (spinner simple)
  if (isLoading && data.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="mx-auto max-w-2xl px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500" />
            <span className="ml-3 text-gray-600">Cargando datos…</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <div className="mx-auto max-w-2xl px-4 py-12">
          <ErrorDisplay message={error} onRetry={refetchData} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[repeating-linear-gradient(145deg,theme(colors.gray.300)_0px,theme(colors.gray.300)_0px,white_1px,white_6px)]">
      <div className="container mx-auto p-4 pt-6 ">
        <div className="bg-gray-200 rounded-lg mx-auto max-w-4xl p-5 border border-gray-300/50">
          <div className="space-y-3">
            {data.map((item) => (
              <article
                key={item.id}
                className="rounded-lg border border-gray-300/25 bg-white shadow-xs"
              >
                <div className="p-3">
                  <header className="flex items-center gap-2 mb-1">
                    <img
                      src={item.user.picture.thumbnail}
                      alt={`${item.user.name.first} ${item.user.name.last}`}
                      className="h-8 w-8 rounded-full ring-1 ring-gray-200"
                    />
                    <h2 className="text-sm font-semibold text-gray-800">
                      {item.user.name.first} {item.user.name.last}
                    </h2>
                  </header>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {item.catFact.fact}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div
            ref={observerTarget}
            className="h-8 my-3 flex items-center justify-center"
          >
            {isFetchingNextPage && (
              <div className="flex items-center py-1">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500" />
                <span className="ml-2 text-gray-600 text-xs">
                  Cargando más…
                </span>
              </div>
            )}
            {!hasNextPage && data.length > 0 && (
              <p className="text-center text-gray-500 text-xs mt-2">
                ¡Has visto todos los datos disponibles!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatFactList;
