import { defineArrayMember, defineField, defineType } from "sanity";
import { languageField } from "./objects";

export const homePage = defineType({
  name: "homePage",
  title: "首頁內容",
  type: "document",
  groups: [
    { name: "hero", title: "主視覺 Hero", default: true },
    { name: "philosophy", title: "核心理念" },
    { name: "work", title: "核心工作" },
    { name: "projects", title: "旗艦項目" },
    { name: "library", title: "資源中心" },
    { name: "event", title: "最新論壇" },
    { name: "news", title: "最新動態" },
    { name: "support", title: "支持我們" },
    { name: "partners", title: "合作夥伴" }
  ],
  fields: [
    languageField,

    defineField({ name: "heroTitle", title: "Hero 主標題", type: "text", rows: 2, group: "hero" }),
    defineField({ name: "heroSubtitle", title: "Hero 副標題 / 說明", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroPrimaryCtaText", title: "主要按鈕文字", type: "string", group: "hero" }),
    defineField({ name: "heroPrimaryCtaUrl", title: "主要按鈕連結", type: "string", group: "hero" }),
    defineField({ name: "heroSecondaryCtaText", title: "次要按鈕文字", type: "string", group: "hero" }),
    defineField({ name: "heroSecondaryCtaUrl", title: "次要按鈕連結", type: "string", group: "hero" }),

    defineField({ name: "showPhilosophy", title: "顯示「核心理念」區塊", type: "boolean", initialValue: true, group: "philosophy" }),
    defineField({ name: "philosophyKicker", title: "小標題", type: "string", group: "philosophy" }),
    defineField({ name: "philosophyTitle", title: "標題", type: "string", group: "philosophy" }),
    defineField({ name: "philosophyParagraphs", title: "段落內容", type: "array", of: [defineArrayMember({ type: "text" })], group: "philosophy" }),

    defineField({ name: "showWork", title: "顯示「核心工作」區塊", type: "boolean", initialValue: true, group: "work" }),
    defineField({ name: "workKicker", title: "小標題", type: "string", group: "work" }),
    defineField({ name: "workTitle", title: "標題", type: "string", group: "work" }),
    defineField({
      name: "workPillars",
      title: "四大支柱",
      type: "array",
      group: "work",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "支柱名稱", type: "string" }),
            defineField({ name: "subtitle", title: "副標題", type: "string" })
          ],
          preview: { select: { title: "title", subtitle: "subtitle" } }
        })
      ]
    }),

    defineField({ name: "showProjects", title: "顯示「旗艦項目」區塊", type: "boolean", initialValue: true, group: "projects" }),
    defineField({ name: "projectsKicker", title: "小標題", type: "string", group: "projects" }),
    defineField({ name: "projectsTitle", title: "標題", type: "string", group: "projects" }),

    defineField({ name: "showLibrary", title: "顯示「資源中心」區塊", type: "boolean", initialValue: true, group: "library" }),
    defineField({ name: "libraryKicker", title: "小標題", type: "string", group: "library" }),
    defineField({ name: "libraryTitle", title: "標題", type: "string", group: "library" }),
    defineField({ name: "libraryDescription", title: "說明文字", type: "text", rows: 3, group: "library" }),
    defineField({ name: "libraryLanguages", title: "語言版本標籤", type: "array", of: [defineArrayMember({ type: "string" })], group: "library" }),

    defineField({ name: "showEvent", title: "顯示「最新論壇」區塊", type: "boolean", initialValue: true, group: "event" }),
    defineField({ name: "eventKicker", title: "小標題", type: "string", group: "event" }),
    defineField({ name: "eventTitle", title: "標題", type: "string", group: "event" }),
    defineField({ name: "eventDescription", title: "說明文字", type: "text", rows: 3, group: "event" }),
    defineField({ name: "eventLinkText", title: "連結文字", type: "string", group: "event" }),
    defineField({ name: "eventLinkUrl", title: "連結網址（選填）", type: "string", group: "event" }),

    defineField({ name: "showNews", title: "顯示「最新動態」區塊", type: "boolean", initialValue: true, group: "news" }),
    defineField({ name: "newsKicker", title: "小標題", type: "string", group: "news" }),
    defineField({ name: "newsTitle", title: "標題", type: "string", group: "news" }),

    defineField({ name: "showSupport", title: "顯示「支持我們」區塊", type: "boolean", initialValue: true, group: "support" }),
    defineField({ name: "supportKicker", title: "小標題", type: "string", group: "support" }),
    defineField({ name: "supportTitle", title: "標題", type: "string", group: "support" }),
    defineField({ name: "supportItems", title: "支持項目清單", type: "array", of: [defineArrayMember({ type: "string" })], group: "support" }),
    defineField({ name: "supportCtaText", title: "按鈕文字", type: "string", group: "support" }),

    defineField({ name: "showPartners", title: "顯示「合作夥伴」區塊", type: "boolean", initialValue: true, group: "partners" })
  ],
  preview: {
    select: { language: "language" },
    prepare: ({ language }) => ({
      title: "首頁內容",
      subtitle: language === "en" ? "English" : language === "fr" ? "Français" : "繁體中文"
    })
  }
});
