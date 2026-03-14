import { describe, expect, it, vi } from "vitest";
import { POST } from "@/../app/api/analyze/route";
import * as analyzeModule from "@/lib/analyze-image";

describe("POST /api/analyze", () => {
  it("分析結果を返す", async () => {
    vi.spyOn(analyzeModule, "analyzeDogPresence").mockResolvedValueOnce({
      percentage: 88,
      label: "犬っぽい",
      reason: "ぬいぐるみのように見える"
    });

    const formData = new FormData();
    formData.append("image", new File(["test"], "dog.png", { type: "image/png" }));

    const response = await POST(
      new Request("http://localhost/api/analyze", {
        method: "POST",
        body: formData
      })
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      percentage: 88,
      label: "犬っぽい",
      reason: "ぬいぐるみのように見える"
    });
  });
});
