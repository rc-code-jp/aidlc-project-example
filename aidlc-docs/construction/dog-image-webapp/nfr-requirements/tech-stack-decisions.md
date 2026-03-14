# Tech Stack Decisions - dog-image-webapp

## Selected Stack
- **Frontend**: Next.js App Router
- **Backend/API**: Next.js Route Handler
- **Language**: TypeScript
- **AI Integration**: Gemini API
- **Runtime Baseline**: Node.js 20.9+

## Rationale
- Next.js に統合することで、フロントエンドとサーバー API を単一構成で管理できる
- TypeScript により API 入出力と AI 応答整形の型安全性を確保しやすい
- Route Handler を使うことで API キーをサーバー側に閉じ込められる
- 初期版はローカル実行が主目的のため、追加インフラなしで開発しやすい構成を優先する
- Next.js 16 系の要件に合わせて Node.js 20.9+ を前提とする

## Operational Decisions
- 監視や集中ログ基盤は初期版では導入しない
- 失敗時は UI 再試行を優先し、自動リトライは導入しない
- 永続ストレージは利用しない

## Future Expansion Notes
- 将来的にクラウド展開する場合も Next.js ベースのままホスティング先を選択しやすい
- 高負荷対応が必要になれば API キャッシュ、キューイング、監視基盤を追加検討する
