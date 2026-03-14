# Services

## Analyze Image Service
- **Responsibilities**:
  - API リクエストから画像を受け取る
  - Gemini Analysis Service へ処理委譲する
  - フロントエンド向けレスポンス形式へ整える
- **Interactions**:
  - Web UI から呼ばれる
  - Gemini Analysis Service を利用する

## Gemini Analysis Service
- **Responsibilities**:
  - 犬判定仕様を Gemini に適用する
  - モデル出力の JSON を検証する
  - `犬` / `犬っぽい` / `犬ではない` への分類を確定する
- **Interactions**:
  - Analyze Image Service から呼ばれる
  - Gemini Client と Configuration Component を利用する

## Configuration Service
- **Responsibilities**:
  - API キーやモデル名の設定供給
  - 実行時の必須設定チェック
- **Interactions**:
  - Gemini Client と Gemini Analysis Service へ設定を提供する
