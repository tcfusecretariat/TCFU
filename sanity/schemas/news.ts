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
      options: {
        list: [
          { title: "Conference / 論壇", value: "Conference" },
          { title: "Event / 活動", value: "Event" },
          { title: "Publication / 出版物", value: "Publication" },
          { title: "Education / 教育", value: "Education" },
          { title: "Media / 媒體報導", value: "Media" },
          { title: "論壇", value: "論壇" },
          { title: "活動", value: "活動" },
          { title: "出版物", value: "出版物" },
          { title: "教育", value: "教育" },
          { title: "媒體報導", value: "媒體報導" }
        ]
      }
    }),
    defineField({
      name: "subtitle",
      title: "副標題（選填）",
      type: "string",
      group: "content",
      description: "顯示在文章標題下方，例如 Concept Note。"
    }),
    defineField({
      name: "breadcrumbLabel",
      title: "麵包屑短標題（選填）",
      type: "string",
      group: "content",
      description: "頂部 Home > News > 這一段的短名稱。留空則使用新聞標題。"
    }),
    defineField({ name: "publishDate", title: "發布日期", type: "datetime", group: "content", initialValue: () => new Date().toISOString(), validation: (Rule) => Rule.required() }),
    defineField({
      name: "location",
      title: "活動地點（選填）",
      type: "text",
      rows: 2,
      group: "content",
      description: "顯示於文章右側欄，可換行，例如 UNESCO Headquarters / Paris, France。"
    }),
    defineField({
      name: "eventDateLabel",
      title: "活動日期（選填）",
      type: "string",
      group: "content",
      description: "顯示於右側欄的活動日期，例如 1–2 October 2026。"
    }),
    defineField({
      name: "editorialBanner",
      title: "文章頁頂部橫幅（選填）",
      type: "object",
      group: "content",
      description: "填寫後，新聞內頁會在標題區下方顯示編輯式橫幅。留空則不顯示。",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "kicker", title: "橫幅小標", type: "string", description: "例如 INTERNATIONAL CONFERENCE ON PEACE" }),
        defineField({ name: "title", title: "橫幅標題", type: "text", rows: 3 }),
        defineField({ name: "meta", title: "日期與地點", type: "string" }),
        defineField({ name: "tags", title: "主題標籤", type: "string", description: "例如 CULTURE · EDUCATION · PEACE" }),
        defineField({ name: "aside", title: "右側短句", type: "text", rows: 5, description: "可換行，顯示於橫幅右側。" })
      ]
    }),
    defineField({ name: "summary", title: "摘要", type: "text", rows: 4, group: "content", description: "顯示在列表與分享預覽的簡短介紹。" }),
    { ...bodyField, group: "content" },

    { ...imageWithAlt("coverImage", "封面圖"), group: "media" },
    { ...galleryField, group: "media" },
    defineField({ name: "videoUrl", title: "影片連結（選填）", type: "url", group: "media", description: "貼上 YouTube 或其他影片網址即可。" }),
    defineField({ name: "pdfAttachment", title: "PDF 附件（選填）", type: "file", options: { accept: "application/pdf" }, group: "media" }),
    defineField({
      name: "pdfLabel",
      title: "PDF 顯示名稱（選填）",
      type: "string",
      group: "media",
      description: "右側下載卡片上的檔名，例如 Concept Note (PDF)。"
    }),
    defineField({
      name: "agendaPdfAttachment",
      title: "活動日程 PDF（選填）",
      type: "file",
      options: { accept: "application/pdf" },
      group: "media",
      description: "會議 / 活動日程檔，顯示為第二個下載卡片。"
    }),
    defineField({
      name: "agendaPdfLabel",
      title: "日程 PDF 顯示名稱（選填）",
      type: "string",
      group: "media",
      description: "例如 Agenda (PDF) 或 活動日程 (PDF)。"
    }),

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
