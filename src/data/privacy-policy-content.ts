import type { Locale } from "./site";

export const FOUNDATION_NAME = "TRADITIONAL CULTURE FOUNDATION AT UNESCO";
export const FOUNDATION_NAME_ZH = "聯合國教科文組織傳統文化基金會";
export const FOUNDATION_NAME_FR = "Fondation pour la culture traditionnelle à l'UNESCO";
export const FOUNDATION_ADDRESS = "1 RUE MIOLLIS, 75015 PARIS, France";
export const FOUNDATION_EMAIL = "tcfu.secretariat@gmail.com";

export type PolicySubsection = { heading: string; paragraphs?: string[]; list?: string[] };

export type PolicyBlock = {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
  subsections?: PolicySubsection[];
  paragraphsAfter?: string[];
};

/** A single tab in the tab-like privacy policy navigation. */
export type PrivacyTab = {
  /** Stable id used for the tab/panel pair and the URL hash. */
  id: string;
  /** Short label shown in the left/horizontal navigation. */
  navLabel: string;
  /** Full panel heading, including the 1–12 number. */
  heading: string;
  blocks: PolicyBlock[];
};

export type PrivacyPolicyDoc = {
  title: string;
  /** Large heading shown at the top of the page. */
  pageTitle: string;
  kicker: string;
  lastUpdatedLabel: string;
  lastUpdated: string;
  privacyPolicyLinkLabel: string;
  /** Accessible label for the tab navigation. */
  navAriaLabel: string;
  tabs: PrivacyTab[];
};

const privacyPolicyEn: PrivacyPolicyDoc = {
  title: "Privacy Policy",
  pageTitle: "Protection of Personal Data",
  kicker: "Legal",
  lastUpdatedLabel: "Last updated",
  lastUpdated: "23/06/2026",
  privacyPolicyLinkLabel: "Privacy Policy",
  navAriaLabel: "Privacy policy sections",
  tabs: [
    {
      id: "protection",
      navLabel: "Protection of Personal Data",
      heading: "1. Protection of Personal Data",
      blocks: [
        {
          paragraphs: [
            `This Privacy Policy explains how ${FOUNDATION_NAME} (“we”, “our”, or “the Foundation”) collects, uses, stores, and protects personal data through this website, including through contact forms, event registration forms, and other online services provided on the website.`,
            "We are committed to respecting the privacy and personal data protection rights of all visitors, participants, volunteers, partners, and other individuals who interact with our website and activities.",
            "This Privacy Policy is intended to comply with the principles of the General Data Protection Regulation (EU) 2016/679 (“GDPR”) and applicable French and European data protection rules."
          ]
        },
        {
          heading: "Changes to This Privacy Policy",
          paragraphs: [
            "We may update this Privacy Policy from time to time to reflect changes in our website, activities, legal obligations, or data processing practices.",
            "The updated version will be published on this page with a revised “Last updated” date."
          ]
        }
      ]
    },
    {
      id: "controller",
      navLabel: "Data Controller",
      heading: "2. Data Controller",
      blocks: [
        {
          paragraphs: [
            "The data controller responsible for the processing of personal data collected through this website is:",
            `${FOUNDATION_NAME}\n${FOUNDATION_ADDRESS}`,
            `Email: ${FOUNDATION_EMAIL}`,
            "For any question regarding this Privacy Policy or the processing of your personal data, you may contact the Foundation Secretariat at:",
            FOUNDATION_EMAIL
          ]
        }
      ]
    },
    {
      id: "data-collected",
      navLabel: "Personal Data We Collect",
      heading: "3. Personal Data We Collect",
      blocks: [
        {
          paragraphs: ["We may collect and process different categories of personal data depending on how you interact with our website."],
          subsections: [
            {
              heading: "Contact Forms",
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
              heading: "Event Registration Forms",
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
              heading: "Technical Data",
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
          heading: "Event Registration and Venue Access",
          paragraphs: [
            "For events held at institutional or international venues, including UNESCO Headquarters or similar venues, certain personal data may be required for registration, access management, security verification, and administrative coordination.",
            "This may include name, nationality, passport number, contact details, and participation date(s).",
            "Where strictly necessary for venue access or security management, limited participant information may be shared with the relevant venue access, security, or administrative services.",
            "Only information necessary for these purposes will be shared."
          ]
        },
        {
          heading: "Passport Number and Identity Information",
          paragraphs: [
            "Passport number and nationality may be collected only when necessary for participant verification, institutional venue access, security requirements, or administrative coordination.",
            "Such information will not be used for unrelated purposes and will not be retained longer than necessary.",
            "Unless a longer retention period is required for legal, security, or administrative reasons, passport numbers will normally be deleted or anonymised within three months after the end of the relevant event."
          ]
        },
        {
          heading: "Emergency Contact Information",
          paragraphs: [
            "Emergency contact information is collected only for safety-related purposes and will be used only where necessary in connection with the event.",
            "Emergency contact details will not be used for communication unrelated to participant safety.",
            "Unless a longer retention period is required for legal or administrative reasons, emergency contact information will normally be deleted or anonymised within three months after the end of the relevant event."
          ]
        },
        {
          heading: "Special Requirements",
          paragraphs: [
            "Participants may voluntarily inform us of special requirements, such as accessibility needs, interpretation needs, or dietary restrictions.",
            "Please only provide information that is necessary for us to support your participation.",
            "Special requirements will be used only for event preparation and participant support. Access to this information will be limited to authorised members of the Organizing Committee or relevant service providers where necessary."
          ]
        },
        {
          heading: "Children and Young Participants",
          paragraphs: [
            "Our events or programmes may involve young participants. Where personal data of minors is collected, we will take additional care and, where required, request permission from a parent, legal guardian, school, or authorised representative.",
            "We do not knowingly collect personal data from minors without appropriate authorisation where such authorisation is required."
          ]
        }
      ]
    },
    {
      id: "purposes",
      navLabel: "Purposes of Processing",
      heading: "4. Purposes of Processing",
      blocks: [
        {
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
        }
      ]
    },
    {
      id: "legal-bases",
      navLabel: "Legal Bases",
      heading: "5. Legal Bases",
      blocks: [
        {
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
        }
      ]
    },
    {
      id: "photos",
      navLabel: "Photos and Uploaded Documents",
      heading: "6. Photos and Uploaded Documents",
      blocks: [
        {
          paragraphs: [
            "Where photo upload is enabled, photos may be collected for participant verification, badge preparation, or event access management.",
            "Photos and uploaded documents will not be used for promotional or public communication purposes without separate consent.",
            "Unless a longer retention period is required for legal, security, or administrative reasons, uploaded photos and documents will normally be deleted or anonymised within three months after the end of the relevant event."
          ]
        }
      ]
    },
    {
      id: "recipients",
      navLabel: "Recipients and Service Providers",
      heading: "7. Recipients and Service Providers",
      blocks: [
        {
          heading: "Recipients of Personal Data",
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
          heading: "Third-Party Service Providers",
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
          heading: "International Transfers",
          paragraphs: [
            "Some service providers used for website hosting, data storage, security, or email delivery may process data outside the European Economic Area.",
            "Where such transfers occur, we seek to rely on appropriate safeguards under the GDPR, such as adequacy decisions, standard contractual clauses, or other lawful transfer mechanisms where applicable."
          ]
        }
      ]
    },
    {
      id: "retention",
      navLabel: "Data Retention",
      heading: "8. Data Retention",
      blocks: [
        {
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
        }
      ]
    },
    {
      id: "security",
      navLabel: "Data Security",
      heading: "9. Data Security",
      blocks: [
        {
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
        }
      ]
    },
    {
      id: "cookies",
      navLabel: "Cookies",
      heading: "10. Cookies",
      blocks: [
        {
          paragraphs: [
            "Our website may use cookies or similar technologies for technical, security, statistical, or functional purposes.",
            "Strictly necessary cookies may be used to ensure the proper functioning and security of the website.",
            "Where non-essential cookies are used, such as analytics, embedded media, or marketing cookies, we will request your consent where required by applicable law.",
            "You may find more information in our Cookie Policy."
          ]
        }
      ]
    },
    {
      id: "rights",
      navLabel: "Your Rights",
      heading: "11. Your Rights",
      blocks: [
        {
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
        }
      ]
    },
    {
      id: "contact",
      navLabel: "Contact",
      heading: "12. Contact",
      blocks: [
        {
          paragraphs: [
            "For any question regarding this Privacy Policy or the processing of your personal data, please contact:",
            `${FOUNDATION_NAME}\n${FOUNDATION_ADDRESS}`,
            `Email: ${FOUNDATION_EMAIL}`
          ]
        }
      ]
    }
  ]
};

const privacyPolicyZh: PrivacyPolicyDoc = {
  title: "隱私政策",
  pageTitle: "個人資料保護",
  kicker: "法律",
  lastUpdatedLabel: "最後更新",
  lastUpdated: "2026/06/23",
  privacyPolicyLinkLabel: "隱私政策",
  navAriaLabel: "隱私政策分區",
  tabs: [
    {
      id: "protection",
      navLabel: "個人資料保護",
      heading: "1. 個人資料保護",
      blocks: [
        {
          paragraphs: [
            `本隱私政策說明${FOUNDATION_NAME_ZH}（以下簡稱「我們」、「本基金會」）如何透過本網站（包括聯絡表單、活動報名表單及網站提供的其他線上服務）收集、使用、儲存及保護個人資料。`,
            "我們致力於尊重所有造訪者、參加者、志工、合作夥伴及其他與本網站及活動互動之個人的隱私與個人資料保護權利。",
            "本隱私政策旨在符合《歐盟一般資料保護規則》（EU 2016/679，以下簡稱「GDPR」）之原則，以及法國與歐洲適用之資料保護規範。"
          ]
        },
        {
          heading: "本隱私政策之變更",
          paragraphs: [
            "我們可能不時更新本隱私政策，以反映本網站、活動、法律義務或資料處理實務之變更。",
            "更新後的版本將連同修訂之「最後更新」日期公布於本頁。"
          ]
        }
      ]
    },
    {
      id: "controller",
      navLabel: "資料控管者",
      heading: "2. 資料控管者",
      blocks: [
        {
          paragraphs: [
            "負責處理透過本網站所收集個人資料的資料控管者為：",
            `${FOUNDATION_NAME_ZH}\n${FOUNDATION_ADDRESS}`,
            `電郵：${FOUNDATION_EMAIL}`,
            "如對本隱私政策或您個人資料之處理有任何疑問，您可聯絡本基金會秘書處：",
            FOUNDATION_EMAIL
          ]
        }
      ]
    },
    {
      id: "data-collected",
      navLabel: "我們收集的個人資料",
      heading: "3. 我們收集的個人資料",
      blocks: [
        {
          paragraphs: ["視乎您與本網站互動的方式，我們可能收集及處理不同類別的個人資料。"],
          subsections: [
            {
              heading: "聯絡表單",
              paragraphs: ["當您透過本網站與我們聯絡時，我們可能收集："],
              list: [
                "姓名",
                "電郵地址",
                "機構或所屬單位",
                "訊息內容",
                "您選擇提供的任何其他資訊"
              ]
            },
            {
              heading: "活動報名表單",
              paragraphs: ["當您報名參加活動時，我們可能收集："],
              list: [
                "姓（Family name / Last name）",
                "名（Given name / First name）",
                "護照號碼（於場地進出或安全管理所需時）",
                "國籍",
                "電話號碼",
                "電郵地址",
                "緊急聯絡人姓名",
                "緊急聯絡人電話號碼",
                "出席日期",
                "是否願意擔任志工",
                "自願提供的特殊需求",
                "給籌委會的訊息",
                "報名狀態",
                "與您報名相關的內部行政備註",
                "提交的日期與時間"
              ]
            },
            {
              heading: "技術資料",
              paragraphs: ["當您瀏覽本網站時，部分技術資訊可能會被自動處理，例如："],
              list: [
                "IP 位址",
                "瀏覽器類型與版本",
                "裝置類型",
                "瀏覽的頁面",
                "造訪的日期與時間",
                "安全與伺服器日誌"
              ]
            }
          ],
          paragraphsAfter: [
            "如特定活動有需要，我們亦可能收集上傳的相片或文件，以用於參加者核實、進出管理或證件製作。",
            "此等技術資訊用於網站安全、技術維護、效能、防範垃圾訊息及防止未經授權的存取。"
          ]
        },
        {
          heading: "活動報名與場地進出",
          paragraphs: [
            "對於在機構或國際場地（包括聯合國教科文組織總部或類似場地）舉行的活動，報名、進出管理、安全核實及行政協調可能需要特定個人資料。",
            "此可能包括姓名、國籍、護照號碼、聯絡資料及出席日期。",
            "於場地進出或安全管理確有必要時，有限的參加者資訊可能會與相關場地進出、保安或行政服務單位共享。",
            "僅會共享為上述目的所必要的資訊。"
          ]
        },
        {
          heading: "護照號碼與身分資訊",
          paragraphs: [
            "護照號碼與國籍僅於參加者核實、機構場地進出、安全要求或行政協調所必要時收集。",
            "此等資訊不會用於不相關之目的，且保存期間不會超過必要範圍。",
            "除非因法律、安全或行政理由須較長保存期間，護照號碼通常會於相關活動結束後三個月內刪除或匿名化。"
          ]
        },
        {
          heading: "緊急聯絡資訊",
          paragraphs: [
            "緊急聯絡資訊僅為安全相關目的收集，並僅於與活動相關且必要時使用。",
            "緊急聯絡資料不會用於與參加者安全無關之通訊。",
            "除非因法律或行政理由須較長保存期間，緊急聯絡資訊通常會於相關活動結束後三個月內刪除或匿名化。"
          ]
        },
        {
          heading: "特殊需求",
          paragraphs: [
            "參加者可自願告知我們特殊需求，例如無障礙需求、傳譯需求或飲食限制。",
            "請僅提供我們支援您參與所必要的資訊。",
            "特殊需求僅用於活動籌備與參加者支援。於必要時，僅獲授權的籌委會成員或相關服務提供者方可存取此等資訊。"
          ]
        },
        {
          heading: "兒童與青少年參加者",
          paragraphs: [
            "我們的活動或計劃可能涉及青少年參加者。當收集未成年人之個人資料時，我們會格外謹慎，並於必要時向家長、法定監護人、學校或獲授權代表徵求許可。",
            "在須取得相關授權之情況下，我們不會在未取得適當授權前故意收集未成年人之個人資料。"
          ]
        }
      ]
    },
    {
      id: "purposes",
      navLabel: "處理目的",
      heading: "4. 處理目的",
      blocks: [
        {
          paragraphs: [
            "我們僅為特定、明確且合法的目的收集及處理個人資料。",
            "您的個人資料可能用於下列目的："
          ],
          list: [
            "管理活動報名",
            "於場地進出所需時核實參加者身分",
            "與已報名的參加者聯繫",
            "寄送報名收訖、審核、確認或實務資訊之電郵",
            "安排進入活動場地",
            "於必要時製作參加者名單、證件或進出文件",
            "管理志工的參與",
            "回應參加者自願提供的特殊需求",
            "於確有必要時聯絡緊急聯絡人",
            "確保活動的安全與保安",
            "遵循行政、法律或場地相關之要求",
            "回覆透過本網站送出的查詢",
            "維護網站的安全與正常運作"
          ],
          paragraphsAfter: [
            "我們不會出售您的個人資料。",
            "我們不會將活動報名資料用於商業行銷目的。"
          ]
        }
      ]
    },
    {
      id: "legal-bases",
      navLabel: "法律依據",
      heading: "5. 法律依據",
      blocks: [
        {
          paragraphs: [
            "視乎情況，我們依據 GDPR 下列一項或多項法律依據處理個人資料："
          ],
          list: [
            "同意：當您自願提交表單、提供特殊需求、上傳相片或文件，或同意我們為活動報名目的處理您的資料時。",
            "正當利益：當處理為籌辦活動、確保場地進出、維護保安、防止濫用及管理與參加者之溝通所必要時。",
            "履行締約前或籌辦措施：當處理為辦理您的報名或參與請求所必要時。",
            "法律或行政義務：當我們因法律、行政或場地保安理由而須保存或提供特定資訊時。",
            "重大利益：當緊急聯絡資訊需於嚴重且緊急的情況下使用時。"
          ],
          paragraphsAfter: [
            "若特殊需求涉及敏感資訊（例如健康、無障礙、宗教或飲食資訊），該等資訊均屬自願提供，且僅用於支援您參與活動。"
          ]
        }
      ]
    },
    {
      id: "photos",
      navLabel: "相片與上傳文件",
      heading: "6. 相片與上傳文件",
      blocks: [
        {
          paragraphs: [
            "於啟用相片上傳時，相片可能用於參加者核實、證件製作或活動進出管理而收集。",
            "未經另行同意，相片與上傳文件不會用於宣傳或公開傳播目的。",
            "除非因法律、安全或行政理由須較長保存期間，上傳的相片與文件通常會於相關活動結束後三個月內刪除或匿名化。"
          ]
        }
      ]
    },
    {
      id: "recipients",
      navLabel: "接收者與服務提供者",
      heading: "7. 接收者與服務提供者",
      blocks: [
        {
          heading: "個人資料之接收者",
          paragraphs: [
            "僅有為本隱私政策所述目的而需要之獲授權人員方可存取個人資料。",
            "接收者可能包括："
          ],
          list: [
            "籌委會成員",
            "報名與秘書處團隊",
            "活動進出或保安協調團隊",
            "支援網站、資料庫、電郵寄送、主機代管或安全之技術服務提供者",
            "於確有必要時，相關場地進出或保安服務單位"
          ],
          paragraphsAfter: [
            "我們採取合理措施，確保個人資料僅由獲授權人員為合法目的存取。"
          ]
        },
        {
          heading: "第三方服務提供者",
          paragraphs: [
            "為營運本網站及報名系統，我們可能使用受信任的第三方服務提供者，包括："
          ],
          list: [
            "Sanity：用於內容管理及報名資料儲存",
            "Cloudflare：用於網站主機代管、安全、效能及防垃圾訊息保護",
            "Resend 或其他電郵服務提供者：用於寄送自動報名電郵",
            "GitHub：用於網站程式碼版本管理"
          ],
          paragraphsAfter: [
            "個人資料不應直接儲存於公開的程式碼儲存庫中。",
            "此等服務提供者僅得於為我們提供服務所必要之範圍內，並依其自身之安全與資料保護義務處理個人資料。"
          ]
        },
        {
          heading: "國際傳輸",
          paragraphs: [
            "部分用於網站主機代管、資料儲存、安全或電郵寄送之服務提供者，可能於歐洲經濟區以外處理資料。",
            "當發生此類傳輸時，我們會盡力依 GDPR 採取適當的保障措施，例如適足性決定、標準契約條款或其他適用之合法傳輸機制。"
          ]
        }
      ]
    },
    {
      id: "retention",
      navLabel: "資料保存",
      heading: "8. 資料保存",
      blocks: [
        {
          paragraphs: [
            "我們僅於為收集目的所必要之期間保存個人資料。",
            "除非法律或正當行政需要另有要求，一般適用下列保存期間："
          ],
          list: [
            "聯絡表單訊息：最長 12 個月",
            "活動報名資料：活動結束後最長 12 個月",
            "護照號碼：通常於活動結束後三個月內刪除或匿名化",
            "緊急聯絡資訊：通常於活動結束後三個月內刪除或匿名化",
            "上傳的相片或文件：通常於活動結束後三個月內刪除或匿名化",
            "志工資訊：最長 24 個月（於當事人同意就未來志工機會接受聯繫時）",
            "技術與安全日誌：於網站安全與維護所必要之有限期間內保存"
          ],
          paragraphsAfter: [
            "於相關保存期間屆滿後，個人資料將於必要時被刪除、匿名化或安全封存。"
          ]
        }
      ]
    },
    {
      id: "security",
      navLabel: "資料安全",
      heading: "9. 資料安全",
      blocks: [
        {
          paragraphs: [
            "我們採取適當的技術與組織措施，保護個人資料免於未經授權之存取、遺失、濫用、變更或揭露。",
            "此等措施可能包括："
          ],
          list: [
            "限制僅獲授權人員存取",
            "安全的網站主機代管",
            "防垃圾訊息與安全保護",
            "安全儲存報名資料",
            "限制存取敏感資訊",
            "定期檢視資料存取與保存",
            "避免將個人資料儲存於公開的程式碼儲存庫"
          ],
          paragraphsAfter: [
            "然而，沒有任何系統能保證絕對安全。因此，我們鼓勵使用者不要透過線上表單提交不必要的敏感資訊。"
          ]
        }
      ]
    },
    {
      id: "cookies",
      navLabel: "Cookies",
      heading: "10. Cookies",
      blocks: [
        {
          paragraphs: [
            "本網站可能基於技術、安全、統計或功能目的使用 cookies 或類似技術。",
            "嚴格必要的 cookies 可能用於確保網站的正常運作與安全。",
            "於使用非必要 cookies（例如分析、嵌入式媒體或行銷 cookies）時，我們會在適用法律要求時徵求您的同意。",
            "您可在我們的 Cookie 政策中查閱更多資訊。"
          ]
        }
      ]
    },
    {
      id: "rights",
      navLabel: "您的權利",
      heading: "11. 您的權利",
      blocks: [
        {
          paragraphs: [
            "依 GDPR，您對您的個人資料可能享有下列權利："
          ],
          list: [
            "查閱您個人資料之權利",
            "要求更正不正確或不完整資料之權利",
            "要求刪除您資料之權利",
            "要求限制處理之權利",
            "反對處理之權利",
            "於處理係基於同意時，隨時撤回同意之權利",
            "於適用時，資料可攜之權利",
            "向主管資料保護機關提出申訴之權利"
          ],
          paragraphsAfter: [
            `如欲行使您的權利，請聯絡本基金會秘書處：\n\n${FOUNDATION_EMAIL}`,
            "在回應您的請求前，我們可能需要核實您的身分。",
            "如您身處法國，您亦有權聯絡法國資料保護機關 CNIL。"
          ]
        }
      ]
    },
    {
      id: "contact",
      navLabel: "聯絡",
      heading: "12. 聯絡",
      blocks: [
        {
          paragraphs: [
            "如對本隱私政策或您個人資料之處理有任何疑問，請聯絡：",
            `${FOUNDATION_NAME_ZH}\n${FOUNDATION_ADDRESS}`,
            `電郵：${FOUNDATION_EMAIL}`
          ]
        }
      ]
    }
  ]
};

const privacyPolicyFr: PrivacyPolicyDoc = {
  title: "Politique de confidentialité",
  pageTitle: "Protection des données personnelles",
  kicker: "Mentions légales",
  lastUpdatedLabel: "Dernière mise à jour",
  lastUpdated: "23/06/2026",
  privacyPolicyLinkLabel: "Politique de confidentialité",
  navAriaLabel: "Sections de la politique de confidentialité",
  tabs: [
    {
      id: "protection",
      navLabel: "Protection des données",
      heading: "1. Protection des données personnelles",
      blocks: [
        {
          paragraphs: [
            `La présente Politique de confidentialité explique comment ${FOUNDATION_NAME_FR} (« nous », « notre » ou « la Fondation ») collecte, utilise, conserve et protège les données personnelles via ce site web, notamment par le biais des formulaires de contact, des formulaires d'inscription aux événements et des autres services en ligne proposés sur le site.`,
            "Nous nous engageons à respecter la vie privée et les droits à la protection des données personnelles de tous les visiteurs, participants, bénévoles, partenaires et autres personnes interagissant avec notre site web et nos activités.",
            "La présente Politique de confidentialité vise à respecter les principes du Règlement général sur la protection des données (UE) 2016/679 (« RGPD ») et les règles françaises et européennes applicables en matière de protection des données."
          ]
        },
        {
          heading: "Modifications de la présente Politique de confidentialité",
          paragraphs: [
            "Nous pouvons mettre à jour la présente Politique de confidentialité de temps à autre afin de refléter l'évolution de notre site web, de nos activités, de nos obligations légales ou de nos pratiques de traitement des données.",
            "La version mise à jour sera publiée sur cette page avec une date de « Dernière mise à jour » révisée."
          ]
        }
      ]
    },
    {
      id: "controller",
      navLabel: "Responsable du traitement",
      heading: "2. Responsable du traitement",
      blocks: [
        {
          paragraphs: [
            "Le responsable du traitement des données personnelles collectées via ce site web est :",
            `${FOUNDATION_NAME_FR}\n${FOUNDATION_ADDRESS}`,
            `E-mail : ${FOUNDATION_EMAIL}`,
            "Pour toute question relative à la présente Politique de confidentialité ou au traitement de vos données personnelles, vous pouvez contacter le Secrétariat de la Fondation à l'adresse :",
            FOUNDATION_EMAIL
          ]
        }
      ]
    },
    {
      id: "data-collected",
      navLabel: "Données collectées",
      heading: "3. Données personnelles que nous collectons",
      blocks: [
        {
          paragraphs: [
            "Nous pouvons collecter et traiter différentes catégories de données personnelles selon la manière dont vous interagissez avec notre site web."
          ],
          subsections: [
            {
              heading: "Formulaires de contact",
              paragraphs: ["Lorsque vous nous contactez via le site web, nous pouvons collecter :"],
              list: [
                "Nom",
                "Adresse e-mail",
                "Organisation ou affiliation",
                "Contenu du message",
                "Toute autre information que vous choisissez de fournir"
              ]
            },
            {
              heading: "Formulaires d'inscription aux événements",
              paragraphs: ["Lorsque vous vous inscrivez à un événement, nous pouvons collecter :"],
              list: [
                "Nom",
                "Prénom",
                "Numéro de passeport, numéro de titre de séjour ou numéro de carte d'identité française, lorsque requis pour l'accès au lieu ou la gestion de la sécurité",
                "Nationalité",
                "Numéro de téléphone",
                "Adresse e-mail",
                "Nom du contact d'urgence",
                "Téléphone du contact d'urgence",
                "Date(s) de participation",
                "Volontariat (oui/non)",
                "Tranche d'âge (facultatif)",
                "Genre (facultatif)",
                "Remarques (facultatif)",
                "Statut d'inscription",
                "Notes administratives internes liées à votre inscription",
                "Date et heure de soumission"
              ]
            },
            {
              heading: "Données techniques",
              paragraphs: [
                "Lorsque vous consultez notre site web, certaines informations techniques peuvent être traitées automatiquement, telles que :"
              ],
              list: [
                "Adresse IP",
                "Type et version du navigateur",
                "Type d'appareil",
                "Pages consultées",
                "Date et heure de la visite",
                "Journaux de sécurité et de serveur"
              ]
            }
          ],
          paragraphsAfter: [
            "Si nécessaire pour un événement donné, nous pouvons également collecter une photo ou un document téléversé pour la vérification des participants, la gestion des accès ou la préparation de badges.",
            "Ces informations techniques sont utilisées pour la sécurité du site web, la maintenance technique, les performances, la protection contre le spam et la prévention des accès non autorisés."
          ]
        },
        {
          heading: "Inscription aux événements et accès au lieu",
          paragraphs: [
            "Pour les événements organisés dans des lieux institutionnels ou internationaux, y compris le Siège de l'UNESCO ou des lieux similaires, certaines données personnelles peuvent être nécessaires à l'inscription, à la gestion des accès, à la vérification de sécurité et à la coordination administrative.",
            "Cela peut inclure le nom, la nationalité, le numéro de pièce d'identité, les coordonnées et la ou les date(s) de participation.",
            "Lorsque cela est strictement nécessaire pour l'accès au lieu ou la gestion de la sécurité, des informations limitées sur les participants peuvent être partagées avec les services compétents d'accès, de sécurité ou administratifs du lieu.",
            "Seules les informations nécessaires à ces finalités seront partagées."
          ]
        },
        {
          heading: "Numéro de pièce d'identité et informations d'identité",
          paragraphs: [
            "Le numéro de passeport, de titre de séjour ou de carte d'identité française, ainsi que la nationalité, ne sont collectés que lorsque cela est nécessaire à la vérification des participants, à l'accès au lieu institutionnel, aux exigences de sécurité ou à la coordination administrative.",
            "Ces informations ne seront pas utilisées à des fins non liées et ne seront pas conservées plus longtemps que nécessaire.",
            "Sauf obligation légale, de sécurité ou administrative imposant une durée de conservation plus longue, les numéros de pièce d'identité sont normalement supprimés ou anonymisés dans les trois mois suivant la fin de l'événement concerné."
          ]
        },
        {
          heading: "Informations de contact d'urgence",
          paragraphs: [
            "Les informations de contact d'urgence sont collectées uniquement à des fins liées à la sécurité et ne sont utilisées que lorsque cela est nécessaire en lien avec l'événement.",
            "Les coordonnées d'urgence ne seront pas utilisées pour des communications sans rapport avec la sécurité des participants.",
            "Sauf obligation légale ou administrative imposant une durée de conservation plus longue, les informations de contact d'urgence sont normalement supprimées ou anonymisées dans les trois mois suivant la fin de l'événement concerné."
          ]
        },
        {
          heading: "Remarques et besoins particuliers",
          paragraphs: [
            "Les participants peuvent nous informer volontairement de besoins particuliers, tels que des besoins d'accessibilité, d'interprétation ou des restrictions alimentaires, dans le champ « Remarques » ou par tout autre moyen approprié.",
            "Veuillez ne fournir que les informations nécessaires pour nous permettre de soutenir votre participation.",
            "Ces informations ne seront utilisées que pour la préparation de l'événement et le soutien aux participants. L'accès à ces informations sera limité aux membres autorisés du comité d'organisation ou aux prestataires concernés, lorsque cela est nécessaire."
          ]
        },
        {
          heading: "Enfants et jeunes participants",
          paragraphs: [
            "Nos événements ou programmes peuvent impliquer de jeunes participants. Lorsque des données personnelles de mineurs sont collectées, nous faisons preuve d'une vigilance accrue et, lorsque requis, demandons l'autorisation d'un parent, d'un tuteur légal, d'un établissement scolaire ou d'un représentant autorisé.",
            "Nous ne collectons pas sciemment de données personnelles de mineurs sans l'autorisation appropriée lorsque celle-ci est requise."
          ]
        }
      ]
    },
    {
      id: "purposes",
      navLabel: "Finalités du traitement",
      heading: "4. Finalités du traitement",
      blocks: [
        {
          paragraphs: [
            "Nous collectons et traitons les données personnelles uniquement à des fins déterminées, explicites et légitimes.",
            "Vos données personnelles peuvent être utilisées aux fins suivantes :"
          ],
          list: [
            "Gérer l'inscription aux événements",
            "Vérifier l'identité des participants lorsque cela est requis pour l'accès au lieu",
            "Communiquer avec les participants inscrits",
            "Envoyer des e-mails de confirmation ou d'informations pratiques",
            "Organiser l'accès au lieu de l'événement",
            "Préparer, le cas échéant, des listes de participants, badges ou documents d'accès",
            "Gérer la participation des bénévoles",
            "Répondre aux remarques ou besoins particuliers communiqués volontairement par les participants",
            "Contacter une personne d'urgence lorsque cela est strictement nécessaire",
            "Assurer la sûreté et la sécurité de l'événement",
            "Respecter les exigences administratives, légales ou liées au lieu",
            "Répondre aux demandes envoyées via le site web",
            "Maintenir la sécurité et le bon fonctionnement du site web"
          ],
          paragraphsAfter: [
            "Nous ne vendons pas vos données personnelles.",
            "Nous n'utilisons pas les données d'inscription aux événements à des fins de marketing commercial."
          ]
        }
      ]
    },
    {
      id: "legal-bases",
      navLabel: "Bases juridiques",
      heading: "5. Bases juridiques",
      blocks: [
        {
          paragraphs: [
            "Selon le contexte, nous traitons les données personnelles sur l'une ou plusieurs des bases juridiques suivantes au titre du RGPD :"
          ],
          list: [
            "Consentement : lorsque vous soumettez volontairement un formulaire, fournissez des remarques ou besoins particuliers, téléversez une photo ou un document, ou acceptez le traitement de vos données aux fins d'inscription à un événement.",
            "Intérêt légitime : lorsque le traitement est nécessaire pour organiser des événements, assurer l'accès au lieu, maintenir la sécurité, prévenir les abus et gérer les communications avec les participants.",
            "Mesures précontractuelles ou organisationnelles : lorsque le traitement est nécessaire pour traiter votre demande d'inscription ou de participation.",
            "Obligation légale ou administrative : lorsque nous sommes tenus de conserver ou de fournir certaines informations pour des raisons légales, administratives ou liées à la sécurité du lieu.",
            "Intérêts vitaux : lorsque les informations de contact d'urgence doivent être utilisées dans une situation grave et urgente."
          ],
          paragraphsAfter: [
            "Lorsque des remarques révèlent des informations sensibles, telles que des informations relatives à la santé, à l'accessibilité, à la religion ou à l'alimentation, ces informations sont fournies volontairement et ne seront traitées que pour soutenir votre participation à l'événement."
          ]
        }
      ]
    },
    {
      id: "photos",
      navLabel: "Photos et documents",
      heading: "6. Photos et documents téléversés",
      blocks: [
        {
          paragraphs: [
            "Lorsque le téléversement de photos est activé, des photos peuvent être collectées pour la vérification des participants, la préparation de badges ou la gestion de l'accès à l'événement.",
            "Les photos et documents téléversés ne seront pas utilisés à des fins promotionnelles ou de communication publique sans consentement distinct.",
            "Sauf obligation légale, de sécurité ou administrative imposant une durée de conservation plus longue, les photos et documents téléversés sont normalement supprimés ou anonymisés dans les trois mois suivant la fin de l'événement concerné."
          ]
        }
      ]
    },
    {
      id: "recipients",
      navLabel: "Destinataires et prestataires",
      heading: "7. Destinataires et prestataires de services",
      blocks: [
        {
          heading: "Destinataires des données personnelles",
          paragraphs: [
            "Les données personnelles ne peuvent être consultées que par des personnes autorisées qui en ont besoin aux fins décrites dans la présente Politique de confidentialité.",
            "Les destinataires peuvent inclure :"
          ],
          list: [
            "Membres du comité d'organisation",
            "Équipes d'inscription et du Secrétariat",
            "Équipes de coordination de l'accès ou de la sécurité de l'événement",
            "Prestataires techniques prenant en charge le site web, la base de données, l'envoi d'e-mails, l'hébergement ou la sécurité",
            "Services compétents d'accès ou de sécurité du lieu, lorsque cela est strictement nécessaire"
          ],
          paragraphsAfter: [
            "Nous prenons des mesures raisonnables pour garantir que les données personnelles ne sont consultées que par des personnes autorisées et uniquement à des fins légitimes."
          ]
        },
        {
          heading: "Prestataires de services tiers",
          paragraphs: [
            "Pour exploiter notre site web et notre système d'inscription, nous pouvons recourir à des prestataires de services tiers de confiance, notamment :"
          ],
          list: [
            "Sanity pour la gestion de contenu et le stockage des données d'inscription",
            "Cloudflare pour l'hébergement du site web, la sécurité, les performances et la protection anti-spam",
            "Resend ou un autre prestataire de services e-mail pour l'envoi automatique d'e-mails d'inscription",
            "GitHub pour la gestion des versions du code du site web"
          ],
          paragraphsAfter: [
            "Les données personnelles ne doivent pas être stockées directement dans des dépôts de code publics.",
            "Ces prestataires ne peuvent traiter les données personnelles que dans la mesure nécessaire à la fourniture de leurs services et conformément à leurs propres obligations en matière de sécurité et de protection des données."
          ]
        },
        {
          heading: "Transferts internationaux",
          paragraphs: [
            "Certains prestataires utilisés pour l'hébergement du site web, le stockage des données, la sécurité ou l'envoi d'e-mails peuvent traiter des données en dehors de l'Espace économique européen.",
            "Lorsque de tels transferts ont lieu, nous nous efforçons de nous appuyer sur des garanties appropriées au titre du RGPD, telles que des décisions d'adéquation, des clauses contractuelles types ou d'autres mécanismes de transfert licites, le cas échéant."
          ]
        }
      ]
    },
    {
      id: "retention",
      navLabel: "Conservation des données",
      heading: "8. Conservation des données",
      blocks: [
        {
          paragraphs: [
            "Nous conservons les données personnelles uniquement pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées.",
            "Sauf exigence contraire de la loi ou de besoins administratifs légitimes, les durées de conservation suivantes s'appliquent généralement :"
          ],
          list: [
            "Messages des formulaires de contact : jusqu'à 12 mois",
            "Données d'inscription aux événements : jusqu'à 12 mois après l'événement",
            "Numéros de pièce d'identité : normalement supprimés ou anonymisés dans les trois mois suivant l'événement",
            "Informations de contact d'urgence : normalement supprimées ou anonymisées dans les trois mois suivant l'événement",
            "Photos ou documents téléversés : normalement supprimés ou anonymisés dans les trois mois suivant l'événement",
            "Informations relatives aux bénévoles : jusqu'à 24 mois, lorsque la personne accepte d'être contactée pour de futures opportunités de bénévolat",
            "Journaux techniques et de sécurité : conservés pendant une durée limitée nécessaire à la sécurité et à la maintenance du site web"
          ],
          paragraphsAfter: [
            "À l'issue de la durée de conservation pertinente, les données personnelles seront supprimées, anonymisées ou archivées de manière sécurisée, le cas échéant."
          ]
        }
      ]
    },
    {
      id: "security",
      navLabel: "Sécurité des données",
      heading: "9. Sécurité des données",
      blocks: [
        {
          paragraphs: [
            "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger les données personnelles contre l'accès non autorisé, la perte, l'utilisation abusive, l'altération ou la divulgation.",
            "Ces mesures peuvent inclure :"
          ],
          list: [
            "Restriction d'accès au personnel autorisé",
            "Hébergement sécurisé du site web",
            "Protection anti-spam et mesures de sécurité",
            "Stockage sécurisé des données d'inscription",
            "Accès limité aux informations sensibles",
            "Examen régulier de l'accès aux données et de leur conservation",
            "Éviter le stockage de données personnelles dans des dépôts de code publics"
          ],
          paragraphsAfter: [
            "Toutefois, aucun système ne peut garantir une sécurité absolue. Nous encourageons donc les utilisateurs à ne pas soumettre d'informations sensibles inutiles via les formulaires en ligne."
          ]
        }
      ]
    },
    {
      id: "cookies",
      navLabel: "Cookies",
      heading: "10. Cookies",
      blocks: [
        {
          paragraphs: [
            "Notre site web peut utiliser des cookies ou des technologies similaires à des fins techniques, de sécurité, statistiques ou fonctionnelles.",
            "Des cookies strictement nécessaires peuvent être utilisés pour assurer le bon fonctionnement et la sécurité du site web.",
            "Lorsque des cookies non essentiels sont utilisés, tels que des cookies d'analyse, de médias intégrés ou de marketing, nous demanderons votre consentement lorsque la loi applicable l'exige.",
            "Vous trouverez de plus amples informations dans notre Politique relative aux cookies."
          ]
        }
      ]
    },
    {
      id: "rights",
      navLabel: "Vos droits",
      heading: "11. Vos droits",
      blocks: [
        {
          paragraphs: ["Au titre du RGPD, vous pouvez disposer des droits suivants concernant vos données personnelles :"],
          list: [
            "Le droit d'accéder à vos données personnelles",
            "Le droit de demander la rectification de données inexactes ou incomplètes",
            "Le droit de demander l'effacement de vos données",
            "Le droit de demander la limitation du traitement",
            "Le droit de vous opposer au traitement",
            "Le droit de retirer votre consentement à tout moment, lorsque le traitement est fondé sur le consentement",
            "Le droit à la portabilité des données, le cas échéant",
            "Le droit d'introduire une réclamation auprès d'une autorité de protection des données compétente"
          ],
          paragraphsAfter: [
            `Pour exercer vos droits, veuillez contacter le Secrétariat de la Fondation à l'adresse :\n\n${FOUNDATION_EMAIL}`,
            "Nous pouvons être amenés à vérifier votre identité avant de répondre à votre demande.",
            "Si vous êtes situé(e) en France, vous avez également le droit de contacter la CNIL, l'autorité française de protection des données."
          ]
        }
      ]
    },
    {
      id: "contact",
      navLabel: "Contact",
      heading: "12. Contact",
      blocks: [
        {
          paragraphs: [
            "Pour toute question relative à la présente Politique de confidentialité ou au traitement de vos données personnelles, veuillez contacter :",
            `${FOUNDATION_NAME_FR}\n${FOUNDATION_ADDRESS}`,
            `E-mail : ${FOUNDATION_EMAIL}`
          ]
        }
      ]
    }
  ]
};

export const privacyPolicyContent: Record<Locale, PrivacyPolicyDoc> = {
  en: privacyPolicyEn,
  zh: privacyPolicyZh,
  fr: privacyPolicyFr
};

/** Notice displayed above the event registration form. */
export const registrationPrivacyNotice: Record<Locale, string> = {
  en: `Dear Participant,

Welcome to register for the International Peace Conference on Traditional Culture Education for Youth: Ignite the Vital Spark of the Heart.

The event will take place on 1–2 October 2026 at Room IV, UNESCO Headquarters (125 Avenue de Suffren, 75007 Paris). Check-in will begin at 8:30 a.m. on the day of the event.

Please complete this form to register. The information you provide will be used only for event registration, participant verification, venue access management, safety communication, volunteer coordination, and necessary administrative arrangements. Upon submission, your registration will be confirmed immediately and a confirmation email will be sent automatically to the email address you provide. Please ensure your email address is correct.

To comply with security and access procedures at UNESCO Headquarters, please bring the valid identity document used for registration for check-in and verification on the day of the event.

If you have any questions, please contact:
Phone: +33 (0)7 45 19 68 58
Email: ${FOUNDATION_EMAIL}

Kind regards,
Traditional Culture Foundation at UNESCO
The Secretariat`,
  zh: `尊敬的參會者：

歡迎您報名參加 「世界和平論壇——傳統文化教育啟動青少年核心源動力」。

本次活動將於 2026 年 10 月 1 日至 2 日 在 聯合國教科文組織總部 Room IV（125 Avenue de Suffren, 75007 Paris） 舉行，活動當日將於 上午 8:30 開始簽到入場。

請填寫本表單以完成活動報名。您所提供的資訊將僅用於活動報名、參加者核實、場地進出管理、安全聯絡、志工協調及必要的行政安排。提交表單後，您的報名將即時確認，系統將自動寄送確認信至您填寫的電子郵箱，請務必確認電郵地址準確無誤。

為配合聯合國教科文組織總部的安保及入場管理工作，請您於活動當日簽到入場時攜帶報名時所使用的有效證件，以便現場核驗。

如有任何疑問，請聯繫：
電話：+33 (0)7 45 19 68 58
郵箱：${FOUNDATION_EMAIL}

謹致問候，
聯合國教科文組織傳統文化基金會
秘書處`,
  fr: `Madame, Monsieur,

Nous vous invitons à vous inscrire à la Conférence internationale pour la paix sur l'éducation à la culture traditionnelle en faveur de la jeunesse : Réveiller l'élan vital du cœur.

L'événement se tiendra les 1er et 2 octobre 2026 à la Salle IV, Siège de l'UNESCO (125 Avenue de Suffren, 75007 Paris). L'accueil et l'enregistrement commenceront à 8h30 le jour de l'événement.

Veuillez remplir ce formulaire pour finaliser votre inscription. Les informations que vous fournissez seront utilisées uniquement pour l'inscription, la vérification des participants, la gestion des accès, la communication de sécurité, la coordination des bénévoles et les arrangements administratifs nécessaires. Dès l'envoi du formulaire, votre inscription sera confirmée immédiatement et un e-mail de confirmation sera adressé automatiquement à l'adresse électronique indiquée. Veuillez vérifier que votre adresse e-mail est exacte.

Afin de respecter les procédures de sécurité du Siège de l'UNESCO, veuillez vous munir de la pièce d'identité valide utilisée lors de votre inscription lors de l'accueil et de l'enregistrement le jour de l'événement.

Pour toute question, veuillez contacter :
Téléphone : +33 (0)7 45 19 68 58
E-mail : ${FOUNDATION_EMAIL}

Bien cordialement,
Fondation pour la culture traditionnelle à l'UNESCO
Le Secrétariat`
};

export type RegistrationConsentCopy = {
  privacyPolicyLinkLabel: string;
  /** Text shown before the inline Privacy Policy link. */
  intro: string;
  /** Text shown after the link, up to the secretariat sentence (may be empty). */
  afterLink: string;
  /** Sentence that precedes the secretariat email link. */
  secretariatLine: string;
  /** Trailing text after the email link (e.g. a closing period for some languages). */
  secretariatTrailing: string;
};

export const registrationConsentCopy: Record<Locale, RegistrationConsentCopy> = {
  en: {
    privacyPolicyLinkLabel: "Privacy Policy",
    intro: "I have read and understood the ",
    afterLink: `. I consent to the collection and processing of the personal data provided in this form by ${FOUNDATION_NAME} for the purposes of event registration, participant verification, access management, safety communication, volunteer coordination, and necessary administrative arrangements.\n\nI understand that, where strictly necessary for venue access or security management, limited participant information may be shared with the relevant venue access or security services.`,
    secretariatLine: "To exercise my data protection rights, I may contact the Foundation Secretariat at ",
    secretariatTrailing: "."
  },
  zh: {
    privacyPolicyLinkLabel: "隱私政策",
    intro: "本人已閱讀並理解",
    afterLink: `。本人同意${FOUNDATION_NAME_ZH}為活動報名、參加者核實、進出管理、安全聯絡、志工協調及必要行政安排之目的，收集及處理本表單所提供之個人資料。\n\n本人理解，於場地進出或安全管理確有必要時，有限的參加者資訊可能會與相關場地進出或保安服務單位共享。`,
    secretariatLine: "如欲行使本人之資料保護權利，本人可聯絡本基金會秘書處：",
    secretariatTrailing: "。"
  },
  fr: {
    privacyPolicyLinkLabel: "Politique de confidentialité",
    intro: "J'ai lu et compris la ",
    afterLink: `. J'accepte la collecte et le traitement des données personnelles fournies dans ce formulaire par ${FOUNDATION_NAME} aux fins d'inscription à l'événement, de vérification des participants, de gestion des accès, de communication de sécurité, de coordination des bénévoles et des arrangements administratifs nécessaires.\n\nJe comprends que, lorsque cela est strictement nécessaire pour l'accès au lieu ou la gestion de la sécurité, des informations limitées sur les participants peuvent être partagées avec les services compétents d'accès ou de sécurité du lieu.`,
    secretariatLine:
      "Pour exercer mes droits en matière de protection des données, je peux contacter le Secrétariat de la Fondation à l'adresse ",
    secretariatTrailing: "."
  }
};
