import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityProjectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || "8f53fq35";
export const sanityDataset = import.meta.env.PUBLIC_SANITY_DATASET || "production";
export const sanityApiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION || "2026-06-15";

export const hasSanityConfig = Boolean(sanityProjectId && sanityDataset);

export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  useCdn: false
});

const builder = imageUrlBuilder(sanityClient);

export function imageUrl(source: unknown) {
  return builder.image(source as Parameters<typeof builder.image>[0]);
}

export async function fetchOptional<T>(query: string, params: Record<string, unknown> = {}, fallback: T): Promise<T> {
  if (!hasSanityConfig) return fallback;

  try {
    const data = await sanityClient.fetch<T | null>(query, params);
    return data ?? fallback;
  } catch (error) {
    console.warn("[sanity] Failed to fetch content:", error instanceof Error ? error.message : error);
    return fallback;
  }
}

export function sanityApiUrl(query: string, params: Record<string, unknown> = {}) {
  const search = new URLSearchParams({ query });
  for (const [key, value] of Object.entries(params)) {
    search.set(`$${key}`, JSON.stringify(value));
  }
  return `https://${sanityProjectId}.api.sanity.io/v${sanityApiVersion}/data/query/${sanityDataset}?${search.toString()}`;
}
