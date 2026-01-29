import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table'
import { DishStatusBadge } from './DishStatusBadge'
import { DishActions } from './DishActions'
import { EmptyState } from '../../layout/EmptyState'
import { AvailabilityToggle } from '../availability/AvailabilityToggle'
import { type Dish } from '../../../lib/types'
import { formatCurrency } from '../../../lib/utils'

interface DishTableProps {
  dishes: Dish[]
  onEdit: (dish: Dish) => void
  onDelete: (dishId: string) => void
  onStatusToggle: (dishId: string) => void
  isLoading?: boolean
  emptyStateMessage?: string
}

export const DishTable = ({ dishes, onEdit, onDelete, onStatusToggle, isLoading, emptyStateMessage = 'No hay platillos registrados' }: DishTableProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="flex flex-col items-center gap-4 text-gray-600">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="animate-spin h-12 w-12"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="url(#gradient)"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <p className="text-lg font-medium animate-pulse">Cargando platillos...</p>
        </div>
      </div>
    )
  }

  if (dishes.length === 0) {
    return <EmptyState message={emptyStateMessage} />
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-base border-0">
              Platillo
            </TableHead>
            <TableHead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-base border-0">
              Categoría
            </TableHead>
            <TableHead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-base border-0 text-right">
              Precio
            </TableHead>
            <TableHead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-base border-0 text-center">
              Estado
            </TableHead>
            <TableHead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-base border-0 text-center">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dishes.map((dish, index) => (
            <TableRow
              key={dish.id}
              className={`
                transition-all duration-300
                hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50
                hover:scale-[1.01]
                ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
              `}
            >
              <TableCell className="font-semibold text-gray-900 text-base py-4">
                {dish.name}
              </TableCell>
              <TableCell className="text-gray-700 text-base py-4">
                {dish.category}
              </TableCell>
              <TableCell className="text-right py-4">
                <span className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-emerald-50 to-green-50 px-3 py-1.5 font-bold text-emerald-700 text-base shadow-sm">
                  <span className="text-2xl">💰</span>
                  {formatCurrency(dish.price)}
                </span>
              </TableCell>
              <TableCell className="text-center py-4">
                <DishStatusBadge status={dish.status} size="sm" />
              </TableCell>
              <TableCell className="text-center py-4">
                <div className="flex items-center justify-center gap-2">
                  <AvailabilityToggle
                    status={dish.status}
                    onToggle={() => onStatusToggle(dish.id)}
                    size="sm"
                  />
                  <DishActions
                    dish={dish}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
