import { NextResponse } from "next/server";
import { analyzeDogPresence, normalizeErrorMessage } from "@/lib/analyze-image";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

function validateImageInput(file: File | null) {
  if (!file) {
    throw new Error("画像ファイルを選択してください。");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("画像ファイルのみアップロードできます。");
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error("画像サイズは 5MB 以下にしてください。");
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");

    validateImageInput(file instanceof File ? file : null);

    const bytes = Buffer.from(await file.arrayBuffer());
    const result = await analyzeDogPresence(bytes, file.type);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: normalizeErrorMessage(error) },
      {
        status: 400
      }
    );
  }
}
