export const ja = {
  appName: 'YouTubeサムネイル取得ツール',
  tagline: 'URLを貼るだけで4解像度のサムネイルをダウンロード',

  howToButton: '使い方',
  howToTitle: 'このアプリの使い方',
  howToClose: '閉じる',

  howToSteps: [
    { title: 'STEP 1：YouTube URLを貼り付け', desc: '通常の動画URL（youtube.com/watch?v=...）、短縮URL（youtu.be/...）、ショート（/shorts/...）、または11桁の動画IDがそのまま使えます。' },
    { title: 'STEP 2：「取得」ボタンを押す', desc: '最高画質（1280×720）・SD・HQ・MQ の4種類のサムネイル画像が一覧表示されます。' },
    { title: 'STEP 3：ダウンロードまたはコピー', desc: '各サムネの「ダウンロード」ボタンで保存、「URLコピー」で画像URLをクリップボードに保存できます。' },
  ],
  howToNote: '※ 最高画質（maxresdefault）は古い動画では存在しないことがあり、その場合は自動でSDにフォールバックします。',

  feedbackButton: 'ご意見',
  feedbackTitle: 'ご意見・ご要望',
  feedbackPlaceholder: '使いにくかった点、欲しい機能、バグなどを教えてください...',
  feedbackSubmit: '送信する',
  feedbackSuccess: '送信ありがとうございます！いただいたご意見をもとに改善します。',
  feedbackClose: '閉じる',

  placeholderUrl: 'YouTube URLまたは動画IDを貼り付け...',
  getButton: '取得',
  errorInvalidUrl: '有効なYouTube URLまたは動画IDを入力してください。',
  errorRetry: '入力をクリア',
  saveTipText: '各サムネの「ダウンロード」ボタンで画像を保存できます',
  openButton: '開く',
  downloadButton: 'ダウンロード',
  copyUrlButton: 'URLコピー',
  copiedLabel: 'コピーしました！',
  copiedToast: 'URLをコピーしました',
  emptyTitle: 'YouTube URLを貼り付けてみましょう',
  emptyDesc: '通常URL／短縮URL／ショート／11桁の動画ID、すべて対応しています。',
  emptyDemoLabel: 'サンプルで試す',
  loadingThumb: 'サムネイルを取得中...',
  // ワンクリックで動作確認できるサンプル動画候補（高品質サムネを持つ著名動画）
  // YOASOBI「アイドル」 / Apple Vision Pro 紹介 の2本を用意。
  samples: [
    { id: 'ZRtdQ81jPUQ', title: 'YOASOBI「アイドル」' },
    { id: 'TX9qSaGXFyg', title: 'Apple Vision Pro 紹介' },
  ] as { id: string; title: string }[],
}
