#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEV_VARS="$ROOT/.dev.vars"

if [[ ! -f "$DEV_VARS" ]]; then
  echo "Missing .dev.vars. Copy .dev.vars.example and set SANITY_WRITE_TOKEN first." >&2
  exit 1
fi

# shellcheck disable=SC1090
source "$DEV_VARS"

if [[ -z "${SANITY_WRITE_TOKEN:-}" ]]; then
  echo "SANITY_WRITE_TOKEN is empty in .dev.vars." >&2
  exit 1
fi

printf '%s' "$SANITY_WRITE_TOKEN" | npx wrangler pages secret put SANITY_WRITE_TOKEN --project-name=traditionalculturefoundation

echo "SANITY_WRITE_TOKEN uploaded to Cloudflare Pages (traditionalculturefoundation)."
