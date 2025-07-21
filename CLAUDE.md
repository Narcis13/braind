# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Romanian accounting/invoicing platform built with:
- **Frontend**: Nuxt 3 with Vue 3, Quasar UI, and Pinia for state management
- **Backend**: AdonisJS 5.9.0 with TypeScript
- **Database**: MySQL with Prisma ORM for the frontend API and Lucid ORM for AdonisJS backend
- **Styling**: Tailwind CSS

## Development Commands

### Frontend (Nuxt) - Run from root directory
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run generate   # Generate static site
npm run preview    # Preview production build
```

### Backend (AdonisJS) - Run from /backend directory
```bash
npm run dev        # Start development server with hot-reload
npm run build      # Build for production
npm run start      # Start production server
npm run test       # Run tests
```

### Database Management
```bash
# From root directory (Prisma for Nuxt API)
npx prisma migrate dev    # Run migrations in development
npx prisma generate       # Generate Prisma client
npx prisma studio        # Open Prisma Studio GUI

# From backend directory (Lucid for AdonisJS)
node ace migration:run    # Run Lucid migrations
node ace migration:rollback # Rollback migrations
```

## Architecture Overview

### Frontend Structure (Nuxt 3)
- `/pages/` - File-based routing for application pages
  - `/client/` - Client portal pages
  - `/contabil/` - Accountant portal pages
- `/components/` - Vue components organized by feature
- `/composables/` - Vue composables for shared logic
- `/stores/` - Pinia stores for state management
- `/server/api/` - Nuxt server API routes using Prisma ORM
- `/layouts/` - Page layouts (default and onboarding)

### Backend Structure (AdonisJS)
- `/app/Controllers/Http/` - HTTP controllers handling business logic
- `/app/Models/` - Lucid ORM models
- `/app/Middleware/` - Request middleware (Auth, SilentAuth)
- `/start/routes.ts` - API route definitions
- `/config/` - Configuration files for various services
- `/resources/views/` - Edge templates for server-rendered pages

### Database Architecture
The application uses two ORMs:
1. **Prisma** (for Nuxt server API) - Modern ORM with type safety
2. **Lucid** (for AdonisJS) - AdonisJS integrated ORM

Key entities:
- `User` - Authentication and user management
- `Firme` - Company/business entities
- `FacturiEmise` - Issued invoices
- `MesajePreluate` - ANAF (Romanian tax authority) messages
- Various nomenclatures (Clienti, Furnizori, Produse, etc.)

### API Structure
- **Nuxt API** (`/server/api/`) - REST API for frontend operations
- **AdonisJS API** (`/start/routes.ts`) - Backend API endpoints for authentication, invoice management, and ANAF integration

### Key Features
1. **Multi-tenant System** - Supports both clients and accountants
2. **Invoice Management** - Create, manage, and export invoices
3. **ANAF Integration** - Submit invoices and retrieve messages from Romanian tax authority
4. **XML Generation** - Generate e-invoices in Romanian standard format
5. **SAGA Export** - Export data for SAGA accounting software

## Environment Configuration
- Frontend uses `.env` with `NUXT_` prefixed variables
- Backend uses `.env` with standard AdonisJS variables
- Database connection configured via `DATABASE_URL` (Prisma) and `MYSQL_*` variables (AdonisJS)

## Testing
- Frontend: No test configuration found
- Backend: Uses Japa test runner (`npm run test` in backend directory)

## Important Notes
- The application is designed for Romanian businesses and complies with Romanian tax regulations
- ANAF integration requires proper authentication and certificate configuration
- Multi-language support focuses on Romanian language
- Date handling uses Luxon for timezone management