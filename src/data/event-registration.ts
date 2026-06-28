import type { Locale } from "./site";

export const SYMPOSIUM_EVENT_KEY = "international-symposium-youth-wellbeing-peace-education-2026";
export const SYMPOSIUM_PAGE_SLUG = "international-symposium-youth-wellbeing-peace-education-2026";

/** Official conference titles (2026, UNESCO Paris) */
export const CONFERENCE_TITLE = {
  en: "International Peace Conference on Traditional Culture Education for Youth: Ignite the Vital Spark of the Heart",
  zh: "世界和平論壇——傳統文化教育啟動青少年核心源動力",
  fr: "Conférence internationale pour la paix sur l'éducation à la culture traditionnelle en faveur de la jeunesse : Réveiller l'élan vital du cœur"
} as const;

export const PARTICIPANT_CATEGORY_KEYS = [
  "government",
  "international-organization",
  "academic",
  "ngo",
  "private-sector",
  "youth-delegate",
  "media",
  "other"
] as const;

export const AGE_GROUP_KEYS = [
  "under18",
  "18-24",
  "25-30",
  "31-40",
  "41-50",
  "51-70",
  "71plus",
  "prefer-not"
] as const;

export type AgeGroupKey = (typeof AGE_GROUP_KEYS)[number];

export type RegistrationCopy = {
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  title: string;
  /** Optional explicit line breaks for the displayed heading (SEO/email keep `title`). */
  titleLines?: string[];
  subtitle: string;
  date: string;
  venue: string;
  intro: string;
  sections: {
    personal: string;
    contact: string;
    participation: string;
    privacy: string;
  };
  fields: {
    familyName: string;
    givenName: string;
    passportNumber: string;
    nationality: string;
    phone: string;
    email: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    participantCategory: string;
    volunteer: string;
    attendanceDates: string;
    ageGroup: string;
    gender: string;
    remarks: string;
  };
  categories: Record<string, string>;
  ageGroupOptions: Record<AgeGroupKey, string>;
  optionalFieldHelp: string;
  volunteerOptions: { yes: string; no: string };
  attendanceOptions: { oct1: string; oct2: string; both: string };
  privacyConsentRequired: string;
  submit: string;
  sending: string;
  successConfirmed: string;
  error: string;
};

export const registrationCopy: Record<Locale, RegistrationCopy> = {
  en: {
    metaTitle: "Event Registration",
    metaDescription:
      "Register for the International Peace Conference on Traditional Culture Education for Youth at UNESCO Headquarters, Paris.",
    kicker: "Event Registration",
    title: CONFERENCE_TITLE.en,
    titleLines: [
      "International Peace Conference on Traditional Culture Education for Youth:",
      "Ignite the Vital Spark of the Heart"
    ],
    subtitle: "Registration Form",
    date: "1–2 October 2026",
    venue: "UNESCO Headquarters, Paris",
    intro:
      "Please complete all required fields. Upon submission, your registration will be confirmed and a confirmation email will be sent to your address.",
    sections: {
      personal: "Personal Information",
      contact: "Contact Information",
      participation: "Participation Information",
      privacy: "Privacy and Consent"
    },
    fields: {
      familyName: "Family Name / Last Name",
      givenName: "Given Name / First Name",
      passportNumber: "Passport Number / Residence Permit Number / French ID Number",
      nationality: "Nationality",
      phone: "Phone Number",
      email: "Email Address",
      emergencyContactName: "Emergency Contact Name",
      emergencyContactPhone: "Emergency Contact Phone Number",
      participantCategory: "Participant Category",
      volunteer: "Would you like to be a volunteer?",
      attendanceDates: "Attendance Date(s)",
      ageGroup: "Age Group",
      gender: "Gender",
      remarks: "Remarks"
    },
    categories: {
      government: "Government / Public Sector Representative",
      "international-organization": "International Organization / UN Agency",
      academic: "Academic / Research Institution",
      ngo: "NGO / Civil Society Organization",
      "private-sector": "Private Sector / Foundation",
      "youth-delegate": "Youth Delegate (18–35)",
      media: "Media / Press",
      other: "Other"
    },
    ageGroupOptions: {
      under18: "18 and under",
      "18-24": "18–24",
      "25-30": "25–30",
      "31-40": "31–40",
      "41-50": "41–50",
      "51-70": "51–70",
      "71plus": "71 and above",
      "prefer-not": "Prefer not to say"
    },
    optionalFieldHelp:
      "This information is optional and will only be used in anonymous or aggregated form for statistical analysis, to help us better understand participant demographics and improve event arrangements. It will not affect your registration, access to the venue, or eligibility to participate. You may choose not to provide it.",
    volunteerOptions: { yes: "Yes", no: "No" },
    attendanceOptions: {
      oct1: "1 October 2026",
      oct2: "2 October 2026",
      both: "Both days"
    },
    privacyConsentRequired: "You must read and accept the Privacy Policy before submitting.",
    submit: "Submit Registration",
    sending: "Submitting…",
    successConfirmed:
      "Thank you. Your registration has been successfully confirmed. A confirmation email has been sent to your address.",
    error: "We could not submit your registration. Please review the form and try again."
  },
  zh: {
    metaTitle: "活動報名",
    metaDescription: "報名參加「世界和平論壇——傳統文化教育啟動青少年核心源動力」，地點：巴黎 UNESCO 總部。",
    kicker: "活動報名",
    title: CONFERENCE_TITLE.zh,
    titleLines: ["世界和平論壇", "傳統文化教育啟動青少年核心源動力"],
    subtitle: "報名表",
    date: "2026 年 10 月 1–2 日",
    venue: "巴黎 UNESCO 總部",
    intro: "請填寫所有必填欄位。提交後您的報名將立即確認，確認信會寄至您的電郵。",
    sections: {
      personal: "個人資料",
      contact: "聯絡資料",
      participation: "參與資料",
      privacy: "隱私與同意"
    },
    fields: {
      familyName: "姓",
      givenName: "名",
      passportNumber: "護照號碼／居留證號碼／法國身分證號碼",
      nationality: "國籍",
      phone: "電話號碼",
      email: "電郵地址",
      emergencyContactName: "緊急聯絡人姓名",
      emergencyContactPhone: "緊急聯絡人電話",
      participantCategory: "參加者類別",
      volunteer: "是否願意擔任志工？",
      attendanceDates: "出席日期",
      ageGroup: "年齡段",
      gender: "性別",
      remarks: "備註"
    },
    categories: {
      government: "政府／公共部門代表",
      "international-organization": "國際組織／聯合國機構",
      academic: "學術／研究機構",
      ngo: "非政府組織／公民社會",
      "private-sector": "私營部門／基金會",
      "youth-delegate": "青年代表（18–35 歲）",
      media: "媒體／記者",
      other: "其他"
    },
    ageGroupOptions: {
      under18: "18 歲及以下",
      "18-24": "18–24 歲",
      "25-30": "25–30 歲",
      "31-40": "31–40 歲",
      "41-50": "41–50 歲",
      "51-70": "51–70 歲",
      "71plus": "71 歲及以上",
      "prefer-not": "不願提供"
    },
    optionalFieldHelp:
      "該資訊為選填項，僅用於匿名或匯總形式的統計分析，以幫助我們了解參與者構成並改進活動安排。該資訊不會影響您的報名、入場或參與資格。您可選擇不提供。",
    volunteerOptions: { yes: "是", no: "否" },
    attendanceOptions: {
      oct1: "2026 年 10 月 1 日",
      oct2: "2026 年 10 月 2 日",
      both: "兩日皆出席"
    },
    privacyConsentRequired: "提交前請先閱讀並同意隱私政策。",
    submit: "提交報名",
    sending: "提交中…",
    successConfirmed: "感謝您。您的報名已成功確認。確認信已寄至您的電郵。",
    error: "無法提交報名，請檢查表格後再試。"
  },
  fr: {
    metaTitle: "Inscription à l'événement",
    metaDescription:
      "Inscrivez-vous à la Conférence internationale pour la paix sur l'éducation à la culture traditionnelle pour la jeunesse, au siège de l'UNESCO à Paris.",
    kicker: "Inscription",
    title: CONFERENCE_TITLE.fr,
    titleLines: [
      "Conférence internationale pour la paix sur l'éducation à la culture traditionnelle en faveur de la jeunesse :",
      "Réveiller l'élan vital du cœur"
    ],
    subtitle: "Formulaire d'inscription",
    date: "1–2 octobre 2026",
    venue: "Siège de l'UNESCO, Paris",
    intro:
      "Veuillez remplir tous les champs obligatoires. Votre inscription sera confirmée dès l'envoi et un e-mail de confirmation vous sera adressé.",
    sections: {
      personal: "Informations personnelles",
      contact: "Coordonnées",
      participation: "Informations de participation",
      privacy: "Confidentialité et consentement"
    },
    fields: {
      familyName: "Nom",
      givenName: "Prénom",
      passportNumber:
        "Numéro de passeport / numéro de titre de séjour / numéro de carte d'identité française",
      nationality: "Nationalité",
      phone: "Numéro de téléphone",
      email: "Adresse e-mail",
      emergencyContactName: "Nom du contact d'urgence",
      emergencyContactPhone: "Téléphone du contact d'urgence",
      participantCategory: "Catégorie de participant",
      volunteer: "Souhaitez-vous être bénévole ?",
      attendanceDates: "Date(s) de participation",
      ageGroup: "Tranche d'âge",
      gender: "Genre",
      remarks: "Remarques"
    },
    categories: {
      government: "Représentant gouvernemental / secteur public",
      "international-organization": "Organisation internationale / agence de l'ONU",
      academic: "Institution académique / de recherche",
      ngo: "ONG / société civile",
      "private-sector": "Secteur privé / fondation",
      "youth-delegate": "Délégué jeunesse (18–35 ans)",
      media: "Médias / presse",
      other: "Autre"
    },
    ageGroupOptions: {
      under18: "18 ans et moins",
      "18-24": "18–24 ans",
      "25-30": "25–30 ans",
      "31-40": "31–40 ans",
      "41-50": "41–50 ans",
      "51-70": "51–70 ans",
      "71plus": "71 ans et plus",
      "prefer-not": "Préfère ne pas répondre"
    },
    optionalFieldHelp:
      "Cette information est facultative et sera utilisée uniquement sous forme anonyme ou agrégée à des fins d'analyse statistique, afin de nous aider à mieux comprendre la composition des participants et à améliorer l'organisation de l'événement. Elle n'aura aucune incidence sur votre inscription, votre accès au lieu de l'événement ou votre participation. Vous pouvez choisir de ne pas la fournir.",
    volunteerOptions: { yes: "Oui", no: "Non" },
    attendanceOptions: {
      oct1: "1 octobre 2026",
      oct2: "2 octobre 2026",
      both: "Les deux jours"
    },
    privacyConsentRequired:
      "Vous devez lire et accepter la Politique de confidentialité avant l'envoi.",
    submit: "Envoyer l'inscription",
    sending: "Envoi en cours…",
    successConfirmed:
      "Merci. Votre inscription a été confirmée avec succès. Un e-mail de confirmation vous a été envoyé.",
    error: "Impossible d'envoyer votre inscription. Veuillez vérifier le formulaire et réessayer."
  }
};
