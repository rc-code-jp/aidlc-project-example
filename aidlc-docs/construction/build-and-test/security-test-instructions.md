# Security Test Instructions

## Purpose
API キー保護と入力検証の基本確認を行う。

## Test Areas
- 環境変数管理
- 非画像ファイル拒否
- 5MB 超ファイル拒否
- エラー時の内部情報非露出
- クライアント UI へ秘密値が混入していないこと

## Checks

### 1. Environment Variable Protection
```bash
rg "GEMINI_API_KEY" src
```

期待結果:
- クライアント側コードへ API キーの値を書いていない
- 設定読込は `src/lib/config.ts` に限定される

### 2. Input Validation
```bash
echo "Try uploading a non-image file and an oversized image through the UI."
```

期待結果:
- 非画像は拒否される
- 5MB 超の画像は拒否される

### 3. Error Message Safety
```bash
echo "Run with an invalid API key and inspect the UI message."
```

期待結果:
- API キー値や詳細な内部スタックトレースが表示されない
