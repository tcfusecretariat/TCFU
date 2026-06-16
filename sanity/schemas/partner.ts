import { defineField, defineType } from "sanity";
import { imageWithAlt } from "./objects";

export const partner = defineType({
  name: "partner",
  title: "Partner 合作夥伴",
  type: "document",
  fields: [
    defineField({ name: "name", title: "名稱", type: "string", validation: (Rule) => Rule.required() }),
    imageWithAlt("logo", "Logo"),
    defineField({ name: "description", title: "簡介（選填）", type: "text", rows: 3 }),
    defineField({ name: "website", title: "官方網站（選填）", type: "url" }),
    defineField({
      name: "type",
      title: "類型",
      type: "string",
      options: { list: ["國際組織", "大學", "NGO", "文化機構", "合作基金會"] }
    }),
    defineField({
      name: "sortOrder",
      title: "排序數字（選填）",
      type: "number",
      description: "數字越小越靠前。可留空，系統會依名稱排序。"
    }),
    defineField({
      name: "isFeatured",
      title: "在首頁顯示",
      type: "boolean",
      initialValue: true,
      description: "打開後，此夥伴會顯示在首頁的合作夥伴區塊。"
    })
  ],
  preview: {
    select: { title: "name", media: "logo", subtitle: "type" }
  }
});
