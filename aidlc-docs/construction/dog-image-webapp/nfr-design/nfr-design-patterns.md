# NFR Design Patterns - dog-image-webapp

## Security Pattern
- **Server-side Secret Pattern** を採用する
- Gemini API キーは Route Handler からのみ参照し、クライアントバンドルへ含めない
- 外部 API エラーは一般化したメッセージへ変換し、内部情報を露出しない

## Reliability Pattern
- **Graceful Failure with Manual Retry** を採用する
- Gemini API 失敗時は UI が失敗状態を表示し、再送操作で再試行させる
- 自動リトライは初期版では採用しない

## Performance Pattern
- **Async Request with Explicit Loading State** を採用する
- AI 推論が数秒かかる前提で、クライアントはローディング表示を維持する
- 不要な多重送信を避けるため、送信中は操作制御を行う

## Maintainability Pattern
- **Layered Module Separation** を採用する
- UI、Route Handler、Gemini Service、Gemini Client、Config を分離する
- レスポンス正規化は専用関数に集約し、テスト容易性を高める

## Accessibility Pattern
- **Accessible Status Messaging** を採用する
- 状態表示にはテキストを含め、視覚表現だけに依存しない
- ラベル付きファイル入力、エラーメッセージ、結果表示を明示する
