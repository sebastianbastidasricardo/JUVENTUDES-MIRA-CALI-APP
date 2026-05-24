# Juventudes MIRA Cali - Plataforma de Caracterización

Aplicación web moderna y responsiva para la recolección, administración y análisis de datos de jóvenes en Cali (14-28 años).

## Stack Tecnológico
- **Frontend**: React + Vite, TypeScript, TailwindCSS
- **Componentes**: Shadcn/UI, Lucide React
- **Animaciones**: Framer Motion (motion/react)
- **Formularios**: React Hook Form + Zod
- **Base de Datos**: Supabase (Auth, PostgreSQL, Realtime)
- **Gráficas**: Recharts
- **Exportaciones**: SheetJS (XLSX), jsPDF

## Configuración
1. Copia `.env.example` a `.env`.
2. Crea un proyecto en [Supabase](https://supabase.com).
3. Ejecuta el script de SQL ubicado en `/supabase/schema.sql` en el SQL Editor de tu Dashboard de Supabase.
4. Configura las variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.

## Ejecución Local
```bash
npm install
npm run dev
```

## Arquitectura
- `/src/modules`: Lógica de dominio (Landing, Survey, Admin).
- `/src/lib`: Clientes de servicios externos.
- `/src/hooks`: Hooks de React personalizados.
- `/src/components`: UI components reutilizables.
- `/src/utils`: Validadores y helpers.

## Validaciones Críticas
- **Edad**: Rango estricto 14-28 años (calculada automáticamente).
- **Documento**: Longitud y formato numérico.
- **Teléfono**: Formato 3xx xxx xxxx.
- **Correo**: Estructura de email válida.
