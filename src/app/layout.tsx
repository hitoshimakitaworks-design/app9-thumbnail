import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { I18nProvider } from '@/lib/i18n'
import { HowToProvider } from '@/lib/howToContext'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CookieBanner } from '@/components/CookieBanner'
import { HowToDrawer } from '@/components/HowToDrawer'
import { HowToLayout } from '@/components/HowToLayout'
import { FeedbackWidget } from '@/components/FeedbackWidget'
import { PaywallBanner } from '@/components/PaywallBanner'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'YouTubeサムネイル取得ツール | 4解像度・無料・URLを貼るだけ',
  description: 'YouTubeのURLを貼るだけで、最高画質(1280×720)・SD・HQ・MQの4解像度のサムネイル画像をワンクリックで取得・ダウンロードできる無料ツール。スマホ対応。Free YouTube thumbnail downloader.',
  openGraph: {
    title: 'YouTubeサムネイル取得ツール | 4解像度・無料',
    description: 'YouTubeのURLを貼るだけで4解像度のサムネ画像を即取得。スマホでもダウンロード可。',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={inter.variable}>
      <body className="min-h-screen bg-gray-50 font-sans">
        <I18nProvider>
          <HowToProvider>
            {/* HowToLayout：PCでパネルが開いたときにコンテンツを左に寄せる */}
            <HowToLayout>
              <Header />
              {children}
              <Footer />
            </HowToLayout>
            {/* 右側スライドインパネル */}
            <HowToDrawer />
            {/* フィードバックボタン（右下フローティング） */}
            <FeedbackWidget />
            {/* 使用量上限CTA（100ユーザー達成後に表示） */}
            <PaywallBanner />
            <CookieBanner />
          </HowToProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
