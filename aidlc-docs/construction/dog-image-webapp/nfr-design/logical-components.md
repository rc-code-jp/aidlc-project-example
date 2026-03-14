# Logical Components - dog-image-webapp

## 1. Upload Page Component
- 画像選択 UI
- 判定開始操作
- ローディング、結果、エラーの表示

## 2. Analyze Route Handler
- `/api/analyze` の入口
- リクエスト検証
- サービス層呼び出し
- エラーレスポンス統一

## 3. Gemini Service Component
- システムプロンプト生成
- 応答正規化
- ラベル判定補助

## 4. Gemini Client Component
- 外部 API 通信
- タイムアウト、HTTP エラー処理
- 認証ヘッダまたは API キー付与

## 5. Config Component
- 環境変数の読込
- 必須設定チェック

## Logical Interaction
```text
Upload Page
  -> Analyze Route Handler
  -> Gemini Service
  -> Gemini Client
  -> Gemini API
```
