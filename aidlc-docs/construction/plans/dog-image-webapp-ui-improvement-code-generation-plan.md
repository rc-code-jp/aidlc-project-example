# Dog Image Webapp UI Improvement Code Generation Plan

## Unit Context
- **Unit Name**: dog-image-webapp
- **Stories Implemented by This Unit**:
  - US-01 気持ちよく画像を選択できる
  - US-02 判定中の進行を迷わず理解できる
  - US-03 判定結果をひと目で理解できる
  - US-04 失敗してもすぐ立て直せる
- **Dependencies on Other Units/Services**:
  - `/api/analyze` の既存 API 契約
  - `AnalysisResponse` 型
- **Expected Interfaces and Contracts**:
  - `POST /api/analyze` は現状の `AnalysisResponse` を返す
  - 既存の `data-testid` はできるだけ維持し、必要に応じて追加する
- **Database Entities Owned by This Unit**: なし
- **Service Boundaries and Responsibilities**:
  - UI とスタイルの改善
  - 必要なフロントエンドテストの拡張

## Detailed Steps
- [x] Step 1: `aidlc-docs/aidlc-state.md`、reverse engineering、requirements、stories を読み、変更対象を `src/app/page.tsx`、`src/app/globals.css`、`tests/page.test.tsx` に確定する
- [x] Step 2: 既存 UI フローを維持しつつ、ドラッグアンドドロップ、画像プレビュー、強化された状態表示と結果表示の実装方針を定める
- [x] Step 3: `src/app/page.tsx` を更新し、アップロードエリア、プレビュー、送信導線、視覚的に強い結果表示、失敗時の再試行しやすい UI を実装する
- [x] Step 4: `src/app/globals.css` を更新し、トップページ全体のビジュアル、レスポンシブ、ドラッグ状態、結果カード、状態表示を改善する
- [x] Step 5: `tests/page.test.tsx` を更新し、初期表示、ファイル選択後の送信可能状態、プレビュー表示など主要 UI 状態を検証する
- [x] Step 6: `src/app/layout.tsx` は確認のみ行い、今回の UI 改善では更新不要と判断する
- [x] Step 7: UI 改善内容と変更ファイルを `aidlc-docs/construction/dog-image-webapp/code/code-summary.md` に反映する
- [x] Step 8: 計画の各完了項目を即時に `[x]` へ更新し、Code Generation 完了メッセージとレビュー依頼を出す
