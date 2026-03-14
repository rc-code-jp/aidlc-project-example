# Dog Image Judge

Gemini API を使って、アップロード画像に犬が写っている度をパーセント表示する Next.js アプリです。

## セットアップ

前提:
- Node.js 20.9 以上

1. `cp .env.local.example .env.local`
2. `.env.local` に `GEMINI_API_KEY` を設定
3. `npm install`
4. `npm run dev`

## 主な機能

- 画像アップロード
- 犬らしさのパーセント表示
- `犬` / `犬っぽい` / `犬ではない` ラベル表示
- Gemini API 失敗時の再試行可能なエラー表示
