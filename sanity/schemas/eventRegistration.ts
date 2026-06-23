import { defineField, defineType } from "sanity";

export const eventRegistration = defineType({
  name: "eventRegistration",
  title: "Event Registration 活動報名",
  type: "document",
  description: "由網站報名表自動建立。行政人員可更新狀態與內部備註。",
  groups: [
    { name: "participant", title: "Participant 參加者資料", default: true },
    { name: "admin", title: "Admin 管理" }
  ],
  fields: [
    defineField({
      name: "eventKey",
      title: "Event Key 活動識別",
      type: "string",
      group: "participant",
      readOnly: true,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "familyName",
      title: "Family Name / Last Name 姓",
      type: "string",
      group: "participant",
      readOnly: true,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "givenName",
      title: "Given Name / First Name 名",
      type: "string",
      group: "participant",
      readOnly: true,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "passportNumber",
      title: "Passport Number 護照號碼",
      type: "string",
      group: "participant",
      readOnly: true,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "nationality",
      title: "Nationality 國籍",
      type: "string",
      group: "participant",
      readOnly: true,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "phone",
      title: "Phone Number 電話",
      type: "string",
      group: "participant",
      readOnly: true,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "email",
      title: "Email 電郵",
      type: "string",
      group: "participant",
      readOnly: true,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "emergencyContactName",
      title: "Emergency Contact Name 緊急聯絡人姓名",
      type: "string",
      group: "participant",
      readOnly: true,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "emergencyContactPhone",
      title: "Emergency Contact Phone 緊急聯絡人電話",
      type: "string",
      group: "participant",
      readOnly: true,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "participantCategory",
      title: "Participant Category 參加者類別",
      type: "string",
      group: "participant",
      readOnly: true,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "volunteer",
      title: "Volunteer 是否願意擔任志工",
      type: "boolean",
      group: "participant",
      readOnly: true
    }),
    defineField({
      name: "attendanceDates",
      title: "Attendance Date(s) 出席日期",
      type: "string",
      group: "participant",
      readOnly: true,
      options: {
        list: [
          { title: "1 October 2026", value: "oct1" },
          { title: "2 October 2026", value: "oct2" },
          { title: "Both days 兩日", value: "both" }
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "specialRequirements",
      title: "Special Requirements 特殊需求（選填）",
      type: "text",
      rows: 3,
      group: "participant",
      readOnly: true
    }),
    defineField({
      name: "messageToCommittee",
      title: "Message to Organizing Committee 給籌委會的訊息（選填）",
      type: "text",
      rows: 4,
      group: "participant",
      readOnly: true
    }),
    defineField({
      name: "locale",
      title: "Form Language 表單語言",
      type: "string",
      group: "participant",
      readOnly: true
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At 提交時間",
      type: "datetime",
      group: "admin",
      readOnly: true,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "status",
      title: "Status 狀態",
      type: "string",
      group: "admin",
      options: {
        list: [
          { title: "Pending 待審", value: "pending" },
          { title: "Confirmed 已確認", value: "confirmed" },
          { title: "Waitlist 候補", value: "waitlist" },
          { title: "Rejected 已拒絕", value: "rejected" }
        ],
        layout: "radio"
      },
      initialValue: "pending",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "internalNotes",
      title: "Internal Notes 內部備註",
      type: "text",
      rows: 4,
      group: "admin",
      description: "僅供秘書處內部使用，不會顯示給參加者。"
    }),
    defineField({
      name: "confirmationEmailSent",
      title: "Confirmation Email Sent 已發確認信",
      type: "boolean",
      group: "admin",
      initialValue: false,
      readOnly: true
    })
  ],
  preview: {
    select: {
      familyName: "familyName",
      givenName: "givenName",
      email: "email",
      status: "status",
      submittedAt: "submittedAt"
    },
    prepare({ familyName, givenName, email, status, submittedAt }) {
      const name = [givenName, familyName].filter(Boolean).join(" ");
      const date = submittedAt ? new Date(submittedAt).toLocaleString() : "";
      return {
        title: name || email || "Registration",
        subtitle: [status, email, date].filter(Boolean).join(" · ")
      };
    }
  }
});
