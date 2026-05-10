'use client'
import { useI18n } from '@/lib/i18n'
import Link from 'next/link'

export function Footer() {
  const { t, lang } = useI18n()
  const links = lang === 'ja'
    ? [['プライバシーポリシー', '/privacy'], ['利用規約', '/terms'], ['特定商取引法に基づく表記', '/legal']]
    : [['Privacy Policy', '/privacy'], ['Terms of Service', '/terms'], ['Legal Notice', '/legal']]
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-6 mt-8 no-print">
      {/* WCAG AA (4.5:1) を満たすコントラストに調整（旧 text-gray-400/300 は bg-gray-50 上で 2.48〜1.4 だった） */}
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-xs text-gray-600">{t.appName} — {t.tagline}</p>
        <p className="text-xs text-gray-500 mt-1">© 2026 Free to use</p>
        <div className="flex justify-center gap-4 mt-2 flex-wrap">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="text-xs text-gray-600 hover:text-gray-800 underline">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
