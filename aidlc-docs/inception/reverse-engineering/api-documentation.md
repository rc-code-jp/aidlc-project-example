# API Documentation

## REST APIs

### Analyze Image
- **Method**: `POST`
- **Path**: `/api/analyze`
- **Purpose**: 画像を受け取り、犬らしさ判定結果を返す
- **Request**:
  - `multipart/form-data`
  - フィールド名: `image`
  - 制約: `image/*`、5MB 以下
- **Response**:
  - 成功: `{ percentage: number, label: "犬" | "犬っぽい" | "犬ではない", reason: string }`
  - 失敗: `{ error: string }`

## Internal APIs

### `analyzeDogPresence(image, mimeType)`
- **Methods**: `analyzeDogPresence(image: Buffer, mimeType: string): Promise<AnalysisResponse>`
- **Parameters**:
  - `image`: アップロード画像バイト列
  - `mimeType`: 画像 MIME type
- **Return Types**: `AnalysisResponse`

### `normalizeModelResponse(raw)`
- **Methods**: `normalizeModelResponse(raw: unknown): AnalysisResponse`
- **Parameters**:
  - `raw`: Gemini 応答として解釈する未知値
- **Return Types**: `AnalysisResponse`

### `generateContent(payload)`
- **Methods**: `generateContent(payload: GeminiRequest): Promise<GeminiResponse>`
- **Parameters**:
  - `payload`: Gemini API 送信用 JSON
- **Return Types**: `GeminiResponse`

### `getGeminiApiKey() / getGeminiModel()`
- **Methods**:
  - `getGeminiApiKey(): string`
  - `getGeminiModel(): string`
- **Parameters**: なし
- **Return Types**: `string`

## Data Models

### `AnalysisResponse`
- **Fields**:
  - `percentage`: 0 から 100 の整数
  - `label`: `犬`、`犬っぽい`、`犬ではない`
  - `reason`: 判定理由
- **Relationships**: UI と API で共通利用
- **Validation**: `normalizeModelResponse` が数値丸めとラベル補正を実施

### `GeminiRequest`
- **Fields**:
  - `contents`: テキストと画像データを含む配列
  - `generationConfig.responseMimeType`: `application/json`
- **Relationships**: `generateContent` から Gemini API に送信
- **Validation**: 型で構造を固定

### `GeminiResponse`
- **Fields**:
  - `candidates[].content.parts[].text`
- **Relationships**: `analyzeDogPresence` で最初のテキスト結果を抽出
- **Validation**: テキスト未取得時はエラー
