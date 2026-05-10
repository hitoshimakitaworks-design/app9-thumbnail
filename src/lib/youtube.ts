/**
 * YouTube URL / 動画ID 関連のユーティリティ。
 * テスト容易性のため page.tsx から切り出し。
 */

export function extractVideoId(url: string): string | null {
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

export function thumbUrl(videoId: string, size: string): string {
  return `https://img.youtube.com/vi/${videoId}/${size}.jpg`
}
