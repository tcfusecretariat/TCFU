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
PUBLIC_SANITY_PROJECT_ID=your_project_id
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2026-06-15
PUBLIC_SANITY_STUDIO_URL=https://your-studio.sanity.studio
PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN=
CONTACT_EXPORT_TOKEN=replace_with_long_random_token
```

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

Content types:

- News
- Event
- Project
- Resource
- Video
- Partner
- Site Settings

Non-technical staff can use Sanity Studio to:

- Publish news
- Upload photos
- Publish events
- Add videos
- Update contact information
- Recommend content to the homepage
- Hide content without deleting it
- Adjust sort order by entering a simple number

Daily content updates should not require Git, GitHub, Astro, or TypeScript knowledge.

Run Sanity Studio locally:

```bash
npm run sanity:dev
```

Deploy Sanity Studio:

```bash
npm run sanity:deploy
```

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

## Contact Form Data

Contact form submissions are handled by Cloudflare Pages Functions:

- `functions/api/contact.ts` receives form submissions.
- Submissions are stored in Cloudflare KV using the `CONTACT_SUBMISSIONS` binding.
- `functions/api/contact-export.csv.ts` exports submissions as CSV.

Export URL:

```text
/api/contact-export.csv?token=CONTACT_EXPORT_TOKEN
```

Set `CONTACT_EXPORT_TOKEN` as a secret environment variable in Cloudflare Pages. Use a long random value. Do not commit the real token to GitHub.

Required Cloudflare KV binding:

```text
CONTACT_SUBMISSIONS
```

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
- Export contact submissions from `/api/contact-export.csv?token=...` monthly.
- Export Cloudflare KV namespace data before account or deployment migrations.
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
- Hide a page item without deleting it.
- Mark one item as featured.
- Export contact submissions as CSV.

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
