import { defineField, defineType } from "sanity";
import { imageWithAlt, languageField, publishingControls, seoFields } from "./objects";

export const video = defineType({
  name: "video",
  title: "Video 影片",
  type: "document",
  groups: [
    { name: "content", title: "內容", default: true },
    { name: "links", title: "影片連結" },
    { name: "seo", title: "SEO 與發布" }
  ],
  fields: [
    defineField({ name: "title", title: "影片標題", type: "string", group: "content", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "網址名稱",
      type: "slug",
      group: "content",
      description: "系統會依影片標題自動生成。",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    languageField,
    { ...imageWithAlt("thumbnail", "封面圖"), group: "content" },
    defineField({ name: "description", title: "簡介（選填）", type: "text", rows: 4, group: "content" }),
    defineField({ name: "eventDate", title: "活動日期（選填）", type: "datetime", group: "content" }),
    defineField({
      name: "relatedEvent",
      title: "相關活動（選填）",
      type: "reference",
      to: [{ type: "event" }],
      group: "content"
    }),

    defineField({ name: "youtubeUrl", title: "YouTube 連結（選填）", type: "url", group: "links", description: "貼上 YouTube 影片網址即可，無需 iframe。" }),
    defineField({ name: "vimeoUrl", title: "Vimeo 連結（選填）", type: "url", group: "links" }),
    defineField({ name: "bilibiliUrl", title: "Bilibili 連結（選填）", type: "url", group: "links" }),
    defineField({ name: "wechatUrl", title: "微信視頻號連結（選填）", type: "url", group: "links" }),
    defineField({ name: "tencentUrl", title: "騰訊視頻連結（選填）", type: "url", group: "links" }),
    defineField({ name: "transcript", title: "字幕 / 逐字稿（選填）", type: "text", rows: 6, group: "content", description: "提供時有助於無障礙與 SEO。" }),

    ...seoFields.map((field) => ({ ...field, group: "seo" })),
    ...publishingControls.map((field) => ({ ...field, group: "seo" }))
  ],
  validation: (Rule) =>
    Rule.custom((doc) => {
      const hasUrl = Boolean(doc?.youtubeUrl || doc?.vimeoUrl || doc?.bilibiliUrl || doc?.wechatUrl || doc?.tencentUrl);
      return hasUrl ? true : "請至少填寫一個影片連結（YouTube / Vimeo / Bilibili / 微信 / 騰訊）。";
    }),
  preview: {
    select: { title: "title", language: "language", media: "thumbnail" },
    prepare: ({ title, language, media }) => ({
      title,
      subtitle: language === "en" ? "English" : language === "fr" ? "Français" : "繁體中文",
      media
    })
  }
});
