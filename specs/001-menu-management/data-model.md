# Data Model: Menu Management System

**Feature**: 001-menu-management
**Date**: 2026-01-29

## Entities

### Dish (Platillo)

**Description**: Represents a menu item that can be created, viewed, and managed by administrative staff.

**Attributes**:

| Field | Type | Required | Description | Validation Rules |
|--------|--------|-----------|-------------------|
| `id` | `string` (UUID) | Yes | Auto-generated unique identifier |
| `name` | `string` | Yes | 1-100 characters, unique within menu |
| `description` | `string` | No | 0-500 characters |
| `price` | `number` | Yes | Positive decimal (≥ 0.01), 2 decimal places |
| `category` | `enum` | Yes | Must match predefined category |
| `status` | `enum` | Yes | "Available" (Disponible) or "Sold Out" (Agotado) |
| `createdAt` | `string` (ISO date) | Yes | Auto-generated timestamp |
| `updatedAt` | `string` (ISO date) | Yes | Auto-updated on any change |

**State Transitions**:
```
Available (Disponible) → Sold Out (Agotado)
Sold Out (Agotado) → Available (Disponible)
```

**Relationships**:
- Belongs to exactly one Category

**TypeScript Interface**:
```typescript
interface Dish {
  id: string
  name: string
  description: string
  price: number
  category: CategoryType
  status: 'Available' | 'SoldOut'
  createdAt: string
  updatedAt: string
}

type CategoryType =
  | 'Entradas'
  | 'Platos Fuertes'
  | 'Postres'
  | 'Bebidas'
  | 'Acompañamientos'

type DishStatus = 'Available' | 'SoldOut'
```

---

### Category (Categoría)

**Description**: Classification group for organizing menu items.

**Attributes**:

| Field | Type | Required | Description |
|--------|--------|-----------|
| `id` | `string` | Yes | Unique category identifier |
| `name` | `string` | Yes | Display name (e.g., "Entradas") |
| `slug` | `string` | Yes | URL-friendly identifier (e.g., "entradas") |

**TypeScript Interface**:
```typescript
interface Category {
  id: string
  name: string
  slug: string
}
```

**Pre-defined Categories** (MVP):
1. Entradas
2. Platos Fuertes
3. Postres
4. Bebidas
5. Acompañamientos

---

## Validation Rules

### Dish Creation (Form Validation)

**Required Fields**: `name`, `price`, `category`

**Field-Specific Rules**:

1. **Name**:
   - Minimum length: 1 character
   - Maximum length: 100 characters
   - Must be unique within menu (case-insensitive)
   - No leading/trailing whitespace
   - Alphanumeric + spaces + accented characters

2. **Description**:
   - Optional field
   - Maximum length: 500 characters
   - Alphanumeric + spaces + accented characters

3. **Price**:
   - Required field
   - Must be positive number (> 0)
   - Maximum value: 999999.99
   - Must have exactly 2 decimal places
   - Format: `XX.XX` where X is digit

4. **Category**:
   - Required field
   - Must match one of predefined categories
   - Case-sensitive (exact match required)

### Dish Update (Edit Form)

**All Dish Creation rules apply** plus**:
- Unique name validation excludes current dish's own name (allow renaming to same value)
- `updatedAt` field auto-updated on successful edit

### Dish Deletion

- Dish can be deleted regardless of status
- No confirmation required (simplified MVP)
- Deletion is permanent (no undo)

### Status Toggle (Availability Control)

- Allowed values: "Available" (Disponible) ↔ "Sold Out" (Agotado)
- No intermediate states
- Update is immediate (no async operations)
- `updatedAt` field auto-updated on successful toggle

---

## Mock Data Structure

### Initial Dataset

**Categories**: 5 pre-defined categories

**Sample Dishes**: 3-5 example dishes for testing

```typescript
const mockCategories: Category[] = [
  { id: 'cat-1', name: 'Entradas', slug: 'entradas' },
  { id: 'cat-2', name: 'Platos Fuertes', slug: 'platos-fuertes' },
  { id: 'cat-3', name: 'Postres', slug: 'postres' },
  { id: 'cat-4', name: 'Bebidas', slug: 'bebidas' },
  { id: 'cat-5', name: 'Acompañamientos', slug: 'acompanamientos' },
]

const mockDishes: Dish[] = [
  {
    id: 'dish-1',
    name: 'Hamburguesa Trufada',
    description: 'Carne angus y trufa',
    price: 15.50,
    category: 'Entradas',
    status: 'Available',
    createdAt: '2026-01-29T10:00:00Z',
    updatedAt: '2026-01-29T10:00:00Z'
  },
  {
    id: 'dish-2',
    name: 'Ensalada César',
    description: 'Lechuga romana, crutones, parmesano, aderezo',
    price: 12.75,
    category: 'Platos Fuertes',
    status: 'SoldOut',
    createdAt: '2026-01-29T10:00:00Z',
    updatedAt: '2026-01-29T10:00:00Z'
  },
  {
    id: 'dish-3',
    name: 'Tiramisú',
    description: 'Postre italiano con mascarpone y cacao',
    price: 8.00,
    category: 'Postres',
    status: 'Available',
    createdAt: '2026-01-29T10:00:00Z',
    updatedAt: '2026-01-29T10:00:00Z'
  }
]
```

---

## State Management Patterns

### CRUD Operations

**Create**:
```typescript
interface CreateDishInput {
  name: string
  description?: string
  price: number
  category: CategoryType
}

const createDish = (input: CreateDishInput): Dish => ({
  ...input,
  id: generateUUID(),
  status: 'Available',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
})
```

**Update**:
```typescript
interface UpdateDishInput {
  id: string
  name?: string
  description?: string
  price?: number
  category?: CategoryType
  status?: DishStatus
}

const updateDish = (input: UpdateDishInput): Dish => ({
  ...input,
  updatedAt: new Date().toISOString()
})
```

**Delete**:
```typescript
const deleteDish = (id: string): void => {
  setDishes(prev => prev.filter(d => d.id !== id))
}
```

**Toggle Status**:
```typescript
const toggleStatus = (id: string): void => {
  setDishes(prev =>
    prev.map(d =>
      d.id === id
        ? { ...d, status: d.status === 'Available' ? 'SoldOut' : 'Available', updatedAt: new Date().toISOString() }
        : d
    )
  )
}
```

---

## Type Safety Enforcement

**zod Schemas** (to be defined in contracts/):

```typescript
const dishCreationSchema = z.object({
  name: z.string()
    .min(1, 'Nombre es requerido')
    .max(100, 'Máximo 100 caracteres')
    .refine((val) => {
      const exists = dishes.some(d => d.name.toLowerCase() === val.toLowerCase())
      return !exists
    }, 'Nombre ya existe en el menú'),
  description: z.string()
    .max(500, 'Máximo 500 caracteres')
    .optional(),
  price: z.number()
    .positive('Precio debe ser mayor a 0')
    .max(999999.99, 'Precio muy alto')
    .refine((val) => {
      const decimals = (val % 1).toFixed(2)
      return decimals.length <= 2
    }, 'Máximo 2 decimales'),
  category: z.enum(['Entradas', 'Platos Fuertes', 'Postres', 'Bebidas', 'Acompañamientos'])
})

type DishFormData = z.infer<typeof dishCreationSchema>
```

---

## Data Integrity Constraints

1. **Uniqueness**: Dish names must be unique (case-insensitive comparison)
2. **Referential Integrity**: Dish category must exist in predefined categories
3. **Temporal Consistency**: `createdAt` never changes, `updatedAt` always ≥ `createdAt`
4. **Status Consistency**: Status only transitions between Available and SoldOut
5. **Price Precision**: All prices stored with exactly 2 decimal places
