import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

const singletons = ["homePage", "siteSettings"];

export default defineConfig({
  name: "tcfunesco",
  title: "Traditional Culture Foundation at UNESCO",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "8f53fq35",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .id("content")
          .title("網站後台")
          .items([
            S.listItem()
              .id("news")
              .title("📰 最新動態（News 新聞）")
              .schemaType("news")
              .child(
                S.documentTypeList("news").title("最新動態 · 顯示於「News 最新動態」頁面；最新 3 則同時出現在首頁「最新動態」區塊")
              ),
            S.listItem()
              .id("event")
              .title("📅 活動（Events 活動）")
              .schemaType("event")
              .child(
                S.documentTypeList("event").title("活動 · 顯示於「Events 活動」頁面與各活動詳情頁")
              ),
            S.listItem()
              .id("project")
              .title("🏛 項目（Projects 項目）")
              .schemaType("project")
              .child(
                S.documentTypeList("project").title("項目 · 顯示於「Projects 項目」頁面；前 3 筆出現在首頁「旗艦項目」區塊")
              ),
            S.listItem()
              .id("resource")
              .title("📚 資源中心（Resources 資源）")
              .schemaType("resource")
              .child(
                S.documentTypeList("resource").title("資源中心 · 顯示於「Resources 資源中心」頁面，可線上閱讀與下載 PDF")
              ),
            S.listItem()
              .id("video")
              .title("🎬 影音中心（Videos 影片）")
              .schemaType("video")
              .child(
                S.documentTypeList("video").title("影音中心 · 顯示於「Videos 影音中心」頁面，貼網址自動生成播放/觀看按鈕")
              ),
            S.listItem()
              .id("partner")
              .title("🤝 合作夥伴（Partners）")
              .schemaType("partner")
              .child(
                S.documentTypeList("partner").title("合作夥伴 · 開啟「在首頁顯示」後出現在首頁「合作夥伴」區塊")
              ),
            S.divider(),
            S.listItem()
              .id("page")
              .title("📄 內容頁面（認識我們・核心工作・支持我們）")
              .schemaType("page")
              .child(
                S.documentTypeList("page")
                  .title("內容頁面 · 編輯「認識我們 / 核心工作 / 支持我們」頁面（每頁每語言一份；未填則前台顯示提示）")
                  .defaultOrdering([
                    { field: "pageKey", direction: "asc" },
                    { field: "language", direction: "asc" }
                  ])
              ),
            S.listItem()
              .id("homePage")
              .title("🏠 首頁內容（Homepage）")
              .child(
                S.documentTypeList("homePage")
                  .title("首頁內容 · 編輯首頁各區塊文字與顯示/隱藏（每個語言一份）")
                  .defaultOrdering([{ field: "language", direction: "asc" }])
              ),
            S.listItem()
              .id("siteSettings")
              .title("⚙️ 網站設定（Logo・聯絡・社群）")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings"))
          ])
    }),
    visionTool()
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter((template) => !singletons.includes(template.schemaType))
  },
  document: {
    actions: (actions, context) =>
      context.schemaType === "siteSettings"
        ? actions.filter(({ action }) => action !== "duplicate" && action !== "delete" && action !== "unpublish")
        : actions
  }
});
