import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '../../ui/button'
import type { Dish } from '../../../lib/types'

interface DishActionsProps {
  dish: Dish
  onEdit: (dish: Dish) => void
  onDelete: (dishId: string) => void
}

export const DishActions = ({ dish, onEdit, onDelete }: DishActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onEdit(dish)}
        aria-label={`Editar ${dish.name}`}
        className={`
          h-9 w-9
          border-2 border-blue-300
          text-blue-600
          hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50
          hover:border-blue-500
          hover:shadow-md
          transition-all duration-300
          hover:scale-110
        `}
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => onDelete(dish.id)}
        aria-label={`Eliminar ${dish.name}`}
        className={`
          h-9 w-9
          bg-gradient-to-r from-rose-500 to-red-600
          hover:from-rose-600 hover:to-red-700
          shadow-md hover:shadow-xl
          transition-all duration-300
          hover:scale-110
          hover:rotate-12
        `}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
