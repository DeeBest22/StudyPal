import process from "node:process";
export function getServerConfig() {
  return {
    nodeEnv: process.env.NODE_ENV,
    groqApiKey: "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",
    aethexApiKey: process.env.AETHEX_API_KEY,
    aethexBaseUrl: process.env.AETHEX_BASE_URL ?? "https://api.aethexai.com/api/v1",
    openRouterApiKey: process.env.OPENROUTER_API_KEY,
  };
}
