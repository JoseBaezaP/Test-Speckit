import type { ReactNode } from 'react'
import { useToast } from '@/hooks/useToast'
import { Card } from '../ui/card'

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const { toasts } = useToast()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Card className="mx-4 my-8 p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
            <span className="text-lg">🍽</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Sistema de Menú
          </h1>
        </div>
        {children}
      </Card>

      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((toast: { id: string; message: string; type: 'success' | 'error' | 'info' }) => (
          <div
            key={toast.id}
            className={`animate-in slide-in-from-right duration-300 p-4 rounded-xl shadow-2xl text-white backdrop-blur-sm ${toast.type === 'success'
              ? 'bg-gradient-to-r from-emerald-500 to-green-600'
              : toast.type === 'error'
                ? 'bg-gradient-to-r from-rose-500 to-red-600'
                : 'bg-gradient-to-r from-blue-500 to-indigo-600'
              }`}
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-white/20">
                {toast.type === 'success' && <span className="text-lg">✓</span>}
                {toast.type === 'error' && <span className="text-lg">✕</span>}
                {toast.type === 'info' && <span className="text-lg">ℹ</span>}
              </span>
              <span className="font-medium">{toast.message}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
