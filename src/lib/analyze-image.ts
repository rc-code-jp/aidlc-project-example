import { buildSystemPrompt } from "@/lib/prompt";
import { generateContent } from "@/lib/gemini-client";
import { AnalysisLabel, AnalysisResponse } from "@/types/analysis";

function toLabel(value: unknown): AnalysisLabel {
  if (value === "犬" || value === "犬っぽい" || value === "犬ではない") {
    return value;
  }

  return "犬ではない";
}

function clampPercentage(value: unknown) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return 0;
  }

  return Math.min(100, Math.max(0, Math.round(value)));
}

export function normalizeModelResponse(raw: unknown): AnalysisResponse {
  if (!raw || typeof raw !== "object") {
    throw new Error("判定結果の形式が不正です。");
  }

  const candidate = raw as Partial<AnalysisResponse>;
  return {
    percentage: clampPercentage(candidate.percentage),
    label: toLabel(candidate.label),
    reason:
      typeof candidate.reason === "string" && candidate.reason.trim()
        ? candidate.reason
        : "判定理由は返却されませんでした。"
  };
}

export async function analyzeDogPresence(
  image: Buffer,
  mimeType: string
): Promise<AnalysisResponse> {
  const response = await generateContent({
    contents: [
      {
        role: "user",
        parts: [
          { text: buildSystemPrompt() },
          {
            inlineData: {
              mimeType,
              data: image.toString("base64")
            }
          }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json"
    }
  });

  const text = response.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("判定結果を取得できませんでした。");
  }

  const parsed = JSON.parse(text) as unknown;
  return normalizeModelResponse(parsed);
}

export function normalizeErrorMessage(error: unknown) {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return "判定に失敗しました。時間をおいて再試行してください。";
}
