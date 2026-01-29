import { DishStatus } from '../../../lib/types'
import { Badge } from '../../ui/badge'

interface DishStatusBadgeProps {
  status: DishStatus
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export const DishStatusBadge = ({ status, className, size = 'md' }: DishStatusBadgeProps) => {
  const statusConfig: Record<DishStatus, { backgroundColor: string; textColor: string; text: string; icon: string }> = {
    Available: {
      backgroundColor: 'bg-gradient-to-r from-emerald-500 to-green-600',
      textColor: 'text-white',
      text: 'Disponible',
      icon: '✓'
    },
    SoldOut: {
      backgroundColor: 'bg-gradient-to-r from-rose-500 to-red-600',
      textColor: 'text-white',
      text: 'Agotado',
      icon: '✕'
    }
  }

  const config = statusConfig[status]
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-2.5 py-1 gap-1.5',
    lg: 'text-base px-3 py-1.5 gap-2'
  }

  return (
    <Badge
      className={`
        ${config.backgroundColor}
        ${config.textColor}
        ${sizeClasses[size]}
        ${className || ''}
        shadow-md hover:shadow-lg
        transition-all duration-300
        hover:scale-105
      `}
      aria-label={`Estado: ${config.text}`}
    >
      <span className="opacity-90">{config.icon}</span>
      <span className="font-semibold">{config.text}</span>
    </Badge>
  )
}
