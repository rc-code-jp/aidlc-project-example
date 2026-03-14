import { NextResponse } from "next/server";
import * as analyzeImage from "@/lib/analyze-image";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

function hasImageFileShape(file: FormDataEntryValue | null) {
  return (
    file !== null &&
    typeof file !== "string" &&
    typeof file.arrayBuffer === "function" &&
    typeof file.type === "string" &&
    typeof file.size === "number"
  );
}

function validateImageInput(file: FormDataEntryValue | null): asserts file is File {
  if (!hasImageFileShape(file)) {
    throw new Error("画像ファイルを選択してください。");
  }

  const imageFile = file as File;

  if (!imageFile.type.startsWith("image/")) {
    throw new Error("画像ファイルのみアップロードできます。");
  }

  if (imageFile.size > MAX_FILE_SIZE_BYTES) {
    throw new Error("画像サイズは 5MB 以下にしてください。");
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");
    validateImageInput(file);

    const bytes = Buffer.from(await file.arrayBuffer());
    const result = await analyzeImage.analyzeDogPresence(bytes, file.type);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: analyzeImage.normalizeErrorMessage(error) },
      {
        status: 400
      }
    );
  }
}
