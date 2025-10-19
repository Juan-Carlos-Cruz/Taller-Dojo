# Actor Management (Frontend)

Proyecto React (Vite + Tailwind) para gestionar actores (CRUD + paginación + búsqueda).

## Requisitos
- Node.js 18 o superior
- Backend corriendo en `VITE_API_BASE_URL` (por defecto `http://localhost:5000/api`) con CORS habilitado para `http://localhost:5173`

## Configuración y ejecución

```bash
# 1) Instalar dependencias
npm install

# 2) Copiar y editar variables de entorno
cp .env.example .env
# Edita .env si tu API no está en http://localhost:5000/api

# 3) Ejecutar en modo desarrollo
npm run dev
```

## Build de producción
```bash
npm run build
npm run preview
```

## Notas
- Si ves errores de CORS, habilita CORS en tu backend permitiendo el origen `http://localhost:5173`.
- El selector "Results" controla cuántos elementos por página se piden al backend.
