import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || "production";
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION || "2026-06-15";

export const hasSanityConfig = Boolean(projectId && dataset);

export const sanityClient = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true
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
  } catch {
    return fallback;
  }
}
