import { defineField, defineType } from "sanity";

export const partner = defineType({
  name: "partner",
  title: "Partner 合作夥伴",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt Text", type: "string", validation: (Rule) => Rule.required() })] }),
    defineField({ name: "website", title: "Website", type: "url" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 })
  ]
});
