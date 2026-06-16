export const newsSummaryQuery = `*[_type == "news" && language == $locale && isHidden != true] | order(isFeatured desc, sortOrder asc, publishDate desc){
  title,
  "slug": slug.current,
  category,
  publishDate,
  summary
}`;

export const newsDetailQuery = `*[_type == "news" && language == $locale && slug.current == $slug && isHidden != true][0]{
  title,
  "slug": slug.current,
  category,
  publishDate,
  summary,
  body,
  videoUrl,
  "pdfUrl": pdfAttachment.asset->url,
  seoTitle,
  seoDescription
}`;

export const latestNewsQuery = `*[_type == "news" && language == $locale && isHidden != true] | order(isFeatured desc, sortOrder asc, publishDate desc)[0...$limit]{
  title,
  "slug": slug.current,
  category,
  publishDate,
  summary
}`;

export const resourcesSummaryQuery = `*[_type == "resource" && language == $locale && isHidden != true] | order(isFeatured desc, sortOrder asc, _createdAt desc){
  title,
  "slug": slug.current,
  language,
  description,
  "fileUrl": file.asset->url,
  externalUrl
}`;
