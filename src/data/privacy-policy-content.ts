export const FOUNDATION_NAME = "TRADITIONAL CULTURE FOUNDATION AT UNESCO";
export const FOUNDATION_ADDRESS = "1 RUE MIOLLIS, 75015 PARIS, France";
export const FOUNDATION_EMAIL = "tcfu.secretariat@gmail.com";

export type PolicyBlock = {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
  subsections?: { heading: string; paragraphs?: string[]; list?: string[] }[];
};

export const privacyPolicyPage = {
  title: "Privacy Policy",
  lastUpdated: "23/06/2026",
  intro: [
    `This Privacy Policy explains how ${FOUNDATION_NAME} (“we”, “our”, or “the Foundation”) collects, uses, stores, and protects personal data through this website, including through contact forms, event registration forms, and other online services provided on the website.`,
    "We are committed to respecting the privacy and personal data protection rights of all visitors, participants, volunteers, partners, and other individuals who interact with our website and activities.",
    "This Privacy Policy is intended to comply with the principles of the General Data Protection Regulation (EU) 2016/679 (“GDPR”) and applicable French and European data protection rules."
  ],
  sections: [
    {
      heading: "1. Data Controller",
      paragraphs: [
        "The data controller responsible for the processing of personal data collected through this website is:",
        `${FOUNDATION_NAME}\n${FOUNDATION_ADDRESS}`,
        `Email: ${FOUNDATION_EMAIL}`,
        "For any question regarding this Privacy Policy or the processing of your personal data, you may contact the Foundation Secretariat at:",
        FOUNDATION_EMAIL
      ]
    },
    {
      heading: "2. Personal Data We Collect",
      paragraphs: ["We may collect and process different categories of personal data depending on how you interact with our website."],
      subsections: [
        {
          heading: "2.1 Contact Forms",
          paragraphs: ["When you contact us through the website, we may collect:"],
          list: [
            "Name",
            "Email address",
            "Organisation or affiliation",
            "Message content",
            "Any other information you choose to provide"
          ]
        },
        {
          heading: "2.2 Event Registration Forms",
          paragraphs: ["When you register for an event, we may collect:"],
          list: [
            "Family name / last name",
            "Given name / first name",
            "Passport number, where required for venue access or security management",
            "Nationality",
            "Phone number",
            "Email address",
            "Emergency contact name",
            "Emergency contact phone number",
            "Participation date(s)",
            "Whether you are willing to volunteer",
            "Special requirements, where voluntarily provided",
            "Message to the Organizing Committee",
            "Registration status",
            "Internal administrative notes related to your registration",
            "Date and time of submission"
          ]
        },
        {
          heading: "2.3 Technical Data",
          paragraphs: [
            "When you browse our website, certain technical information may be processed automatically, such as:"
          ],
          list: [
            "IP address",
            "Browser type and version",
            "Device type",
            "Pages visited",
            "Date and time of visit",
            "Security and server logs"
          ]
        }
      ],
      paragraphsAfter: [
        "If required for a specific event, we may also collect an uploaded photo or document for participant verification, access management, or badge preparation.",
        "This technical information is used for website security, technical maintenance, performance, protection against spam, and prevention of unauthorised access."
      ]
    },
    {
      heading: "3. Purposes of Processing",
      paragraphs: [
        "We collect and process personal data only for specific, explicit, and legitimate purposes.",
        "Your personal data may be used for the following purposes:"
      ],
      list: [
        "To manage event registration",
        "To verify participant identity where required for venue access",
        "To communicate with registered participants",
        "To send registration receipt, review, confirmation, or practical information emails",
        "To organise access to the event venue",
        "To prepare participant lists, badges, or access documents where necessary",
        "To manage volunteer participation",
        "To respond to special requirements voluntarily communicated by participants",
        "To contact an emergency contact person where strictly necessary",
        "To ensure the safety and security of the event",
        "To comply with administrative, legal, or venue-related requirements",
        "To respond to enquiries sent through the website",
        "To maintain the security and proper functioning of the website"
      ],
      paragraphsAfter: [
        "We do not sell your personal data.",
        "We do not use event registration data for commercial marketing purposes."
      ]
    },
    {
      heading: "4. Legal Bases for Processing",
      paragraphs: [
        "Depending on the context, we process personal data on one or more of the following legal bases under the GDPR:"
      ],
      list: [
        "Consent: when you voluntarily submit a form, provide special requirements, upload a photo or document, or agree to the processing of your data for event registration purposes.",
        "Legitimate interest: when processing is necessary for organising events, ensuring venue access, maintaining security, preventing abuse, and managing communications with participants.",
        "Performance of pre-contractual or organisational measures: when processing is necessary to handle your registration or participation request.",
        "Legal or administrative obligation: where we are required to keep or provide certain information for legal, administrative, or venue security reasons.",
        "Vital interests: where emergency contact information needs to be used in a serious and urgent situation."
      ],
      paragraphsAfter: [
        "Where special requirements reveal sensitive information, such as health, accessibility, religious, or dietary information, such information is provided voluntarily and will be processed only to support your participation in the event."
      ]
    },
    {
      heading: "5. Event Registration and Venue Access",
      paragraphs: [
        "For events held at institutional or international venues, including UNESCO Headquarters or similar venues, certain personal data may be required for registration, access management, security verification, and administrative coordination.",
        "This may include name, nationality, passport number, contact details, and participation date(s).",
        "Where strictly necessary for venue access or security management, limited participant information may be shared with the relevant venue access, security, or administrative services.",
        "Only information necessary for these purposes will be shared."
      ]
    },
    {
      heading: "6. Passport Number and Identity Information",
      paragraphs: [
        "Passport number and nationality may be collected only when necessary for participant verification, institutional venue access, security requirements, or administrative coordination.",
        "Such information will not be used for unrelated purposes and will not be retained longer than necessary.",
        "Unless a longer retention period is required for legal, security, or administrative reasons, passport numbers will normally be deleted or anonymised within three months after the end of the relevant event."
      ]
    },
    {
      heading: "7. Emergency Contact Information",
      paragraphs: [
        "Emergency contact information is collected only for safety-related purposes and will be used only where necessary in connection with the event.",
        "Emergency contact details will not be used for communication unrelated to participant safety.",
        "Unless a longer retention period is required for legal or administrative reasons, emergency contact information will normally be deleted or anonymised within three months after the end of the relevant event."
      ]
    },
    {
      heading: "8. Special Requirements",
      paragraphs: [
        "Participants may voluntarily inform us of special requirements, such as accessibility needs, interpretation needs, or dietary restrictions.",
        "Please only provide information that is necessary for us to support your participation.",
        "Special requirements will be used only for event preparation and participant support. Access to this information will be limited to authorised members of the Organizing Committee or relevant service providers where necessary."
      ]
    },
    {
      heading: "9. Photos and Uploaded Documents",
      paragraphs: [
        "Where photo upload is enabled, photos may be collected for participant verification, badge preparation, or event access management.",
        "Photos and uploaded documents will not be used for promotional or public communication purposes without separate consent.",
        "Unless a longer retention period is required for legal, security, or administrative reasons, uploaded photos and documents will normally be deleted or anonymised within three months after the end of the relevant event."
      ]
    },
    {
      heading: "10. Recipients of Personal Data",
      paragraphs: [
        "Personal data may be accessed only by authorised persons who need it for the purposes described in this Privacy Policy.",
        "Recipients may include:"
      ],
      list: [
        "Members of the Organizing Committee",
        "Registration and secretariat teams",
        "Event access or security coordination teams",
        "Technical service providers supporting the website, database, email delivery, hosting, or security",
        "Relevant venue access or security services, where strictly necessary"
      ],
      paragraphsAfter: [
        "We take reasonable measures to ensure that personal data is accessed only by authorised persons and only for legitimate purposes."
      ]
    },
    {
      heading: "11. Third-Party Service Providers",
      paragraphs: [
        "To operate our website and registration system, we may use trusted third-party service providers, including:"
      ],
      list: [
        "Sanity for content management and registration data storage",
        "Cloudflare for website hosting, security, performance, and anti-spam protection",
        "Resend or another email service provider for sending automatic registration emails",
        "GitHub for website code version management"
      ],
      paragraphsAfter: [
        "Personal data should not be stored directly in public code repositories.",
        "These service providers may process personal data only as necessary to provide their services to us and in accordance with their own security and data protection obligations."
      ]
    },
    {
      heading: "12. International Transfers",
      paragraphs: [
        "Some service providers used for website hosting, data storage, security, or email delivery may process data outside the European Economic Area.",
        "Where such transfers occur, we seek to rely on appropriate safeguards under the GDPR, such as adequacy decisions, standard contractual clauses, or other lawful transfer mechanisms where applicable."
      ]
    },
    {
      heading: "13. Data Retention",
      paragraphs: [
        "We retain personal data only for as long as necessary for the purposes for which it was collected.",
        "Unless otherwise required by law or legitimate administrative needs, the following retention periods generally apply:"
      ],
      list: [
        "Contact form messages: up to 12 months",
        "Event registration data: up to 12 months after the event",
        "Passport numbers: normally deleted or anonymised within three months after the event",
        "Emergency contact information: normally deleted or anonymised within three months after the event",
        "Uploaded photos or documents: normally deleted or anonymised within three months after the event",
        "Volunteer information: up to 24 months, where the individual agrees to be contacted for future volunteer opportunities",
        "Technical and security logs: retained for a limited period necessary for website security and maintenance"
      ],
      paragraphsAfter: [
        "After the relevant retention period, personal data will be deleted, anonymised, or securely archived where necessary."
      ]
    },
    {
      heading: "14. Data Security",
      paragraphs: [
        "We implement appropriate technical and organisational measures to protect personal data against unauthorised access, loss, misuse, alteration, or disclosure.",
        "These measures may include:"
      ],
      list: [
        "Access restriction to authorised personnel",
        "Secure website hosting",
        "Anti-spam and security protection",
        "Secure storage of registration data",
        "Limited access to sensitive information",
        "Regular review of data access and retention",
        "Avoiding the storage of personal data in public code repositories"
      ],
      paragraphsAfter: [
        "However, no system can guarantee absolute security. We therefore encourage users not to submit unnecessary sensitive information through online forms."
      ]
    },
    {
      id: "cookies",
      heading: "15. Cookies and Similar Technologies",
      paragraphs: [
        "Our website may use cookies or similar technologies for technical, security, statistical, or functional purposes.",
        "Strictly necessary cookies may be used to ensure the proper functioning and security of the website.",
        "Where non-essential cookies are used, such as analytics, embedded media, or marketing cookies, we will request your consent where required by applicable law.",
        "You may find more information in our Cookie Policy (see section 15 above)."
      ]
    },
    {
      heading: "16. Your Rights",
      paragraphs: [
        "Under the GDPR, you may have the following rights regarding your personal data:"
      ],
      list: [
        "The right to access your personal data",
        "The right to request correction of inaccurate or incomplete data",
        "The right to request deletion of your data",
        "The right to request restriction of processing",
        "The right to object to processing",
        "The right to withdraw consent at any time, where processing is based on consent",
        "The right to data portability, where applicable",
        "The right to lodge a complaint with a competent data protection authority"
      ],
      paragraphsAfter: [
        `To exercise your rights, please contact the Foundation Secretariat at:\n\n${FOUNDATION_EMAIL}`,
        "We may need to verify your identity before responding to your request.",
        "If you are located in France, you also have the right to contact the French data protection authority, the CNIL."
      ]
    },
    {
      heading: "17. Children and Young Participants",
      paragraphs: [
        "Our events or programmes may involve young participants. Where personal data of minors is collected, we will take additional care and, where required, request permission from a parent, legal guardian, school, or authorised representative.",
        "We do not knowingly collect personal data from minors without appropriate authorisation where such authorisation is required."
      ]
    },
    {
      heading: "18. Changes to This Privacy Policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time to reflect changes in our website, activities, legal obligations, or data processing practices.",
        "The updated version will be published on this page with a revised “Last updated” date."
      ]
    },
    {
      heading: "19. Contact",
      paragraphs: [
        "For any question regarding this Privacy Policy or the processing of your personal data, please contact:",
        `${FOUNDATION_NAME}\n${FOUNDATION_ADDRESS}`,
        `Email: ${FOUNDATION_EMAIL}`
      ]
    }
  ] as (PolicyBlock & { id?: string; paragraphsAfter?: string[] })[]
};

/** Short notice displayed above the event registration form. */
export const registrationPrivacyNotice =
  "Please complete this form to register for the event. The information collected will be used only for event registration, participant verification, venue access management, safety communication, volunteer coordination, and necessary administrative arrangements.\n\nDue to venue access and security requirements, registration is subject to review and confirmation by the Organizing Committee.";
