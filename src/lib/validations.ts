import { z } from 'zod'
import { CATEGORY_OPTIONS } from './constants'

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

  status: z.enum(['Available', 'SoldOut']).optional()
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
