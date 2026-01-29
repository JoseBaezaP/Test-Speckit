import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../../ui/button'
import { Card } from '../../ui/card'
import { Input } from '../../ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form'
import { dishCreationSchema, type DishCreationData } from '../../../lib/validations'
import { CATEGORY_OPTIONS } from '../../../lib/constants'
import { useToast } from '../../../hooks/useToast'
import { useDishes } from '../../../hooks/useDishes'

export const DishForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { showToast } = useToast()
  const { dishes, addDish } = useDishes()

  const form = useForm<DishCreationData>({
    resolver: zodResolver(dishCreationSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: CATEGORY_OPTIONS[0],
    },
  })

  const onSubmit = async (data: DishCreationData) => {
    setIsLoading(true)

    const nameExists = dishes.some(
      dish => dish.name.toLowerCase() === data.name.toLowerCase()
    )

    if (nameExists) {
      showToast({
        message: 'El nombre del platillo ya existe en el menú',
        type: 'error',
        duration: 5000,
      })
      setIsLoading(false)
      return
    }

    setTimeout(() => {
      const newDish = {
        id: Date.now().toString(),
        ...data,
        status: 'Available' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      addDish(newDish)
      form.reset()
      showToast({
        message: 'Platillo registrado correctamente',
        type: 'success',
        duration: 5000,
      })
      setIsLoading(false)
    }, 500)
  }

  return (
    <Card className="border-2 border-white/50 bg-white/90 backdrop-blur-md shadow-2xl">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg">
            <span className="text-2xl">🍽</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Nuevo Platillo
            </h2>
            <p className="text-gray-600 text-sm mt-1">Completa el formulario para agregar un nuevo platillo al menú</p>
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-gray-700 font-semibold">Nombre del Platillo</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Ej: Hamburguesa Trufada"
                      disabled={isLoading}
                      className="h-12 text-base border-2 border-gray-200 bg-white/80 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  </FormControl>
                  <FormMessage className="text-rose-600 font-medium" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-gray-700 font-semibold">Descripción</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="Ej: Carne angus y trufa"
                      disabled={isLoading}
                      className="flex min-h-[100px] w-full rounded-xl border-2 border-gray-200 bg-white/80 px-4 py-3 text-base ring-offset-background placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage className="text-rose-600 font-medium" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-gray-700 font-semibold">Precio ($)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        step="0.01"
                        min="0.01"
                        max="999999.99"
                        placeholder="0.00"
                        disabled={isLoading}
                        className="h-12 text-base border-2 border-gray-200 bg-white/80 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                        onChange={(e) => {
                          const value = parseFloat(e.target.value)
                          field.onChange(isNaN(value) ? 0 : value)
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-rose-600 font-medium" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-gray-700 font-semibold">Categoría</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        disabled={isLoading}
                        className="flex h-12 w-full rounded-xl border-2 border-gray-200 bg-white/80 px-4 py-3 text-base ring-offset-background focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 cursor-pointer"
                      >
                        {CATEGORY_OPTIONS.map(option => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage className="text-rose-600 font-medium" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className={`
                  w-full sm:w-auto h-12 px-8 text-base
                  bg-gradient-to-r from-blue-500 to-indigo-600
                  hover:from-blue-600 hover:to-indigo-700
                  shadow-lg hover:shadow-xl
                  transition-all duration-300
                  hover:scale-105 active:scale-95
                  ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}
                `}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
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
                    Guardando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2 font-semibold">
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Guardar Platillo
                  </span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Card>
  )
}
