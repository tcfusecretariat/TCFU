import { defineArrayMember, defineField } from "sanity";

export const languageField = defineField({
  name: "language",
  title: "語言",
  type: "string",
  description: "選擇此內容的語言版本。可先發布中文，英文 / 法文之後再補。",
  options: {
    list: [
      { title: "繁體中文 (zh)", value: "zh" },
      { title: "English (en)", value: "en" },
      { title: "Français (fr)", value: "fr" }
    ],
    layout: "radio"
  },
  initialValue: "zh",
  validation: (Rule) => Rule.required()
});

export function imageWithAlt(name = "image", title = "圖片") {
  return defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "圖片說明文字 (Alt)",
        type: "string",
        description: "描述圖片內容，供無障礙與 SEO 使用。",
        validation: (Rule) => Rule.required()
      })
    ]
  });
}

export const seoFields = [
  defineField({
    name: "seoTitle",
    title: "SEO 標題（選填）",
    type: "string",
    description: "顯示在搜尋結果與瀏覽器分頁的標題。留空則使用內容標題。"
  }),
  defineField({
    name: "seoDescription",
    title: "SEO 描述（選填）",
    type: "text",
    rows: 3,
    description: "顯示在搜尋結果的簡短描述，建議 60–120 字。"
  })
];

export const publishingControls = [
  defineField({
    name: "isHidden",
    title: "暫時隱藏此內容",
    type: "boolean",
    initialValue: false,
    description: "打開後，網站前台不顯示此內容，但不會刪除。適合暫時下架。"
  }),
  defineField({
    name: "isFeatured",
    title: "置頂 / 推薦到首頁或列表前方",
    type: "boolean",
    initialValue: false,
    description: "打開後，此內容會優先顯示在首頁或列表最前面。"
  }),
  defineField({
    name: "sortOrder",
    title: "排序數字（選填）",
    type: "number",
    description: "數字越小越靠前。可留空，系統會自動按日期排序。"
  })
];

export const galleryField = defineField({
  name: "gallery",
  title: "圖片集（選填）",
  type: "array",
  description: "可上傳多張照片，前台會以相簿方式呈現，點擊可放大。",
  of: [
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "圖片說明文字 (Alt)",
          type: "string",
          description: "描述圖片內容，供無障礙與 SEO 使用。",
          validation: (Rule) => Rule.required()
        })
      ]
    })
  ]
});

export const bodyField = defineField({
  name: "body",
  title: "正文內容",
  type: "array",
  description: "像使用 Word 一樣編輯內文，可加入標題、段落與圖片。",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "內文", value: "normal" },
        { title: "標題 H2", value: "h2" },
        { title: "小標題 H3", value: "h3" },
        { title: "引言", value: "blockquote" }
      ],
      lists: [
        { title: "項目符號", value: "bullet" },
        { title: "編號清單", value: "number" }
      ]
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "圖片說明文字 (Alt)",
          type: "string",
          validation: (Rule) => Rule.required()
        })
      ]
    })
  ]
});
