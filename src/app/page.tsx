"use client";

import React from "react";
import { ChangeEvent, useState } from "react";
import { AnalysisResponse } from "@/types/analysis";

const initialError = "";

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState(initialError);

  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null;
    setFile(nextFile);
    setResult(null);
    setError(initialError);
  };

  const submitAnalysis = async () => {
    if (!file || isLoading) {
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setIsLoading(true);
    setError(initialError);
    setResult(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData
      });

      const payload = (await response.json()) as AnalysisResponse | { error: string };

      if (!response.ok || "error" in payload) {
        throw new Error("error" in payload ? payload.error : "判定に失敗しました。");
      }

      setResult(payload);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error ? caughtError.message : "判定に失敗しました。";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">DOG IMAGE JUDGE</p>
        <h1>画像に犬が写っている度を判定します</h1>
        <p className="lead">
          画像を 1 枚アップロードすると、犬らしさをパーセントとラベルで表示します。
        </p>

        <label className="upload-field" htmlFor="image-upload">
          判定する画像を選択
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          data-testid="upload-page-file-input"
        />

        <button
          type="button"
          onClick={submitAnalysis}
          disabled={!file || isLoading}
          data-testid="upload-page-submit-button"
        >
          {isLoading ? "判定中..." : "犬判定を実行"}
        </button>

        <div
          className="status-panel"
          role="status"
          aria-live="polite"
          data-testid="upload-page-status-panel"
        >
          {isLoading && <p>画像を解析しています。数秒かかる場合があります。</p>}
          {!isLoading && error && (
            <p className="error-text" data-testid="upload-page-error-text">
              {error}
            </p>
          )}
          {!isLoading && result && (
            <div className="result-grid" data-testid="upload-page-result-panel">
              <div>
                <span className="result-label">犬っぽさ</span>
                <strong>{result.percentage}%</strong>
              </div>
              <div>
                <span className="result-label">判定</span>
                <strong>{result.label}</strong>
              </div>
              <p className="result-reason">{result.reason}</p>
            </div>
          )}
          {!isLoading && !error && !result && (
            <p>画像を選択して「犬判定を実行」を押してください。</p>
          )}
        </div>
      </section>
    </main>
  );
}
