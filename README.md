# Cat Facts App

Una aplicación React que muestra datos curiosos sobre gatos combinados con información de usuarios aleatorios.

# Características

- ⚛️ React con TypeScript
- 🎨 Tailwind CSS para estilos
- 🔄 React Query para manejo de estado y caching
- 📋 Zod para validación de esquemas
- 🐻 Zustand para manejo de estado global
- 📜 Scroll infinito con paginación
- 🎯 Diseño responsive

# APIs utilizadas

- Cat Fact API
Endpoint: https://catfact.ninja/facts
Propósito: Obtener datos curiosos sobre gatos

- Random User API
Endpoint: https://randomuser.me/api/
Propósito: Obtener información de usuarios aleatorios

### Prerrequisitos
- Node.js v22.13.1
- npm 11.5.2

# Instalación

- npm install
- npm run dev

# Ejecución

 - http://localhost:5173

# Estructura del proyecto

src/
├── components/         # Componentes React
│   ├── CatFactList.tsx # Componente principal de lista
│   ├── ErrorDisplay.tsx# Componente de visualización de errores
│   └── Header.tsx      # Componente Header reutilizable

├── hooks/              # Custom Hooks
│   └── useCatFacts.ts  # Hook para gestión de datos de gatos
├── services/           # Servicios y APIs
│   └── CatFacts.ts     # Servicio para llamadas API
├── stores/             # Estado global con Zustand
│   └── catFactsStore.ts# Store para datos de la aplicación
├── utils/              # Utilidades
│   └── CatsFactsSchema.ts # Esquemas de validación Zod
└── types/              # Definiciones de TypeScript
    └── index.ts        # Tipos globales
