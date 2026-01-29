import { UtensilsCrossed } from 'lucide-react'
import { Card } from '../ui/card'

interface HeaderProps {
  title?: string
  logo?: string | React.ReactNode
}

export const Header = ({ title = 'Restaurante', logo }: HeaderProps) => {
  return (
    <Card className="border-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 p-6 shadow-xl">
      <header className="flex items-center gap-4">
        {logo ? (
          typeof logo === 'string' ? (
            <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-sm text-white shadow-lg border-2 border-white/30">
              <span className="text-2xl font-bold">{logo[0]}</span>
            </div>
          ) : (
            logo
          )
        ) : (
          <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-sm text-white shadow-lg border-2 border-white/30">
            <UtensilsCrossed className="h-7 w-7" />
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white tracking-tight">{title}</h1>
          <p className="text-white/80 text-sm mt-1">Sistema de Gestión de Menú</p>
        </div>
      </header>
    </Card>
  )
}
