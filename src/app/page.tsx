'use client'
import { useState } from 'react'
import { useI18n } from '@/lib/i18n'
import { Search, ExternalLink, Download, Copy, Check, Youtube, Play } from 'lucide-react'
import { extractVideoId, thumbUrl } from '@/lib/youtube'
import { EmptyState } from '@/components/states/EmptyState'
import { LoadingState } from '@/components/states/LoadingState'
import { ErrorState } from '@/components/states/ErrorState'
import { Toast } from '@/components/Toast'

const SIZES = [
  { key: 'maxresdefault', label: '最高画質', labelEn: 'Max Resolution', size: '1280×720' },
  { key: 'sddefault',     label: 'SD',       labelEn: 'SD',             size: '640×480'  },
  { key: 'hqdefault',     label: 'HQ',       labelEn: 'HQ',             size: '480×360'  },
  { key: 'mqdefault',     label: 'MQ',       labelEn: 'MQ',             size: '320×180'  },
] as const

const LOADING_MS = 350

export default function Home() {
  const { t, lang } = useI18n()
  const [inputUrl, setInputUrl] = useState('')
  const [videoId, setVideoId] = useState<string | null>(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [toastVisible, setToastVisible] = useState(false)

  const runWithId = (id: string) => {
    setError(false)
    setLoading(true)
    setVideoId(null)
    // 短いスケルトンを意図的に表示し、CLS と「処理されたか不明」体験を防ぐ
    window.setTimeout(() => {
      setVideoId(id)
      setLoading(false)
    }, LOADING_MS)
  }

  const handleSearch = () => {
    if (!inputUrl.trim()) return
    const id = extractVideoId(inputUrl)
    if (id) {
      runWithId(id)
    } else {
      setVideoId(null)
      setLoading(false)
      setError(true)
    }
  }

  const handleClear = () => {
    setInputUrl('')
    setError(false)
    setVideoId(null)
  }

  const handleSampleClick = (sampleId: string, sampleUrl: string) => {
    setInputUrl(sampleUrl)
    runWithId(sampleId)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
  }

  const handleCopy = async (url: string, key: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedKey(key)
      setToastVisible(true)
      // ハプティックフィードバック（対応端末のみ）
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try { navigator.vibrate(50) } catch { /* iOS等で未対応 */ }
      }
      setTimeout(() => setCopiedKey(null), 1500)
    } catch {
      // クリップボード失敗時は無視
    }
  }

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>, key: string) => {
    if (key === 'maxresdefault' && videoId) {
      e.currentTarget.src = thumbUrl(videoId, 'sddefault')
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t.appName}</h1>
        <p className="text-base text-gray-500">{t.tagline}</p>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          inputMode="url"
          // iOS Safari でのフォーカス時ズーム防止のため text-base (=16px) を維持
          placeholder={t.placeholderUrl}
          value={inputUrl}
          onChange={e => setInputUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label={t.placeholderUrl}
          data-testid="url-input"
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearch}
          data-testid="get-button"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-xl transition-all hover:scale-105 min-h-[48px] min-w-[88px] justify-center"
        >
          <Search size={18} aria-hidden="true" />
          {t.getButton}
        </button>
      </div>

      {error && (
        <ErrorState
          message={t.errorInvalidUrl}
          onRetry={handleClear}
          retryLabel={t.errorRetry}
        />
      )}

      {!videoId && !loading && !error && (
        <EmptyState
          icon={<Youtube size={48} />}
          title={t.emptyTitle}
          description={t.emptyDesc}
          action={
            <>
              {t.samples.map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSampleClick(s.id, `https://www.youtube.com/watch?v=${s.id}`)}
                  data-testid={`sample-${s.id}`}
                  className="inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium px-3.5 py-2 rounded-full border border-blue-100 transition-all hover:scale-105 min-h-[36px]"
                >
                  <Play size={14} aria-hidden="true" />
                  {t.emptyDemoLabel}：{s.title}
                </button>
              ))}
            </>
          }
        />
      )}

      {loading && <LoadingState message={t.loadingThumb} count={4} />}

      {videoId && !loading && (
        <>
          <p className="text-xs text-gray-500 text-center mb-4">{t.saveTipText}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SIZES.map(({ key, label, labelEn, size }) => {
              const url = thumbUrl(videoId, key)
              const labelText = lang === 'ja' ? label : labelEn
              return (
                <div key={key} className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all hover:shadow-md">
                  <div className="bg-gray-100" style={{ aspectRatio: '16 / 9' }}>
                    <img
                      src={url}
                      alt={`${labelText} (${size}) - ${t.appName}`}
                      onError={(e) => handleImgError(e, key)}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={1280}
                      height={720}
                    />
                  </div>
                  <div className="px-4 py-3">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-semibold text-gray-700">{labelText}</p>
                      <p className="text-xs text-gray-400">{size}</p>
                    </div>
                    <div className="flex gap-2">
                      {/* Primary: ダウンロード */}
                      <a
                        href={url}
                        download={`${videoId}_${key}.jpg`}
                        data-testid={`download-${key}`}
                        className="flex-1 flex items-center justify-center gap-1.5 text-sm bg-blue-600 hover:bg-blue-700 hover:scale-105 text-white font-medium rounded-xl min-h-[48px] px-3 transition-all"
                      >
                        <Download size={14} aria-hidden="true" />
                        {t.downloadButton}
                      </a>
                      {/* Secondary outline: URLコピー */}
                      <button
                        type="button"
                        onClick={() => handleCopy(url, key)}
                        data-testid={`copy-${key}`}
                        className="flex items-center justify-center gap-1.5 text-sm border border-blue-600 text-blue-600 hover:bg-blue-50 hover:scale-105 font-medium rounded-xl min-h-[48px] min-w-[48px] px-3 transition-all"
                        aria-label={t.copyUrlButton}
                      >
                        {copiedKey === key ? (
                          <>
                            <Check size={14} aria-hidden="true" />
                            <span className="hidden sm:inline">{t.copiedLabel}</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} aria-hidden="true" />
                            <span className="hidden sm:inline">{t.copyUrlButton}</span>
                          </>
                        )}
                      </button>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 text-sm border border-gray-300 hover:bg-gray-50 hover:scale-105 text-gray-700 font-medium rounded-xl min-h-[48px] min-w-[48px] px-3 transition-all"
                        aria-label={t.openButton}
                      >
                        <ExternalLink size={14} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      <Toast message={t.copiedToast} visible={toastVisible} onHide={() => setToastVisible(false)} />
    </main>
  )
}
