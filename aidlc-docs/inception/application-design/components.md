# Components

## 1. Web UI Component
- **Purpose**: 利用者が画像をアップロードし、判定状態と結果を閲覧する
- **Responsibilities**:
  - 画像ファイル選択
  - 判定リクエスト送信
  - ローディング、成功、失敗状態の表示
  - 判定パーセントとラベルの表示
- **Interfaces**:
  - ブラウザ UI
  - Internal API Client

## 2. Analyze Image API Component
- **Purpose**: 画像を受け取り、Gemini 判定を実行して結果を返す
- **Responsibilities**:
  - multipart/form-data または同等形式で画像を受信
  - 入力検証
  - Gemini Analysis Service 呼び出し
  - UI 向けレスポンス整形
- **Interfaces**:
  - HTTP POST `/api/analyze`
  - Gemini Analysis Service

## 3. Gemini Analysis Service Component
- **Purpose**: 犬判定仕様に基づいて Gemini API を呼び出す
- **Responsibilities**:
  - システムプロンプトの組み立て
  - 画像データとプロンプトを Gemini Client へ渡す
  - 応答 JSON の検証と正規化
  - `percentage` と `label` の導出
- **Interfaces**:
  - Analyze Image API Component
  - Gemini Client Component

## 4. Gemini Client Component
- **Purpose**: 外部 Gemini API との通信を担当する
- **Responsibilities**:
  - HTTP リクエスト送信
  - API キー付与
  - タイムアウトや API エラーのハンドリング
- **Interfaces**:
  - Gemini Analysis Service
  - External Gemini API

## 5. Configuration Component
- **Purpose**: 環境変数と設定値を安全に提供する
- **Responsibilities**:
  - Gemini API キーの読込
  - モデル名やタイムアウトなどの設定提供
  - 起動時バリデーション
- **Interfaces**:
  - Gemini Client
  - Gemini Analysis Service
