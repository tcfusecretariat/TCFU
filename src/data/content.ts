import type { Locale } from "./site";

export type NavItem = {
  label: string;
  href: string;
};

export type HomeContent = {
  metaTitle: string;
  metaDescription: string;
  nav: NavItem[];
  search: string;
  hero: {
    translations: string[];
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  sections: {
    philosophy: { kicker: string; title: string; paragraphs: string[] };
    work: { kicker: string; title: string; pillars: { title: string; subtitle: string }[] };
    projects: { kicker: string; title: string };
    library: { kicker: string; title: string; description: string; languages: string[] };
    event: { kicker: string; title: string; description: string; link: string };
    news: { kicker: string; title: string };
    support: { kicker: string; title: string; items: string[]; cta: string };
  };
  footer: { contact: string; donate: string; privacy: string };
  contact: {
    title: string;
    intro: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    consent: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
  };
};

export const placeholderText: Record<Locale, string> = {
  zh: "本頁內容正在整理與更新中，敬請期待。",
  en: "This section is currently being developed and will be available soon.",
  fr: "Cette rubrique est actuellement en préparation et sera prochainement disponible."
};

export const content: Record<Locale, HomeContent> = {
  zh: {
    metaTitle: "Traditional Culture Foundation at UNESCO",
    metaDescription: "以和平教育、青少年身心健康、文明對話與傳統智慧促進世界和平與人類共同福祉。",
    nav: [
      { label: "認識我們", href: "/zh/#about" },
      { label: "核心工作", href: "/zh/#work" },
      { label: "最新動態", href: "/zh/#news" },
      { label: "資源中心", href: "/zh/#library" },
      { label: "支持我們", href: "/zh/#support" }
    ],
    search: "網站搜索",
    hero: {
      translations: ["Ignite the Inner Source of Power", "Réveiller l’élan vital du cœur", "أيقِظ طاقة الجوهر الأولى"],
      description: "透過傳統智慧、和平教育與文明對話，培養面向未來世代的品格、福祉與和平。",
      primaryCta: "認識基金會",
      secondaryCta: "探索資源中心"
    },
    sections: {
      philosophy: {
        kicker: "核心理念",
        title: "真正的和平<br />始於人心",
        paragraphs: [
          "我們相信，每個人都擁有推動自身成長、家庭和諧、社會進步與世界和平的內在力量。",
          "基金會透過教育、文化與文明對話，啟發並培養這份核心原動力，讓傳統智慧在當代世界成為清明、溫柔而堅定的公共力量。"
        ]
      },
      work: {
        kicker: "我們的工作",
        title: "四大主軸<br />連結人的內在成長與世界和平",
        pillars: [
          { title: "和平教育", subtitle: "Peace Education" },
          { title: "青少年身心健康", subtitle: "Youth Well-being" },
          { title: "文明對話", subtitle: "Intercultural Dialogue" },
          { title: "傳統智慧", subtitle: "Traditional Wisdom" }
        ]
      },
      projects: { kicker: "旗艦項目", title: "以教育 經典與國際論壇<br />建立面向未來的和平平台" },
      library: {
        kicker: "資源中心",
        title: "傳統智慧 · 世界共享",
        description: "《群書治要》THE GOVERNING PRINCIPLES OF ANCIENT CHINA 是基金會推動傳統智慧全球共享的重要出版與翻譯計劃。",
        languages: ["中文", "English", "Français", "Deutsch", "Русский", "Español", "العربية", "日本語"]
      },
      event: {
        kicker: "最新論壇",
        title: "2025 世界和平論壇於 UNESCO 舉行",
        description: "基金會共同協辦 International Peace Conference on Education for Well-being 2025，聚焦青少年身心健康、幸福教育與文明對話。",
        link: "查看活動 Programme"
      },
      news: { kicker: "最新動態", title: "精選論壇 活動與出版物" },
      support: {
        kicker: "支持我們",
        title: "您的支持<br />將成為和平教育與經典翻譯的下一份力量",
        items: ["和平教育", "青少年項目", "國際論壇", "經典翻譯"],
        cta: "支持基金會"
      }
    },
    footer: { contact: "聯繫我們", donate: "捐助支持", privacy: "隱私政策" },
    contact: {
      title: "聯繫我們",
      intro: "請留下您的訊息，我們會盡快回覆您。",
      name: "姓名",
      email: "電子郵件",
      subject: "主旨",
      message: "訊息",
      consent: "我同意基金會依隱私政策使用此表單資料，以回覆我的詢問。",
      submit: "送出訊息",
      sending: "處理中…",
      success: "已為您開啟郵件程式，請確認後寄出即可完成聯絡。",
      error: "無法開啟郵件程式，請直接來信 office@tcfunesco.org。"
    }
  },
  en: {
    metaTitle: "Traditional Culture Foundation at UNESCO",
    metaDescription: "An international cultural foundation advancing peace education, youth well-being, intercultural dialogue, and traditional wisdom.",
    nav: [
      { label: "About Us", href: "/en/#about" },
      { label: "Core Work", href: "/en/#work" },
      { label: "Latest News", href: "/en/#news" },
      { label: "Resource Center", href: "/en/#library" },
      { label: "Support Us", href: "/en/#support" }
    ],
    search: "Site Search",
    hero: {
      translations: ["Ignite the Inner Source of Power", "Réveiller l’élan vital du cœur", "أيقِظ طاقة الجوهر الأولى"],
      description: "Through traditional wisdom, peace education, and intercultural dialogue, we cultivate character, well-being, and peace for future generations.",
      primaryCta: "About the Foundation",
      secondaryCta: "Explore Resources"
    },
    sections: {
      philosophy: { kicker: "Core Philosophy", title: "True peace begins<br />within the human heart", paragraphs: ["We believe every person carries an inner force capable of nurturing personal growth, family harmony, social progress, and world peace.", "The Foundation works through education, culture, and dialogue among civilizations to awaken and cultivate this inner driving force."] },
      work: { kicker: "Core Work", title: "Four pillars connecting inner growth<br />with peace in the world", pillars: [{ title: "Peace Education", subtitle: "和平教育" }, { title: "Youth Well-being", subtitle: "青少年身心健康" }, { title: "Intercultural Dialogue", subtitle: "文明對話" }, { title: "Traditional Wisdom", subtitle: "傳統智慧" }] },
      projects: { kicker: "Flagship Projects", title: "Building a future-facing platform for peace<br />through education classics and forums" },
      library: { kicker: "Resource Center", title: "Traditional Wisdom · Shared with the World", description: "THE GOVERNING PRINCIPLES OF ANCIENT CHINA is a flagship translation and publishing initiative for sharing classical wisdom globally.", languages: ["中文", "English", "Français", "Deutsch", "Русский", "Español", "العربية", "日本語"] },
      event: { kicker: "Latest Forum", title: "2025 International Peace Conference held at UNESCO", description: "The Foundation co-organized the International Peace Conference on Education for Well-being 2025, focusing on youth well-being, education, and intercultural dialogue.", link: "View Programme" },
      news: { kicker: "Latest News", title: "Selected forums activities and publications" },
      support: { kicker: "Support Us", title: "Your support helps peace education<br />and classical translation reach the next generation", items: ["Peace education", "Youth projects", "International forums", "Classical translation"], cta: "Support the Foundation" }
    },
    footer: { contact: "Contact Us", donate: "Support Us", privacy: "Privacy Policy" },
    contact: {
      title: "Contact Us",
      intro: "Leave your message and we will get back to you as soon as possible.",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      consent: "I agree that the Foundation may use this form data to respond to my inquiry according to the Privacy Policy.",
      submit: "Send Message",
      sending: "Working…",
      success: "We've opened your email app — please review and send to reach us.",
      error: "Couldn't open your email app. Please email office@tcfunesco.org directly."
    }
  },
  fr: {
    metaTitle: "Traditional Culture Foundation at UNESCO",
    metaDescription: "Fondation culturelle internationale dédiée à l’éducation à la paix, au bien-être des jeunes, au dialogue interculturel et à la sagesse traditionnelle.",
    nav: [
      { label: "Nous connaître", href: "/fr/#about" },
      { label: "Axes de travail", href: "/fr/#work" },
      { label: "Actualités", href: "/fr/#news" },
      { label: "Ressources", href: "/fr/#library" },
      { label: "Nous soutenir", href: "/fr/#support" }
    ],
    search: "Recherche",
    hero: {
      translations: ["Ignite the Inner Source of Power", "Réveiller l’élan vital du cœur", "أيقِظ طاقة الجوهر الأولى"],
      description: "Par la sagesse traditionnelle, l’éducation à la paix et le dialogue interculturel, nous cultivons le caractère, le bien-être et la paix pour les générations futures.",
      primaryCta: "Connaître la Fondation",
      secondaryCta: "Explorer les ressources"
    },
    sections: {
      philosophy: { kicker: "Idée fondatrice", title: "La paix véritable commence<br />dans le cœur humain", paragraphs: ["Nous croyons que chaque personne porte en elle une force capable de nourrir sa croissance, l’harmonie familiale, le progrès social et la paix mondiale.", "La Fondation agit par l’éducation, la culture et le dialogue entre les civilisations afin d’éveiller et de cultiver cette force intérieure."] },
      work: { kicker: "Axes de travail", title: "Quatre axes reliant la croissance intérieure<br />à la paix dans le monde", pillars: [{ title: "Éducation à la paix", subtitle: "Peace Education" }, { title: "Bien-être des jeunes", subtitle: "Youth Well-being" }, { title: "Dialogue interculturel", subtitle: "Intercultural Dialogue" }, { title: "Sagesse traditionnelle", subtitle: "Traditional Wisdom" }] },
      projects: { kicker: "Projets phares", title: "Construire une plateforme de paix<br />par l’éducation les classiques et les forums" },
      library: { kicker: "Ressources", title: "Sagesse traditionnelle · Partagée avec le monde", description: "Les Principes de Gouvernance de la Chine Ancienne constituent un projet phare de traduction et d’édition pour partager la sagesse classique à l’échelle mondiale.", languages: ["中文", "English", "Français", "Deutsch", "Русский", "Español", "العربية", "日本語"] },
      event: { kicker: "Dernier forum", title: "La conférence internationale pour la paix 2025 s’est tenue à l’UNESCO", description: "La Fondation a coorganisé l’International Peace Conference on Education for Well-being 2025, consacrée au bien-être des jeunes, à l’éducation et au dialogue interculturel.", link: "Voir le programme" },
      news: { kicker: "Actualités", title: "Forums activités et publications sélectionnés" },
      support: { kicker: "Nous soutenir", title: "Votre soutien aide l’éducation à la paix<br />et la traduction des classiques", items: ["Éducation à la paix", "Projets jeunesse", "Forums internationaux", "Traduction des classiques"], cta: "Soutenir la Fondation" }
    },
    footer: { contact: "Nous contacter", donate: "Soutenir", privacy: "Confidentialité" },
    contact: {
      title: "Nous contacter",
      intro: "Laissez votre message et nous vous répondrons dès que possible.",
      name: "Nom",
      email: "E-mail",
      subject: "Objet",
      message: "Message",
      consent: "J’accepte que la Fondation utilise les données de ce formulaire pour répondre à ma demande conformément à la politique de confidentialité.",
      submit: "Envoyer",
      sending: "En cours…",
      success: "Votre application e-mail s’est ouverte — vérifiez puis envoyez pour nous contacter.",
      error: "Impossible d’ouvrir votre application e-mail. Écrivez directement à office@tcfunesco.org."
    }
  }
};

export const projects = [
  { href: "project-peace-conference", eyebrow: "International Peace Conference on Education for Well-being", zh: "世界和平論壇", en: "World Peace Forum", fr: "Forum mondial pour la paix" },
  { href: "project-translation", eyebrow: "Global Translation Project", zh: "群書治要全球翻譯計劃", en: "THE GOVERNING PRINCIPLES OF ANCIENT CHINA", fr: "Les Principes de Gouvernance de la Chine Ancienne" },
  { href: "project-youth-peace", eyebrow: "Youth Peace Ambassador Programme", zh: "青少年和平大使計劃", en: "Youth Peace Ambassadors", fr: "Jeunes ambassadeurs de la paix" }
];

export const legalPages = [
  { slug: "privacy", title: "隱私政策" },
  { slug: "legal-notice", title: "法律聲明" },
  { slug: "accessibility", title: "無障礙聲明" }
];

export const staticPages = {
  zh: [
    { slug: "about", title: "認識我們" },
    { slug: "contact", title: "聯繫我們" },
    { slug: "support", title: "支持我們" },
    { slug: "privacy", title: "隱私政策" },
    { slug: "legal-notice", title: "法律聲明" },
    { slug: "accessibility", title: "無障礙聲明" }
  ],
  en: [
    { slug: "about", title: "About Us" },
    { slug: "contact", title: "Contact" },
    { slug: "support", title: "Support Us" },
    { slug: "privacy", title: "Privacy Policy" },
    { slug: "legal-notice", title: "Legal Notice" },
    { slug: "accessibility", title: "Accessibility Statement" }
  ],
  fr: [
    { slug: "about", title: "Nous connaître" },
    { slug: "contact", title: "Contact" },
    { slug: "support", title: "Nous soutenir" },
    { slug: "privacy", title: "Politique de confidentialité" },
    { slug: "legal-notice", title: "Mentions légales" },
    { slug: "accessibility", title: "Déclaration d’accessibilité" }
  ]
} satisfies Record<Locale, { slug: string; title: string }[]>;
