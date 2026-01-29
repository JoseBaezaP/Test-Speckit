import type { DishStatus } from '../../../lib/types'

interface StatusIndicatorProps {
  status: DishStatus
  size?: 'sm' | 'md' | 'lg'
}

export const StatusIndicator = ({ status, size = 'md' }: StatusIndicatorProps) => {
  const statusConfig = {
    Available: {
      backgroundColor: 'bg-emerald-500',
      dotColor: 'bg-emerald-300',
      textColor: 'text-emerald-50',
      text: 'Disponible'
    },
    SoldOut: {
      backgroundColor: 'bg-rose-500',
      dotColor: 'bg-rose-300',
      textColor: 'text-rose-50',
      text: 'Agotado'
    }
  }

  const config = statusConfig[status]
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10'
  }

  return (
    <div
      className={`flex items-center gap-2 rounded-full ${config.backgroundColor} px-3 py-1.5`}
      role="status"
      aria-label={`Estado: ${config.text}`}
    >
      <div
        className={`${sizeClasses[size]} rounded-full ${config.dotColor} animate-pulse`}
        aria-hidden="true"
      />
      <span className={`${config.textColor} text-sm font-medium`}>
        {config.text}
      </span>
    </div>
  )
}
