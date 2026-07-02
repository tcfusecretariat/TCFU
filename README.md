# Traditional Culture Foundation at UNESCO Website

This project is the public website for Traditional Culture Foundation at UNESCO.

The technical direction is intentionally simple and transferable:

- Frontend: Astro + TypeScript
- CMS: Sanity
- Deployment: GitHub + Cloudflare Pages
- Languages: Traditional Chinese, English, French
- URLs: `/zh/`, `/en/`, `/fr/`

## Project Structure

```text
src/
  components/      Reusable Astro components
  data/            Local fallback content for each language
  layouts/         SEO and page layout
  lib/             Sanity and SEO helpers
  pages/           Astro routes
  styles/          Global CSS
sanity/
  schemas/         CMS content models
public/assets/     Images, PDFs, logo, and static files
```

The old static HTML files remain in the root and `outputs/tcf-homepage/` as visual references. The production architecture is the Astro app under `src/`.

## Local Development

Install dependencies:

```bash
npm install
```

Run the website:

```bash
npm run dev
```

Build the website:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Environment Variables

Copy `.env.example` to `.env` and fill in:

```text
PUBLIC_SITE_URL=https://www.tcfunesco.org
PUBLIC_SANITY_PROJECT_ID=8f53fq35
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2026-06-15
PUBLIC_SANITY_STUDIO_URL=https://tcfunesco.sanity.studio
PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN=
SANITY_REVALIDATE_SECRET=replace_with_long_random_token
CLOUDFLARE_DEPLOY_HOOK_URL=
```

See `.env.example` for the full list, including the optional contact-form
delivery providers (Resend / Formspree / Airtable).

The website must not fail when Sanity content is missing. Local fallback content is stored in `src/data/content.ts`.

## Multilingual Workflow

Each language has its own route:

- Traditional Chinese: `/zh/`
- English: `/en/`
- French: `/fr/`

Chinese can be published first. English and French pages can remain as placeholders until translated content is ready.

SEO includes:

- `lang` attributes
- canonical URLs
- `hreflang`
- Open Graph
- Twitter Cards
- `sitemap.xml`
- `robots.txt`

## Sanity CMS

Sanity schemas are in `sanity/schemas/`.

### 後台選單 ↔ 網站前台位置 對照表

| Sanity 後台選單 | 更新什麼 | 發布後顯示在網站哪些頁面（含三語） | 會在首頁嗎 |
|---|---|---|---|
| 📰 最新動態（News） | 新聞文章 | 列表頁 `/zh/news/`、`/en/news/`、`/fr/news/`；詳情頁 `/<語言>/news/<slug>/` | ✅ 最新 3 則顯示在首頁「最新動態」 |
| 📅 活動（Events） | 活動 / 論壇 | 列表頁 `/zh/events/`、`/en/events/`、`/fr/events/`；詳情頁 `/<語言>/events/<slug>/` | ➖ 首頁「最新論壇」為固定區塊，由「首頁內容」管理 |
| 🏛 項目（Projects） | 旗艦項目 | 列表頁 `/zh/projects/`、`/en/projects/`、`/fr/projects/`；詳情頁 `/<語言>/projects/<slug>/` | ✅ 前 3 筆顯示在首頁「旗艦項目」 |
| 📚 資源中心（Resources） | PDF / 出版物 / 報告 | 線上閱讀頁 `/zh/library/`、`/en/library/`、`/fr/library/`；卡片列表 `/<語言>/resources/`；詳情頁 `/<語言>/resources/<slug>/` | ❌ |
| 🎬 影音中心（Videos） | 影片 | 列表頁 `/zh/videos/`、`/en/videos/`、`/fr/videos/`；詳情頁 `/<語言>/videos/<slug>/` | ❌ |
| 🤝 合作夥伴（Partners） | 夥伴 Logo 與簡介 | 首頁「合作夥伴」區塊（`/zh/`、`/en/`、`/fr/`） | ✅（需開啟「在首頁顯示」） |
| 🏠 首頁內容（Homepage） | 首頁各區塊文字、顯示/隱藏 | 首頁 `/zh/`、`/en/`、`/fr/`（每個語言各一份） | ✅ 就是首頁本身 |
| ⚙️ 網站設定（Site Settings） | Logo、聯絡 Email、社群、捐助連結 | 頁首、頁尾、聯絡表單，全站三語共用 | ✅ 全站共用 |

> 後台選單名稱已與網站前台頁面名稱對齊；點進每個選單後，上方面板標題也會說明「發布後會顯示在哪一頁」。
>
> 三語說明：每筆內容都有「語言」欄位（zh / en / fr）。只有設為 `zh` 的內容會出現在 `/zh/...`，`en` 出現在 `/en/...`，依此類推。可以先只發布中文，英文 / 法文之後再補；缺少翻譯時對應語言的頁面會顯示「內容整理中」提示，不會報錯。

Daily content updates should not require Git, GitHub, Astro, or TypeScript knowledge.

Run Sanity Studio locally:

```bash
npm run sanity:dev
```

Deploy Sanity Studio (一次性，之後行政人員直接用網址登入):

```bash
npm run sanity:login
npm run sanity:deploy
```

---

## 行政人員操作指南（不需要程式碼）

> 重要：日常更新內容**不需要**動到程式碼、Git、Terminal 或 Astro。
> 只要登入 Sanity 後台，像使用 Word / Notion 一樣編輯即可。

### 1. 如何登入 Sanity 後台

1. 打開瀏覽器，前往後台網址：`https://tcfunesco.sanity.studio`
   （本機測試則用 `npm run sanity:dev` 後開啟 http://localhost:3333 ）
2. 點 **Sign in**，使用 Google / GitHub / Email 登入。
3. 第一次使用者需先被加入專案成員：管理者到
   `https://www.sanity.io/manage/project/8f53fq35/members` 邀請對方 Email。

### 2. 如何新增新聞

1. 左側點 **新增新聞 / 管理新聞** → 右上角 **Create**。
2. 填寫：新聞標題、語言（先選「繁體中文」即可）、發布日期、摘要、正文。
3. 上傳封面圖，並填寫「圖片說明文字」。
4. 完成後點右下角 **Publish**（草稿不會顯示在網站）。

### 3. 如何新增活動

1. 左側 **建立活動 / 管理活動** → **Create**。
2. 填寫活動名稱、語言、日期、時間、地點、主辦/協辦、簡介、詳細內容。
3. 上傳活動海報；如有手冊可上傳 **Programme PDF**。
4. 需要報名時，貼上 HelloAsso 報名連結並打開「是否開放報名」。
5. 點 **Publish**。

### 4. 如何上傳 PDF（資源中心）

1. 左側 **資源中心** → **Create**。
2. 填寫標題、語言、資源類型（PDF / 出版物 / 研究報告 / 圖片 / 影片）。
3. 在「PDF 文件」欄位上傳檔案，或在「外部下載連結」貼上連結。
4. 點 **Publish**。前台會自動提供「線上閱讀」與「下載 PDF」按鈕。

### 5. 如何新增影片

1. 左側 **影音中心** → **Create**。
2. 填寫標題、語言、簡介，上傳封面圖。
3. **只需貼上影片網址**（YouTube / Vimeo / Bilibili / 微信視頻號 / 騰訊視頻），
   至少填一個即可。**不需要貼 iframe**，前台會自動生成播放或觀看按鈕。
4. 點 **Publish**。

### 6. 如何修改首頁內容

1. 左側 **首頁內容**，選擇對應語言的那一份（先做「繁體中文」）。
   若還沒有，點 **Create** 新增，語言選「繁體中文」。
2. 用上方分頁切換區塊：主視覺 Hero、核心理念、核心工作、旗艦項目、
   資源中心、最新論壇、最新動態、支持我們、合作夥伴。
3. 每個區塊都有「**顯示 / 隱藏此區塊**」開關，可控制首頁是否呈現。
4. 點 **Publish**。未填寫的欄位會自動沿用網站預設文字，不會出現空白。

### 7. 發布後如何更新到正式網站

#### 為什麼在 Sanity 按了 Publish，網站不會「立刻」變？

本網站是 **Astro 靜態網站（static site）**：所有頁面是在「建置（build）」時，一次性把 Sanity 內容讀出來、產生成 HTML 檔，再放到 Cloudflare CDN。

也就是說，**Sanity 的內容是在「重新建置」那一刻被讀取的**。你之後在 Sanity 修改、發布，CDN 上的舊 HTML 不會自己更新，必須「再建置一次」才會帶入新內容。這就是為什麼「更新兩次也看不到變化」——因為中間沒有觸發重新建置。

> 例外：**最新動態（News）與資源中心（Resources）** 的列表，前台會在訪客瀏覽時「即時」再向 Sanity 抓一次最新資料顯示，所以這兩個列表通常不必等重新部署。
> 但**全新的詳情頁**（例如新發布的一篇新聞的內文頁 `/zh/news/<slug>/`）在重新建置前還不存在，點進去會是 404；活動 / 項目 / 影片等其他頁面也都要重新建置才會更新。
> 結論：**正式、完整的更新方式仍然是「觸發 Cloudflare 重新部署」**。

#### 方法 A：手動觸發一次重新部署（最簡單，臨時用）

到 Cloudflare Pages → 你的專案 → **Deployments** → 最新一筆右側 **⋯ → Retry deployment**（或 **Create deployment**）。約 1–3 分鐘後網站就會帶入最新 Sanity 內容。

#### 方法 B：Sanity 一發布就自動重新部署（建議，設定一次即可）

需要先拿到一個「Cloudflare Deploy Hook URL」（這是一個一 POST 就會觸發重建的網址）：

1. Cloudflare Pages → 專案 → **Settings → Builds & deployments → Deploy hooks** → **Add deploy hook**，
   取名（例如 `sanity-publish`）、分支選 `main`，建立後 **複製該 URL**。

接著二選一把 Sanity 接上去：

- **B1（最簡單，不需密鑰、不需我們的程式）**：直接把上面的 Deploy Hook URL 當成 Webhook 目標。
  - Sanity → `https://www.sanity.io/manage/project/8f53fq35/api/webhooks` → **Create webhook**
  - Name：`Rebuild website`
  - URL：**貼上剛剛的 Cloudflare Deploy Hook URL**
  - Trigger on：勾選 Create / Update / Delete
  - HTTP method：`POST`，Filter / Projection 留空即可 → **Save**

- **B2（多一層密鑰保護，透過本網站的 API）**：使用內建的 `/api/sanity-revalidate` 端點。
  1. Cloudflare Pages → 專案 → **Settings → Environment variables**，新增：
     - `CLOUDFLARE_DEPLOY_HOOK_URL` = 上面的 Deploy Hook URL
     - `SANITY_REVALIDATE_SECRET` = 自訂一組長亂碼字串（例如用密碼產生器產生 40 字元）
     - 存檔後重新部署一次，讓變數生效。
  2. Sanity → `https://www.sanity.io/manage/project/8f53fq35/api/webhooks` → **Create webhook**：
     - URL：`https://www.tcfunesco.org/api/sanity-revalidate`
     - HTTP method：`POST`
     - HTTP Headers：新增 `sanity-webhook-secret` = 與 `SANITY_REVALIDATE_SECRET` 相同的字串
     - Trigger on：Create / Update / Delete → **Save**

設定好後，**每次在 Sanity 按 Publish，幾秒內就會自動觸發 Cloudflare 重新部署**，約 1–3 分鐘後網站更新完成。

#### 如何確認端點有正常上線（B2 適用）

用瀏覽器打開 `https://www.tcfunesco.org/api/sanity-revalidate`（GET）會回傳一段 JSON，顯示 `configured.secret` 與 `configured.deployHook` 是否為 `true`；兩者都為 `true` 才代表環境變數設定完成。

#### 驗收測試（照做即可確認整條鏈路）

1. Sanity → 最新動態 → Create，標題填「測試文章」，語言選「繁體中文」，填日期與摘要 → **Publish**。
2. 若已設定方法 B：到 Cloudflare Pages → Deployments，應看到幾秒內出現一筆「**Deploy hook**」觸發的新部署。
3. 等部署變成 **Success**（約 1–3 分鐘）後：
   - 打開 `https://www.tcfunesco.org/zh/news/`，應看到「測試文章」。
   - 點進去 `https://www.tcfunesco.org/zh/news/<slug>/`，詳情頁能正常打開。
4. 確認顯示的是最新內容後，可把測試文章在 Sanity 刪除或設為「暫時隱藏」，再等一次部署即可。

## Images and Video

Images should be managed in Sanity and served through Sanity Image CDN when connected:

- automatic compression
- responsive image sizing
- required alt text fields

Use `src/components/SanityImage.astro` for CMS images. It outputs Sanity CDN URLs with `srcset`, `sizes`, lazy loading, and required alt text.

Videos should not be stored on the website server.

Use:

- YouTube
- Cloudflare-hosted video or R2-hosted files

The CMS only stores the video URL.

## Contact Form

**Phase 1 (current): mailto.** The contact form does not depend on Cloudflare KV
or any database. When a visitor submits, the site opens their email app with the
message pre-filled to the address set in **Site Settings → 聯絡 Email**
(fallback `secretariat@traditionalculturefoundation.org`). This works immediately with zero configuration.

**Future (optional) server-side delivery.** `functions/api/contact.ts` is a
ready-to-use endpoint with no KV dependency. To deliver messages without opening
the visitor's email app, set ONE provider in Cloudflare Pages → Environment
variables and point the form `action` at `/api/contact`:

- Resend: `RESEND_API_KEY` + `CONTACT_TO_EMAIL` + `CONTACT_FROM_EMAIL`
- Formspree: `FORMSPREE_ENDPOINT`
- Airtable: `AIRTABLE_TOKEN` + `AIRTABLE_BASE_ID` + `AIRTABLE_TABLE`

There is no fake KV namespace to fill in.

## Gallery Lightbox

Use `src/components/GalleryLightbox.astro` for image galleries.

Features:

- Click an image to enlarge it.
- Keyboard focus remains visible.
- Alt text is required for accessibility.
- The visual style follows the ivory and champagne-gold design system.

## Content Sorting, Recommendation, and Hide/Show

Sanity content types include:

- `isFeatured`: recommends content to homepage or top of lists.
- `sortOrder`: smaller numbers appear first.
- `isHidden`: hides content from the public website without deleting it.

The website queries exclude hidden content and sort by:

```text
isFeatured desc, sortOrder asc, publishDate desc
```

This allows staff to manage homepage priority without code.

## Site Search

Search pages are available at:

- `/zh/search/`
- `/en/search/`
- `/fr/search/`

The first version uses `src/data/searchIndex.ts` as a simple index. When Sanity content is connected, the index can be generated from Sanity content during build or fetched through a search endpoint.

## Analytics

Basic visitor statistics are designed for Cloudflare Web Analytics.

Set this environment variable in Cloudflare Pages:

```text
PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN=your_cloudflare_web_analytics_token
```

If the token is empty, no analytics script is loaded.

## Accessibility

Target standard: WCAG 2.1 AA.

Requirements included in the architecture:

- Images require alt text in Sanity schemas
- Forms have labels
- Contact form includes a GDPR consent checkbox
- Keyboard focus states are visible
- Correct `lang` attributes per language
- Logical heading structure
- Video model includes transcript/caption field
- Accessibility Statement page route: `/zh/accessibility/`, `/en/accessibility/`, `/fr/accessibility/`

## GDPR and Legal Pages

Routes are prepared:

- Privacy Policy: `/zh/privacy/`
- Cookie Policy: `/zh/cookie-policy/`
- Legal Notice: `/zh/legal-notice/`
- Accessibility Statement: `/zh/accessibility/`

Equivalent English and French routes are also generated.

Cookie banner includes:

- Accept
- Reject
- Settings

## GitHub Workflow

Recommended flow:

1. Create a feature branch.
2. Make changes.
3. Open a pull request.
4. Review preview deployment on Cloudflare Pages.
5. Merge to the production branch.

Suggested branches:

- `main`: production
- `develop`: preview/staging

## Cloudflare Pages Deployment

Create a Cloudflare Pages project connected to the GitHub repository.

Build settings:

```text
Framework preset: Astro
Build command: npm run build
Build output directory: dist
```

Set the same environment variables in Cloudflare Pages.

Use:

- Preview environment for pull requests and non-production branches
- Production environment for `main`

## Backup and Recovery

Ownership and backup should belong to the foundation, not personal accounts.

Keep foundation-owned access for:

- Domain
- DNS
- GitHub repository
- Cloudflare account
- Sanity project
- Source code
- Design assets

Backup process:

- Export Sanity dataset regularly.
- Keep GitHub repository protected and owned by the foundation.
- Keep source assets in a foundation-owned shared drive.
- Document account ownership and recovery contacts internally.
- Store Sanity exports, contact CSV files, and key PDFs in foundation-owned storage.

Suggested Sanity export command:

```bash
sanity dataset export production backups/sanity-production.tar.gz
```

Suggested restore command:

```bash
sanity dataset import backups/sanity-production.tar.gz production --replace
```

## Publishing News

1. Log in to Sanity Studio.
2. Click `新增新聞 / 管理新聞`.
3. Click create new document.
4. Enter the news title.
5. The URL slug can be generated from the title.
6. Select language.
7. Upload cover image and enter alt text.
8. Add publish date, summary, body, gallery, video URL, PDF attachment, SEO title, and SEO description.
9. Optional: turn on `推薦到首頁或列表前方`.
10. Optional: enter `排序數字`.
11. Publish.
12. The website will display available content and hide missing optional sections.

## Publishing Events

1. Log in to Sanity Studio.
2. Click `建立活動 / 管理活動`.
3. Enter activity name.
4. Add date and location.
5. Upload poster and enter alt text.
6. Add HelloAsso registration URL.
7. Add description, gallery, video, and files.
8. Publish.

## Uploading PDF Resources

1. Log in to Sanity Studio.
2. Click `上傳 PDF / 管理資源`.
3. Enter resource title.
4. Generate the URL slug from title.
5. Select language.
6. Upload PDF.
7. Add cover image and description.
8. Publish.

The website can generate online reading and download pages from this content.

## Adding Videos

1. Log in to Sanity Studio.
2. Click `新增影片`.
3. Enter video title.
4. Paste YouTube URL.
5. Optional: paste Vimeo URL.
6. Optional: paste Bilibili URL.
7. Add thumbnail and transcript/captions if available.
8. Publish.

Staff do not need to embed iframes manually.

## 30-Minute Staff Training Checklist

After a short training, administrative staff should be able to:

- Publish one news item.
- Create one event.
- Upload one PDF resource.
- Add one video link.
- Edit the homepage content.
- Hide a page item without deleting it.
- Mark one item as featured.

## Ownership Requirement

All digital assets and accounts must belong to the foundation:

- Domain
- DNS
- GitHub Repository
- Cloudflare Account
- Sanity Project
- Source Code
- Design Assets

The project must be transferable to any external engineer without dependency on a personal account.
