'use client'
import { AlertCircle, RotateCw } from 'lucide-react'

type Props = {
  message: string
  onRetry?: () => void
  retryLabel?: string
}

/**
 * Glassmorphism 系のエラーバナー。
 * 原色ベタ塗りの赤を避け、半透過 + backdrop-blur でモダンに表示する。
 */
export function ErrorState({ message, onRetry, retryLabel = 'Retry' }: Props) {
  return (
    <div
      role="alert"
      data-testid="error-state"
      className="flex items-start gap-3 mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 backdrop-blur-md"
    >
      <AlertCircle size={18} className="mt-0.5 flex-shrink-0 text-red-600 dark:text-red-400" aria-hidden="true" />
      <p className="flex-1 text-sm text-red-600 dark:text-red-400">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400 hover:underline min-h-[32px]"
        >
          <RotateCw size={12} aria-hidden="true" />
          {retryLabel}
        </button>
      )}
    </div>
  )
}
