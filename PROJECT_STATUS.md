# PROJECT_STATUS — Traditional Culture Foundation (UNESCO) 官方網站

> 本文件用於交接。新的 Cursor 對話只要讀完這份文件，即可完全接手本專案。
> 最後更新：2026-06-16

---

## 0. 專案總覽（先讀這段）

- **用途**：傳統文化基金會（Traditional Culture Foundation at UNESCO）官方多語網站。
- **核心目標**：行政人員只需登入 **Sanity** 更新內容，網站前台即可顯示，**不需** Git / GitHub / Terminal / Astro / TypeScript。
- **技術棧**
  - 前端：**Astro 4.16**（`output: "static"` 靜態網站，`trailingSlash: "always"`，`build.format: "directory"`）
  - CMS：**Sanity v3**（`sanity/` 子專案）
  - 部署：**Cloudflare Pages**，原始碼在 **GitHub `tcfusecretariat/TCFU`**，正式分支 `main`
  - 語言：**zh / en / fr**（繁體中文為主，英法可後補）
- **Sanity 連線參數**（已寫死為預設值，見 `src/lib/sanity.ts`）
  - `projectId = 8f53fq35`
  - `dataset = production`
  - `apiVersion = 2026-06-15`
  - `useCdn = false`（建置時取最新資料）
- **本機常用指令**
  - 安裝：`npm install`（根目錄）、`npm install --prefix sanity`
  - 開發：`npm run dev`（網站）、`npm run sanity:dev`（Studio，預設 port 3333）
  - 建置：`npm run build`（= `astro build`，見 §6 技術債）
  - 預覽：`npm run preview`
  - Studio 登入 / 部署：`npm run sanity:login`、`npm run sanity:deploy`

### 目錄結構速覽
```
src/
  components/   # Astro 元件（Header/Footer/HomePage/各列表與詳情頁/即時更新元件）
  data/         # 本地保底資料（content.ts / resources.ts / searchIndex.ts / site.ts）
  layouts/      # BaseLayout.astro（含全站 inline script：表單、漢堡選單、燈箱）
  lib/          # cms.ts / news.ts / sanity.ts / sanity-queries.ts / seo.ts
  pages/        # 路由：zh|en|fr/{index, [slug], news, events, projects, videos, resources, library, search}
  styles/       # global.css（全站樣式 + 響應式）
functions/api/  # Cloudflare Pages Functions：contact.ts、sanity-revalidate.ts
sanity/         # Sanity Studio 子專案（schemas、sanity.config.ts、sanity.cli.ts）
shared/         # contact.mjs（聯絡表單共用驗證，供 Functions 使用）
```

---

## 1. 已完成功能

- **三語站台**（zh/en/fr），含 `hreflang`、canonical、OG/Twitter meta（`BaseLayout.astro` + `src/lib/seo.ts`）。
- **首頁**（`HomePage.astro`）：Hero、核心理念、核心工作四支柱、旗艦項目、資源中心、最新論壇、最新動態、支持我們、合作夥伴；各區塊可由 Sanity `homePage` 控制文字與顯示/隱藏，缺值自動回退到 `src/data/content.ts`。
- **全模組接入 Sanity**（建置時讀取，缺值回退本地）：News / Events / Projects / Resources / Videos / Partners / Homepage / Site Settings。列表頁與詳情頁皆走 `src/lib/cms.ts`、`src/lib/news.ts` 的 GROQ 查詢。
- **即時更新（免重新部署）**：最新動態與資源中心的「列表」在訪客瀏覽時，前端再向 Sanity API 抓最新資料覆蓋顯示（`SanityLiveNews.astro`、`SanityLiveResources.astro`）。註：**全新的詳情頁仍需重新部署**才會存在。
- **資源中心 PDF 線上閱讀器**：以 **PDF.js（canvas）** 取代舊 iframe，翻頁在 Chrome/Safari/Firefox 都正常，載入失敗顯示「線上閱讀」備援連結（`ResourceLibraryPage.astro`、`CmsDetailPage.astro`）。
- **影片**：後台只需貼 URL（YouTube/Vimeo/Bilibili/微信/騰訊），前台自動產生播放/觀看按鈕，無需手貼 iframe。
- **聯絡表單**：Phase 1 改為 **mailto**（移除 Cloudflare KV）。`functions/api/contact.ts` 預留未來接 Resend/Formspree（選填）。
- **多語 placeholder**：缺翻譯不報錯，顯示「內容整理中」提示（`PlaceholderPage.astro`）。
- **三個旗艦項目介紹頁**：`/<lang>/project-peace-conference/`、`/project-translation/`、`/project-youth-peace/`，顯示「內容建設中，敬請期待」（en/fr 對應翻譯）。⚠️ **此項已實作但尚未 commit/push**（見 §5）。
- **手機響應式**：漢堡抽屜選單、搜尋收進抽屜、區塊單欄、標題/按鈕換行、grid `minmax(0,1fr)`、`overflow-x:hidden`、新增 `≤460px` 斷點（`global.css`）。
- **Sanity Studio 後台中文導航**：左側選單中文化、加上「發布後顯示在哪一頁」說明（`sanity/sanity.config.ts`）。
- **README**：含行政人員操作指南、後台↔前台對照表、部署鏈路說明。

---

## 2. 已部署功能（線上狀態）

- **GitHub**：`origin = https://github.com/tcfusecretariat/TCFU`，分支 `main`。
- **最後已推送 commit**：`3547945`（"Fix mobile responsive layout"，含本 session 之前所有 CMS/聯絡表單/響應式工作）。
- **正式網域**：`https://www.tcfunesco.org`（Cloudflare Pages）。
- **Cloudflare 自動部署**：若 Pages 專案已連接此 repo 並以 `main` 為 production 分支，push 到 `main` 會自動觸發部署（**尚未由我方確認 Cloudflare 端設定**，見 §4）。
- ⚠️ **未推送**：三個項目介紹頁與 `PlaceholderPage` 的 `message` 參數（工作區已修改，尚未 commit）。因此線上點擊三個旗艦項目目前仍可能 404，直到提交並部署。

---

## 3. Sanity Schema

位置：`sanity/schemas/`，由 `index.ts` 匯整；`sanity.config.ts` 定義中文 Desk 結構與 singleton。

| 檔案 | 類型 | 重點欄位 |
|---|---|---|
| `news.ts` | News 新聞 | title, language, slug, coverImage, publishDate, summary, body(PortableText), gallery, videoUrl, pdfAttachment, SEO, isHidden/isFeatured/sortOrder |
| `event.ts` | Events 活動 | eventName, language, date, time, location, organizers, poster, description, body, programmePdf, gallery, video, registrationUrl, isRegistrationOpen, SEO |
| `project.ts` | Projects 項目 | title, language, category(和平教育/青少年身心健康/文明對話/經典翻譯), coverImage, summary, body, relatedEvents, relatedResources, SEO |
| `resource.ts` | Resources 資源 | title, language, type(PDF/出版物/研究報告/圖片/影片), coverImage, description, file(PDF), externalUrl, languageVersions, category, isFeatured |
| `video.ts` | Videos 影片 | title, language, thumbnail, youtubeUrl/vimeoUrl/bilibiliUrl/wechatUrl/tencentUrl, description, eventDate, relatedEvent, isFeatured（至少一個影片 URL） |
| `partner.ts` | Partners 夥伴 | name, logo, description, website, type(國際組織/大學/NGO/文化機構/合作基金會), sortOrder, isFeatured |
| `homePage.ts` | 首頁內容（每語一份 singleton-like） | 各區塊 kicker/title/內容 + `show*` 顯示開關（Hero/Philosophy/Work/Projects/Library/Event/News/Support/Partners） |
| `siteSettings.ts` | 網站設定（singleton） | logo, foundationName, siteTitleZh/En/Fr, contactEmail, phone, address, googleMapUrl, youtubeUrl, instagramUrl, helloAssoUrl |
| `objects.ts` | 共用片段 | `languageField`(zh/en/fr radio)、`imageWithAlt`、`seoFields`、`publishingControls`(isHidden/isFeatured/sortOrder)、`galleryField`、`bodyField`(Word 式 PortableText) |

- **前台查詢對應**：`src/lib/cms.ts` 的 `typeConfig` 定義各類型 GROQ 欄位；`getItems/getItem/getResources/getResourceItem/getPartners/getSiteSettings/getHomeContent`。News 另在 `src/lib/news.ts` + `src/lib/sanity-queries.ts`。

---

## 4. Cloudflare 配置

- `wrangler.toml`：`pages_build_output_dir = "dist"`，`compatibility_date = 2026-06-15`（已移除假的 KV namespace）。
- **建置指令（Cloudflare 端應設定）**：`npm run build`（現為 `astro build`）；輸出目錄 `dist`。
- **環境變數**（在 Cloudflare Pages → Settings → Environment variables 設定；見 `.env.example`）
  - `PUBLIC_SITE_URL`, `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`, `PUBLIC_SANITY_API_VERSION`
  - `SANITY_REVALIDATE_SECRET`（自訂長亂碼）
  - `CLOUDFLARE_DEPLOY_HOOK_URL`（Cloudflare 產生的 Deploy Hook URL）
  - 選填：`PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN`、聯絡表單 `RESEND_API_KEY`/`CONTACT_TO_EMAIL`/`CONTACT_FROM_EMAIL`/`FORMSPREE_ENDPOINT`
- **自動重新部署鏈路（Sanity Publish → Cloudflare rebuild）**
  - 端點：`functions/api/sanity-revalidate.ts`（GET 健康檢查；POST 驗證 secret 後呼叫 Deploy Hook）。
  - **方法 B1（最簡單）**：Sanity Webhook URL 直接指向 Cloudflare Deploy Hook URL。
  - **方法 B2（加密鑰）**：Sanity Webhook → `https://www.tcfunesco.org/api/sanity-revalidate`，HTTP Header `sanity-webhook-secret` = `SANITY_REVALIDATE_SECRET`。
  - ⚠️ **狀態：程式端就緒，但 Cloudflare Deploy Hook 與 Sanity Webhook 尚未確認已在後台建立**（需要帳號權限操作）。詳見 README「7. 發布後如何更新到正式網站」。
- **檢查部署狀態**：Cloudflare 儀表板 → Workers & Pages → 專案 → Deployments。

---

## 5. 待辦事項（TODO）

**A. 立即（本 session 收尾）**
- [ ] **提交並推送三個項目介紹頁**：目前工作區已改 `PlaceholderPage.astro` + `src/pages/{zh,en,fr}/[slug].astro`（新增 project-* 路由與 `message`），尚未 commit/push。建議 `git add . && git commit -m "Add flagship project placeholder pages" && git push`。
- [ ] 在 Cloudflare 與 Sanity 後台實際建立 **Deploy Hook + Webhook**（§4），並用 README 的「驗收測試」確認整條鏈路。

**B. 內容相關**
- [ ] 英文資源中心：Sanity 一旦有資源（目前只有一筆 "God loves all beings" en），會以 Sanity 為準並覆蓋本地《群書治要 / The Governing Principles of Ancient China》。若要保留，需在 Sanity 英文資源補上該筆。
- [ ] 補齊各模組的 en/fr 翻譯內容。

**C. 未完成的功能需求（使用者曾提出、尚未實作）**
- [ ] 將 **認識我們(about) / 核心工作(work) / 最新動態(news) / 支持我們(support)** 做成 **Sanity 可編輯頁面**（文字＋圖片），未填時只顯示提示語；需要：
  - 新增 Sanity `page` 內容類型（pageKey + 富文本 body + 圖片）。
  - 富文本需「完備 Word 排版」與字體：中文 **楷體（Kai）**、英文 **Baskerville**。
  - 前台 `[slug].astro` 讀取該 `page`，有內容顯示富文本，無則顯示提示。
  - ⚠️ 當時卡在一個範圍決策（work/news 目前是首頁錨點 vs 是否改成獨立頁面），尚未取得使用者確認。接手前請先問清楚。

---

## 6. 技術債（Tech Debt）

- **`astro check` 會崩潰（Abort trap: 6 / V8 OOM）**：在本機（含 6GB heap、關閉沙箱）都會於 ~30s 崩潰，且**無任何型別錯誤輸出**。為此已將 `package.json` 的 `build` 改為 `astro build`，型別檢查移到 `build:check`（`astro check && astro build`）。
  - 影響：型別錯誤不再於 build 時阻擋。需要時手動跑 `npm run build:check`，但目前該工具在此環境無法完成。值得日後調查（可能與 sanity/styled-components 型別量過大或 astro-check 版本 bug 有關）。
- **資源/列表「Sanity 覆蓋而非合併」**：`getResources` 與各 `getItems` 在 Sanity 有資料時會完全取代本地保底資料（非合併）。屬預期的 CMS 行為，但需讓編輯者知道。
- **靜態站的詳情頁**：新發布內容的「詳情頁」在重新部署前不存在（即時更新只覆蓋列表）。完整更新仍依賴 rebuild。
- **已提交建置產物**：`sanity/.sanity/runtime/`（app.js、index.html）被 commit 進 repo，理想上應 gitignore。
- **首頁活動圖片寫死**：`HomePage.astro` 的 event 海報為 `/assets/events/...poster.jpg`，未接 Sanity。
- **PDF.js 由 CDN（jsDelivr）載入**：離線/CDN 故障時改顯示「線上閱讀」連結（已處理），但屬外部相依。
- **建置時間長**：約 280–300s / 49–58 頁（Sanity 在沙箱無網路時會出現 `Failed to fetch`，屬正常回退）。

---

## 7. 下一步工作（建議順序）

1. **提交三個項目頁**（§5-A），推送 `main`，確認 Cloudflare 部署。
2. **完成自動部署鏈路**：建立 Cloudflare Deploy Hook + Sanity Webhook，跑 README 驗收測試（新增測試 News → 確認 `/zh/news/` 與詳情頁 → 確認 Cloudflare 有觸發部署）。
3. **確認 about/work/news/support 範圍**後，實作 Sanity 可編輯內容頁（含 Kai/Baskerville 字體與富文本）。
4. **內容遷移**：把仍寫死於 `src/data/*` 的內容逐步搬到 Sanity（首頁活動圖、各區塊文案）。
5. **清理技術債**：gitignore `sanity/.sanity/`；調查 `astro check` 崩潰；視需要恢復型別檢查於 CI。

---

## 8. 驗收標準（Definition of Done）

- [ ] `npm run build` 成功產出 `dist/`（目前 58 頁）。
- [ ] 三個旗艦項目連結（zh/en/fr 共 9 頁）可開啟並顯示「內容建設中，敬請期待 / under construction / en cours de construction」。
- [ ] 在 Sanity 新增一則 News 並 Publish 後：
  - [ ] Cloudflare 自動觸發一次部署（Deployments 出現 Deploy hook 記錄）。
  - [ ] 部署 Success 後 `/zh/news/` 看得到該則，詳情頁可開。
- [ ] 全站三語首頁與列表/詳情頁從 Sanity 取資料；缺值時回退本地、不報錯、不白屏。
- [ ] 手機（iPhone SE 375 / iPhone 14·15 / Android / iPad）無橫向捲動，排版單欄乾淨。
- [ ] 行政人員不需 Cursor/GitHub/Terminal，只在 Sanity 編輯 + Publish 即可更新網站。

---

## 9. 接手者快速上手（New Cursor 對話）

1. 讀本檔 + `README.md`（行政操作）。
2. 資料流：前台元件 → `src/lib/cms.ts` / `news.ts`（GROQ）→ Sanity；缺值回退 `src/data/content.ts`、`resources.ts`。
3. 改樣式 → `src/styles/global.css`；改首頁結構 → `HomePage.astro`；改 schema → `sanity/schemas/` 並更新 `cms.ts` 的 `typeConfig` 對應查詢。
4. 部署：改完 `git add . && git commit && git push`（`main`）→ Cloudflare 自動部署。**不要** force push；**不要**提交 `.env` 或任何密鑰。
5. 注意 `astro check` 目前無法使用（§6）；以 `npm run build`（= `astro build`）為準。
