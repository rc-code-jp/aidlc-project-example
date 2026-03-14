# Application Design

## Design Summary
- **Selected Stack**: Next.js
- **Architecture Style**: 単一リポジトリ内のフロントエンド + サーバー API 構成
- **Primary Goal**: シンプルな UI から画像を送信し、サーバー側で Gemini API を利用して犬判定を返す

## Design Decisions
- フロントエンドと API を Next.js に統合し、初期実装の複雑さを抑える
- Gemini API キーはサーバー側のみで保持する
- AI 呼び出し処理は UI から分離し、サービスとクライアント層へ閉じ込める
- 画像は永続化せず、判定完了後に保持しない

## Artifacts
- `components.md`: コンポーネント責務
- `component-methods.md`: 主要メソッドと I/O
- `services.md`: サービス責務とオーケストレーション
- `component-dependency.md`: 依存関係とデータフロー

## Consistency Check
- 要件の API キー保護は Configuration Component とサーバー API 経由の構成で満たす
- ユーザーストーリーのアップロード、ローディング、結果表示、エラー再試行は Web UI と Analyze Image API の責務でカバーする
- 将来のクラウド配置に向けても、Gemini 連携を専用コンポーネントとして分離できている
