import { LayoutDashboard, UtensilsCrossed } from 'lucide-react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'

interface NavigationProps {
  activeRoute: 'dashboard' | 'menu'
  onNavigate: (route: 'dashboard' | 'menu') => void
  logo?: string | React.ReactNode
}

export const Navigation = ({ activeRoute, onNavigate, logo }: NavigationProps) => {
  const navItems = [
    {
      id: 'dashboard' as const,
      label: 'Dashboard',
      icon: LayoutDashboard,
      ariaLabel: 'Ir al Dashboard'
    },
    {
      id: 'menu' as const,
      label: 'Menú',
      icon: UtensilsCrossed,
      ariaLabel: 'Ir al Menú'
    }
  ]

  return (
    <Card className="p-2 border-2 border-white/50 bg-white/90 backdrop-blur-md shadow-xl">
      <nav className="flex flex-col sm:flex-row items-center gap-2" role="navigation" aria-label="Navegación principal">
        {logo && (
          <div className="mb-2 sm:mb-0 sm:mr-4">
            {typeof logo === 'string' ? (
              <div className="text-xl font-bold">{logo}</div>
            ) : (
              logo
            )}
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeRoute === item.id

            return (
              <Button
                key={item.id}
                variant={isActive ? 'default' : 'ghost'}
                onClick={() => onNavigate(item.id)}
                aria-label={item.ariaLabel}
                aria-current={isActive ? 'page' : undefined}
                className={`
                  justify-start w-full sm:w-auto
                  transition-all duration-300
                  ${isActive
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl scale-105'
                    : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 text-gray-700 hover:text-blue-700'
                  }
                `}
              >
                <Icon className={`h-5 w-5 mr-2 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
                <span className={`font-medium transition-all duration-300 ${isActive ? 'font-semibold' : ''}`}>{item.label}</span>
              </Button>
            )
          })}
        </div>
      </nav>
    </Card>
  )
}
