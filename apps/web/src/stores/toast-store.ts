import { ReactNode } from 'react'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface ToastData {
  title: string
  description?: string
  actions?: ReactNode[] | undefined
}

interface ToastStore {
  isOpen: boolean
  toast: ToastData | undefined
  showToast: (input: ToastData) => void
  toggleToast: (open: boolean) => void
}

/**
 * Store to manage the
 * toast data and passing to other state component
 */
const useToastStore = create(
  immer<ToastStore>((set) => ({
    isOpen: false,
    toast: undefined,
    showToast: (input) => {
      set((state) => {
        state.toast = input
        state.isOpen = true
      })
    },
    toggleToast: (open) => {
      set((state) => {
        state.toast = undefined
        state.isOpen = open
      })
    },
  })),
)

export default useToastStore
