// src/hooks/use-toast.ts
import {
  useToast as useRadixToast,
  type ToastProps,
  type ToastActionElement,
} from "@/components/ui/use-toast"

export const toast = useRadixToast
export type { ToastProps, ToastActionElement }
