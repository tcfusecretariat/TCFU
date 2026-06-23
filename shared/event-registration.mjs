export const SYMPOSIUM_EVENT_KEY = "international-symposium-youth-wellbeing-peace-education-2026";

export const CONFERENCE_TITLE = {
  en: "International Peace Conference on Traditional Culture Education for Youth: Ignite the Vital Spark of the Heart",
  zh: "世界和平論壇 傳統文化教育啟動青少年核心源動力",
  fr: "Conférence internationale pour la paix sur l'éducation à la culture traditionnelle pour la jeunesse : Réveiller l'élan vital du cœur"
};

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
    consent: bool(payload.consent),
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

  if (!registration.consent) {
    throw new Error("Consent is required.");
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
    submittedAt,
    status,
    confirmationEmailSent,
    internalNotes: ""
  };
}
