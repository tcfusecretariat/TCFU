import { defineField, defineType } from "sanity";
import { imageWithAlt } from "./objects";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "網站設定",
  type: "document",
  groups: [
    { name: "brand", title: "品牌與標題", default: true },
    { name: "contact", title: "聯絡資訊" },
    { name: "social", title: "社群與連結" }
  ],
  fields: [
    imageWithAlt("logo", "網站 Logo"),
    defineField({
      name: "foundationName",
      title: "基金會名稱",
      type: "string",
      group: "brand",
      initialValue: "Traditional Culture Foundation at UNESCO"
    }),
    defineField({ name: "siteTitleZh", title: "網站標題（中文）", type: "string", group: "brand" }),
    defineField({ name: "siteTitleEn", title: "網站標題（English）", type: "string", group: "brand" }),
    defineField({ name: "siteTitleFr", title: "網站標題（Français）", type: "string", group: "brand" }),
    defineField({
      name: "footer",
      title: "頁尾說明文字（選填）",
      type: "text",
      rows: 4,
      group: "brand"
    }),
    defineField({
      name: "contactEmail",
      title: "聯絡 Email",
      type: "string",
      group: "contact",
      description: "頁尾與聯絡表單顯示的收件信箱。",
      validation: (Rule) =>
        Rule.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: "email" }).warning("請輸入有效的 Email 格式。")
    }),
    defineField({ name: "phone", title: "聯絡電話（選填）", type: "string", group: "contact" }),
    defineField({ name: "address", title: "地址（選填）", type: "text", rows: 2, group: "contact" }),
    defineField({
      name: "googleMapUrl",
      title: "Google Map 連結（選填）",
      type: "url",
      group: "contact",
      description: "貼上 Google 地圖分享連結。"
    }),
    defineField({ name: "youtubeUrl", title: "YouTube 連結", type: "url", group: "social" }),
    defineField({ name: "instagramUrl", title: "Instagram 連結", type: "url", group: "social" }),
    defineField({
      name: "helloAssoUrl",
      title: "HelloAsso 捐助連結",
      type: "url",
      group: "social",
      description: "支持我們 / 捐助按鈕的目標連結。"
    })
  ],
  preview: {
    prepare: () => ({ title: "網站設定" })
  }
});
