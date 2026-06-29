import { defineArrayMember, defineField, defineType } from "sanity";
import { bodyField, galleryField, imageWithAlt, languageField, publishingControls, seoFields } from "./objects";

export const project = defineType({
  name: "project",
  title: "Project 項目",
  type: "document",
  fields: [
    defineField({ name: "title", title: "項目名稱", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "網址名稱",
      type: "slug",
      description: "系統會依項目名稱自動生成。",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    languageField,
    defineField({
      name: "category",
      title: "分類",
      type: "string",
      options: { list: ["愛的教育", "青少年身心健康", "文明對話", "經典翻譯"] }
    }),
    defineField({ name: "summary", title: "摘要", type: "text", rows: 4 }),
    imageWithAlt("coverImage", "封面圖"),
    { ...bodyField, title: "詳情" },
    galleryField,
    defineField({
      name: "relatedEvents",
      title: "相關活動（選填）",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "event" }] })]
    }),
    defineField({
      name: "relatedResources",
      title: "相關資源（選填）",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "resource" }] })]
    }),
    ...publishingControls,
    ...seoFields
  ],
  preview: {
    select: { title: "title", language: "language", media: "coverImage", category: "category" },
    prepare: ({ title, language, media, category }) => ({
      title,
      subtitle: `${language === "en" ? "EN" : language === "fr" ? "FR" : "中文"}${category ? " · " + category : ""}`,
      media
    })
  }
});
