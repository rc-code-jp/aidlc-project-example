import { getGeminiApiKey, getGeminiModel } from "@/lib/config";
import { GeminiRequest, GeminiResponse } from "@/types/analysis";

export async function generateContent(payload: GeminiRequest): Promise<GeminiResponse> {
  const apiKey = getGeminiApiKey();
  const model = getGeminiModel();
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Gemini API の呼び出しに失敗しました。");
  }

  return (await response.json()) as GeminiResponse;
}
