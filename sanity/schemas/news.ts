import { defineField, defineType } from "sanity";
import { bodyField, galleryField, imageWithAlt, languageField, publishingControls, seoFields } from "./objects";

export const news = defineType({
  name: "news",
  title: "News 新聞",
  type: "document",
  groups: [
    { name: "content", title: "內容", default: true },
    { name: "media", title: "圖片與附件" },
    { name: "seo", title: "SEO 與發布" }
  ],
  fields: [
    defineField({ name: "title", title: "新聞標題", type: "string", group: "content", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "網址名稱",
      type: "slug",
      group: "content",
      description: "系統會依新聞標題自動生成，用於建立新聞頁面網址。",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    languageField,
    defineField({
      name: "category",
      title: "分類（選填）",
      type: "string",
      group: "content",
      options: { list: ["論壇", "活動", "出版物", "教育", "媒體報導"] }
    }),
    defineField({ name: "publishDate", title: "發布日期", type: "datetime", group: "content", initialValue: () => new Date().toISOString(), validation: (Rule) => Rule.required() }),
    defineField({ name: "summary", title: "摘要", type: "text", rows: 4, group: "content", description: "顯示在列表與分享預覽的簡短介紹。" }),
    { ...bodyField, group: "content" },

    { ...imageWithAlt("coverImage", "封面圖"), group: "media" },
    { ...galleryField, group: "media" },
    defineField({ name: "videoUrl", title: "影片連結（選填）", type: "url", group: "media", description: "貼上 YouTube 或其他影片網址即可。" }),
    defineField({ name: "pdfAttachment", title: "PDF 附件（選填）", type: "file", options: { accept: "application/pdf" }, group: "media" }),

    ...seoFields.map((field) => ({ ...field, group: "seo" })),
    ...publishingControls.map((field) => ({ ...field, group: "seo" }))
  ],
  orderings: [
    { title: "發布日期（新到舊）", name: "publishDateDesc", by: [{ field: "publishDate", direction: "desc" }] }
  ],
  preview: {
    select: { title: "title", language: "language", media: "coverImage", date: "publishDate" },
    prepare: ({ title, language, media, date }) => ({
      title,
      subtitle: `${language === "en" ? "EN" : language === "fr" ? "FR" : "中文"}${date ? " · " + new Date(date).toLocaleDateString() : ""}`,
      media
    })
  }
});
