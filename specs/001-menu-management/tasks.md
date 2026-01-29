# Tasks: Menu Management System

**Input**: Design documents from `/specs/001-menu-management/`
**Prerequisites**: plan.md (required), spec.md (required), data-model.md, contracts/, research.md, quickstart.md

**Tests**: Manual testing per user stories (no automated tests requested in feature spec)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `src/lib/`, `src/hooks/`, `src/components/` at repository root
- **Components**: `src/components/ui/` (shadcn/ui), `src/components/layout/`, `src/components/features/`
- **Paths shown below follow React/TypeScript conventions with .tsx/.ts extensions**

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create project directories per implementation plan in src/components/ui/, src/components/layout/, src/components/features/, src/lib/, src/hooks/, src/context/
- [X] T002 Install zod validation library with npm install zod
- [X] T003 Initialize shadcn/ui components with npx shadcn@latest init
- [X] T004 [P] Install shadcn/ui components (Button, Input, Table, Card, Badge, Form) with npx shadcn@latest add button input table card badge form

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T005 Create TypeScript types for Dish and Category interfaces in src/lib/types.ts
- [X] T006 Create mock data for categories and initial dishes in src/lib/mock-data.ts
- [X] T007 Create constants for categories, statuses, and status colors in src/lib/constants.ts
- [X] T008 [P] Create useDishes hook with useState and useCallback for CRUD operations in src/hooks/useDishes.ts
- [X] T009 [P] Create useCategories hook for category management in src/hooks/useCategories.ts
- [X] T010 [P] Create useToast hook for notification display in src/hooks/useToast.ts
- [X] T011 [P] Create MainLayout component with shadcn/ui Card in src/components/layout/MainLayout.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Create New Dishes (Priority: P1) 🎯 MVP

**Goal**: Enable administrative staff to create new menu items with form validation and success confirmation

**Independent Test**: An administrator can access "New Dish" form, fill in required fields (name, description, price, category), submit successfully, see "Platillo registrado correctamente" message, and new dish appears in menu list.

### Implementation for User Story 1

- [X] T012 [P] [US1] Create DishForm component in src/components/features/dish-form/DishForm.tsx using shadcn/ui Form, Input, Card components
- [X] T013 [P] [US1] Create zod validation schema for dish creation in src/lib/validations.ts with rules: name (1-100 chars, unique), description (max 500), price (positive, max 999999.99, 2 decimals), category (enum)
- [X] T014 [US1] Implement form submission with zod validation in src/components/features/dish-form/DishForm.tsx (controls validation errors, loading state, success message display)
- [X] T015 [US1] Integrate DishForm with useDishes hook to add new dishes to state in src/components/features/dish-form/DishForm.tsx
- [X] T016 [US1] Add responsive Tailwind classes to DishForm component in src/components/features/dish-form/DishForm.tsx (mobile: stacked, desktop: grid layout)
- [X] T017 [US1] Add loading state spinner during form submission in src/components/features/dish-form/DishForm.tsx
- [X] T018 [US1] Add success toast notification "Platillo registrado correctamente" on successful save in src/components/features/dish-form/DishForm.tsx
- [X] T019 [US1] Add form reset after successful submission in src/components/features/dish-form/DishForm.tsx

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - View Menu Dashboard (Priority: P2)

**Goal**: Display all registered dishes in responsive table format with name, price, status, and Edit/Delete actions

**Independent Test**: An administrator can access "Menu" section and see complete table of all registered dishes with their name, price, and status. Each row has working "Edit" and "Delete" buttons. This enables menu review and management.

### Implementation for User Story 2

- [X] T020 [P] [US2] Create DishTable component in src/components/features/dish-table/DishTable.tsx using shadcn/ui Table component
- [X] T021 [P] [US2] Create DishStatusBadge component in src/components/features/dish-table/DishStatusBadge.tsx showing color-coded status (green for Available, red for SoldOut)
- [X] T022 [P] [US2] Create DishActions component in src/components/features/dish-table/DishActions.tsx with Edit and Delete buttons using shadcn/ui Button
- [X] T023 [P] [US2] Create EmptyState component in src/components/layout/EmptyState.tsx for when no dishes exist
- [X] T024 [US2] Implement responsive table layout with horizontal scroll on mobile in src/components/features/dish-table/DishTable.tsx (overflow-x-auto on sm breakpoint)
- [X] T025 [US2] Integrate DishTable with useDishes hook to display dishes in src/components/features/dish-table/DishTable.tsx
- [X] T026 [US2] Display empty state when dishes array is empty in src/components/features/dish-table/DishTable.tsx
- [X] T027 [US2] Add dish rows displaying name, price, and status badge in src/components/features/dish-table/DishTable.tsx
- [X] T028 [US2] Add Edit button click handler to open dish form with existing values in src/components/features/dish-table/DishActions.tsx
- [X] T029 [US2] Add Delete button click handler with confirmation in src/components/features/dish-table/DishActions.tsx

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Control Dish Availability (Priority: P3)

**Goal**: Enable administrators to quickly toggle dish availability status (Available ↔ Sold Out) with immediate visual feedback

**Independent Test**: An administrator can toggle availability status of a dish and see the status update immediately in table with a visual indicator (red color for "Sold Out"). This enables real-time inventory status updates.

### Implementation for User Story 3

- [X] T030 [P] [US3] Create AvailabilityToggle component in src/components/features/availability/AvailabilityToggle.tsx using shadcn/ui Button or Switch component
- [X] T031 [US3] Create StatusIndicator component in src/components/features/availability/StatusIndicator.tsx with visual color coding (green ↔ red)
- [X] T032 [P] [US3] Implement toggle functionality with useDishes hook to update status immediately in src/components/features/availability/AvailabilityToggle.tsx
- [X] T033 [US3] Add visual feedback during toggle operation (loading spinner or disabled state) in src/components/features/availability/AvailabilityToggle.tsx
- [X] T034 [US3] Add ARIA labels for accessibility (indicating current and next status) in src/components/features/availability/AvailabilityToggle.tsx
- [X] T035 [US3] Integrate AvailabilityToggle into DishTable rows in src/components/features/dish-table/DishTable.tsx

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T036 [P] Create Navigation component in src/components/layout/Navigation.tsx with Dashboard and Menu links using shadcn/ui components
- [X] T037 [P] Create Header component in src/components/layout/Header.tsx displaying application title/logo using shadcn/ui Card
- [X] T038 [P] Update App.tsx to orchestrate all components (DishForm, DishTable, Navigation, Header) and provide routing in src/App.tsx
- [X] T039 [P] Ensure all components have proper TypeScript interfaces (props, events) matching contracts/component-contracts.md
- [X] T040 [P] Add keyboard navigation support to all interactive components (Tab key, Enter key) in components
- [X] T041 [P] Add ARIA labels to all form inputs, buttons, and status indicators for accessibility in components
- [X] T042 [P] Verify Tailwind responsive classes work across mobile (≥320px), tablet (≥768px), desktop (≥1024px) breakpoints in all components
- [X] T043 [P] Ensure all loading states are implemented (form submission, status toggles, data fetch) with visual spinners
- [X] T044 [P] Ensure all error handling is in place with user-friendly messages in Spanish
- [X] T045 [P] Ensure all success confirmations are displayed with clear messages in Spanish

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational phase completion - No dependencies on other stories
- **User Story 2 (Phase 4)**: Depends on Foundational phase completion - May integrate with US1 but should be independently testable
- **User Story 3 (Phase 5)**: Depends on Foundational phase completion - May integrate with US2 but should be independently testable
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Form validation before form implementation
- Models/hooks before components
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T001-T004)
- All Foundational tasks marked [P] can run in parallel (T005-T011)
- All user story component creation tasks marked [P] can run in parallel within each story
- All Polish tasks marked [P] can run in parallel (T036-T045)
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all form creation tasks for User Story 1 together:
Task: "Create DishForm component in src/components/features/dish-form/DishForm.tsx"
Task: "Create zod validation schema for dish creation in src/lib/validations.ts"
Task: "Add responsive Tailwind classes to DishForm component in src/components/features/dish-form/DishForm.tsx"
Task: "Add loading state spinner during form submission in src/components/features/dish-form/DishForm.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Create Dishes)
   - Developer B: User Story 2 (View Menu)
   - Developer C: User Story 3 (Control Availability)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Manual testing per user story acceptance scenarios (no automated tests required)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
