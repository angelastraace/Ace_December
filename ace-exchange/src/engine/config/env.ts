// /engine/config/env.ts
export const ENGINE_ENV = {
  RPC_URL: process.env.ETHEREUM_RPC_URL!,
  TREASURY_PK: process.env.ADMIN_WALLET_PRIVATE_KEY!,
  NETWORK: "ethereum",
};

if (!ENGINE_ENV.RPC_URL) {
  throw new Error("ETHEREUM_RPC_URL is not set");
}
if (!ENGINE_ENV.TREASURY_PK) {
  throw new Error("ADMIN_WALLET_PRIVATE_KEY is not set");
}
