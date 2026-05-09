'use client'
import { useState } from 'react'
import { useI18n } from '@/lib/i18n'
import { Search, ExternalLink, AlertCircle } from 'lucide-react'

const SIZES = [
  { key: 'maxresdefault', label: '最高画質', labelEn: 'Max Resolution', size: '1280×720' },
  { key: 'sddefault',     label: 'SD',       labelEn: 'SD',             size: '640×480'  },
  { key: 'hqdefault',     label: 'HQ',       labelEn: 'HQ',             size: '480×360'  },
  { key: 'mqdefault',     label: 'MQ',       labelEn: 'MQ',             size: '320×180'  },
] as const

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?(?:.*&)?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ]
  const trimmed = url.trim()
  for (const pat of patterns) {
    const m = trimmed.match(pat)
    if (m) return m[1]
  }
  return null
}

function thumbUrl(videoId: string, size: string): string {
  return `https://img.youtube.com/vi/${videoId}/${size}.jpg`
}

export default function Home() {
  const { t, lang } = useI18n()
  const [inputUrl, setInputUrl] = useState('')
  const [videoId, setVideoId] = useState<string | null>(null)
  const [error, setError] = useState(false)

  const handleSearch = () => {
    if (!inputUrl.trim()) return
    const id = extractVideoId(inputUrl)
    if (id) {
      setVideoId(id)
      setError(false)
    } else {
      setVideoId(null)
      setError(true)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
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
          placeholder={lang === 'ja' ? 'YouTube URLまたは動画IDを入力...' : 'Paste YouTube URL or video ID...'}
          value={inputUrl}
          onChange={e => setInputUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearch}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-xl transition-colors min-h-[44px]"
        >
          <Search size={18} />
          {lang === 'ja' ? '取得' : 'Get'}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5 text-red-600 text-sm">
          <AlertCircle size={16} />
          {lang === 'ja'
            ? '有効なYouTube URLまたは動画IDを入力してください。'
            : 'Please enter a valid YouTube URL or video ID.'}
        </div>
      )}

      {videoId && (
        <>
          <p className="text-xs text-gray-400 text-center mb-4">
            {lang === 'ja'
              ? '右クリック →「名前を付けて画像を保存」でダウンロードできます'
              : 'Right-click the image → "Save image as" to download'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SIZES.map(({ key, label, labelEn, size }) => (
              <div key={key} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <img
                  src={thumbUrl(videoId, key)}
                  alt={`${key} thumbnail`}
                  className="w-full object-cover"
                  loading="lazy"
                />
                <div className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">{lang === 'ja' ? label : labelEn}</p>
                    <p className="text-xs text-gray-400">{size}</p>
                  </div>
                  <a
                    href={thumbUrl(videoId, key)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium min-h-[44px] px-2"
                  >
                    <ExternalLink size={14} />
                    {lang === 'ja' ? '開く' : 'Open'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  )
}
