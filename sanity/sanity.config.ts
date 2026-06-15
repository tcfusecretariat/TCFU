import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "tcfunesco",
  title: "Traditional Culture Foundation at UNESCO",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "your_project_id",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title("網站後台")
          .items([
            S.documentTypeListItem("news").title("新增新聞 / 管理新聞"),
            S.documentTypeListItem("event").title("建立活動 / 管理活動"),
            S.documentTypeListItem("resource").title("上傳 PDF / 管理資源"),
            S.documentTypeListItem("video").title("新增影片"),
            S.divider(),
            S.documentTypeListItem("project").title("項目"),
            S.documentTypeListItem("partner").title("合作夥伴"),
            S.documentTypeListItem("siteSettings").title("網站設定")
          ])
    }),
    visionTool()
  ],
  schema: {
    types: schemaTypes
  }
});
