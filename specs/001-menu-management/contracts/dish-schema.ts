# Dish Validation Schema

**Contract Version**: 1.0.0
**Date**: 2026-01-29

## Schema Definition

```typescript
import { z } from 'zod'

/**
 * Predefined categories for menu organization
 */
export const CATEGORY_OPTIONS = [
  'Entradas',
  'Platos Fuertes',
  'Postres',
  'Bebidas',
  'Acompañamientos'
] as const

export type CategoryType = typeof CATEGORY_OPTIONS[number]

/**
 * Dish status enumeration
 */
export const STATUS_OPTIONS = ['Available', 'SoldOut'] as const
export type DishStatus = typeof STATUS_OPTIONS[number]

/**
 * Validation schema for creating a new dish
 *
 * Enforces:
 * - Name: Required, 1-100 chars, unique
 * - Description: Optional, max 500 chars
 * - Price: Required, positive, max 999999.99, 2 decimal places
 * - Category: Required, must match predefined options
 */
export const dishCreationSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(100, 'El nombre debe tener máximo 100 caracteres')
    .trim()
    .transform(val => val.trim())
    .refine(val => val.length > 0, 'El nombre no puede estar vacío'),

  description: z
    .string()
    .max(500, 'La descripción debe tener máximo 500 caracteres')
    .trim()
    .transform(val => val.trim())
    .optional()
    .or(z.literal('')),

  price: z
    .number({
      required_error: 'El precio es requerido',
      invalid_type_error: 'El precio debe ser un número'
    })
    .min(0.01, 'El precio debe ser mayor a 0')
    .max(999999.99, 'El precio no puede exceder 999,999.99')
    .refine(
      val => {
        const decimals = (val % 1).toFixed(2)
        return decimals.length <= 2
      },
      'El precio debe tener máximo 2 decimales'
    ),

  category: z
    .enum(CATEGORY_OPTIONS, {
      required_error: 'La categoría es requerida',
      invalid_type_error: 'Categoría no válida'
    })
})

export type DishCreationData = z.infer<typeof dishCreationSchema>

/**
 * Validation schema for updating an existing dish
 *
 * All fields optional (partial update)
 * Name uniqueness check excludes current dish ID
 */
export const dishUpdateSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(100, 'El nombre debe tener máximo 100 caracteres')
    .trim()
    .transform(val => val.trim())
    .optional(),

  description: z
    .string()
    .max(500, 'La descripción debe tener máximo 500 caracteres')
    .trim()
    .transform(val => val.trim())
    .optional()
    .or(z.literal('')),

  price: z
    .number()
    .min(0.01, 'El precio debe ser mayor a 0')
    .max(999999.99, 'El precio no puede exceder 999,999.99')
    .optional(),

  category: z
    .enum(CATEGORY_OPTIONS)
    .optional(),

  status: z.enum(STATUS_OPTIONS).optional()
})

export type DishUpdateData = z.infer<typeof dishUpdateSchema>
```

## Error Messages (Spanish)

```typescript
export const VALIDATION_ERROR_MESSAGES = {
  // Name errors
  NAME_REQUIRED: 'El nombre es requerido',
  NAME_TOO_LONG: 'El nombre debe tener máximo 100 caracteres',
  NAME_EMPTY: 'El nombre no puede estar vacío',
  NAME_EXISTS: 'El nombre ya existe en el menú',

  // Description errors
  DESCRIPTION_TOO_LONG: 'La descripción debe tener máximo 500 caracteres',

  // Price errors
  PRICE_REQUIRED: 'El precio es requerido',
  PRICE_INVALID: 'El precio debe ser un número',
  PRICE_TOO_LOW: 'El precio debe ser mayor a 0',
  PRICE_TOO_HIGH: 'El precio no puede exceder 999,999.99',
  PRICE_TOO_MANY_DECIMALS: 'El precio debe tener máximo 2 decimales',

  // Category errors
  CATEGORY_REQUIRED: 'La categoría es requerida',
  CATEGORY_INVALID: 'Categoría no válida'
} as const
```

## Validation Helpers

```typescript
import { dishCreationSchema } from './dish-schema'

/**
 * Validates dish creation data
 * Returns validation errors or null if valid
 */
export const validateDishCreation = (
  data: unknown
): { success: true; data: DishCreationData } | { success: false; errors: z.ZodError } => {
  const result = dishCreationSchema.safeParse(data)

  if (!result.success) {
    return { success: false, errors: result.error }
  }

  return { success: true, data: result.data }
}

/**
 * Checks if a dish name is unique (case-insensitive)
 */
export const isDishNameUnique = (
  name: string,
  existingDishes: { name: string }[],
  excludeId?: string
): boolean => {
  const normalizedName = name.toLowerCase().trim()

  return !existingDishes.some(
    dish =>
      dish.name.toLowerCase() === normalizedName && dish.id !== excludeId
  )
}

/**
 * Formats price to exactly 2 decimal places
 */
export const formatPrice = (price: number): string => {
  return price.toFixed(2)
}

/**
 * Formats price for display with currency symbol
 */
export const formatCurrency = (price: number): string => {
  return `$${formatPrice(price)}`
}
```

## Form Field Metadata

```typescript
export const FORM_FIELDS = {
  name: {
    label: 'Nombre del Platillo',
    placeholder: 'Ej: Hamburguesa Trufada',
    maxLength: 100,
    required: true,
    type: 'text',
    autoComplete: 'off'
  },

  description: {
    label: 'Descripción',
    placeholder: 'Ej: Carne angus y trufa',
    maxLength: 500,
    required: false,
    type: 'textarea',
    rows: 3
  },

  price: {
    label: 'Precio ($)',
    placeholder: '0.00',
    min: 0.01,
    max: 999999.99,
    step: 0.01,
    required: true,
    type: 'number',
    autoComplete: 'off'
  },

  category: {
    label: 'Categoría',
    required: true,
    type: 'select',
    options: CATEGORY_OPTIONS
  }
} as const
```
