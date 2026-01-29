# Implementation Plan: Menu Management System

**Branch**: `001-menu-management` | **Date**: 2026-01-29 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-menu-management/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build MVP restaurant menu admin panel enabling administrative staff to create dishes, view menu in table format, and toggle dish availability status. Implementation uses React 19+ with TypeScript, Tailwind CSS 4+ for styling, and shadcn/ui components for consistent UI. Data management is local (mock data) with zod validation for forms. User stories prioritized as P1 (Create Dishes), P2 (View Menu), P3 (Control Availability) for incremental delivery.

## Technical Context

**Language/Version**: TypeScript 5+ in strict mode
**Primary Dependencies**: React 19+, Tailwind CSS 4+, shadcn/ui components, zod (form validation)
**Storage**: Local state management with React hooks (useState, useContext) - mock data, no external API
**Testing**: Manual testing per user stories (no automated tests required for MVP)
**Target Platform**: Web browser-based admin panel (responsive across desktop/tablet/mobile)
**Project Type**: Single web project
**Performance Goals**: Menu updates within 1 second, 100 dishes displayed within 2 seconds, form submission under 500ms
**Constraints**: No backend API available, must use local state/mock data, single admin user (no auth)
**Scale/Scope**: MVP with 3 user stories, ~50 components total, supporting ~100 dishes max for initial release

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Required Compliance Gates**:

- [x] **Component-First**: Design uses shadcn/ui components (Table, Form, Input, Button, Card, Badge) or reusable React components
- [x] **Type Safety**: All data models and APIs have TypeScript interfaces defined, no `any` types planned
- [x] **UX-Driven**: Design includes loading states, error handling, success confirmations for all user actions
- [x] **Responsive Design**: Component layouts account for desktop (≥1024px), tablet (≥768px), and mobile (≥320px) breakpoints
- [x] **MVP-First**: User stories are prioritized (P1, P2, P3) and independently testable, no cross-story dependencies blocking MVP

**Violations Requiring Justification** (if any):

| Violated Principle | Why Needed | Simpler Alternative Rejected |
|--------------------|-------------|-----------------------------|
| [None]           | N/A         | N/A                         |

## Project Structure

### Documentation (this feature)

```text
specs/001-menu-management/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── components/           # UI components (shadcn/ui + custom)
│   ├── ui/            # shadcn/ui components directory
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── table.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── form.tsx
│   ├── layout/         # Layout and navigation components
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   ├── MainLayout.tsx
│   │   └── EmptyState.tsx
│   └── features/       # Feature-specific components
│       ├── dish-form/    # P1: Create dishes
│       │   ├── DishForm.tsx
│       │   ├── DishFormFields.tsx
│       │   └── DishFormValidation.tsx
│       ├── dish-table/    # P2: View menu
│       │   ├── DishTable.tsx
│       │   ├── DishTableHeader.tsx
│       │   ├── DishTableRow.tsx
│       │   ├── DishActions.tsx
│       │   └── DishStatusBadge.tsx
│       └── availability/    # P3: Control availability
│           ├── AvailabilityToggle.tsx
│           └── StatusIndicator.tsx
├── lib/                 # Utilities and shared logic
│   ├── validations.ts   # Zod schemas and validation functions
│   ├── types.ts         # TypeScript interfaces and types
│   ├── mock-data.ts     # Mock data for dishes and categories
│   └── constants.ts     # Category lists, status options, etc.
├── hooks/              # Custom React hooks
│   ├── useDishes.ts     # Dish state management
│   ├── useCategories.ts  # Category state management
│   └── useToast.ts      # Toast/notification hook
├── context/            # React context providers
│   └── MenuContext.tsx # Global menu state (optional)
├── App.tsx             # Root component
└── main.tsx             # Entry point
```

**Structure Decision**: Single web project structure selected. Components organized by type (ui, layout, features) following React best practices. shadcn/ui components in `src/components/ui/` directory. Custom components separated by feature for maintainability. Shared logic (types, validations, mocks) in `src/lib/` for reusability.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No constitution violations identified. All principles are satisfied with planned approach.

---

## Phase 1 Complete: Post-Design Constitution Re-Check

*GATE: Must pass after Phase 1 design before proceeding to implementation*

**Re-evaluated Compliance Gates**:

- [x] **Component-First**: Design uses shadcn/ui components (Table, Form, Input, Button, Card, Badge) or reusable React components
- [x] **Type Safety**: All data models and APIs have TypeScript interfaces defined, no `any` types planned
- [x] **UX-Driven**: Design includes loading states, error handling, success confirmations for all user actions
- [x] **Responsive Design**: Component layouts account for desktop (≥1024px), tablet (≥768px), and mobile (≥320px) breakpoints
- [x] **MVP-First**: User stories are prioritized (P1, P2, P3) and independently testable, no cross-story dependencies blocking MVP

**Constitution Status**: ✅ ALL GATES PASSED - Ready for implementation

**Violations Requiring Justification** (if any):

| Violated Principle | Why Needed | Simpler Alternative Rejected |
|--------------------|-------------|-----------------------------|
| [None]           | N/A         | N/A                         |

---

## Phase 0: Research & Technology Decisions

### Research Tasks

**Task 1**: Research shadcn/ui component installation and setup for React 19+ with Tailwind CSS 4+

**Task 2**: Research React 19+ functional component patterns with TypeScript strict mode

**Task 3**: Research zod integration patterns for form validation with React controlled components

**Task 4**: Research responsive design best practices with Tailwind CSS utility classes (mobile-first approach)

**Task 5**: Research React state management patterns for local mock data (hooks vs context vs state library)

### Consolidated Findings

See `research.md` for detailed decisions and rationale.

---

## Phase 1: Design & Contracts

**Prerequisites:** `research.md` complete

### Design Outputs

- **data-model.md**: TypeScript interfaces for Dish, Category, validation rules, state transitions
- **contracts/**: Component contracts and validation schemas (zod schemas for each form)
- **quickstart.md**: Development environment setup and step-by-step guide to start implementation

### Agent Context Update

Run `.specify/scripts/bash/update-agent-context.sh opencode` to add zod and shadcn/ui to agent context.

---

## Implementation Order (Base to UI)

### Logical Construction Sequence

1. **Foundation (Base Layer)**
   - Install and configure shadcn/ui components (Button, Input, Table, Card, Badge, Form)
   - Create TypeScript types in `src/lib/types.ts` (Dish, Category, Status)
   - Setup zod validation schemas in `src/lib/validations.ts`
   - Create mock data in `src/lib/mock-data.ts`
   - Create constants in `src/lib/constants.ts` (categories, status options)
   - Implement `useToast` hook in `src/hooks/useToast.ts`

2. **State Management (Data Layer)**
   - Implement `useDishes` hook in `src/hooks/useDishes.ts` (CRUD operations)
   - Implement `useCategories` hook in `src/hooks/useCategories.ts` (category management)
   - (Optional) Create `MenuContext.tsx` in `src/context/` if global state needed

3. **Layout Components (Navigation Layer)**
   - Create `MainLayout.tsx` in `src/components/layout/`
   - Create `Header.tsx` in `src/components/layout/`
   - Create `Navigation.tsx` in `src/components/layout/`
   - Create `EmptyState.tsx` in `src/components/layout/` (for no dishes state)

4. **Feature: Create Dishes (P1)**
   - Create `DishForm.tsx` in `src/components/features/dish-form/`
   - Create `DishFormFields.tsx` in `src/components/features/dish-form/`
   - Create `DishFormValidation.tsx` in `src/components/features/dish-form/`
   - Implement form submission with zod validation
   - Add loading states and success/error messaging

5. **Feature: View Menu (P2)**
   - Create `DishTable.tsx` in `src/components/features/dish-table/`
   - Create `DishTableHeader.tsx` in `src/components/features/dish-table/`
   - Create `DishTableRow.tsx` in `src/components/features/dish-table/`
   - Create `DishActions.tsx` in `src/components/features/dish-table/` (Edit/Delete buttons)
   - Create `DishStatusBadge.tsx` in `src/components/features/dish-table/` (status indicator)
   - Implement responsive table with horizontal scroll on mobile

6. **Feature: Control Availability (P3)**
   - Create `AvailabilityToggle.tsx` in `src/components/features/availability/`
   - Create `StatusIndicator.tsx` in `src/components/features/availability/`
   - Integrate toggle with dish table rows
   - Implement immediate state updates with visual feedback

7. **Integration & Polish (UI Layer)**
   - Update `App.tsx` to orchestrate components
   - Update `main.tsx` with any necessary providers
   - Add responsive Tailwind classes throughout components
   - Ensure all loading/error/success states are present
   - Test keyboard navigation and ARIA labels

8. **Final Integration**
   - Run `npm run lint` to fix any issues
   - Run `npm run build` to verify TypeScript compilation
   - Manual testing per user story acceptance scenarios
