export const en = {
  appName: 'YouTube Thumbnail Downloader',
  tagline: 'Paste a URL and download 4 thumbnail resolutions instantly',

  howToButton: 'How to use',
  howToTitle: 'How to use this app',
  howToClose: 'Close',

  howToSteps: [
    { title: 'STEP 1: Paste a YouTube URL', desc: 'Standard URLs (youtube.com/watch?v=...), short URLs (youtu.be/...), Shorts (/shorts/...), or an 11-character video ID all work.' },
    { title: 'STEP 2: Click "Get"', desc: 'Four thumbnail resolutions appear instantly: Max Resolution (1280×720), SD, HQ, and MQ.' },
    { title: 'STEP 3: Download or copy', desc: 'Use the "Download" button to save the image, or "Copy URL" to copy the image URL to your clipboard.' },
  ],
  howToNote: '※ Max Resolution (maxresdefault) may not exist for older videos. In that case it automatically falls back to SD.',

  feedbackButton: 'Feedback',
  feedbackTitle: 'Share your feedback',
  feedbackPlaceholder: 'Tell us what was hard to use, features you want, or bugs you found...',
  feedbackSubmit: 'Submit',
  feedbackSuccess: 'Thank you! We\'ll use your feedback to improve.',
  feedbackClose: 'Close',

  placeholderUrl: 'Paste YouTube URL or video ID...',
  getButton: 'Get',
  errorInvalidUrl: 'Please enter a valid YouTube URL or video ID.',
  errorRetry: 'Clear input',
  saveTipText: 'Use the "Download" button on each thumbnail to save the image',
  openButton: 'Open',
  downloadButton: 'Download',
  copyUrlButton: 'Copy URL',
  copiedLabel: 'Copied!',
  copiedToast: 'URL copied to clipboard',
  emptyTitle: 'Paste a YouTube URL to start',
  emptyDesc: 'Standard URL / short URL / Shorts / 11-char video ID — all supported.',
  emptyDemoLabel: 'Try with a sample',
  loadingThumb: 'Loading thumbnail...',
  samples: [
    { id: 'ZRtdQ81jPUQ', title: 'YOASOBI "Idol"' },
    { id: 'TX9qSaGXFyg', title: 'Apple Vision Pro Reveal' },
  ] as { id: string; title: string }[],
}
