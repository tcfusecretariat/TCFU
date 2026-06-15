import { defineArrayMember, defineField } from "sanity";

export const languageField = defineField({
  name: "language",
  title: "Language",
  type: "string",
  options: {
    list: [
      { title: "繁體中文", value: "zh" },
      { title: "English", value: "en" },
      { title: "Français", value: "fr" }
    ]
  },
  validation: (Rule) => Rule.required()
});

export const seoFields = [
  defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
  defineField({ name: "seoDescription", title: "SEO Description", type: "text", rows: 3 })
];

export const publishingControls = [
  defineField({
    name: "isHidden",
    title: "隱藏此內容",
    type: "boolean",
    initialValue: false,
    description: "打開後，網站前台不顯示此內容。適合暫時下架。"
  }),
  defineField({
    name: "isFeatured",
    title: "推薦到首頁或列表前方",
    type: "boolean",
    initialValue: false
  }),
  defineField({
    name: "sortOrder",
    title: "排序數字",
    type: "number",
    description: "數字越小越靠前。可留空，系統會按日期排序。"
  })
];

export const galleryField = defineField({
  name: "gallery",
  title: "Gallery",
  type: "array",
  of: [
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Required for accessibility and SEO.",
          validation: (Rule) => Rule.required()
        })
      ]
    })
  ]
});

export const bodyField = defineField({
  name: "body",
  title: "Body",
  type: "array",
  of: [
    defineArrayMember({ type: "block" }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string", validation: (Rule) => Rule.required() })]
    })
  ]
});
