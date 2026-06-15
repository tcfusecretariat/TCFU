import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings 網站設定",
  type: "document",
  fields: [
    defineField({ name: "logo", title: "Logo", type: "image", fields: [defineField({ name: "alt", title: "Alt Text", type: "string", validation: (Rule) => Rule.required() })] }),
    defineField({ name: "footer", title: "Footer", type: "text", rows: 5 }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" })
          ]
        }
      ]
    }),
    defineField({
      name: "contactInformation",
      title: "Contact Information",
      type: "object",
      fields: [
        defineField({ name: "email", title: "Email", type: "email" }),
        defineField({ name: "phone", title: "Phone", type: "string" }),
        defineField({ name: "address", title: "Address", type: "text", rows: 3 })
      ]
    })
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" })
  }
});
