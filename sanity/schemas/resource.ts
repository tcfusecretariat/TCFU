import { defineField, defineType } from "sanity";
import { imageWithAlt, languageField, publishingControls, seoFields } from "./objects";

export const resource = defineType({
  name: "resource",
  title: "Resource 資源",
  type: "document",
  fields: [
    defineField({ name: "title", title: "資源標題", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "網址名稱",
      type: "slug",
      description: "系統會依資源標題自動生成，用於建立閱讀與下載頁面。",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    languageField,
    defineField({
      name: "type",
      title: "資源類型",
      type: "string",
      options: { list: ["PDF", "出版物", "研究報告", "圖片", "影片"] }
    }),
    defineField({ name: "category", title: "分類（選填）", type: "string", description: "例如：經典翻譯、教育、論壇等。" }),
    defineField({ name: "languageVersions", title: "語言版本（選填）", type: "string", description: "例如：中文 / English / Français。" }),
    defineField({ name: "description", title: "簡介", type: "text", rows: 4 }),
    imageWithAlt("coverImage", "封面圖"),
    defineField({
      name: "file",
      title: "PDF 文件（選填）",
      type: "file",
      options: { accept: "application/pdf" },
      description: "上傳 PDF 後，前台會提供線上閱讀與下載。"
    }),
    defineField({ name: "externalUrl", title: "外部下載連結（選填）", type: "url", description: "若文件存放於外部網站，可改貼連結。" }),
    ...publishingControls,
    ...seoFields
  ],
  preview: {
    select: { title: "title", language: "language", media: "coverImage", type: "type" },
    prepare: ({ title, language, media, type }) => ({
      title,
      subtitle: `${language === "en" ? "EN" : language === "fr" ? "FR" : "中文"}${type ? " · " + type : ""}`,
      media
    })
  }
});
