import { defineField, defineType } from "sanity";
import { bodyField, galleryField, languageField, publishingControls, seoFields } from "./objects";

export const news = defineType({
  name: "news",
  title: "News 新聞",
  type: "document",
  fields: [
    defineField({ name: "title", title: "新聞標題", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "網址名稱",
      type: "slug",
      description: "系統會依新聞標題生成，用於自動建立新聞頁面。",
      options: { source: "title" },
      validation: (Rule) => Rule.required()
    }),
    languageField,
    defineField({ name: "category", title: "分類", type: "string", options: { list: ["論壇", "活動", "出版物", "教育", "媒體報導"] } }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string", validation: (Rule) => Rule.required() })]
    }),
    defineField({ name: "publishDate", title: "發布日期", type: "datetime", validation: (Rule) => Rule.required() }),
    defineField({ name: "summary", title: "摘要", type: "text", rows: 4 }),
    bodyField,
    galleryField,
    defineField({ name: "videoUrl", title: "Video URL", type: "url", description: "Use YouTube or Cloudflare Stream/R2 hosted video URL." }),
    defineField({ name: "pdfAttachment", title: "PDF Attachment", type: "file", options: { accept: "application/pdf" } }),
    ...publishingControls,
    ...seoFields
  ],
  preview: {
    select: { title: "title", subtitle: "language", media: "coverImage" }
  }
});
