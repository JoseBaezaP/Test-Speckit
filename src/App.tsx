import { useState } from 'react'
import { Header } from './components/layout/Header'
import { Navigation } from './components/layout/Navigation'
import { DishForm } from './components/features/dish-form/DishForm'
import { DishTable } from './components/features/dish-table/DishTable'
import { useDishes } from './hooks/useDishes'
import './App.css'

function App() {
  const [activeRoute, setActiveRoute] = useState<'dashboard' | 'menu'>('dashboard')
  const { dishes, updateDish, deleteDish } = useDishes()

  const handleStatusToggle = (dishId: string) => {
    const dish = dishes.find(d => d.id === dishId)
    if (dish) {
      updateDish({
        ...dish,
        status: dish.status === 'Available' ? 'SoldOut' : 'Available',
        updatedAt: new Date().toISOString()
      })
    }
  }

  const handleDelete = (dishId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este platillo?')) {
      deleteDish(dishId)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header title="Sistema de Menú" logo="" />
      <Navigation activeRoute={activeRoute} onNavigate={setActiveRoute} />

      <main className="p-4 md:p-8">
        {activeRoute === 'dashboard' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
            <DishForm />
          </div>
        )}

        {activeRoute === 'menu' && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">Menú de Platillos</h2>
            <DishTable
              dishes={dishes}
              onEdit={(dish) => console.log('Edit:', dish)}
              onDelete={handleDelete}
              onStatusToggle={handleStatusToggle}
            />
          </div>
        )}
      </main>
    </div>
  )
}

export default App
