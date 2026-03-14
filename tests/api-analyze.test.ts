import { describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/analyze/route";
import * as analyzeImage from "@/lib/analyze-image";

vi.mock("@/lib/analyze-image", async () => {
  const actual = await vi.importActual<typeof import("@/lib/analyze-image")>("@/lib/analyze-image");

  return {
    ...actual,
    analyzeDogPresence: vi.fn()
  };
});

describe("POST /api/analyze", () => {
  it("分析結果を返す", async () => {
    vi.mocked(analyzeImage.analyzeDogPresence).mockResolvedValueOnce({
      percentage: 88,
      label: "犬っぽい",
      reason: "ぬいぐるみのように見える"
    });

    const imageFile = {
      type: "image/png",
      size: 4,
      arrayBuffer: async () => new TextEncoder().encode("test").buffer
    } as File;
    const formData = {
      get: (key: string) => (key === "image" ? imageFile : null)
    } as FormData;

    const request = {
      formData: async () => formData
    } as Request;

    const response = await POST(request);

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      percentage: 88,
      label: "犬っぽい",
      reason: "ぬいぐるみのように見える"
    });
  });
});
