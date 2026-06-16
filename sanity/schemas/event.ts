import { defineField, defineType } from "sanity";
import { bodyField, galleryField, imageWithAlt, languageField, publishingControls, seoFields } from "./objects";

export const event = defineType({
  name: "event",
  title: "Event 活動",
  type: "document",
  groups: [
    { name: "content", title: "內容", default: true },
    { name: "media", title: "圖片與附件" },
    { name: "seo", title: "SEO 與發布" }
  ],
  fields: [
    defineField({ name: "eventName", title: "活動名稱", type: "string", group: "content", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "網址名稱",
      type: "slug",
      group: "content",
      description: "系統會依活動名稱自動生成，用於建立活動頁面網址。",
      options: { source: "eventName", maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    languageField,
    defineField({ name: "date", title: "活動日期", type: "datetime", group: "content", validation: (Rule) => Rule.required() }),
    defineField({ name: "time", title: "活動時間（選填）", type: "string", group: "content", description: "例如：14:00–17:00。" }),
    defineField({ name: "location", title: "地點", type: "string", group: "content" }),
    defineField({ name: "organizers", title: "主辦 / 協辦單位（選填）", type: "text", rows: 2, group: "content" }),
    defineField({ name: "description", title: "活動簡介", type: "text", rows: 5, group: "content" }),
    { ...bodyField, title: "詳細內容", group: "content" },
    defineField({ name: "registrationUrl", title: "報名連結（HelloAsso 等）", type: "url", group: "content" }),
    defineField({ name: "isRegistrationOpen", title: "是否開放報名", type: "boolean", initialValue: true, group: "content" }),

    { ...imageWithAlt("poster", "活動海報"), group: "media" },
    defineField({ name: "programmePdf", title: "Programme PDF（選填）", type: "file", options: { accept: "application/pdf" }, group: "media" }),
    { ...galleryField, group: "media" },
    defineField({ name: "video", title: "影片連結（選填）", type: "url", group: "media", description: "貼上 YouTube 或其他影片網址即可。" }),

    ...seoFields.map((field) => ({ ...field, group: "seo" })),
    ...publishingControls.map((field) => ({ ...field, group: "seo" }))
  ],
  preview: {
    select: { title: "eventName", language: "language", media: "poster", date: "date" },
    prepare: ({ title, language, media, date }) => ({
      title,
      subtitle: `${language === "en" ? "EN" : language === "fr" ? "FR" : "中文"}${date ? " · " + new Date(date).toLocaleDateString() : ""}`,
      media
    })
  }
});
