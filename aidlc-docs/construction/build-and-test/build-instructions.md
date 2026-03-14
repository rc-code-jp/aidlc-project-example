# Build Instructions

## Prerequisites
- **Build Tool**: Node.js 20.9 以上, npm 10 以上
- **Dependencies**: `package.json` に定義された npm パッケージ
- **Environment Variables**:
  - `GEMINI_API_KEY`
  - `GEMINI_MODEL` (任意。未指定時は `gemini-2.5-flash`)
- **System Requirements**: macOS / Linux / Windows, インターネット接続, Gemini API 利用可能な環境

## Build Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.local.example .env.local
```

`.env.local` に `GEMINI_API_KEY` を設定してください。

### 3. Build Application
```bash
npm run build
```

### 4. Verify Build Success
- **Expected Output**: `Compiled successfully` と Route Summary の表示
- **Build Artifacts**: `.next/` ディレクトリ
- **Common Warnings**: 初回ビルド時に Next.js が `tsconfig.json` の `include` へ `.next/types/**/*.ts` を追加することがある

## Troubleshooting

### Build Fails with Dependency Errors
- **Cause**: `node_modules` 未導入、またはネットワーク不通
- **Solution**:
  1. `npm install` を再実行
  2. npm レジストリへ接続できることを確認
  3. 必要なら `node_modules` を消して再導入

### Build Fails with Environment Errors
- **Cause**: `GEMINI_API_KEY` 未設定
- **Solution**:
  1. `.env.local` を作成
  2. `GEMINI_API_KEY` を設定
  3. 再度 `npm run build` を実行

## Latest Verification
- **Executed On**: 2026-03-14T13:39:39Z
- **Result**: Success
- **Notes**:
  - `npm run build` は成功
  - Route Summary では `/` と `/api/analyze` が生成された
  - `tsconfig.json` に `.next/types/**/*.ts` が追記された
