import { Plus, UtensilsCrossed } from 'lucide-react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'

interface EmptyStateProps {
  message: string
  icon?: React.ReactNode
  action?: {
    label: string
    onClick: () => void
  }
  size?: 'sm' | 'md' | 'lg'
}

export const EmptyState = ({ message, icon, action, size = 'md' }: EmptyStateProps) => {
  const sizeClasses = {
    sm: 'p-6',
    md: 'p-12',
    lg: 'p-16'
  }

  return (
    <Card className={`${sizeClasses[size]} text-center border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-blue-50`}>
      <div className="mb-6 flex justify-center">
        <div className="flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 shadow-lg">
          {icon ? (
            icon
          ) : (
            <UtensilsCrossed className="h-10 w-10 text-blue-600" />
          )}
        </div>
      </div>
      <p className="text-gray-700 text-xl font-semibold mb-2">{message}</p>
      <p className="text-gray-500 text-sm">Comienza agregando platillos para administrar tu menú</p>
      {action && (
        <div className="mt-8 flex justify-center">
          <Button
            onClick={action.onClick}
            className="h-12 px-8 text-base bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Plus className="mr-2 h-5 w-5" />
            <span className="font-semibold">{action.label}</span>
          </Button>
        </div>
      )}
    </Card>
  )
}
