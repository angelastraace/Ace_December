import { ethers } from "ethers";

// Uniswap V3 SwapRouter (mainnet)
const UNISWAP_V3_SWAP_ROUTER = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

// Uniswap V3 QuoterV2 (mainnet)
const UNISWAP_V3_QUOTER_V2 = "0x61fFE014bA17989E743c5F6cB21bF9697530B21e";

// Tokens (mainnet)
const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const USDC = "0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";

// 0.05% fee tier
const FEE_TIER = 500;

// Default slippage: 2% (200 bps)
const DEFAULT_SLIPPAGE_BPS = 200;

// Minimal ISwapRouter ABI for exactInputSingle
const ISwapRouterAbi = [
  "function exactInputSingle(tuple(address tokenIn,address tokenOut,uint24 fee,address recipient,uint256 deadline,uint256 amountIn,uint256 amountOutMinimum,uint160 sqrtPriceLimitX96) params) payable returns (uint256 amountOut)"
];

// Minimal QuoterV2 ABI for quoteExactInputSingle
const QuoterAbi = [
  "function quoteExactInputSingle(address tokenIn,address tokenOut,uint24 fee,uint256 amountIn,uint160 sqrtPriceLimitX96) external returns (uint256 amountOut)"
];

type SwapParams = {
  recipient: string;      // user wallet
  amountInEth: string;    // human ETH amount, e.g. "0.1"
  slippageBps?: number;   // optional override
};

export async function swapEthToUsdcAndSend({
  recipient,
  amountInEth,
  slippageBps = DEFAULT_SLIPPAGE_BPS,
}: SwapParams): Promise<string> {
  const rpcUrl = process.env.ETHEREUM_RPC_URL;
  const treasuryPk = process.env.ADMIN_WALLET_PRIVATE_KEY;

  if (!rpcUrl) {
    throw new Error("ETHEREUM_RPC_URL not set");
  }
  if (!treasuryPk) {
    throw new Error("ADMIN_WALLET_PRIVATE_KEY not set");
  }

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(treasuryPk, provider);

  const router = new ethers.Contract(
    UNISWAP_V3_SWAP_ROUTER,
    ISwapRouterAbi,
    wallet
  );

  const quoter = new ethers.Contract(
    UNISWAP_V3_QUOTER_V2,
    QuoterAbi,
    wallet
  );

  const amountInWei = ethers.parseEther(amountInEth);

  // 1) Get quote from Quoter
  const quotedOut: bigint = await quoter.quoteExactInputSingle(
    WETH,
    USDC,
    FEE_TIER,
    amountInWei,
    0n // no price limit
  );

  if (quotedOut <= 0n) {
    throw new Error("Uniswap quote returned zero output");
  }

  // 2) Apply slippage: amountOutMinimum = quotedOut * (1 - slippageBps/10_000)
  const bps = BigInt(slippageBps);
  const amountOutMinimum =
    (quotedOut * (10_000n - bps)) / 10_000n;

  if (amountOutMinimum <= 0n) {
    throw new Error("Computed amountOutMinimum is zero after slippage calc");
  }

  const params = {
    tokenIn: WETH,
    tokenOut: USDC,
    fee: FEE_TIER,
    recipient, // user gets USDC directly
    deadline: Math.floor(Date.now() / 1000) + 600, // 10 minutes
    amountIn: amountInWei,
    amountOutMinimum,
    sqrtPriceLimitX96: 0n,
  };

  const tx = await router.exactInputSingle(params, {
    value: amountInWei,
  });

  const receipt = await tx.wait();
  return receipt.transactionHash as string;
}
