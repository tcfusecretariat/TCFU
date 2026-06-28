export const SYMPOSIUM_EVENT_KEY = "international-symposium-youth-wellbeing-peace-education-2026";

export const CONFERENCE_TITLE = {
  en: "International Peace Conference on Traditional Culture Education for Youth: Ignite the Vital Spark of the Heart",
  zh: "世界和平論壇——傳統文化教育啟動青少年核心源動力",
  fr: "Conférence internationale pour la paix sur l'éducation à la culture traditionnelle en faveur de la jeunesse : Réveiller l'élan vital du cœur"
};

export const CONFIRMATION_EMAIL_SUBJECT = {
  en: "Registration confirmed | International Peace Conference on Traditional Culture Education for Youth",
  zh: "報名確認 | 世界和平論壇——傳統文化教育啟動青少年核心源動力",
  fr: "Confirmation d'inscription | Conférence internationale pour la paix"
};

const CONFIRMATION_EMAIL_BODY = {
  en: `Dear Participant,

Thank you for registering for the International Peace Conference on Traditional Culture Education for Youth: Ignite the Vital Spark of the Heart.

Your registration has been successfully confirmed. We look forward to welcoming you to the conference.

Please bring the valid identity document used for registration when you come for check-in and access to the venue.

Event Details
Event: International Peace Conference on Traditional Culture Education for Youth: Ignite the Vital Spark of the Heart
Dates: 1–2 October 2026
Check-in: From 8:30 a.m.
Venue: Room IV, UNESCO Headquarters, 125 Avenue de Suffren, 75007 Paris
Contact: +33 (0)7 45 19 68 58

Kind regards,
The Secretariat
Traditional Culture Foundation at UNESCO`,
  zh: `尊敬的參會者：

感謝您報名參加世界和平論壇——傳統文化教育啟動青少年核心源動力。

您的報名已成功確認。我們期待於大會現場歡迎您的到來。

請於活動當日簽到入場時攜帶報名時所使用的有效證件。

活動資訊
活動名稱：世界和平論壇——傳統文化教育啟動青少年核心源動力
日期：2026 年 10 月 1 日至 2 日
簽到入場：上午 8:30 開始
地點：聯合國教科文組織總部 Room IV，125 Avenue de Suffren, 75007 Paris
聯繫電話：+33 (0)7 45 19 68 58

謹致問候，
秘書處
聯合國教科文組織傳統文化基金會`,
  fr: `Madame, Monsieur,

Nous vous remercions pour votre inscription à la Conférence internationale pour la paix sur l'éducation à la culture traditionnelle en faveur de la jeunesse : Réveiller l'élan vital du cœur.

Votre inscription a été confirmée avec succès. Nous nous réjouissons de vous accueillir à la conférence.

Veuillez vous munir de la pièce d'identité valide utilisée lors de votre inscription lors de l'accueil et de l'enregistrement le jour de l'événement.

Informations sur l'événement
Événement : Conférence internationale pour la paix sur l'éducation à la culture traditionnelle en faveur de la jeunesse : Réveiller l'élan vital du cœur
Dates : 1er–2 octobre 2026
Accueil et enregistrement : à partir de 8h30
Lieu : Salle IV, Siège de l'UNESCO, 125 Avenue de Suffren, 75007 Paris
Contact : +33 (0)7 45 19 68 58

Bien cordialement,
Le Secrétariat
Fondation pour la culture traditionnelle à l'UNESCO`
};

/** @param {string} locale */
export function buildParticipantConfirmationEmail(locale) {
  const key = locale in CONFIRMATION_EMAIL_BODY ? locale : "en";
  return {
    subject: CONFIRMATION_EMAIL_SUBJECT[key],
    text: CONFIRMATION_EMAIL_BODY[key]
  };
}

export const PARTICIPANT_CATEGORIES = [
  "government",
  "international-organization",
  "academic",
  "ngo",
  "private-sector",
  "youth-delegate",
  "media",
  "other"
];

export const ATTENDANCE_OPTIONS = ["oct1", "oct2", "both"];

export const AGE_GROUP_OPTIONS = [
  "under18",
  "18-24",
  "25-30",
  "31-40",
  "41-50",
  "51-70",
  "71plus",
  "prefer-not"
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value) {
  return String(value ?? "").trim();
}

function bool(value) {
  return value === true || value === "true" || value === "yes" || value === "on";
}

/** @param {Record<string, unknown>} payload */
export function createEventRegistration(payload) {
  const volunteerRaw = clean(payload.volunteer).toLowerCase();
  const volunteer =
    volunteerRaw === "yes" || volunteerRaw === "true"
      ? true
      : volunteerRaw === "no" || volunteerRaw === "false"
        ? false
        : null;

  const ageGroup = clean(payload.ageGroup);
  const gender = clean(payload.gender);
  const remarks =
    clean(payload.remarks) ||
    [clean(payload.specialRequirements), clean(payload.messageToCommittee)].filter(Boolean).join("\n\n");

  const registration = {
    eventKey: clean(payload.eventKey) || SYMPOSIUM_EVENT_KEY,
    familyName: clean(payload.familyName),
    givenName: clean(payload.givenName),
    passportNumber: clean(payload.passportNumber),
    nationality: clean(payload.nationality),
    phone: clean(payload.phone),
    email: clean(payload.email).toLowerCase(),
    emergencyContactName: clean(payload.emergencyContactName),
    emergencyContactPhone: clean(payload.emergencyContactPhone),
    participantCategory: clean(payload.participantCategory),
    volunteer,
    attendanceDates: clean(payload.attendanceDates),
    ageGroup: ageGroup || undefined,
    gender: gender || undefined,
    remarks: remarks || undefined,
    privacyConsent: bool(payload.privacyConsent),
    locale: clean(payload.locale) || "en"
  };

  const required = [
    ["familyName", registration.familyName],
    ["givenName", registration.givenName],
    ["passportNumber", registration.passportNumber],
    ["nationality", registration.nationality],
    ["phone", registration.phone],
    ["email", registration.email],
    ["emergencyContactName", registration.emergencyContactName],
    ["emergencyContactPhone", registration.emergencyContactPhone],
    ["participantCategory", registration.participantCategory],
    ["attendanceDates", registration.attendanceDates]
  ];

  for (const [field, value] of required) {
    if (!value) {
      throw new Error(`Missing required field: ${field}.`);
    }
  }

  if (volunteer === null) {
    throw new Error("Missing required field: volunteer.");
  }

  if (!registration.privacyConsent) {
    throw new Error("Privacy consent is required.");
  }

  if (!emailPattern.test(registration.email)) {
    throw new Error("Invalid email address.");
  }

  if (!PARTICIPANT_CATEGORIES.includes(registration.participantCategory)) {
    throw new Error("Invalid participant category.");
  }

  if (!ATTENDANCE_OPTIONS.includes(registration.attendanceDates)) {
    throw new Error("Invalid attendance date selection.");
  }

  if (ageGroup && !AGE_GROUP_OPTIONS.includes(ageGroup)) {
    throw new Error("Invalid age group selection.");
  }

  return registration;
}

/** @param {typeof createEventRegistration extends (...args: any) => infer R ? R : never} registration */
export function toSanityDocument(registration, { status, submittedAt, confirmationEmailSent = false }) {
  return {
    _type: "eventRegistration",
    eventKey: registration.eventKey,
    familyName: registration.familyName,
    givenName: registration.givenName,
    passportNumber: registration.passportNumber,
    nationality: registration.nationality,
    phone: registration.phone,
    email: registration.email,
    emergencyContactName: registration.emergencyContactName,
    emergencyContactPhone: registration.emergencyContactPhone,
    participantCategory: registration.participantCategory,
    volunteer: registration.volunteer,
    attendanceDates: registration.attendanceDates,
    ageGroup: registration.ageGroup,
    gender: registration.gender,
    remarks: registration.remarks,
    locale: registration.locale,
    privacyConsentAccepted: registration.privacyConsent,
    submittedAt,
    status,
    confirmationEmailSent,
    internalNotes: ""
  };
}
