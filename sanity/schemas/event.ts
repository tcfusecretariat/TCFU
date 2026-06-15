import { defineField, defineType } from "sanity";
import { galleryField, languageField, publishingControls } from "./objects";

export const event = defineType({
  name: "event",
  title: "Event 活動",
  type: "document",
  fields: [
    defineField({ name: "eventName", title: "活動名稱", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "網址名稱", type: "slug", description: "系統會依活動名稱生成，用於自動建立活動頁面。", options: { source: "eventName" }, validation: (Rule) => Rule.required() }),
    languageField,
    defineField({ name: "date", title: "活動日期", type: "datetime", validation: (Rule) => Rule.required() }),
    defineField({ name: "location", title: "地點", type: "string" }),
    defineField({ name: "poster", title: "活動海報", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt Text", type: "string", validation: (Rule) => Rule.required() })] }),
    defineField({ name: "registrationUrl", title: "報名連結 HelloAsso", type: "url" }),
    defineField({ name: "description", title: "活動介紹", type: "text", rows: 6 }),
    galleryField,
    defineField({ name: "video", title: "Video", type: "url", description: "Use YouTube or Cloudflare video URL." }),
    defineField({ name: "files", title: "Files", type: "array", of: [{ type: "file" }] }),
    ...publishingControls
  ],
  preview: {
    select: { title: "eventName", subtitle: "date" }
  }
});
