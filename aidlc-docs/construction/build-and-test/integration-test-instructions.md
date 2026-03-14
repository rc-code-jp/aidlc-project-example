# Integration Test Instructions

## Purpose
改善後のトップページ UI、`/api/analyze`、Gemini 連携準備が実利用フローとしてつながることを確認する。

## Test Scenarios

### Scenario 1: Drag and Drop / File Select -> API Route
- **Description**: UI 改善後のアップロード導線から `/api/analyze` 呼び出しまでが成立することを確認
- **Setup**: `.env.local` を設定し、開発サーバーを起動
- **Test Steps**:
  1. `npm run dev` を実行
  2. ブラウザで `http://localhost:3000` を開く
  3. 画像をドラッグアンドドロップ、またはクリック選択する
  4. プレビューが表示されることを確認し、判定実行ボタンを押す
- **Expected Results**: ローディング表示後に結果またはエラーメッセージが表示される
- **Cleanup**: サーバー停止

### Scenario 2: API Route -> Gemini API
- **Description**: Route Handler が Gemini API を呼び出し、結果カードに必要な JSON を返せるか確認
- **Setup**: 有効な `GEMINI_API_KEY`
- **Test Steps**:
  1. 開発サーバーを起動
  2. UI 経由で画像送信
  3. `percentage`、`label`、`reason` が結果カードに表示されることを確認
- **Expected Results**: 結果カードに数値、ラベル、理由が描画される
- **Cleanup**: サーバー停止

## Setup Integration Test Environment

### 1. Start Required Services
```bash
npm run dev
```

### 2. Configure Service Endpoints
```bash
echo "Next.js endpoint: http://localhost:3000/api/analyze"
```

## Run Integration Checks

### 1. Manual Browser Verification
- 正常な画像を送って、プレビュー、ローディング、結果表示が連続して見えることを確認する
- 連続で別画像を選び、前回結果が新しい結果で更新されることを確認する

### 2. Optional Multipart Verification
```bash
curl -X POST http://localhost:3000/api/analyze \
  -F "image=@/path/to/sample.png"
```

### 3. Verify Service Interactions
- **Key Scenarios**:
  - 正常画像アップロード
  - 非画像ファイル送信時エラー
  - 5MB 超ファイル送信時エラー
  - API キー未設定または無効時エラー
- **Logs Location**: Next.js サーバーログ

### 4. Cleanup
```bash
pkill -f "next dev"
```
