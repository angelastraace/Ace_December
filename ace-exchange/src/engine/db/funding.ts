// engine/treasury/distribute.ts
import { ethers } from "ethers";
import { logFunding } from "../db/funding";
import { TOKENS } from "../config/tokens"; // ensure tokens.ts exists

const ENGINE_RPC = process.env.ETHEREUM_RPC_URL!;
const TREASURY_PK = process.env.ADMIN_WALLET_PRIVATE_KEY!;

export async function fundUser(params: {
  userWallet: `0x${string}`;
  tokenSymbol: string;
  amount: string;
  source?: string;
  reason?: string;
  campaignId?: string | null;
}) {
  const provider = new ethers.JsonRpcProvider(ENGINE_RPC);
  const wallet = new ethers.Wallet(TREASURY_PK, provider);

  const token = TOKENS[params.tokenSymbol];
  if (!token) throw new Error("Unsupported token");

  const amountRaw = ethers.parseUnits(params.amount, token.decimals);
  const erc20 = new ethers.Contract(
    token.address,
    ["function transfer(address to, uint256 amount) returns (bool)"],
    wallet
  );

  const tx = await erc20.transfer(params.userWallet, amountRaw);
  const receipt = await tx.wait();

  await logFunding({
    adminWallet: wallet.address,
    userWallet: params.userWallet,
    network: "ethereum",
    tokenSymbol: token.symbol,
    tokenAddress: token.address,
    amount: params.amount,
    amountRaw: amountRaw.toString(),
    source: params.source ?? "treasury",
    txHash: receipt.transactionHash as string,
    reason: params.reason,
    campaignId: params.campaignId ?? null,
    meta: null,
  });

  return { txHash: receipt.transactionHash as string, adminWallet: wallet.address };
}
