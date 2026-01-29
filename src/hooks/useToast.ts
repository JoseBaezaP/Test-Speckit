import { useState, useCallback } from 'react'
import type { ToastMessage } from '../lib/types'

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const showToast = useCallback((message: Omit<ToastMessage, 'id'>) => {
    const newToast: ToastMessage = {
      id: Date.now().toString(),
      ...message
    }
    setToasts(prev => [...prev, newToast])

    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== newToast.id))
      }, newToast.duration)
    }
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return { toasts, showToast, removeToast }
}
