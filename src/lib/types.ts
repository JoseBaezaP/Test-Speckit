export interface Dish {
  id: string
  name: string
  description?: string
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

export interface DishFormData {
  name: string
  description: string
  price: number
  category: 'Entradas' | 'Platos Fuertes' | 'Postres' | 'Bebidas' | 'Acompañamientos'
}

export type DishStatus = 'Available' | 'SoldOut'

export interface ToastMessage {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
  duration?: number
}
