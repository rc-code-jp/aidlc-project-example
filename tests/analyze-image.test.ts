import { describe, expect, it } from "vitest";
import { normalizeModelResponse } from "@/lib/analyze-image";

describe("normalizeModelResponse", () => {
  it("有効なレスポンスをそのまま返す", () => {
    expect(
      normalizeModelResponse({
        percentage: 100,
        label: "犬",
        reason: "dog detected"
      })
    ).toEqual({
      percentage: 100,
      label: "犬",
      reason: "dog detected"
    });
  });

  it("不正値を安全な値へ丸める", () => {
    expect(
      normalizeModelResponse({
        percentage: 999,
        label: "unknown",
        reason: ""
      })
    ).toEqual({
      percentage: 100,
      label: "犬ではない",
      reason: "判定理由は返却されませんでした。"
    });
  });
});
