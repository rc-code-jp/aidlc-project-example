"use client";

import React from "react";
import { ChangeEvent, DragEvent, useEffect, useState } from "react";
import { AnalysisResponse } from "@/types/analysis";

const initialError = "";
const initialPreviewUrl = "";

function getResultTone(label: AnalysisResponse["label"]) {
  switch (label) {
    case "犬":
      return "strong";
    case "犬っぽい":
      return "soft";
    default:
      return "calm";
  }
}

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(initialPreviewUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState(initialError);
  const [isDragActive, setIsDragActive] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(initialPreviewUrl);
      return;
    }

    const nextPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(nextPreviewUrl);

    return () => {
      URL.revokeObjectURL(nextPreviewUrl);
    };
  }, [file]);

  const updateSelectedFile = (nextFile: File | null) => {
    setFile(nextFile);
    setResult(null);
    setError(initialError);
  };

  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    updateSelectedFile(event.target.files?.[0] ?? null);
  };

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragActive(false);
    const nextFile = event.dataTransfer.files?.[0] ?? null;
    updateSelectedFile(nextFile);
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
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">DOG IMAGE JUDGE</p>
          <h1>犬っぽさを、一目で分かる結果に。</h1>
          <p className="lead">
            画像をドラッグするか選択するだけで、犬らしさをパーセントとラベルで表示します。
            判定前のプレビューから結果の読み取りまで、迷わず進めるトップページに改善します。
          </p>
          <ul className="hero-points">
            <li>ドラッグアンドドロップ対応</li>
            <li>送信前の画像プレビュー</li>
            <li>視覚的に強い判定結果カード</li>
          </ul>
        </div>

        <div className="workspace-card">
          <label
            className={`dropzone${isDragActive ? " is-drag-active" : ""}${file ? " has-file" : ""}`}
            htmlFor="image-upload"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            data-testid="upload-page-dropzone"
          >
            <span className="dropzone-badge">UPLOAD</span>
            <strong>画像をここにドロップ</strong>
            <span>またはクリックしてファイルを選択</span>
            {file && <span className="dropzone-file-name">{file.name}</span>}
          </label>

          <input
            id="image-upload"
            className="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            data-testid="upload-page-file-input"
          />

          <div className="preview-card" data-testid="upload-page-preview-panel">
            {previewUrl ? (
              <>
                <img
                  className="preview-image"
                  src={previewUrl}
                  alt="選択した画像のプレビュー"
                  data-testid="upload-page-preview-image"
                />
                <div className="preview-meta">
                  <span>選択中の画像</span>
                  <strong>{file?.name}</strong>
                </div>
              </>
            ) : (
              <div className="preview-empty">
                <strong>まだ画像が選択されていません</strong>
                <span>プレビューがここに表示されます</span>
              </div>
            )}
          </div>

          <button
            type="button"
            className="submit-button"
            onClick={submitAnalysis}
            disabled={!file || isLoading}
            data-testid="upload-page-submit-button"
          >
            {isLoading ? "判定中..." : "犬判定を実行"}
          </button>
        </div>
      </section>

      <section
        className={`status-panel${result ? ` tone-${getResultTone(result.label)}` : ""}${error ? " tone-error" : ""}`}
        role="status"
        aria-live="polite"
        data-testid="upload-page-status-panel"
      >
        <div className="status-header">
          <p className="status-kicker">ANALYSIS STATUS</p>
          <h2>判定ステータス</h2>
        </div>

        {isLoading && (
          <div className="loading-state" data-testid="upload-page-loading-state">
            <span className="loading-orb" aria-hidden="true" />
            <div>
              <strong>画像を解析しています</strong>
              <p>数秒かかる場合があります。画面を閉じずにお待ちください。</p>
            </div>
          </div>
        )}

        {!isLoading && error && (
          <div className="error-state" data-testid="upload-page-error-text">
            <strong>判定に失敗しました</strong>
            <p>{error}</p>
          </div>
        )}

        {!isLoading && result && (
          <div className="result-grid" data-testid="upload-page-result-panel">
            <div className="result-main">
              <span className="result-label">犬っぽさ</span>
              <strong className="result-percentage">{result.percentage}%</strong>
            </div>
            <div className="result-side">
              <div className="result-chip">{result.label}</div>
              <p className="result-reason">{result.reason}</p>
            </div>
          </div>
        )}

        {!isLoading && !error && !result && (
          <div className="idle-state">
            <strong>画像を選択して「犬判定を実行」を押してください。</strong>
            <p>プレビューを確認してから送信できます。</p>
          </div>
        )}
      </section>
    </main>
  );
}
