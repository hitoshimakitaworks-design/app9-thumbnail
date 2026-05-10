'use client'
import type { ReactNode } from 'react'

type Props = {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ icon, title, description, action }: Props) {
  return (
    <div className="text-center py-10 px-6 bg-white border border-dashed border-gray-300 rounded-2xl">
      {icon && <div className="mx-auto mb-3 text-gray-300 flex items-center justify-center">{icon}</div>}
      <p className="text-base font-semibold text-gray-700 mb-1">{title}</p>
      {description && <p className="text-xs text-gray-500 mb-4 break-words">{description}</p>}
      {action && <div className="mt-2 flex flex-wrap gap-2 justify-center">{action}</div>}
    </div>
  )
}
