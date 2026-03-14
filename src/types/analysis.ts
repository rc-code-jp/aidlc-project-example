export type AnalysisLabel = "犬" | "犬っぽい" | "犬ではない";

export interface AnalysisResponse {
  percentage: number;
  label: AnalysisLabel;
  reason: string;
}

export interface GeminiRequestPart {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string;
  };
}

export interface GeminiRequest {
  contents: Array<{
    role: "user";
    parts: GeminiRequestPart[];
  }>;
  generationConfig: {
    responseMimeType: "application/json";
  };
}

export interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}
