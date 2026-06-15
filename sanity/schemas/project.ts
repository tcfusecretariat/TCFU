import { defineField, defineType } from "sanity";
import { bodyField, galleryField, languageField, publishingControls, seoFields } from "./objects";

export const project = defineType({
  name: "project",
  title: "Project 項目",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    languageField,
    defineField({ name: "summary", title: "Summary", type: "text", rows: 4 }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt Text", type: "string", validation: (Rule) => Rule.required() })] }),
    bodyField,
    galleryField,
    ...publishingControls,
    ...seoFields
  ]
});
