/** Site-wide zh copy normalizations (fallback + CMS strings). */
export function normalizeZhCopy(text: string): string {
  return text.replaceAll("和平教育", "愛的教育");
}
