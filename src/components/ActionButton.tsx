"use client"

import { useTransition } from "react"
import { toast } from "sonner"

export default function ActionButton({
  action,
  successMessage,
  children,
  className,
}: {
  action: (formData: FormData) => Promise<void>
  successMessage: string
  children: React.ReactNode
  className?: string
}) {
  const [isPending, startTransition] = useTransition()

  function handleSubmit(formData: FormData) {
    toast.success(successMessage)
    startTransition(() => action(formData))
  }

  return (
    <form action={handleSubmit}>
      <button type="submit" disabled={isPending} className={className}>
        {children}
      </button>
    </form>
  )
}
