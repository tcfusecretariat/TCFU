#!/usr/bin/env node
/**
 * Update Sanity siteSettings.contactEmail and print Cloudflare env instructions.
 * Usage: SANITY_WRITE_TOKEN=... node scripts/update-secretariat-email.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const SECRETARIAT_EMAIL = "secretariat@traditionalculturefoundation.org";
const PROJECT_ID = "8f53fq35";
const DATASET = "production";
const API_VERSION = "2026-06-15";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function loadToken() {
  if (process.env.SANITY_WRITE_TOKEN) return process.env.SANITY_WRITE_TOKEN;
  const devVars = resolve(root, ".dev.vars");
  if (!existsSync(devVars)) return "";
  for (const line of readFileSync(devVars, "utf8").split("\n")) {
    const match = line.match(/^SANITY_WRITE_TOKEN=(.+)$/);
    if (match) return match[1].trim();
  }
  return "";
}

async function sanityMutate(token, mutations) {
  const response = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ mutations })
    }
  );
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.error?.description || body.message || response.statusText);
  }
  return body;
}

async function main() {
  const token = loadToken();
  if (!token) {
    console.error("Missing SANITY_WRITE_TOKEN (.dev.vars or env).");
    process.exit(1);
  }

  const query = encodeURIComponent('*[_type=="siteSettings"][0]{_id,contactEmail}');
  const existing = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`,
    { headers: { Authorization: `Bearer ${token}` } }
  ).then((r) => r.json());

  const doc = existing.result;
  if (doc?._id) {
    await sanityMutate(token, [
      {
        patch: {
          id: doc._id,
          set: { contactEmail: SECRETARIAT_EMAIL }
        }
      }
    ]);
    console.log(`Sanity siteSettings updated (${doc._id}).`);
  } else {
    await sanityMutate(token, [
      {
        createIfNotExists: {
          _id: "siteSettings",
          _type: "siteSettings",
          foundationName: "Traditional Culture Foundation at UNESCO",
          contactEmail: SECRETARIAT_EMAIL,
          helloAssoUrl: "https://www.helloasso.com/associations/traditional-culture-foundation-at-unesco"
        }
      }
    ]);
    console.log("Sanity siteSettings created with contactEmail.");
  }
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
