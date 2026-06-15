import { defineField, defineType } from "sanity";
import { languageField, publishingControls, seoFields } from "./objects";

export const video = defineType({
  name: "video",
  title: "Video 影片",
  type: "document",
  fields: [
    defineField({ name: "title", title: "影片標題", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "網址名稱", type: "slug", description: "系統會依影片標題生成，用於自動建立影片頁面。", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    languageField,
    defineField({ name: "youtubeUrl", title: "YouTube 連結", type: "url", description: "貼上 YouTube 影片網址即可，無需 iframe。", validation: (Rule) => Rule.required() }),
    defineField({ name: "vimeoUrl", title: "Vimeo 連結 選填", type: "url", description: "選填，貼上 Vimeo 影片網址即可。" }),
    defineField({ name: "bilibiliUrl", title: "Bilibili 連結 選填", type: "url", description: "選填，貼上 Bilibili 影片網址即可。" }),
    defineField({ name: "thumbnail", title: "Thumbnail", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt Text", type: "string", validation: (Rule) => Rule.required() })] }),
    defineField({ name: "transcript", title: "Transcript / Captions", type: "text", rows: 8, description: "Required for accessibility when available." }),
    ...publishingControls,
    ...seoFields
  ]
});
