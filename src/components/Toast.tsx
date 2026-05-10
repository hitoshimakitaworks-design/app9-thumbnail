'use client'
import { useEffect } from 'react'
import { Check } from 'lucide-react'

type Props = {
  message: string
  visible: boolean
  onHide: () => void
  durationMs?: number
}

/**
 * 画面下部からフワッと出るシンプルな Toast。
 * sonner 等を追加導入せずに、依存ゼロで実装。
 */
export function Toast({ message, visible, onHide, durationMs = 1800 }: Props) {
  useEffect(() => {
    if (!visible) return
    const id = setTimeout(onHide, durationMs)
    return () => clearTimeout(id)
  }, [visible, durationMs, onHide])

  return (
    <div
      role="status"
      aria-live="polite"
      data-testid="toast"
      className={`fixed left-1/2 -translate-x-1/2 bottom-6 z-50 transition-all duration-300 pointer-events-none ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-900/90 backdrop-blur-md text-white text-sm shadow-lg">
        <Check size={16} aria-hidden="true" className="text-green-400" />
        <span>{message}</span>
      </div>
    </div>
  )
}
