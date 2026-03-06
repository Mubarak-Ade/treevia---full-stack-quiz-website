# Client Refactor Changes

## Goal
Refactor the client with a clear module structure and stronger separation between:
- `services` (API/data access)
- `controllers` (hooks/orchestration)
- `store` (state)
- `types` (contracts)

## New Module Structure
Created `src/modules` and moved feature logic into module-first folders:

- `src/modules/auth/`
  - `services/auth.service.ts`
  - `controllers/auth.controller.ts`
  - `store/auth.store.ts`
  - `types/auth.types.ts`
- `src/modules/quiz/`
  - `services/quiz.service.ts`
  - `controllers/quiz.controller.ts`
  - `store/quiz.store.ts`
  - `types/quiz.types.ts`
- `src/modules/result/`
  - `services/result.service.ts`
  - `controllers/result.controller.ts`
- `src/modules/user/`
  - `services/user.service.ts`
  - `controllers/user.controller.ts`
- `src/modules/admin/quiz/`
  - `services/admin-quiz.service.ts`
  - `controllers/admin-quiz.controller.ts`
- `src/modules/admin/category/`
  - `services/admin-category.service.ts`
  - `controllers/admin-category.controller.ts`

## Folder Structure Changes
- Removed legacy feature tree: `src/features/**`.
- Consolidated all feature imports to `@/modules/**` paths.

## Import Refactor
Updated imports across pages/components/routes/utils to point to module paths, including:
- auth store/types/hooks usage
- quiz hooks/store/types usage
- result hooks usage
- admin quiz/category hooks and api usage
- axios auth token store import

## Type Safety Fixes During Refactor
Adjusted `QuizList` typing to pass strict TypeScript checks:
- migrated old type import to module types
- typed map callbacks explicitly
- handled `tags` as `string | Tag` safely (`typeof tag === "string" ? tag : tag.name`)

## Validation
Ran and passed:
- `npm run type-check`
- `npm run build`

Build notes observed (non-blocking):
- one runtime font asset resolution warning for `OpenSans-VariableFont_wdth,wght.ttf`
- bundle size warnings for large chunks
