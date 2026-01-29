<!--
Sync Impact Report:
Version change: [INITIAL] → 1.0.0
Modified principles: N/A (initial version)
Added sections:
  - Core Principles (5 principles)
  - Technical Standards
  - Quality Gates
  - Governance
Removed sections: N/A (initial version)
Templates requiring updates:
  ✅ .specify/templates/plan-template.md - Constitution Check section aligned
  ✅ .specify/templates/spec-template.md - Requirements section aligned
  ✅ .specify/templates/tasks-template.md - Task categorization aligned
  ✅ .specify/templates/checklist-template.md - Reviewed for compliance
Follow-up TODOs: None
-->

# Restaurant Menu Admin Panel Constitution

## Core Principles

### I. Component-First Architecture

Every UI feature MUST be built using shadcn/ui components or composable React components. Components MUST be reusable, independently testable, and follow a consistent design system. No duplicate UI implementations - abstract common patterns into reusable components before adding variations.

**Rationale**: shadcn/ui provides a cohesive design system; reusing components ensures consistency and reduces maintenance burden.

### II. Type Safety (NON-NEGOTIABLE)

TypeScript strict mode MUST be enabled. All functions MUST have explicit return types. The `any` type is FORBIDDEN. Interfaces MUST be defined for all data models (e.g., MenuItem, Category, FormState). Props MUST be typed, no implicit any usage.

**Rationale**: Type safety catches errors at compile time, improves IDE autocomplete, and documents component contracts.

### III. UX-Driven Development

All features MUST prioritize administrative staff usability. Interfaces MUST be intuitive, with clear labeling and immediate visual feedback. Loading states, error messages, and success confirmations MUST be present for all user actions. The design MUST be clean and professional.

**Rationale**: Restaurant staff need efficient workflows; confusing interfaces directly impact operational efficiency.

### IV. Responsive Design

All components MUST work seamlessly across desktop (≥1024px), tablet (≥768px), and mobile (≥320px). Mobile-first CSS approach with Tailwind breakpoints (sm, md, lg, xl). Touch targets MUST be at least 44px on mobile. Tables MUST be scrollable horizontally on small screens.

**Rationale**: Admin staff may access the panel from various devices; responsiveness ensures accessibility in all contexts.

### V. MVP-First Iteration

Each user story MUST be independently completable and testable. User stories MUST have defined priorities (P1, P2, P3). Features MUST be delivered incrementally - no story depends on another for basic functionality. Integration points MUST be deferred to cross-cutting concerns phase.

**Rationale**: Early delivery of usable features provides value faster and enables user feedback loops.

## Technical Standards

### Technology Stack (Mandatory)

- **Framework**: React 19+ with functional components and hooks
- **Language**: TypeScript 5+ in strict mode
- **Styling**: Tailwind CSS 4+ with utility-first approach
- **UI Library**: shadcn/ui components (Table, Form, Input, Button, Card required)
- **Build Tool**: Vite 7+
- **Linting**: ESLint with TypeScript and React rules

### Code Style

- Functional components with hooks (no class components)
- Component files use PascalCase (e.g., `MenuItemTable.tsx`)
- Utility functions and hooks use camelCase (e.g., `useMenuItems.ts`)
- Clear, descriptive names (no abbreviations except widely-known: UI, API, ID)
- Maximum file length: 300 lines
- Maximum function length: 50 lines

### Data Management

- State management via React hooks (useState, useContext) or lightweight library if needed
- Forms MUST use controlled components with validation
- API calls MUST include error handling and loading states
- No external state management (Redux, MobX) unless justified in constitution amendment

## Quality Gates

### Pre-Commit Requirements

- `npm run lint` MUST pass with zero errors
- `npm run build` MUST complete successfully
- TypeScript compilation MUST pass with no errors

### Code Review Criteria

- Compliance with all 5 core principles
- Responsive design verified
- Accessibility basics (keyboard navigation, ARIA labels)
- Error handling for all async operations
- Loading states for all user-triggered actions

### Testing Strategy

- Component integration tests for critical user flows
- Form validation MUST be tested
- No mandatory unit tests unless requested in feature spec
- Manual testing checklist for each user story

## Governance

### Amendment Procedure

Constitution amendments require:
1. Documented rationale in amendment proposal
2. Approval via consensus or designated maintainer
3. Migration plan for existing code
4. Version bump following semantic versioning:
   - MAJOR: Remove or redefine a principle
   - MINOR: Add new principle or section
   - PATCH: Clarifications or wording improvements

### Compliance Verification

- All PRs MUST verify constitution compliance in review checklist
- Constitution violations MUST be justified in plan.md Complexity Tracking
- Complexity not justified by user value MUST be rejected
- Use constitution as guide for architectural decisions

### Version History

**Version**: 1.0.0 | **Ratified**: 2026-01-29 | **Last Amended**: 2026-01-29

**Rationale for 1.0.0**: Initial constitution ratification establishing foundational principles for restaurant menu admin panel project.
