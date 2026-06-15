import { defineField, defineType } from "sanity";
import { languageField, publishingControls, seoFields } from "./objects";

export const resource = defineType({
  name: "resource",
  title: "Resource 資源",
  type: "document",
  fields: [
    defineField({ name: "title", title: "資源標題", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "網址名稱", type: "slug", description: "系統會依資源標題生成，用於自動建立閱讀與下載頁面。", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    languageField,
    defineField({ name: "type", title: "資源類型", type: "string", options: { list: ["出版物", "研究報告", "影音資源", "活動照片", "文件下載"] } }),
    defineField({ name: "description", title: "簡介", type: "text", rows: 4 }),
    defineField({ name: "coverImage", title: "封面圖片", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt Text", type: "string", validation: (Rule) => Rule.required() })] }),
    defineField({ name: "file", title: "PDF 檔案", type: "file", options: { accept: "application/pdf" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "externalUrl", title: "外部連結", type: "url" }),
    ...publishingControls,
    ...seoFields
  ]
});
