import { test, expect } from '@playwright/test'

const VIDEO_ID = 'dQw4w9WgXcQ'

test.describe('app9-thumbnail / e2e', () => {
  test('正常系：YouTube URLを入力して4種類のサムネイルが表示される', async ({ page }) => {
    await page.goto('/')

    // 空状態（EmptyState）が初期表示される
    await expect(page.getByText('YouTube URLを貼り付けてみましょう')).toBeVisible()

    // URL を入力 → 取得
    await page.getByTestId('url-input').fill(`https://www.youtube.com/watch?v=${VIDEO_ID}`)
    await page.getByTestId('get-button').click()

    // ローディング後にサムネ4枚が表示される
    const thumbs = page.locator('img[alt*="thumbnail"], img[alt*="サムネ"], img[alt*="HQ"], img[alt*="MQ"], img[alt*="SD"], img[alt*="Resolution"], img[alt*="最高画質"]')
    // alt はラベルテキストで構成されている。少なくとも1枚は読み込み完了する
    await expect(page.getByTestId('download-maxresdefault')).toBeVisible({ timeout: 5_000 })
    await expect(page.getByTestId('download-sddefault')).toBeVisible()
    await expect(page.getByTestId('download-hqdefault')).toBeVisible()
    await expect(page.getByTestId('download-mqdefault')).toBeVisible()

    // download 属性が動画IDを含む
    const href = await page.getByTestId('download-maxresdefault').getAttribute('download')
    expect(href).toContain(VIDEO_ID)
  })

  test('異常系：無効なURLを入力するとErrorStateが表示される', async ({ page }) => {
    await page.goto('/')

    await page.getByTestId('url-input').fill('https://example.com/not-a-video')
    await page.getByTestId('get-button').click()

    await expect(page.getByTestId('error-state')).toBeVisible()
    await expect(page.getByText('有効なYouTube URLまたは動画IDを入力してください。')).toBeVisible()

    // Retry（クリア）でエラーが消える
    await page.getByText('入力をクリア').click()
    await expect(page.getByTestId('error-state')).not.toBeVisible()
    await expect(page.getByText('YouTube URLを貼り付けてみましょう')).toBeVisible()
  })

  test('サンプル動画ボタンを押すと即座にサムネが取得される', async ({ page }) => {
    await page.goto('/')

    // EmptyState 内のサンプルチップを押す
    await page.getByTestId('sample-ZRtdQ81jPUQ').click()

    await expect(page.getByTestId('download-maxresdefault')).toBeVisible({ timeout: 5_000 })
    const href = await page.getByTestId('download-maxresdefault').getAttribute('download')
    expect(href).toContain('ZRtdQ81jPUQ')
  })

  test('URLコピーで Toast が表示される', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])
    await page.goto('/')

    await page.getByTestId('url-input').fill(`https://www.youtube.com/watch?v=${VIDEO_ID}`)
    await page.getByTestId('get-button').click()
    await expect(page.getByTestId('copy-maxresdefault')).toBeVisible({ timeout: 5_000 })

    await page.getByTestId('copy-maxresdefault').click()
    await expect(page.getByTestId('toast')).toBeVisible()
  })

  test('レスポンシブ：375px幅で横スクロールが発生しない', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 })
    await page.goto('/')
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1) // 1pxの誤差許容
  })

  test('Console Errors：ページ巡回時にエラーが0件', async ({ page }) => {
    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    await page.goto('/')
    await page.getByTestId('url-input').fill(`https://www.youtube.com/watch?v=${VIDEO_ID}`)
    await page.getByTestId('get-button').click()
    await page.waitForTimeout(800)
    expect(errors, errors.join('\n')).toHaveLength(0)
  })
})
