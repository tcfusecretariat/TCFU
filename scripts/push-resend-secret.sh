#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEV_VARS="$ROOT/.dev.vars"

if [[ ! -f "$DEV_VARS" ]]; then
  echo "Missing .dev.vars. Copy .dev.vars.example and set RESEND_API_KEY first." >&2
  exit 1
fi

# shellcheck disable=SC1090
source "$DEV_VARS"

if [[ -z "${RESEND_API_KEY:-}" ]]; then
  echo "RESEND_API_KEY is empty in .dev.vars." >&2
  echo "Create a key at https://resend.com/api-keys and verify traditionalculturefoundation.org in Resend." >&2
  exit 1
fi

printf '%s' "$RESEND_API_KEY" | npx wrangler pages secret put RESEND_API_KEY --project-name=traditionalculturefoundation

echo "RESEND_API_KEY uploaded to Cloudflare Pages (traditionalculturefoundation)."
