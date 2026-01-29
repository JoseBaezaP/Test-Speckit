import { useState, useCallback } from 'react'
import type { Dish } from '../lib/types'
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

  const toggleStatus = useCallback((id: string) => {
    setDishes(prev =>
      prev.map(d =>
        d.id === id
          ? { ...d, status: d.status === 'Available' ? 'SoldOut' : 'Available', updatedAt: new Date().toISOString() }
          : d
      )
    )
  }, [])

  return { dishes, addDish, updateDish, deleteDish, toggleStatus }
}
