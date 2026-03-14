import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import HomePage from "@/app/page";

afterEach(() => {
  cleanup();
});

describe("HomePage", () => {
  it("初期状態で案内文を表示する", () => {
    render(<HomePage />);

    expect(screen.getByText("画像を選択して「犬判定を実行」を押してください。")).toBeInTheDocument();
    expect(screen.getByTestId("upload-page-submit-button")).toBeDisabled();
  });

  it("ファイル選択で送信ボタンが有効になる", () => {
    render(<HomePage />);

    const input = screen.getByTestId("upload-page-file-input");
    fireEvent.change(input, {
      target: {
        files: [new File(["dog"], "dog.png", { type: "image/png" })]
      }
    });

    expect(screen.getByTestId("upload-page-submit-button")).toBeEnabled();
  });
});
