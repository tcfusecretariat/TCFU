/** Site-wide zh copy normalizations (fallback + CMS strings). */
export function normalizeZhCopy(text: string): string {
  return text.replaceAll("和平教育", "愛的教育").replaceAll("愛的教育與文明對話", "愛的教育與對話");
}
