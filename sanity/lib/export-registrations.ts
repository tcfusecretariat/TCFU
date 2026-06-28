export type RegistrationRow = {
  _id: string;
  eventKey?: string;
  familyName?: string;
  givenName?: string;
  passportNumber?: string;
  nationality?: string;
  phone?: string;
  email?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  participantCategory?: string;
  volunteer?: boolean;
  attendanceDates?: string;
  ageGroup?: string;
  gender?: string;
  remarks?: string;
  specialRequirements?: string;
  messageToCommittee?: string;
  locale?: string;
  privacyConsentAccepted?: boolean;
  submittedAt?: string;
  status?: string;
  internalNotes?: string;
  confirmationEmailSent?: boolean;
};

export const REGISTRATION_EXPORT_QUERY = `*[_type == "eventRegistration"] | order(submittedAt desc) {
  _id,
  eventKey,
  familyName,
  givenName,
  passportNumber,
  nationality,
  phone,
  email,
  emergencyContactName,
  emergencyContactPhone,
  participantCategory,
  volunteer,
  attendanceDates,
  ageGroup,
  gender,
  remarks,
  specialRequirements,
  messageToCommittee,
  locale,
  privacyConsentAccepted,
  submittedAt,
  status,
  internalNotes,
  confirmationEmailSent
}`;

const STATUS_LABELS: Record<string, string> = {
  confirmed: "Confirmed 已確認",
  waitlist: "Waitlist 候補",
  rejected: "Rejected 已拒絕",
  pending: "Confirmed 已確認"
};

const CATEGORY_LABELS: Record<string, string> = {
  government: "Government / Public Sector Representative",
  "international-organization": "International Organization / UN Agency",
  academic: "Academic / Research Institution",
  ngo: "NGO / Civil Society Organization",
  "private-sector": "Private Sector / Foundation",
  "youth-delegate": "Youth Delegate (18–35)",
  media: "Media / Press",
  other: "Other"
};

const ATTENDANCE_LABELS: Record<string, string> = {
  oct1: "1 October 2026",
  oct2: "2 October 2026",
  both: "Both days 兩日"
};

const LOCALE_LABELS: Record<string, string> = {
  zh: "正體中文",
  en: "English",
  fr: "Français"
};

const EXPORT_COLUMNS: Array<{ header: string; value: (row: RegistrationRow) => string }> = [
  { header: "Submitted At 提交時間", value: (row) => formatDateTime(row.submittedAt) },
  { header: "Status 狀態", value: (row) => STATUS_LABELS[row.status || ""] || row.status || "" },
  { header: "Family Name 姓", value: (row) => row.familyName || "" },
  { header: "Given Name 名", value: (row) => row.givenName || "" },
  { header: "Email 電郵", value: (row) => row.email || "" },
  { header: "Phone 電話", value: (row) => row.phone || "" },
  { header: "Passport / ID Number 證件號碼", value: (row) => row.passportNumber || "" },
  { header: "Nationality 國籍", value: (row) => row.nationality || "" },
  {
    header: "Emergency Contact Name 緊急聯絡人姓名",
    value: (row) => row.emergencyContactName || ""
  },
  {
    header: "Emergency Contact Phone 緊急聯絡人電話",
    value: (row) => row.emergencyContactPhone || ""
  },
  {
    header: "Participant Category 參加者類別",
    value: (row) => CATEGORY_LABELS[row.participantCategory || ""] || row.participantCategory || ""
  },
  {
    header: "Volunteer 是否願意擔任志工",
    value: (row) => (row.volunteer === true ? "Yes 是" : row.volunteer === false ? "No 否" : "")
  },
  {
    header: "Attendance Date(s) 出席日期",
    value: (row) => ATTENDANCE_LABELS[row.attendanceDates || ""] || row.attendanceDates || ""
  },
  {
    header: "Age Group 年齡段",
    value: (row) => row.ageGroup || ""
  },
  {
    header: "Gender 性別",
    value: (row) => row.gender || ""
  },
  {
    header: "Remarks 備註",
    value: (row) => row.remarks || row.messageToCommittee || row.specialRequirements || ""
  },
  { header: "Form Language 表單語言", value: (row) => LOCALE_LABELS[row.locale || ""] || row.locale || "" },
  {
    header: "Privacy Consent Accepted 已同意隱私政策",
    value: (row) => (row.privacyConsentAccepted ? "Yes 是" : "No 否")
  },
  {
    header: "Confirmation Email Sent 已發確認信",
    value: (row) => (row.confirmationEmailSent ? "Yes 是" : "No 否")
  },
  { header: "Internal Notes 內部備註", value: (row) => row.internalNotes || "" },
  { header: "Event Key 活動識別", value: (row) => row.eventKey || "" },
  { header: "Document ID", value: (row) => row._id || "" }
];

function formatDateTime(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toISOString();
}

function escapeCsvCell(value: string) {
  const safe = /^[=+\-@]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}

export function buildRegistrationCsv(rows: RegistrationRow[]) {
  const headerLine = EXPORT_COLUMNS.map((column) => escapeCsvCell(column.header)).join(",");
  const dataLines = rows.map((row) =>
    EXPORT_COLUMNS.map((column) => escapeCsvCell(column.value(row))).join(",")
  );
  return `\ufeff${[headerLine, ...dataLines].join("\r\n")}`;
}

export function buildRegistrationFilename(date = new Date()) {
  const stamp = date.toISOString().slice(0, 10);
  return `event-registrations-${stamp}.csv`;
}

export function downloadRegistrationCsv(rows: RegistrationRow[]) {
  const csv = buildRegistrationCsv(rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = buildRegistrationFilename();
  link.click();
  URL.revokeObjectURL(url);
}
