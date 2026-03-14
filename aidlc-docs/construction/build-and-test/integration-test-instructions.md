# Integration Test Instructions

## Purpose
UI、API Route、Gemini 連携準備のつながりを確認する。

## Test Scenarios

### Scenario 1: Browser UI -> API Route
- **Description**: 画像アップロード操作から `/api/analyze` 呼び出しまでの連携を確認
- **Setup**: `.env.local` を設定し、開発サーバーを起動
- **Test Steps**:
  1. `npm run dev` を実行
  2. ブラウザで `http://localhost:3000` を開く
  3. 画像を選択し、判定実行ボタンを押す
- **Expected Results**: ローディング後に結果またはエラーメッセージが表示される
- **Cleanup**: サーバー停止

### Scenario 2: API Route -> Gemini API
- **Description**: Route Handler が Gemini API を呼び出し、JSON を正規化できるか確認
- **Setup**: 有効な `GEMINI_API_KEY`
- **Test Steps**:
  1. 開発サーバー起動
  2. UI 経由で画像送信
  3. API 応答内容をブラウザ表示で確認
- **Expected Results**: `percentage`、`label`、`reason` が表示される
- **Cleanup**: サーバー停止

## Setup Integration Test Environment

### 1. Start Required Services
```bash
npm run dev
```

### 2. Configure Service Endpoints
```bash
echo "Next.js default endpoint: http://localhost:3000/api/analyze"
```

## Run Integration Checks

### 1. Manual Integration Verification
```bash
curl -X POST http://localhost:3000/api/analyze
```

`curl` 単体では画像 multipart が不足するため、実際にはブラウザ経由または multipart 指定で確認する。

### 2. Verify Service Interactions
- **Key Scenarios**:
  - 正常画像アップロード
  - 非画像ファイル送信時エラー
  - API キー未設定時エラー
- **Logs Location**: Next.js サーバーログ

### 3. Cleanup
```bash
pkill -f "next dev"
```
