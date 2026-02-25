# Nodejs Projects (TEST001) Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-02-25

## Active Technologies
- **Framework**: Next.js 14+ (App Router), Express (Shared Server)
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Auth**: Centralized JWT (`auth_token`)
- **Testing**: Jest, Playwright
- **Styling**: Vanilla CSS

## Project Structure
```text
src/
├── app/                 # Next.js App Router
├── components/          # Shared UI components
├── lib/                 # Core logic (auth, filtering)
├── prisma/              # Schema and migrations
└── tests/               # Unit and Integration tests
```

## Commands
- `npm run dev`: Start development server (Port 3004)
- `npx prisma migrate dev`: Run database migrations
- `npm test`: Run unit tests (Jest)
- `npm run test:e2e`: Run E2E tests (Playwright)

## Code Style
- **ESM Mode**: Use `import/export` for all server code.
- **Pure Text**: No HTML/Images in post content.
- **Soft Delete**: Use `isDeleted` flag for comments.

## Recent Changes
- **001-pure-text-board**: Initial implementation of Pure Text Board Service with secure private posts and like toggle.

<!-- MANUAL ADDITIONS START -->
- **Constitution Alignment**: Port 3004 is assigned to this project to avoid conflicts with other test projects.
- **Authentication**: Must respect `common/server.js` JWT cookie validation.
<!-- MANUAL ADDITIONS END -->
