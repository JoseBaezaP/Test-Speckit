import { useState } from 'react'
import { mockCategories } from '../lib/mock-data'
import type { Category } from '../lib/types'

export const useCategories = () => {
  const [categories] = useState<Category[]>(mockCategories)

  return categories
}
