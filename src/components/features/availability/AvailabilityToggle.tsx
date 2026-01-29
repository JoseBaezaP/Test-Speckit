import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { Button } from '../../ui/button'
import type { DishStatus } from '../../../lib/types'

interface AvailabilityToggleProps {
  status: DishStatus
  onToggle: () => void
  disabled?: boolean
  isLoading?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export const AvailabilityToggle = ({ status, onToggle, disabled = false, isLoading = false, size = 'md' }: AvailabilityToggleProps) => {
  const [localLoading, setLocalLoading] = useState(false)

  const isAvailable = status === 'Available'
  const isDisabled = disabled || isLoading || localLoading

  const handleToggle = () => {
    setLocalLoading(true)
    onToggle()
    setTimeout(() => setLocalLoading(false), 300)
  }

  const sizeClasses = {
    sm: 'h-9 w-9',
    md: 'h-10 w-10',
    lg: 'h-11 w-11'
  }

  const iconSize = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  }

  return (
    <Button
      variant={isAvailable ? 'default' : 'destructive'}
      size="icon"
      onClick={handleToggle}
      disabled={isDisabled}
      className={`
        ${sizeClasses[size]}
        transition-all duration-300
        ${isAvailable
          ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-md hover:shadow-lg hover:scale-110'
          : 'bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 shadow-md hover:shadow-lg hover:scale-110'
        }
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      aria-label={
        isAvailable
          ? 'Marcar como agotado'
          : 'Marcar como disponible'
      }
      aria-pressed={!isAvailable}
    >
      {isLoading || localLoading ? (
        <svg
          className={`animate-spin ${iconSize[size]}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : isAvailable ? (
        <div className="flex items-center justify-center">
          <Check className={iconSize[size]} />
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <X className={iconSize[size]} />
        </div>
      )}
    </Button>
  )
}
