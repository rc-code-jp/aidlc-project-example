# Component Methods

## Web UI Component

### `handleImageSelect(file: File): void`
- **Purpose**: 選択画像を画面状態へ保持する
- **Input**: `File`
- **Output**: なし

### `submitAnalysis(): Promise<void>`
- **Purpose**: サーバー API へ画像を送信し、画面状態を更新する
- **Input**: なし
- **Output**: `Promise<void>`

### `renderResult(result: AnalysisResult | null): JSX.Element`
- **Purpose**: 判定結果表示領域を構築する
- **Input**: `AnalysisResult | null`
- **Output**: `JSX.Element`

## Analyze Image API Component

### `POST /api/analyze`
- **Purpose**: アップロード画像を受け取り判定結果を返す
- **Input**: 画像ファイルを含む HTTP リクエスト
- **Output**: `AnalysisResponse`

### `validateImageInput(file: UploadedFile): void`
- **Purpose**: 入力ファイルの基本妥当性を確認する
- **Input**: `UploadedFile`
- **Output**: なし

## Gemini Analysis Service Component

### `analyzeDogPresence(image: Buffer, mimeType: string): Promise<AnalysisResult>`
- **Purpose**: 犬判定ルールに基づく分析を実行する
- **Input**: 画像バイト列、MIME タイプ
- **Output**: `Promise<AnalysisResult>`

### `buildSystemPrompt(): string`
- **Purpose**: Gemini へ渡す業務ルール入りプロンプトを生成する
- **Input**: なし
- **Output**: `string`

### `normalizeModelResponse(raw: unknown): AnalysisResult`
- **Purpose**: 外部 AI 応答を UI 向けの構造へ変換する
- **Input**: `unknown`
- **Output**: `AnalysisResult`

## Gemini Client Component

### `generateContent(payload: GeminiRequest): Promise<GeminiResponse>`
- **Purpose**: Gemini API へリクエストを送る
- **Input**: `GeminiRequest`
- **Output**: `Promise<GeminiResponse>`

## Configuration Component

### `getGeminiApiKey(): string`
- **Purpose**: API キーを取得する
- **Input**: なし
- **Output**: `string`

### `getGeminiModel(): string`
- **Purpose**: 使用モデル名を返す
- **Input**: なし
- **Output**: `string`
