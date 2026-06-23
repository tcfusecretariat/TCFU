import type { Locale } from "./site";

export const SYMPOSIUM_EVENT_KEY = "international-symposium-youth-wellbeing-peace-education-2026";
export const SYMPOSIUM_PAGE_SLUG = "international-symposium-youth-wellbeing-peace-education-2026";

/** Official conference titles (2026, UNESCO Paris) */
export const CONFERENCE_TITLE = {
  en: "International Peace Conference on Traditional Culture Education for Youth: Ignite the Vital Spark of the Heart",
  zh: "世界和平論壇 傳統文化教育啟動青少年核心源動力",
  fr: "Conférence internationale pour la paix sur l'éducation à la culture traditionnelle pour la jeunesse : Réveiller l'élan vital du cœur"
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

export type RegistrationCopy = {
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  title: string;
  subtitle: string;
  date: string;
  venue: string;
  intro: string;
  sections: {
    personal: string;
    contact: string;
    participation: string;
    consent: string;
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
    specialRequirements: string;
    messageToCommittee: string;
  };
  categories: Record<string, string>;
  volunteerOptions: { yes: string; no: string };
  attendanceOptions: { oct1: string; oct2: string; both: string };
  consent: string;
  submit: string;
  sending: string;
  successPending: string;
  successWaitlist: string;
  error: string;
};

export const registrationCopy: Record<Locale, RegistrationCopy> = {
  en: {
    metaTitle: "Event Registration",
    metaDescription:
      "Register for the International Peace Conference on Traditional Culture Education for Youth at UNESCO Headquarters, Paris.",
    kicker: "Event Registration",
    title: CONFERENCE_TITLE.en,
    subtitle: "Registration Form",
    date: "1–2 October 2026",
    venue: "UNESCO Headquarters, Paris",
    intro:
      "Please complete all required fields. The Secretariat will review your registration and contact you regarding confirmation and access arrangements.",
    sections: {
      personal: "Personal Information",
      contact: "Contact Information",
      participation: "Participation Information",
      consent: "Consent"
    },
    fields: {
      familyName: "Family Name / Last Name",
      givenName: "Given Name / First Name",
      passportNumber: "Passport Number",
      nationality: "Nationality",
      phone: "Phone Number",
      email: "Email Address",
      emergencyContactName: "Emergency Contact Name",
      emergencyContactPhone: "Emergency Contact Phone Number",
      participantCategory: "Participant Category",
      volunteer: "Would you like to volunteer?",
      attendanceDates: "Attendance Date(s)",
      specialRequirements: "Special Requirements",
      messageToCommittee: "Message to the Organizing Committee"
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
    volunteerOptions: { yes: "Yes", no: "No" },
    attendanceOptions: {
      oct1: "1 October 2026",
      oct2: "2 October 2026",
      both: "Both days"
    },
    consent:
      "I consent to the collection and processing of the personal data provided above for the purposes of event registration, participant verification, access management, safety communication, and necessary administrative arrangements.",
    submit: "Submit Registration",
    sending: "Submitting…",
    successPending:
      "Thank you. Your registration has been received and is pending review. A confirmation email has been sent to your address.",
    successWaitlist:
      "Thank you. The conference has reached confirmed capacity, so your registration has been placed on the waitlist. A confirmation email has been sent to your address.",
    error: "We could not submit your registration. Please review the form and try again."
  },
  zh: {
    metaTitle: "活動報名",
    metaDescription: "報名參加「世界和平論壇 傳統文化教育啟動青少年核心源動力」，地點：巴黎 UNESCO 總部。",
    kicker: "活動報名",
    title: CONFERENCE_TITLE.zh,
    subtitle: CONFERENCE_TITLE.en,
    date: "2026 年 10 月 1–2 日",
    venue: "巴黎 UNESCO 總部",
    intro: "請填寫所有必填欄位。秘書處將審核您的報名，並就確認及入場安排與您聯繫。",
    sections: {
      personal: "個人資料",
      contact: "聯絡資料",
      participation: "參與資料",
      consent: "同意事項"
    },
    fields: {
      familyName: "姓（Family Name / Last Name）",
      givenName: "名（Given Name / First Name）",
      passportNumber: "護照號碼",
      nationality: "國籍",
      phone: "電話號碼",
      email: "電郵地址",
      emergencyContactName: "緊急聯絡人姓名",
      emergencyContactPhone: "緊急聯絡人電話",
      participantCategory: "參加者類別",
      volunteer: "是否願意擔任志工？",
      attendanceDates: "出席日期",
      specialRequirements: "特殊需求（選填）",
      messageToCommittee: "給籌委會的訊息（選填）"
    },
    categories: {
      government: "政府 / 公共部門代表",
      "international-organization": "國際組織 / 聯合國機構",
      academic: "學術 / 研究機構",
      ngo: "非政府組織 / 公民社會",
      "private-sector": "私營部門 / 基金會",
      "youth-delegate": "青年代表（18–35 歲）",
      media: "媒體 / 記者",
      other: "其他"
    },
    volunteerOptions: { yes: "是", no: "否" },
    attendanceOptions: {
      oct1: "2026 年 10 月 1 日",
      oct2: "2026 年 10 月 2 日",
      both: "兩日皆出席"
    },
    consent:
      "本人同意為活動報名、參加者核實、出入管理、安全聯絡及必要行政安排之目的，收集及處理上述個人資料。",
    submit: "提交報名",
    sending: "提交中…",
    successPending: "感謝您。您的報名已收到，正在等候審核。確認信已寄至您的電郵。",
    successWaitlist: "感謝您。論壇確認名額已滿，您的報名已列入候補。確認信已寄至您的電郵。",
    error: "無法提交報名，請檢查表格後再試。"
  },
  fr: {
    metaTitle: "Inscription à l'événement",
    metaDescription:
      "Inscrivez-vous à la Conférence internationale pour la paix sur l'éducation à la culture traditionnelle pour la jeunesse, au siège de l'UNESCO à Paris.",
    kicker: "Inscription",
    title: CONFERENCE_TITLE.fr,
    subtitle: CONFERENCE_TITLE.en,
    date: "1–2 octobre 2026",
    venue: "Siège de l'UNESCO, Paris",
    intro:
      "Veuillez remplir tous les champs obligatoires. Le Secrétariat examinera votre inscription et vous contactera concernant la confirmation et les modalités d'accès.",
    sections: {
      personal: "Informations personnelles",
      contact: "Coordonnées",
      participation: "Informations de participation",
      consent: "Consentement"
    },
    fields: {
      familyName: "Nom de famille",
      givenName: "Prénom",
      passportNumber: "Numéro de passeport",
      nationality: "Nationalité",
      phone: "Numéro de téléphone",
      email: "Adresse e-mail",
      emergencyContactName: "Nom du contact d'urgence",
      emergencyContactPhone: "Téléphone du contact d'urgence",
      participantCategory: "Catégorie de participant",
      volunteer: "Souhaitez-vous être bénévole ?",
      attendanceDates: "Date(s) de participation",
      specialRequirements: "Besoins particuliers (facultatif)",
      messageToCommittee: "Message au comité d'organisation (facultatif)"
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
    volunteerOptions: { yes: "Oui", no: "Non" },
    attendanceOptions: {
      oct1: "1 octobre 2026",
      oct2: "2 octobre 2026",
      both: "Les deux jours"
    },
    consent:
      "Je consens à la collecte et au traitement des données personnelles ci-dessus aux fins d'inscription, de vérification des participants, de gestion des accès, de communication de sécurité et des arrangements administratifs nécessaires.",
    submit: "Envoyer l'inscription",
    sending: "Envoi en cours…",
    successPending:
      "Merci. Votre inscription a bien été reçue et est en attente d'examen. Un e-mail de confirmation vous a été envoyé.",
    successWaitlist:
      "Merci. La conférence a atteint sa capacité confirmée ; votre inscription a été placée sur liste d'attente. Un e-mail de confirmation vous a été envoyé.",
    error: "Impossible d'envoyer votre inscription. Veuillez vérifier le formulaire et réessayer."
  }
};
