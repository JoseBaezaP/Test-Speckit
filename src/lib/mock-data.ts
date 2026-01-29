import type { Dish, Category } from './types'

export const mockCategories: Category[] = [
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
  },
  {
    id: 'dish-3',
    name: 'Tiramisú',
    description: 'Postre italiano con mascarpone y cacao',
    price: 8.00,
    category: 'Postres',
    status: 'Available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]
