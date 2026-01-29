# Quickstart: Menu Management System

**Feature**: 001-menu-management
**Date**: 2026-01-29

This guide will help you set up the development environment and start implementing the menu management feature.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager available
- Git repository cloned and on branch `001-menu-management`
- Basic knowledge of React, TypeScript, and Tailwind CSS

## Step 1: Install Dependencies

```bash
# Install zod for validation
npm install zod

# Or with yarn
yarn add zod
```

## Step 2: Initialize shadcn/ui Components

```bash
# Initialize shadcn/ui (if not already done)
npx shadcn@latest init

# Add required shadcn/ui components
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add table
npx shadcn@latest add card
npx shadcn@latest add badge
npx shadcn@latest add form

# Or add all at once
npx shadcn@latest add button input table card badge form
```

This will create:
- `src/components/ui/button.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/table.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/badge.tsx`
- `src/components/ui/form.tsx`

And update `tailwind.config.ts` with component styles.

## Step 3: Verify Project Structure

Ensure your project has the following structure:

```text
src/
├── components/
│   ├── ui/              # shadcn/ui components (created by shadcn CLI)
│   ├── layout/         # Layout components (create manually)
│   └── features/       # Feature components (create manually)
├── lib/                 # Shared utilities (create manually)
│   ├── types.ts
│   ├── validations.ts
│   ├── mock-data.ts
│   └── constants.ts
├── hooks/              # Custom hooks (create manually)
└── context/            # Context providers (if needed)
```

Create missing directories:

```bash
mkdir -p src/components/layout
mkdir -p src/components/features/dish-form
mkdir -p src/components/features/dish-table
mkdir -p src/components/features/availability
mkdir -p src/lib
mkdir -p src/hooks
mkdir -p src/context
```

## Step 4: Create Foundation Files

### 4.1 Create TypeScript Types

**File**: `src/lib/types.ts`

```typescript
export interface Dish {
  id: string
  name: string
  description: string
  price: number
  category: 'Entradas' | 'Platos Fuertes' | 'Postres' | 'Bebidas' | 'Acompañamientos'
  status: 'Available' | 'SoldOut'
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
}
```

### 4.2 Create Mock Data

**File**: `src/lib/mock-data.ts`

```typescript
import { Dish } from './types'

export const mockCategories = [
  { id: 'cat-1', name: 'Entradas', slug: 'entradas' },
  { id: 'cat-2', name: 'Platos Fuertes', slug: 'platos-fuertes' },
  { id: 'cat-3', name: 'Postres', slug: 'postres' },
  { id: 'cat-4', name: 'Bebidas', slug: 'bebidas' },
  { id: 'cat-5', name: 'Acompañamientos', slug: 'acompanamientos' },
]

export const mockDishes: Dish[] = [
  {
    id: 'dish-1',
    name: 'Hamburguesa Trufada',
    description: 'Carne angus y trufa',
    price: 15.50,
    category: 'Entradas',
    status: 'Available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'dish-2',
    name: 'Ensalada César',
    description: 'Lechuga romana, crutones, parmesano, aderezo',
    price: 12.75,
    category: 'Platos Fuertes',
    status: 'SoldOut',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]
```

### 4.3 Create Constants

**File**: `src/lib/constants.ts`

```typescript
export const CATEGORY_OPTIONS = [
  'Entradas',
  'Platos Fuertes',
  'Postres',
  'Bebidas',
  'Acompañamientos'
] as const

export const STATUS_OPTIONS = ['Available', 'SoldOut'] as const

export const STATUS_COLORS = {
  Available: 'bg-emerald-500 text-white',
  SoldOut: 'bg-rose-500 text-white'
} as const

export const STATUS_LABELS = {
  Available: 'Disponible',
  SoldOut: 'Agotado'
} as const
```

## Step 5: Start Development Server

```bash
# Start development server
npm run dev

# Or with yarn
yarn dev
```

Server should start at `http://localhost:5173` (Vite default).

## Step 6: Build Foundation Components (in order)

### 6.1 Create useDishes Hook

**File**: `src/hooks/useDishes.ts`

```typescript
import { useState, useCallback } from 'react'
import { Dish } from '../lib/types'
import { mockDishes } from '../lib/mock-data'

export const useDishes = () => {
  const [dishes, setDishes] = useState<Dish[]>(mockDishes)

  const addDish = useCallback((newDish: Dish) => {
    setDishes(prev => [...prev, newDish])
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
```

### 6.2 Create DishForm Component

**File**: `src/components/features/dish-form/DishForm.tsx`

Use the shadcn/ui Form components created in Step 2.
Implement form with name, description, price, and category fields.
Add zod validation from `contracts/dish-schema.md`.

### 6.3 Create DishTable Component

**File**: `src/components/features/dish-table/DishTable.tsx`

Use shadcn/ui Table component.
Display dishes in responsive layout.
Add Edit, Delete, and Status toggle buttons.

## Step 7: Implement User Stories (in priority order)

### P1: Create New Dishes

1. Create `DishForm.tsx` with all form fields
2. Implement zod validation for form submission
3. Add loading state during form submission
4. Display success message "Platillo registrado correctamente" on save
5. Add new dish to `useDishes` state

**Test**: Create a dish with valid data, verify it appears in table.

### P2: View Menu Dashboard

1. Create `DishTable.tsx` with responsive layout
2. Display all dishes from `useDishes` hook
3. Add Edit and Delete buttons to each row
4. Display empty state when no dishes exist

**Test**: Navigate to menu section, verify all dishes display correctly.

### P3: Control Dish Availability

1. Create availability toggle in `DishTableRow.tsx`
2. Implement toggle between Available and SoldOut
3. Update `useDishes` state immediately
4. Show color change (green ↔ red) on status change

**Test**: Toggle dish status, verify color changes immediately.

## Step 8: Run Quality Checks

```bash
# Check TypeScript compilation
npm run build

# Run linter
npm run lint

# Fix any errors or warnings before proceeding
```

## Step 9: Manual Testing

Test each user story acceptance scenario from the spec:

- ✅ Create dish with all required fields completed
- ✅ Create dish with missing required fields (validation errors)
- ✅ Create dish with invalid price (validation errors)
- ✅ View menu table with multiple dishes
- ✅ View menu table with no dishes (empty state)
- ✅ Toggle dish status from Available to SoldOut
- ✅ Toggle dish status from SoldOut to Available
- ✅ Delete a dish from menu
- ✅ Verify responsive behavior on mobile, tablet, desktop

## Step 10: Prepare for Code Review

Before committing:

1. Ensure all components use shadcn/ui or are reusable
2. Verify all TypeScript interfaces are defined
3. Check Tailwind responsive classes are applied
4. Confirm loading states exist for all async operations
5. Verify success/error messages are user-friendly
6. Test keyboard navigation and ARIA labels

## Troubleshooting

### shadcn/ui Components Not Found

**Issue**: `npx shadcn@latest add button` fails

**Solution**: Initialize shadcn/ui first:
```bash
npx shadcn@latest init
```

### TypeScript Errors with zod

**Issue**: Type inference not working from zod schemas

**Solution**: Ensure zod is imported correctly:
```typescript
import { z } from 'zod'

// Then use z.infer
type FormData = z.infer<typeof schema>
```

### Tailwind Classes Not Working

**Issue**: Tailwind classes not applied

**Solution**: Ensure `tailwind.config.ts` exists and is imported in main file.

Check `src/main.tsx` has:
```typescript
import { tailwindcss } from '@tailwindcss/vite'
import tailwindConfig from './tailwind.config'

tailwindcss({
  config: tailwindConfig
})
```

## Next Steps

After completing quickstart:

1. Refer to `tasks.md` for detailed implementation tasks
2. Follow the implementation order defined in `plan.md`
3. Test each user story independently
4. Verify compliance with constitution principles

**Need Help?**

- Check `constitution.md` for core principles
- Refer to `contracts/` for component specifications
- Review `research.md` for technical decisions
