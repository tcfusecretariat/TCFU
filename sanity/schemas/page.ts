import { defineField, defineType } from "sanity";
import { bodyField, imageWithAlt, languageField, seoFields } from "./objects";

const pageKeyTitles: Record<string, string> = {
  about: "認識我們（About）",
  work: "核心工作（Work）",
  support: "支持我們（Support）"
};

export const page = defineType({
  name: "page",
  title: "內容頁面",
  type: "document",
  description: "認識我們 / 核心工作 / 支持我們 等獨立頁面。未填正文時，前台顯示「內容整理中」提示。",
  fields: [
    defineField({
      name: "pageKey",
      title: "頁面",
      type: "string",
      description: "選擇此內容對應網站的哪一個頁面。",
      options: {
        list: [
          { title: "認識我們（/about/）", value: "about" },
          { title: "核心工作（/work/）", value: "work" },
          { title: "支持我們（/support/）", value: "support" }
        ],
        layout: "radio"
      },
      validation: (Rule) => Rule.required()
    }),
    languageField,
    defineField({
      name: "title",
      title: "頁面標題（選填）",
      type: "string",
      description: "顯示在頁面最上方的大標題。留空則使用網站預設名稱（例如「認識我們」）。"
    }),
    imageWithAlt("coverImage", "主視覺圖片（選填）"),
    bodyField,
    ...seoFields,
    defineField({
      name: "isHidden",
      title: "暫時隱藏此頁內容",
      type: "boolean",
      initialValue: false,
      description: "打開後，前台會回到「內容整理中」提示，但不刪除此處內容。"
    })
  ],
  preview: {
    select: { pageKey: "pageKey", language: "language", title: "title" },
    prepare({ pageKey, language, title }) {
      const base = pageKeyTitles[pageKey] || pageKey || "內容頁面";
      const lang = language ? language.toUpperCase() : "";
      return {
        title: `${base}${lang ? ` · ${lang}` : ""}`,
        subtitle: title || undefined
      };
    }
  }
});
