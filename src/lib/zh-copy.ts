/** Remove ROC references from any locale string (site-wide policy). */
export function stripRocMentions(text: string): string {
  return text
    .replace(/中華民國/g, "")
    .replace(/Republic of China/gi, "")
    .replace(/\s{2,}/g, " ")
    .replace(/（\s*）/g, "")
    .trim();
}

/** Site-wide zh copy normalizations (fallback + CMS strings). */
export function normalizeZhCopy(text: string): string {
  return stripRocMentions(
    text.replaceAll("和平教育", "愛的教育").replaceAll("愛的教育與文明對話", "愛的教育與對話")
  );
}
