#!/usr/bin/env bash
set -euo pipefail

# Upload contact email env vars to Cloudflare Pages (production + preview).
# Requires: CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID
# Create token: Account / Cloudflare Pages / Edit

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PROJECT="traditionalculturefoundation"
EMAIL="secretariat@traditionalculturefoundation.org"
ACCOUNT_ID="${CLOUDFLARE_ACCOUNT_ID:-}"
TOKEN="${CLOUDFLARE_API_TOKEN:-}"

if [[ -z "$TOKEN" || -z "$ACCOUNT_ID" ]]; then
  echo "Set CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID, then re-run." >&2
  echo "Example:" >&2
  echo "  CLOUDFLARE_ACCOUNT_ID=... CLOUDFLARE_API_TOKEN=... $0" >&2
  exit 1
fi

upsert_var() {
  local env_name="$1"
  local key="$2"
  local value="$3"
  local list_url="https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT}/variables"
  local existing
  existing="$(curl -fsS "$list_url?environment=${env_name}" \
    -H "Authorization: Bearer ${TOKEN}" \
    -H "Content-Type: application/json")"

  local var_id
  var_id="$(node -e "
    const data = JSON.parse(process.argv[1]);
    const match = (data.result || []).find((v) => v.name === process.argv[2]);
    process.stdout.write(match ? match.id : '');
  " "$existing" "$key")"

  if [[ -n "$var_id" ]]; then
    curl -fsS -X PATCH "${list_url}/${var_id}" \
      -H "Authorization: Bearer ${TOKEN}" \
      -H "Content-Type: application/json" \
      --data "{\"value\":\"${value}\",\"environment\":\"${env_name}\"}" >/dev/null
    echo "Updated ${key} (${env_name})"
  else
    curl -fsS -X POST "$list_url" \
      -H "Authorization: Bearer ${TOKEN}" \
      -H "Content-Type: application/json" \
      --data "{\"name\":\"${key}\",\"value\":\"${value}\",\"environment\":\"${env_name}\"}" >/dev/null
    echo "Created ${key} (${env_name})"
  fi
}

for env in production preview; do
  upsert_var "$env" "CONTACT_TO_EMAIL" "$EMAIL"
  upsert_var "$env" "SECRETARIAT_EMAIL" "$EMAIL"
done

echo "Cloudflare Pages email env vars set to ${EMAIL}."
