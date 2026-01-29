# Research: Menu Management System

**Feature**: 001-menu-management
**Date**: 2026-01-29
**Status**: Complete

## Research Tasks Completed

### Task 1: shadcn/ui Component Installation and Setup

**Decision**: Use shadcn/ui CLI with Radix UI primitives and Tailwind CSS

**Rationale**:
- shadcn/ui provides pre-built, accessible components that follow design system principles
- Built on Radix UI primitives ensuring accessibility and keyboard navigation
- Components are fully customizable with Tailwind CSS classes
- No build step required - components are copied to project source
- Consistent with constitution's Component-First principle

**Alternatives Considered**:
- MUI: Opinionated styling harder to override, larger bundle size
- Chakra UI: Similar to shadcn/ui but requires ChakraProvider setup
- Custom components: Would violate DRY principle, requires more maintenance

**Implementation Approach**:
```bash
# Initialize shadcn/ui
npx shadcn@latest init

# Add required components
npx shadcn@latest add button input table card badge form
```

---

### Task 2: React 19+ Functional Component Patterns

**Decision**: Functional components with hooks exclusively, no class components

**Rationale**:
- React 19+ deprecates class components for most use cases
- Functional components are more concise and easier to test
- Hooks (useState, useEffect, useCallback) provide better composition patterns
- Aligns with constitution's Technical Standards
- Easier to add TypeScript type inference

**Alternatives Considered**:
- Class components: Legacy pattern, more verbose, not aligned with React 19+ best practices
- Higher-order components (HOCs): Complexity without benefit for this use case

**Key Patterns**:
```typescript
// State management
const [dishes, setDishes] = useState<Dish[]>([])
const [isLoading, setIsLoading] = useState(false)

// Memoized callbacks
const handleSubmit = useCallback((data) => {
  // ... logic
}, [dependencies])

// Derived state
const availableDishes = useMemo(() =>
  dishes.filter(d => d.status === 'Available'),
[dishes]
)
```

---

### Task 3: zod Integration for Form Validation

**Decision**: Use zod for runtime type validation with React controlled components

**Rationale**:
- zod provides TypeScript-first validation schema definition
- Automatic type inference from schemas (no duplicate interface definitions)
- Better error messages than native HTML5 validation
- Can validate complex nested objects (categories, multiple fields)
- Works seamlessly with React controlled components
- Aligns with constitution's Type Safety principle

**Alternatives Considered**:
- Native HTML5 validation: Limited error messages, no TypeScript integration
- Manual validation functions: Duplicate type definitions, more error-prone
- Yup: Similar to zod but less intuitive TypeScript inference

**Implementation Pattern**:
```typescript
import { z } from 'zod'

const dishSchema = z.object({
  name: z.string().min(1, "Nombre es requerido").max(100),
  description: z.string().max(500, "Máximo 500 caracteres"),
  price: z.number().positive("Precio debe ser mayor a 0"),
  category: z.enum(['Entradas', 'Platos Fuertes', 'Postres'])
})

type DishFormData = z.infer<typeof dishSchema>

// In component
const { register, formState: { errors } } = useForm({
  validationSchema: dishSchema
})
```

---

### Task 4: Responsive Design with Tailwind CSS

**Decision**: Mobile-first approach with Tailwind utility classes

**Rationale**:
- Mobile-first ensures mobile experience is prioritized, not an afterthought
- Tailwind utility classes provide responsive breakpoints (sm, md, lg, xl)
- No custom CSS required for most responsive needs
- Aligns with constitution's Responsive Design principle
- Touch targets can be easily configured with min-height utilities

**Alternatives Considered**:
- Desktop-first with media queries: Mobile often broken, requires more overrides
- CSS-in-JS libraries: Larger bundle size, adds abstraction layer

**Breakpoint Strategy**:
```typescript
// Mobile first (< 640px)
<div className="p-4"> // 16px padding on mobile

// Tablet (≥ 640px)
<div className="md:p-6"> // 24px padding on tablet

// Desktop (≥ 1024px)
<div className="lg:p-8"> // 32px padding on desktop

// Large desktop (≥ 1280px)
<div className="xl:p-10"> // 40px padding on large desktop
```

**Component Specific Guidelines**:
- **Forms**: Stack vertically on mobile, side-by-side on desktop (md:grid-cols-2)
- **Tables**: Horizontal scroll on mobile, full width on desktop (overflow-x-auto)
- **Buttons**: Minimum 44px height on mobile (h-11), larger on desktop (md:h-12)
- **Cards**: Full width on mobile, max-width cards on desktop (md:max-w-md)

---

### Task 5: React State Management for Local Mock Data

**Decision**: Custom hooks (useDishes, useCategories) with useState and useCallback

**Rationale**:
- Simple and sufficient for MVP with mock data
- No external dependencies required (constitution: no state library unless justified)
- Easy to migrate to external API later
- Full TypeScript support for type safety
- Aligns with constitution's Data Management principle

**Alternatives Considered**:
- React Context: Unnecessary overhead for single admin user, no complex prop drilling
- Redux/MobX: Overkill for local mock data, violates constitution
- React Query: Designed for API calls, adds complexity for local state
- Zustand: External dependency without clear benefit for this use case

**Implementation Pattern**:
```typescript
// src/hooks/useDishes.ts
export const useDishes = () => {
  const [dishes, setDishes] = useState<Dish[]>(mockDishes)

  const addDish = useCallback((newDish: Dish) => {
    setDishes(prev => [...prev, { ...newDish, id: generateId() }])
  }, [])

  const updateDish = useCallback((updatedDish: Dish) => {
    setDishes(prev =>
      prev.map(d => d.id === updatedDish.id ? updatedDish : d)
    )
  }, [])

  const deleteDish = useCallback((id: string) => {
    setDishes(prev => prev.filter(d => d.id !== id))
  }, [])

  return { dishes, addDish, updateDish, deleteDish }
}

// Usage in component
const { dishes, addDish, updateDish, deleteDish } = useDishes()
```

## Technology Stack Finalization

**Confirmed Stack**:
- **Framework**: React 19+ (functional components with hooks)
- **Language**: TypeScript 5+ (strict mode, no `any` types)
- **Styling**: Tailwind CSS 4+ (mobile-first utility classes)
- **UI Library**: shadcn/ui (Button, Input, Table, Card, Badge, Form)
- **Validation**: zod (runtime type validation for forms)
- **State Management**: Custom hooks with useState, useCallback, useMemo
- **Build Tool**: Vite 7+
- **Linting**: ESLint with TypeScript and React rules

**All technical decisions made and documented. Ready for Phase 1: Design & Contracts.**
