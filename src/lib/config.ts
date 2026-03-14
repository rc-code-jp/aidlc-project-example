function readEnv(name: string, fallback?: string) {
  const value = process.env[name] ?? fallback;

  if (!value) {
    throw new Error(`${name} が設定されていません。`);
  }

  return value;
}

export function getGeminiApiKey() {
  return readEnv("GEMINI_API_KEY");
}

export function getGeminiModel() {
  return readEnv("GEMINI_MODEL", "gemini-2.5-flash");
}
