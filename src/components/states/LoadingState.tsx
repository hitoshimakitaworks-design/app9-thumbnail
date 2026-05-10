'use client'

type Props = {
  message?: string
  count?: number
}

/**
 * 16:9 アスペクト比のスケルトンを count 個並べる。CLS（Cumulative Layout Shift）を防ぐため、
 * 画像取得中は実画像と同じ枠で淡いパルスアニメーションを表示する。
 */
export function LoadingState({ message, count = 4 }: Props) {
  return (
    <div>
      {message && (
        <p className="text-xs text-gray-500 text-center mb-4" aria-live="polite">
          {message}
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="status" aria-label={message || 'Loading'}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="w-full bg-gray-200 animate-pulse" style={{ aspectRatio: '16 / 9' }} />
            <div className="px-4 py-3 space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
