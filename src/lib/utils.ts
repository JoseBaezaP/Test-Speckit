import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from 'zod'
import { CATEGORY_OPTIONS, STATUS_OPTIONS, STATUS_COLORS, STATUS_LABELS } from './constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export { CATEGORY_OPTIONS, STATUS_OPTIONS, STATUS_COLORS, STATUS_LABELS }

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
      message: 'El precio debe ser un número'
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
      message: 'Categoría no válida'
    })
})

export type DishCreationData = z.infer<typeof dishCreationSchema>

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

  status: z
    .enum(STATUS_OPTIONS)
    .optional()
})

export type DishUpdateData = z.infer<typeof dishUpdateSchema>

export const validateDishCreation = (
  data: unknown
): { success: true; data: DishCreationData } | { success: false; errors: z.ZodError } => {
  const result = dishCreationSchema.safeParse(data)

  if (!result.success) {
    return { success: false, errors: result.error }
  }

  return { success: true, data: result.data }
}

export const isDishNameUnique = (
  name: string,
  existingDishes: { id: string; name: string }[],
  excludeId?: string
): boolean => {
  const normalizedName = name.toLowerCase().trim()

  return !existingDishes.some(
    dish =>
      dish.name.toLowerCase() === normalizedName && dish.id !== excludeId
  )
}

export const formatPrice = (price: number): string => {
  return price.toFixed(2)
}

export const formatCurrency = (price: number): string => {
  return `$${formatPrice(price)}`
}

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
