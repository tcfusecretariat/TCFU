import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || projectId === "your_project_id") {
  throw new Error("Missing PUBLIC_SANITY_PROJECT_ID or SANITY_STUDIO_PROJECT_ID.");
}

if (!token) {
  throw new Error("Missing SANITY_WRITE_TOKEN. Create a Sanity token with write access and set it before running this script.");
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.PUBLIC_SANITY_API_VERSION || "2026-06-15",
  token,
  useCdn: false
});

async function uploadPdf(relativePath) {
  const filePath = path.resolve(relativePath);
  if (!fs.existsSync(filePath)) return undefined;
  const asset = await client.assets.upload("file", fs.createReadStream(filePath), {
    filename: path.basename(filePath),
    contentType: "application/pdf"
  });
  return {
    _type: "file",
    asset: { _type: "reference", _ref: asset._id }
  };
}

const pdfFile = await uploadPdf("public/assets/resources/qunshu-zhiyao-360-zh.pdf");

const docs = [
  {
    _id: "demo-news-ipc-2025-zh",
    _type: "news",
    title: "International Peace Conference on Education for Well-being 2025",
    slug: { _type: "slug", current: "international-peace-conference-2025" },
    language: "zh",
    category: "論壇",
    publishDate: "2025-06-18T09:00:00.000Z",
    summary: "基金會共同推動以青少年福祉、和平教育與文明對話為核心的國際和平論壇。",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "本示範新聞可由 Sanity 後台編輯，發布後會自動顯示於網站最新動態。" }]
      }
    ],
    isFeatured: true,
    isHidden: false,
    sortOrder: 1,
    seoTitle: "International Peace Conference 2025",
    seoDescription: "International Peace Conference on Education for Well-being 2025 demo news."
  },
  {
    _id: "demo-event-peace-conference-zh",
    _type: "event",
    eventName: "International Peace Conference on Education for Well-being 2025",
    slug: { _type: "slug", current: "peace-conference-2025" },
    language: "zh",
    date: "2025-06-18T09:00:00.000Z",
    location: "UNESCO, Paris",
    registrationUrl: "https://www.helloasso.com/associations/traditional-culture-foundation-at-unesco",
    description: "示範活動資料。行政人員可在後台更新日期、地點、海報與報名連結。",
    isFeatured: true,
    isHidden: false,
    sortOrder: 1
  },
  {
    _id: "demo-resource-qunshu-zh",
    _type: "resource",
    title: "群書治要三六〇 中文版",
    slug: { _type: "slug", current: "qunshu-zhiyao-360-zh" },
    language: "zh",
    type: "出版物",
    description: "示範 PDF 資源，可在線閱讀並下載。",
    file: pdfFile,
    isFeatured: true,
    isHidden: false,
    sortOrder: 1,
    seoTitle: "群書治要三六〇 中文版",
    seoDescription: "群書治要三六〇 PDF 線上閱讀與下載。"
  },
  {
    _id: "demo-video-foundation-zh",
    _type: "video",
    title: "基金會介紹影片",
    slug: { _type: "slug", current: "foundation-introduction" },
    language: "zh",
    youtubeUrl: "https://www.youtube.com/@Traditional_Culture_Foundation",
    transcript: "示範影片資料。後台只需貼上 YouTube 連結，前台會自動生成影片頁。",
    isFeatured: true,
    isHidden: false,
    sortOrder: 1,
    seoTitle: "基金會介紹影片",
    seoDescription: "Traditional Culture Foundation at UNESCO video resource."
  },
  {
    _id: "demo-project-youth-ambassador-zh",
    _type: "project",
    title: "青少年和平大使計劃",
    slug: { _type: "slug", current: "youth-peace-ambassador-programme" },
    language: "zh",
    summary: "以和平教育與青少年身心健康為核心的示範項目。",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "此項目頁由 Sanity 自動生成，後台可繼續補充圖片、內容與 SEO 資訊。" }]
      }
    ],
    isFeatured: true,
    isHidden: false,
    sortOrder: 1,
    seoTitle: "青少年和平大使計劃",
    seoDescription: "Youth Peace Ambassador Programme demo project."
  },
  {
    _id: "demo-partner-unesco-zh",
    _type: "partner",
    name: "UNESCO",
    website: "https://www.unesco.org/",
    description: "示範合作夥伴資料，可在後台更新 Logo、介紹與網站連結。"
  }
];

for (const doc of docs) {
  await client.createOrReplace(doc);
  console.log(`Seeded ${doc._type}: ${doc._id}`);
}
