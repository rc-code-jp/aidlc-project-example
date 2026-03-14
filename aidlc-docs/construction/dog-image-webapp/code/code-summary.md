# Code Summary - dog-image-webapp

## Generated Application Files
- `package.json`
- `tsconfig.json`
- `next.config.ts`
- `next-env.d.ts`
- `vitest.config.ts`
- `vitest.setup.ts`
- `.env.local.example`
- `app/layout.tsx`
- `app/page.tsx`
- `app/api/analyze/route.ts`
- `app/globals.css`
- `src/types/analysis.ts`
- `src/lib/config.ts`
- `src/lib/prompt.ts`
- `src/lib/gemini-client.ts`
- `src/lib/analyze-image.ts`
- `tests/analyze-image.test.ts`
- `tests/api-analyze.test.ts`
- `tests/page.test.tsx`

## Story Coverage
- **US-01**: 画像アップロード UI と API 送信
- **US-02**: 判定中表示
- **US-03**: パーセントとラベル表示
- **US-04**: エラー表示と再試行

## Notes
- Gemini API キーは `.env.local` でサーバー側に設定する
- 実依存のインストールとテスト実行は Build and Test フェーズで行う
- Next.js は 16.0.10、React は 19.2.0 前提
