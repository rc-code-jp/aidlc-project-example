import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import HomePage from "@/app/page";

afterEach(() => {
  cleanup();
});

describe("HomePage", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "URL",
      Object.assign(URL, {
        createObjectURL: vi.fn(() => "blob:preview"),
        revokeObjectURL: vi.fn()
      })
    );
  });

  it("初期状態で案内文を表示する", () => {
    render(<HomePage />);

    expect(screen.getByText("画像を選択して「犬判定を実行」を押してください。")).toBeInTheDocument();
    expect(screen.getByTestId("upload-page-submit-button")).toBeDisabled();
    expect(screen.getByText("まだ画像が選択されていません")).toBeInTheDocument();
  });

  it("ファイル選択で送信ボタンが有効になりプレビューが表示される", () => {
    render(<HomePage />);

    const input = screen.getByTestId("upload-page-file-input");
    const file = new File(["dog"], "dog.png", { type: "image/png" });
    fireEvent.change(input, {
      target: {
        files: [file]
      }
    });

    expect(screen.getByTestId("upload-page-submit-button")).toBeEnabled();
    expect(screen.getByTestId("upload-page-preview-image")).toHaveAttribute("src", "blob:preview");
    expect(screen.getAllByText("dog.png")).toHaveLength(2);
  });
});
