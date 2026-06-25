export const SYMPOSIUM_EVENT_KEY = "international-symposium-youth-wellbeing-peace-education-2026";

export const CONFERENCE_TITLE = {
  en: "International Peace Conference on Traditional Culture Education for Youth: Ignite the Vital Spark of the Heart",
  zh: "世界和平論壇——傳統文化教育啟動青少年核心源動力",
  fr: "Conférence internationale pour la paix sur l'éducation à la culture traditionnelle en faveur de la jeunesse : Ignite the Vital Spark of the Heart"
};

export const CONFIRMATION_EMAIL_SUBJECT = {
  en: "Registration confirmed | International Peace Conference on Traditional Culture Education for Youth",
  zh: "報名確認 | 世界和平論壇——傳統文化教育啟動青少年核心源動力",
  fr: "Confirmation d'inscription | Conférence internationale pour la paix"
};

export const WAITLIST_EMAIL_SUBJECT = {
  en: "Registration received — waitlist | International Peace Conference on Traditional Culture Education for Youth",
  zh: "報名收到——候補名單 | 世界和平論壇——傳統文化教育啟動青少年核心源動力",
  fr: "Inscription reçue — liste d'attente | Conférence internationale pour la paix"
};

const CONFIRMATION_EMAIL_BODY = {
  en: `Dear Participant,

Thank you for registering for the International Peace Conference on Traditional Culture Education for Youth: Ignite the Vital Spark of the Heart.

Your registration has been successfully confirmed. We look forward to welcoming you to the conference.

To comply with the security procedures of UNESCO Headquarters, please kindly bring your passport with you when you come for check-in and access to the venue.

Event Details
Event: International Peace Conference on Traditional Culture Education for Youth: Ignite the Vital Spark of the Heart
Dates: 1–2 October 2026
Check-in: From 8:00 a.m.
Venue: Room IV, UNESCO Headquarters, 125 Avenue de Suffren, 75007 Paris
Contact: +33 (0)7 45 19 68 58

Kind regards,
The Secretariat
Traditional Culture Foundation at UNESCO`,
  zh: `尊敬的參會者：

感謝您報名參加 世界和平論壇——傳統文化教育啟動青少年核心源動力。

您的報名已成功確認。我們期待於大會現場歡迎您的到來。

為配合聯合國教科文組織總部的安保及入場管理工作，請您於活動當日簽到入場時攜帶本人護照。

活動資訊
活動名稱： 世界和平論壇——傳統文化教育啟動青少年核心源動力
日期： 2026年10月1日至2日
簽到入場： 上午8:00開始
地點： 聯合國教科文組織總部 Room IV，125 Avenue de Suffren, 75007 Paris
聯繫電話： +33 (0)7 45 19 68 58

謹致問候，
秘書處
聯合國教科文組織傳統文化基金會`,
  fr: `Madame, Monsieur,

Nous vous remercions pour votre inscription à la Conférence internationale pour la paix sur l'éducation à la culture traditionnelle en faveur de la jeunesse : Ignite the Vital Spark of the Heart.

Votre inscription est confirmée avec succès. Nous nous réjouissons de vous accueillir à la conférence.

Afin de respecter les procédures de sécurité du Siège de l'UNESCO, nous vous remercions de bien vouloir vous munir de votre passeport lors de l'accueil et de l'enregistrement à l'entrée du lieu de l'événement.

Informations sur l'événement
Événement : Conférence internationale pour la paix sur l'éducation à la culture traditionnelle en faveur de la jeunesse : Ignite the Vital Spark of the Heart
Dates : 1er–2 octobre 2026
Accueil et enregistrement : à partir de 8h00
Lieu : Salle IV, Siège de l'UNESCO, 125 Avenue de Suffren, 75007 Paris
Contact : +33 (0)7 45 19 68 58

Bien Cordialement,
Le Secrétariat
Traditional Culture Foundation at UNESCO`
};

const WAITLIST_EMAIL_INTRO = {
  en: "Thank you for registering. The conference has reached its confirmed capacity, so your registration has been placed on the waitlist. The Secretariat will contact you if a place becomes available.",
  zh: "感謝您報名。論壇確認名額已滿，您的報名已列入候補名單。如有名額釋出，秘書處將與您聯繫。",
  fr: "Merci pour votre inscription. La conférence a atteint sa capacité confirmée ; votre inscription a été placée sur liste d'attente. Le Secrétariat vous contactera si une place se libère."
};

const CONFIRMATION_EMAIL_CONFIRMED_LINE = {
  en: "Your registration has been successfully confirmed. We look forward to welcoming you to the conference.",
  zh: "您的報名已成功確認。我們期待於大會現場歡迎您的到來。",
  fr: "Votre inscription est confirmée avec succès. Nous nous réjouissons de vous accueillir à la conférence."
};

/** @param {string} locale @param {"pending"|"waitlist"} status */
export function buildParticipantConfirmationEmail(locale, status) {
  const key = locale in CONFIRMATION_EMAIL_BODY ? locale : "en";
  const subject =
    status === "waitlist" ? WAITLIST_EMAIL_SUBJECT[key] : CONFIRMATION_EMAIL_SUBJECT[key];
  let body = CONFIRMATION_EMAIL_BODY[key];

  if (status === "waitlist") {
    body = body.replace(CONFIRMATION_EMAIL_CONFIRMED_LINE[key], WAITLIST_EMAIL_INTRO[key]);
  }

  return { subject, text: body };
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
    specialRequirements: clean(payload.specialRequirements),
    messageToCommittee: clean(payload.messageToCommittee),
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
    specialRequirements: registration.specialRequirements || undefined,
    messageToCommittee: registration.messageToCommittee || undefined,
    locale: registration.locale,
    privacyConsentAccepted: registration.privacyConsent,
    submittedAt,
    status,
    confirmationEmailSent,
    internalNotes: ""
  };
}
