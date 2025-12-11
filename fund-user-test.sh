#!/usr/bin/env bash
# fund-user-test.sh
# Simple interactive script to POST /api/admin/onchain/fund-user to your live ACE Exchange site.
# Edit DEPLOY_URL and ADMIN_SECRET below before running.

set -euo pipefail

# === EDIT THESE ===
DEPLOY_URL="${DEPLOY_URL:-https://qejqvhsaftbcpvfdoyds.supabase.co}"   # e.g. https://ace-exchange.vercel.app
ADMIN_SECRET="${ADMIN_SECRET:-303e1de80498abc04863304e3c30b91b38d1836da38020e8fdf5fc4f15eae37}"            # must match process.env.ADMIN_SECRET on server
# ==================

# helper: generate a UUID (use uuidgen or python fallback)
if command -v uuidgen >/dev/null 2>&1; then
  IDEMP=$(uuidgen)
else
  IDEMP=$(python3 - <<'PY'
import uuid,sys
print(uuid.uuid4())
PY
)
fi

read -p "User wallet (0x..): " USER_WALLET
read -p "Token symbol (e.g. USDC): " TOKEN_SYMBOL
read -p "Amount (human, e.g. 10): " AMOUNT
read -p "Reason (optional): " REASON

echo
echo "Sending request to ${DEPLOY_URL}/api/admin/onchain/fund-user"
echo "Idempotency key: ${IDEMP}"
echo

BODY=$(cat <<JSON
{
  "userWallet": "${USER_WALLET}",
  "tokenSymbol": "${TOKEN_SYMBOL}",
  "amount": "${AMOUNT}",
  "source": "treasury",
  "idempotencyKey": "${IDEMP}",
  "reason": "${REASON}"
}
JSON
)

# Make the request
HTTP_RESPONSE=$(curl -sS -w "\n%{http_code}" -X POST "${DEPLOY_URL}/api/admin/onchain/fund-user" \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: ${ADMIN_SECRET}" \
  -H "x-idempotency-key: ${IDEMP}" \
  -d "${BODY}")

# Split body and status code
HTTP_BODY=$(echo "${HTTP_RESPONSE}" | sed '$d')
HTTP_CODE=$(echo "${HTTP_RESPONSE}" | tail -n1)

echo "HTTP ${HTTP_CODE}"
echo
echo "Response body:"
echo "${HTTP_BODY}" | jq -C . || echo "${HTTP_BODY}"

# If txHash present, print an etherscan link guess (mainnet). Adjust chain if needed.
TXHASH=$(echo "${HTTP_BODY}" | jq -r '.txHash // .tx_hash // empty' 2>/dev/null || true)
if [[ -n "${TXHASH}" ]]; then
  echo
  echo "txHash: ${TXHASH}"
  echo "Etherscan (mainnet) link:"
  echo "https://etherscan.io/tx/${TXHASH}"
fi

# Print helpful followups
echo
echo "If you see 401 Unauthorized, verify ADMIN_SECRET matches server env."
echo "If you see success but DB didn't update, run the SQL checks in Supabase (admin_onchain_transfers / fundings / balances)."
