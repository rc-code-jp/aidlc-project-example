# Code Generation Plan - dog-image-webapp

## Unit Context
- **Unit Name**: dog-image-webapp
- **Project Type**: Greenfield single unit
- **Workspace Root**: `/Users/rc/work/aidlc-project`
- **Stories Implemented**:
  - [x] US-01 画像を選択して判定を開始する
  - [x] US-02 判定中の状態を把握する
  - [x] US-03 犬らしさの結果を理解する
  - [x] US-04 エラー時に再試行できる
- **Dependencies**:
  - Gemini API
  - Node.js runtime
- **Expected Interfaces**:
  - `POST /api/analyze`
  - ブラウザ UI からの画像アップロード操作
- **Database Entities**: なし
- **Service Boundary**:
  - UI 層
  - API Route 層
  - Gemini Service / Client 層
  - 設定管理層

## Code Location
- **Application Code**: workspace root
- **Documentation**: `aidlc-docs/construction/dog-image-webapp/code/`

## Detailed Steps

### Step 1. Project Structure Setup
- [x] `package.json`、`tsconfig.json`、`next.config.ts`、`app/`、`src/`、`tests/` の基本構成を作成する
- [x] `README.md` にセットアップ概要を反映する

### Step 2. Shared Types and Configuration
- [x] `src/types/analysis.ts` に API 入出力型を作成する
- [x] `src/lib/config.ts` に Gemini API 設定読込を実装する
- [x] `src/lib/prompt.ts` に犬判定用システムプロンプトを実装する

### Step 3. Gemini Integration Logic
- [x] `src/lib/gemini-client.ts` に Gemini API 呼び出し処理を実装する
- [x] `src/lib/analyze-image.ts` に応答正規化とラベル変換を実装する
- [x] Gemini 失敗時の安全なエラーハンドリングを実装する

### Step 4. API Layer Generation
- [x] `app/api/analyze/route.ts` に画像受信と分析呼び出しを実装する
- [x] 入力検証と HTTP レスポンス整形を実装する
- [x] US-04 に対応する失敗レスポンスを反映する

### Step 5. Frontend Components Generation
- [x] `app/page.tsx` に画像アップロード UI を実装する
- [x] ローディング、成功、失敗の表示状態を実装する
- [x] `data-testid` を主要操作要素に付与する
- [x] US-01、US-02、US-03、US-04 を UI に反映する

### Step 6. Styling and UX Support
- [x] `app/globals.css` に最小限のスタイルを実装する
- [x] アクセシビリティ対応の文言と状態表示を整える

### Step 7. Unit Testing
- [x] `tests/analyze-image.test.ts` に分析ロジックのテストを追加する
- [x] `tests/api-analyze.test.ts` に API レスポンス整形のテストを追加する
- [x] `tests/page.test.tsx` に UI 状態表示のテストを追加する

### Step 8. Documentation Summary
- [x] `aidlc-docs/construction/dog-image-webapp/code/code-summary.md` に生成内容を要約する
- [x] `.env.local.example` を作成し、必要な環境変数を明記する

## Story Traceability
- **US-01**: Step 4, Step 5
- **US-02**: Step 5, Step 6
- **US-03**: Step 3, Step 4, Step 5
- **US-04**: Step 3, Step 4, Step 5, Step 7

## Single Source of Truth
- このファイルを Code Generation の唯一の実行計画として扱う
