import { CONFERENCE_PROGRAMME_PDF } from "@data/conference-files";
import type { Locale } from "@data/site";

const CONCEPT_NOTE_SLUG = "international-conference-on-peace-2026-concept-note";
const CONCEPT_NOTE_PDF = "/assets/news/international-conference-on-peace-2026-concept-note.pdf";
const CONCEPT_NOTE_PDF_SIZE = 61372;

function block(key: string, text: string, marks: string[][] = []) {
  return {
    _type: "block" as const,
    _key: key,
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span" as const,
        _key: `${key}a`,
        text,
        marks: marks[0] || []
      }
    ]
  };
}

function emBlock(
  key: string,
  before: string,
  emphasis: string,
  after: string
) {
  return {
    _type: "block" as const,
    _key: key,
    style: "normal",
    markDefs: [],
    children: [
      { _type: "span" as const, _key: `${key}a`, marks: [], text: before },
      { _type: "span" as const, _key: `${key}b`, marks: ["em"], text: emphasis },
      { _type: "span" as const, _key: `${key}c`, marks: [], text: after }
    ]
  };
}

function sourceBlock(key: string, before: string, label: string, href: string) {
  return {
    _type: "block" as const,
    _key: key,
    style: "normal",
    markDefs: [{ _key: `${key}link`, _type: "link", href }],
    children: [
      { _type: "span" as const, _key: `${key}a`, marks: [], text: before },
      { _type: "span" as const, _key: `${key}b`, marks: [`${key}link`], text: label }
    ]
  };
}

function imageBlock(key: string, src: string, alt: string, layout: "landscape" | "portrait" = "landscape") {
  return {
    _type: "image" as const,
    _key: key,
    src,
    alt,
    layout
  };
}

const sharedFiles = {
  slug: CONCEPT_NOTE_SLUG,
  publishDate: "2026-09-22T00:00:00.000Z",
  pdfUrl: CONCEPT_NOTE_PDF,
  pdfSize: CONCEPT_NOTE_PDF_SIZE
};

const conceptNoteEn = {
  title:
    "International Conference on Peace:\nIgniting the Vital Spark of the Heart\nthrough Education of Traditional Culture for Youth",
  ...sharedFiles,
  category: "Conference",
  summary:
    "Concept Note for the International Conference on Peace, 1–2 October 2026, at UNESCO Headquarters, Room IV, Paris.",
  subtitle: "Concept Note",
  breadcrumbLabel: "International Conference on Peace 2026 – Concept Note",
  location: "UNESCO Headquarters\nParis, France",
  eventDateLabel: "1–2 October 2026",
  editorialBanner: {
    kicker: "International Conference on Peace",
    title: "Igniting the Vital Spark of the Heart\nthrough Education of Traditional Culture for Youth",
    meta: "1 – 2 October 2026  |  UNESCO Headquarters, Room IV, Paris",
    tags: "Culture · Education · Peace",
    aside: "A more\nhumane\ninclusive\nand\npeaceful\nfuture"
  },
  pdfLabel: "Concept Note (PDF)",
  agendaPdfUrl: CONFERENCE_PROGRAMME_PDF.en.url,
  agendaPdfSize: CONFERENCE_PROGRAMME_PDF.en.size,
  agendaPdfLabel: "Agenda (PDF)",
  seoTitle: "International Conference on Peace 2026 – Concept Note",
  seoDescription:
    "Concept Note for the International Conference on Peace: Igniting the Vital Spark of the Heart through Education of Traditional Culture for Youth. 1–2 October 2026, UNESCO Headquarters, Paris.",
  body: [
    block(
      "p1",
      "The International Conference on Peace: Igniting the Vital Spark of the Heart through Education of Traditional Culture for Youth is conceived as a continuation of the 2025 International Peace Conference on Education for Well-Being. It seeks to explore how traditional culture education can nurture the inner growth, emotional balance, ethical awareness and spiritual resilience of young people in a rapidly changing world."
    ),
    emBlock(
      "p2",
      "The theme “Ignite the Vital Spark of the Heart” echoes the philosophical insight of Henri Bergson, whose idea of ",
      "élan vital",
      " points to the creative impulse of life, the inner vitality through which human beings grow, renew themselves and participate in the unfolding of life. In this spirit, the conference understands education not merely as the transmission of knowledge, but as the awakening of the living force within each young person: the capacity to think, to feel, to create, to care and to act responsibly."
    ),
    block(
      "p3",
      "Today’s youth face mounting pressures from digital transformation, social fragmentation, academic competition and mental health challenges. These pressures may be particularly significant for young people whose ways of learning, communicating and experiencing the world differ from dominant educational norms, including autistic and other neurodivergent learners."
    ),
    block(
      "p4",
      "In line with UNESCO’s vision of inclusive education, the conference affirms that every learner matters equally, and that neurodiversity should be recognized not as a limitation, but as part of the richness of human potential. Traditional culture, aesthetic cultivation, family education and intercultural dialogue can help create more caring and responsive learning environments, where young people are supported according to their needs and encouraged to develop their unique strengths."
    ),
    block(
      "p5",
      "The conference is closely aligned with UNESCO’s mandate to build peace in the minds of people through education, culture, dialogue and the exchange of knowledge. By promoting quality education, cultural diversity, global citizenship, youth engagement, inclusive learning and intercultural understanding, it contributes to UNESCO’s vision of education as a foundation for peace and human dignity. It also resonates with UNESCO’s current work on inclusive education and the ethical use of technology, including the potential of AI and ICT to support learners with autism, ADHD and learning difficulties when guided by human-centred values."
    ),
    block(
      "p6",
      "The event supports the United Nations Sustainable Development Goals, particularly SDG 3 on Good Health and Well-being, SDG 4 on Quality Education, and SDG 16 on Peace, Justice and Strong Institutions. By linking youth well-being, traditional culture education, neurodiversity, inclusion and peacebuilding, the conference aims to contribute to a more humane, inclusive and peaceful future, in which young people are empowered not only to succeed, but also to understand, to care and to serve."
    )
  ]
};

const conceptNoteZh = {
  title: "世界和平論壇：\n以傳統文化教育\n啟動青少年核心源動力",
  ...sharedFiles,
  category: "論壇",
  summary: "2026 年世界和平論壇官方概念說明。會議於 10 月 1–2 日在巴黎聯合國教科文組織總部第四會議室舉行。",
  subtitle: "概念說明",
  breadcrumbLabel: "2026 世界和平論壇 – 概念說明",
  location: "聯合國教科文組織總部\n法國巴黎",
  eventDateLabel: "2026 年 10 月 1–2 日",
  editorialBanner: {
    kicker: "世界和平論壇",
    title: "以傳統文化教育\n啟動青少年核心源動力",
    meta: "2026 年 10 月 1–2 日  |  聯合國教科文組織總部，第四會議室，巴黎",
    tags: "文化 · 教育 · 和平",
    aside: "邁向更\n人道\n包容\n與和平的\n未來"
  },
  pdfLabel: "概念說明 (PDF)",
  agendaPdfUrl: CONFERENCE_PROGRAMME_PDF.zh.url,
  agendaPdfSize: CONFERENCE_PROGRAMME_PDF.zh.size,
  agendaPdfLabel: "活動日程 (PDF)",
  seoTitle: "2026 世界和平論壇 – 概念說明",
  seoDescription:
    "「世界和平論壇：以傳統文化教育啟動青少年核心源動力」概念說明。2026 年 10 月 1–2 日，巴黎聯合國教科文組織總部。",
  body: [
    block(
      "p1",
      "國際和平會議「啟動核心源動力：以傳統文化教育培育青少年」（International Conference on Peace: Igniting the Vital Spark of the Heart through Education of Traditional Culture for Youth），係延續 2025 年「福祉教育國際和平會議」（International Peace Conference on Education for Well-Being）而舉辦。會議旨在探討傳統文化教育如何在急遽變遷的世界中，滋養青少年的內在成長、情緒平衡、倫理覺知與精神韌性。"
    ),
    emBlock(
      "p2",
      "會議主題「啟動核心源動力」呼應柏格森（Henri Bergson）的哲學洞見：其所謂 ",
      "élan vital",
      "，指向生命的創造衝動，即使人成長、更新自身，並參與生命開展的內在活力。本此精神，會議所理解的教育，不僅是知識的傳授，更是喚醒每一位青少年內在的生命力量：思考、感受、創造、關愛，以及負責任地行動的能力。"
    ),
    block(
      "p3",
      "當今青少年面對數位轉型、社會分化、學業競爭與心理健康等多重壓力。對於學習、溝通與感知世界的方式有別於主流教育常規的年輕人——包括自閉及神經多樣性學習者——這些壓力可能尤為顯著。"
    ),
    block(
      "p4",
      "本於聯合國教科文組織的全納教育願景，會議肯定每一位學習者同等重要，神經多樣性不應被視為缺陷，而是人類潛能豐富性的一部分。傳統文化、審美涵養、家庭教育與文明對話，有助於創造更關懷、更能敏銳回應的學習環境，使青少年依其需要獲得支持，並得以發展獨特長處。"
    ),
    block(
      "p5",
      "會議緊密呼應聯合國教科文組織「於人心中建設和平」的使命，透過教育、文化、對話與知識交流推動和平。會議促進優質教育、文化多樣性、全球公民意識、青年參與、全納學習與文明互鑒，從而貢獻於教科文組織以教育作為和平與人的尊嚴之基礎的願景。會議亦與教科文組織當前關於全納教育與科技倫理的工作相呼應，包括在以人為本的價值引導下，人工智慧與資訊通訊科技支持自閉、ADHD 及學習困難者的潛能。"
    ),
    block(
      "p6",
      "會議支持聯合國永續發展目標，尤其是 SDG 3 健康與福祉、SDG 4 優質教育，以及 SDG 16 和平、正義與健全制度。透過連結青少年福祉、傳統文化教育、神經多樣性、包容與和平建設，會議希望貢獻於一個更人道、包容與和平的未來，使青少年不僅有能力成功，也能理解、關愛與服務。"
    )
  ]
};

const conceptNoteFr = {
  title:
    "Conférence internationale pour la paix :\nRéveiller l'élan vital du cœur\npar l'éducation des jeunes à la culture traditionnelle",
  ...sharedFiles,
  category: "Conférence",
  summary:
    "Note conceptuelle de la Conférence internationale pour la paix, les 1er et 2 octobre 2026, au siège de l'UNESCO, Salle IV, Paris.",
  subtitle: "Note conceptuelle",
  breadcrumbLabel: "Conférence internationale pour la paix 2026 – Note conceptuelle",
  location: "Siège de l'UNESCO\nParis, France",
  eventDateLabel: "1–2 octobre 2026",
  editorialBanner: {
    kicker: "Conférence internationale pour la paix",
    title: "Réveiller l'élan vital du cœur\npar l'éducation des jeunes à la culture traditionnelle",
    meta: "1 – 2 octobre 2026  |  Siège de l'UNESCO, Salle IV, Paris",
    tags: "Culture · Éducation · Paix",
    aside: "Un avenir\nplus humain\ninclusif\net pacifique"
  },
  pdfLabel: "Note conceptuelle (PDF)",
  agendaPdfUrl: CONFERENCE_PROGRAMME_PDF.fr.url,
  agendaPdfSize: CONFERENCE_PROGRAMME_PDF.fr.size,
  agendaPdfLabel: "Programme (PDF)",
  seoTitle: "Conférence internationale pour la paix 2026 – Note conceptuelle",
  seoDescription:
    "Note conceptuelle de la Conférence internationale pour la paix : Réveiller l'élan vital du cœur par l'éducation des jeunes à la culture traditionnelle. 1–2 octobre 2026, siège de l'UNESCO, Paris.",
  body: [
    block(
      "p1",
      "La Conférence internationale pour la paix : Réveiller l'élan vital du cœur par l'éducation des jeunes à la culture traditionnelle s'inscrit dans le prolongement de la Conférence internationale pour la paix sur l'éducation au bien-être, tenue en 2025. Elle vise à explorer comment une éducation enracinée dans la culture traditionnelle peut nourrir la croissance intérieure, l'équilibre émotionnel, la conscience éthique et la résilience spirituelle des jeunes dans un monde en mutation rapide."
    ),
    emBlock(
      "p2",
      "Le thème de la Conférence, « Réveiller l'élan vital du cœur », fait écho à l'intuition philosophique d'Henri Bergson, dont la notion d'",
      "élan vital",
      " désigne l'impulsion créatrice de la vie, cette vitalité intérieure qui permet à l'être humain de grandir, de se renouveler et de participer à l'épanouissement de la vie. Dans cet esprit, la Conférence comprend l'éducation non seulement comme la transmission du savoir, mais comme l'éveil de cette force intérieure chez chaque jeune : la capacité de penser, de sentir, de créer, de prendre soin et d'agir avec responsabilité."
    ),
    block(
      "p3",
      "Les jeunes d'aujourd'hui font face à de multiples pressions, notamment la transformation numérique, la fragmentation sociale, la compétition scolaire et les défis de santé mentale. Ces pressions peuvent être encore plus marquées pour les jeunes dont les manières d'apprendre, de communiquer et de percevoir le monde diffèrent des normes éducatives conventionnelles, y compris les personnes autistes et les autres apprenants neurodivergents."
    ),
    block(
      "p4",
      "Conformément à la vision de l'UNESCO d'une éducation inclusive, la Conférence affirme que chaque apprenant compte également, et que la neurodiversité ne doit pas être considérée comme un déficit, mais comme une part de la richesse du potentiel humain. La culture traditionnelle, la formation esthétique, l'éducation familiale et le dialogue entre les civilisations peuvent contribuer à créer des environnements d'apprentissage plus attentionnés et plus à l'écoute, dans lesquels les jeunes sont soutenus selon leurs besoins et mis en mesure de développer leurs forces propres."
    ),
    block(
      "p5",
      "La Conférence s'inscrit étroitement dans la mission de l'UNESCO de construire la paix dans l'esprit des hommes et des femmes par l'éducation, la culture, le dialogue et le partage des connaissances. En favorisant une éducation de qualité, la diversité culturelle, la citoyenneté mondiale, l'engagement des jeunes, l'apprentissage inclusif et la compréhension interculturelle, elle contribue à la vision de l'UNESCO de l'éducation comme fondement de la paix et de la dignité humaine. Elle résonne également avec les travaux actuels de l'UNESCO sur l'éducation inclusive et l'éthique des sciences et des technologies, y compris le potentiel de l'intelligence artificielle et des technologies de l'information et de la communication pour accompagner les apprenants autistes, atteints de TDAH ou en difficulté d'apprentissage, lorsqu'elles sont guidées par des valeurs humanistes."
    ),
    block(
      "p6",
      "La Conférence appuie les Objectifs de développement durable des Nations Unies, en particulier l'ODD 3 sur la santé et le bien-être, l'ODD 4 sur une éducation de qualité, et l'ODD 16 sur la paix, la justice et des institutions efficaces. En reliant le bien-être des jeunes, l'éducation à la culture traditionnelle, la neurodiversité, l'inclusion et la construction de la paix, elle souhaite contribuer à un avenir plus humain, plus inclusif et plus pacifique, dans lequel les jeunes puissent non seulement réussir, mais aussi comprendre, prendre soin et servir."
    )
  ]
};

const LI_BAI_SLUG = "li-bai-poetry-calligraphy-cooperation";
const LI_BAI_SOURCE_URL = "https://www.facebook.com/share/p/1BxofD8wQr/";
const LI_BAI_MIRROR_URL = "https://www.52hrtt.com/ar/n/w/info/D1795418934148";
const LI_BAI_PHOTO_SIGNING = "/assets/news/li-bai-cooperation-signing.jpg";
const LI_BAI_PHOTO_TALKS = "/assets/news/li-bai-cooperation-talks.jpg";
const LI_BAI_PHOTO_PORTRAIT = "/assets/news/li-bai-cooperation-signing-portrait.jpg";

const liBaiShared = {
  slug: LI_BAI_SLUG,
  publishDate: "2026-11-18T00:00:00.000Z"
};

const liBaiZh = {
  ...liBaiShared,
  title: "《中國詩詞與書法傳統文化國際推廣合作框架協議》在香港簽署",
  category: "媒體報導",
  summary:
    "我會與李白國際文化交流基金會有限公司在香港簽署《中國詩詞與書法傳統文化國際推廣合作框架協議》，共同推動中國詩詞與書法的國際學術研究、公共教育、展覽策劃與數字傳播。",
  breadcrumbLabel: "合作框架協議在香港簽署",
  seoTitle: "《中國詩詞與書法傳統文化國際推廣合作框架協議》在香港簽署",
  seoDescription:
    "11月18日上午，我會與李白國際文化交流基金會有限公司在香港正式簽署《中國詩詞與書法傳統文化國際推廣合作框架協議》。",
  body: [
    block(
      "p1",
      "11月18日上午，我會與李白國際文化交流基金會有限公司（簡稱「李白基金會」）在香港正式簽署《中國詩詞與書法傳統文化國際推廣合作框架協議》。中國書法於2009年被列入聯合國教科文組織人類非物質文化遺產代表作名錄。詩詞與書法是中華文明的精神標識，也是人類共同的文化財富。"
    ),
    imageBlock("img1", LI_BAI_PHOTO_SIGNING, "我會與李白基金會簽署合作協議合影"),
    block(
      "p2",
      "根據協議，雙方將圍繞中國詩詞與書法的國際學術研究、公共教育、展覽策劃與數字傳播開展合作，重點面向絲綢之路沿線國家及「一帶一路」共建國家的學術機構、博物館與公眾。雙方將聯合策劃以高精度複製品、數字影像、學術圖錄為載體的李白書法與詩詞主題展覽，共同開發多語種數字內容，並優先增加面向絲綢之路沿線國家官方語言或通用語言的版本。"
    ),
    imageBlock("img2", LI_BAI_PHOTO_TALKS, "我會與李白基金會舉行合作會談"),
    block(
      "p3",
      "出席簽字儀式的有：我會中國區首席代表張忠華先生，李白基金會主席張欣先生、董事總經理蔡佳銘女士，以及港區全國政協委員、銅紫荊星章獲得者蔡榮星先生。蔡榮星先生長期服務香港社會、熱心文化公益，其親臨見證簽約，充分體現了香港各界對中華優秀傳統文化國際傳播事業的深切關注與鼎力支持。"
    ),
    imageBlock("img3", LI_BAI_PHOTO_PORTRAIT, "李白基金會董事總經理蔡佳銘女士簽署合作協議", "portrait"),
    block(
      "p4",
      "雙方表示，將以此次簽約為起點，秉持開放包容、互學互鑒的精神，深耕學術研究、公共教育與數字傳播，讓中國詩詞與書法在多元文明對話中持續煥發時代光彩。"
    ),
    sourceBlock("p5", "新聞報導：", "央視報導", LI_BAI_SOURCE_URL),
    sourceBlock("p6", "", "鏡報報導", LI_BAI_MIRROR_URL)
  ]
};

const liBaiEn = {
  ...liBaiShared,
  title:
    "Framework Agreement on the International Promotion of Chinese Poetry and Calligraphy Traditional Culture Signed in Hong Kong",
  category: "Media",
  summary:
    "The Foundation and the Li Bai International Cultural Exchange Foundation Limited signed a framework agreement in Hong Kong on the international promotion of Chinese poetry and calligraphy.",
  breadcrumbLabel: "Framework Agreement Signed in Hong Kong",
  seoTitle:
    "Framework Agreement on the International Promotion of Chinese Poetry and Calligraphy Traditional Culture Signed in Hong Kong",
  seoDescription:
    "On the morning of 18 November, the Foundation and the Li Bai International Cultural Exchange Foundation Limited formally signed in Hong Kong a framework agreement on the international promotion of Chinese poetry and calligraphy.",
  body: [
    block(
      "p1",
      "On the morning of 18 November, the Foundation and the Li Bai International Cultural Exchange Foundation Limited (the “Li Bai Foundation”) formally signed in Hong Kong the Framework Agreement on the International Promotion of Chinese Poetry and Calligraphy Traditional Culture. Chinese calligraphy was inscribed in 2009 on the UNESCO Representative List of the Intangible Cultural Heritage of Humanity. Poetry and calligraphy are spiritual emblems of Chinese civilisation, and a shared cultural heritage of humankind."
    ),
    imageBlock(
      "img1",
      LI_BAI_PHOTO_SIGNING,
      "Group photograph at the signing of the cooperation agreement between the Foundation and the Li Bai Foundation"
    ),
    block(
      "p2",
      "Under the agreement, the two parties will cooperate in international academic research, public education, exhibition planning, and digital communication relating to Chinese poetry and calligraphy, with a particular focus on academic institutions, museums, and the public in countries along the Silk Road and among Belt and Road partner countries. They will jointly curate exhibitions on Li Bai calligraphy and poetry, carried by high-precision reproductions, digital images, and academic catalogues; jointly develop multilingual digital content; and give priority to versions in the official or commonly used languages of Silk Road countries."
    ),
    imageBlock("img2", LI_BAI_PHOTO_TALKS, "The Foundation and the Li Bai Foundation hold a cooperation meeting"),
    block(
      "p3",
      "Those present at the signing ceremony included Mr Zhang Zhonghua, Chief Representative of the Foundation in China; Mr Zhang Xin, Chairman of the Li Bai Foundation; Ms Cai Jiaming, Managing Director of the Li Bai Foundation; and Mr Cai Rongxing, a Hong Kong member of the National Committee of the Chinese People’s Political Consultative Conference and recipient of the Bronze Bauhinia Star. Mr Cai Rongxing has long served Hong Kong society and devoted himself to cultural public welfare; his presence at the signing fully reflects the deep concern and strong support of all sectors of Hong Kong for the international communication of China’s fine traditional culture."
    ),
    imageBlock(
      "img3",
      LI_BAI_PHOTO_PORTRAIT,
      "Ms Cai Jiaming, Managing Director of the Li Bai Foundation, signs the cooperation agreement",
      "portrait"
    ),
    block(
      "p4",
      "Both parties said they would take this signing as a starting point, uphold the spirit of openness, inclusiveness, and mutual learning, and deepen academic research, public education, and digital communication, so that Chinese poetry and calligraphy continue to shine in dialogue among diverse civilisations."
    ),
    sourceBlock("p5", "News report: ", "CCTV", LI_BAI_SOURCE_URL),
    sourceBlock("p6", "", "Jingbao", LI_BAI_MIRROR_URL)
  ]
};

const liBaiFr = {
  ...liBaiShared,
  title:
    "Signature à Hong Kong de l'accord-cadre de promotion internationale de la poésie et de la calligraphie chinoises",
  category: "Médias",
  summary:
    "La Fondation et la Li Bai International Cultural Exchange Foundation Limited ont signé à Hong Kong un accord-cadre sur la promotion internationale de la poésie et de la calligraphie chinoises.",
  breadcrumbLabel: "Accord-cadre signé à Hong Kong",
  seoTitle:
    "Signature à Hong Kong de l'accord-cadre de promotion internationale de la poésie et de la calligraphie chinoises",
  seoDescription:
    "Le 18 novembre au matin, la Fondation et la Li Bai International Cultural Exchange Foundation Limited ont officiellement signé à Hong Kong un accord-cadre sur la promotion internationale de la poésie et de la calligraphie chinoises.",
  body: [
    block(
      "p1",
      "Le 18 novembre au matin, la Fondation et la Li Bai International Cultural Exchange Foundation Limited (la « Fondation Li Bai ») ont officiellement signé à Hong Kong l'Accord-cadre de coopération pour la promotion internationale de la poésie et de la calligraphie chinoises. La calligraphie chinoise a été inscrite en 2009 sur la Liste représentative du patrimoine culturel immatériel de l'humanité de l'UNESCO. La poésie et la calligraphie sont des emblèmes spirituels de la civilisation chinoise, et un patrimoine culturel commun de l'humanité."
    ),
    imageBlock(
      "img1",
      LI_BAI_PHOTO_SIGNING,
      "Photographie de groupe lors de la signature de l'accord de coopération entre la Fondation et la Fondation Li Bai"
    ),
    block(
      "p2",
      "Aux termes de cet accord, les deux parties coopéreront dans les domaines de la recherche universitaire internationale, de l'éducation du public, de la conception d'expositions et de la diffusion numérique autour de la poésie et de la calligraphie chinoises, en s'adressant en priorité aux institutions académiques, aux musées et au public des pays situés le long de la Route de la soie et des pays partenaires de l'« Initiative la Ceinture et la Route ». Elles concevront conjointement des expositions consacrées à la calligraphie et à la poésie de Li Bai, portées par des reproductions de haute précision, l'image numérique et des catalogues savants ; développeront ensemble des contenus numériques multilingues ; et donneront la priorité aux versions dans les langues officielles ou d'usage courant des pays de la Route de la soie."
    ),
    imageBlock(
      "img2",
      LI_BAI_PHOTO_TALKS,
      "La Fondation et la Fondation Li Bai tiennent une réunion de coopération"
    ),
    block(
      "p3",
      "Assistaient à la cérémonie de signature M. Zhang Zhonghua, représentant en chef de la Fondation en Chine ; M. Zhang Xin, président de la Fondation Li Bai ; Mme Cai Jiaming, directrice générale de la Fondation Li Bai ; ainsi que M. Cai Rongxing, membre hongkongais du Comité national de la Conférence consultative politique du peuple chinois et titulaire de l'étoile de Bauhinia de bronze. M. Cai Rongxing sert depuis longtemps la société hongkongaise et s'engage dans l'intérêt culturel public ; sa présence à la signature manifeste pleinement l'attention profonde et le soutien déterminé des divers milieux de Hong Kong à la diffusion internationale de l'excellente culture traditionnelle chinoise."
    ),
    imageBlock(
      "img3",
      LI_BAI_PHOTO_PORTRAIT,
      "Mme Cai Jiaming, directrice générale de la Fondation Li Bai, signe l'accord de coopération",
      "portrait"
    ),
    block(
      "p4",
      "Les deux parties ont indiqué qu'elles prendraient cette signature pour point de départ, dans un esprit d'ouverture, d'inclusivité et d'apprentissage mutuel, pour approfondir la recherche universitaire, l'éducation du public et la diffusion numérique, afin que la poésie et la calligraphie chinoises continuent de rayonner dans le dialogue des civilisations."
    ),
    sourceBlock("p5", "Reportage : ", "CCTV", LI_BAI_SOURCE_URL),
    sourceBlock("p6", "", "Jingbao", LI_BAI_MIRROR_URL)
  ]
};

export const fallbackNews: Record<Locale, Array<(typeof conceptNoteEn | typeof conceptNoteZh | typeof conceptNoteFr | typeof liBaiEn | typeof liBaiZh | typeof liBaiFr)>> = {
  en: [liBaiEn, conceptNoteEn],
  zh: [liBaiZh, conceptNoteZh],
  fr: [liBaiFr, conceptNoteFr]
};
