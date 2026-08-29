// /engine/config/tokens.ts
import type { Address } from "../types";

export type TokenMeta = {
  symbol: string;
  address: Address;
  decimals: number;
};

export const TOKENS: Record<string, TokenMeta> = {
  USDC: {
    symbol: "USDC",
    address: "0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    decimals: 6,
  },
  WETH: {
    symbol: "WETH",
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    decimals: 18,
  },
  // later: add ACE, BTC, etc.
};
