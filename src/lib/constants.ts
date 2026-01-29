export const CATEGORY_OPTIONS = [
  'Entradas',
  'Platos Fuertes',
  'Postres',
  'Bebidas',
  'Acompañamientos'
] as const

export type CategoryType = typeof CATEGORY_OPTIONS[number]

export const STATUS_OPTIONS = ['Available', 'SoldOut'] as const
export type DishStatus = typeof STATUS_OPTIONS[number]

export const STATUS_COLORS = {
  Available: 'bg-emerald-500 text-white',
  SoldOut: 'bg-rose-500 text-white'
} as const

export const STATUS_LABELS = {
  Available: 'Disponible',
  SoldOut: 'Agotado'
} as const
