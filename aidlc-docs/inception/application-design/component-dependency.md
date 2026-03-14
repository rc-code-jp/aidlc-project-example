# Component Dependency

## Dependency Matrix

| From | To | Purpose |
|---|---|---|
| Web UI Component | Analyze Image API Component | 画像を送信し判定結果を受け取る |
| Analyze Image API Component | Gemini Analysis Service Component | 判定処理を委譲する |
| Gemini Analysis Service Component | Gemini Client Component | 外部 AI API 呼び出しを実行する |
| Gemini Analysis Service Component | Configuration Component | プロンプト・モデル設定を取得する |
| Gemini Client Component | Configuration Component | API キーとモデル設定を取得する |

## Communication Pattern
- Web UI から Next.js の API Route へ HTTP リクエストを送る
- API Route はサービス層を呼び出し、Gemini API 呼び出しを内部モジュールへ委譲する
- Gemini API 応答はサービス層で正規化し、UI が扱いやすいレスポンスへ変換する

## Data Flow
```text
Browser UI
  -> /api/analyze
  -> Analyze Image Service
  -> Gemini Analysis Service
  -> Gemini Client
  -> Gemini API
  -> Gemini Client
  -> Gemini Analysis Service
  -> Analyze Image Service
  -> Browser UI
```
