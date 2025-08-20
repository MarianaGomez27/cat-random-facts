export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/40 border-b border-gray-200/60 animate-fade-in-down motion-reduce:animate-none">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto py-6 text-center">
          {/* icono */}
          <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm  hover:scale-125 transition-transform hover:rotate-8 ">
            <span className="text-2xl">🐱</span>
          </div>

          {/* título */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Random Cat Facts
          </h1>

          {/* subtítulo */}
          <p className="mt-1 text-sm text-gray-600">
            Curiosidades felinas acompañadas de perfiles aleatorios
          </p>

          {/* separador con leve animación de aparición */}
          <div className="mt-5 h-[2px] w-full bg-gradient-to-r from-transparent via-gray-300/80 to-transparent animate-fade-in-down [animation-delay:.15s] motion-reduce:animate-none" />
        </div>
      </div>
    </header>
  );
}