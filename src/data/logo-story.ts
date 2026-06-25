import type { Locale } from "@data/site";

export type LogoStoryStepId =
  | "dance-literature"
  | "penmanship"
  | "architecture"
  | "music"
  | "culinary-culture"
  | "ritual-arts"
  | "opera";

export type LogoStoryStep = {
  id: LogoStoryStepId;
  title: string;
  subtitle: string;
  text: string;
};

export type LogoStoryContent = {
  sectionTitle: string;
  sectionSubtitle: string;
  steps: LogoStoryStep[];
};

const logoStoryEn: LogoStoryContent = {
  sectionTitle: "A Symbol of Living Traditions",
  sectionSubtitle:
    "The Foundation emblem brings together music, architecture, literature, calligraphy, culinary culture, performing arts, and ritual arts — a shared circle of civilizational wisdom formed through inheritance, exchange, and mutual learning.",
  steps: [
    {
      id: "dance-literature",
      title: "Literature & Classics",
      subtitle: "Memory, meaning, and moral imagination across generations.",
      text: "Literature and classics are vital carriers of civilizational memory, gathering a people’s deepest reflections on heaven and earth, human life, ethics, and social order. Classics do not belong only to the past; through interpretation and transmission across generations, they continue to inspire understanding of human dignity, moral cultivation, and the values of life together. Through literature and classics, traditional culture crosses eras to nourish the spirit, enlighten education, and foster intercultural dialogue.",
    },
    {
      id: "penmanship",
      title: "Performing Arts",
      subtitle: "Culture renewed through presence, rhythm, and shared witness.",
      text: "Performing arts present human emotion, community memory, and cultural identity through the body, voice, rhythm, narrative, and forms of the stage. They allow tradition to live not only in texts and objects, but in the immediacy of watching, listening, and participating. From dance and theatre to diverse folk performances, performing arts carry shared pursuits of beauty, order, feeling, and the spiritual world, and remain a vital way for traditional culture to renew itself in contemporary society.",
    },
    {
      id: "architecture",
      title: "Architecture & Spatial Culture",
      subtitle: "Cultural memory shaped in space and dwelling.",
      text: "Architecture and spatial culture reflect how human beings understand dwelling, order, nature, ritual, and life in community. Architecture is not merely physical structure, but the spatial expression of cultural thought: it records the relationship between people and heaven and earth, the organization of society, and a civilization’s pursuit of beauty, proportion, and harmony. Through architecture and spatial culture, traditional wisdom continues in concrete environments of daily life, forming an important bridge between historical memory and contemporary living.",
    },
    {
      id: "music",
      title: "Music & Harmony",
      subtitle: "Resonance that crosses languages and borders.",
      text: "Music and harmony are cultural expressions that transcend linguistic boundaries. Rhythm, melody, and shared resonance can awaken common human feeling and allow cultures to meet in listening. Traditional music preserves local memory and aesthetic forms while embodying pursuits of harmony, order, and inner balance. It reminds us that cultural exchange depends not only on language, but can unfold through the resonance of sound and spirit.",
    },
    {
      id: "culinary-culture",
      title: "Culinary Culture",
      subtitle: "The wisdom of nourishment, hospitality, and shared life.",
      text: "Culinary culture embodies deep wisdom in everyday life, connecting land, season, family, community, and custom. Food nourishes the body and carries the ethics of hospitality, restraint, gratitude, and bonds within community. The culinary traditions of different civilizations show how people and nature depend on one another, and how culture is practiced, transmitted, and shared in daily life. Through food, culture becomes tangible, approachable wisdom that can be lived and renewed.",
    },
    {
      id: "ritual-arts",
      title: "Ritual Arts",
      subtitle: "Reverence, belonging, and shared meaning in practice.",
      text: "Ritual arts are important forms through which traditional culture expresses respect, order, belonging, and shared meaning. Whether in ceremonies, festivals, symbolic gestures, or communal customs, they embody reverence for life, nature, ancestors, community, and the sense of the sacred. Ritual arts remind us that culture is not heritage to be viewed alone, but a living tradition continually practiced in action, relationship, and collective memory.",
    },
    {
      id: "opera",
      title: "Traditional Opera",
      subtitle: "Story, ethics, and beauty on the living stage.",
      text: "Traditional opera integrates literature, music, performance, costume, movement, and stage aesthetics into a highly synthesized art form. It conveys ethics through story, beauty through convention, and community memory and spiritual imagination through vocal and physical expression. Opera is not only stage art, but an important form of cultural education, allowing audiences to experience traditional values such as loyalty, benevolence, restraint, compassion, and wisdom through aesthetic experience. As a living art, opera renews itself through transmission and continues to reveal the vitality of traditional culture.",
    },
  ],
};

const logoStoryZh: LogoStoryContent = {
  sectionTitle: "活態傳統的象徵",
  sectionSubtitle:
    "基金會徽識匯聚音樂、建築、文學、書法、飲食文化、表演藝術與禮儀藝術等多元傳統文化形態，寓意人類智慧在傳承、交流與互鑒中凝結為一個共同的文明圓環。",
  steps: [
    {
      id: "dance-literature",
      title: "文學與經典",
      subtitle: "Literature & Classics",
      text: "文學與經典是文明記憶的重要載體，凝聚著一個民族對天地、人生、倫理與社會秩序的深層思考。經典並非僅屬於過去，它們在代代詮釋與傳承之中，持續啟發人們理解人的尊嚴、道德修養與共同生活的價值。透過文學與經典，傳統文化得以跨越時代，成為滋養心靈、啟迪教育與促進文明對話的重要源泉。",
    },
    {
      id: "penmanship",
      title: "表演藝術",
      subtitle: "Performing Arts",
      text: "表演藝術以身體、聲音、節奏、敘事與舞台形式，呈現人類情感、社群記憶與文化身份。它使傳統不僅被保存於文字與器物之中，更在觀看、聆聽與參與的現場中獲得生命。從舞蹈、戲劇到多元民間表演，表演藝術承載著人們對美、秩序、情感與精神世界的共同追求，亦是傳統文化在當代社會中持續更新的重要方式。",
    },
    {
      id: "architecture",
      title: "建築與空間文化",
      subtitle: "Architecture & Spatial Culture",
      text: "建築與空間文化反映人類對居住、秩序、自然、禮制與共同體生活的理解。建築不只是物質結構，也是一種文化思想的空間化呈現：它記錄了人與天地的關係、社會組織的方式，以及一個文明對美感、尺度與和諧的追求。透過建築與空間文化，傳統智慧得以在具體生活環境中延續，成為連接歷史記憶與當代生活的重要橋樑。",
    },
    {
      id: "music",
      title: "音樂與和聲",
      subtitle: "Music & Harmony",
      text: "音樂與和聲是超越語言邊界的文化表達。節奏、旋律與聲音的共鳴，能夠喚起人類共同的情感經驗，使不同文化在聆聽之中相遇。傳統音樂不僅保存了地方記憶與審美形式，也體現了人們對和諧、秩序與內在平衡的追求。它提醒我們，文化交流並不僅依賴語言，也可以通過聲音與心靈的共振而展開。",
    },
    {
      id: "culinary-culture",
      title: "飲食文化",
      subtitle: "Culinary Culture",
      text: "飲食文化體現日常生活中的深層智慧，連接土地、節令、家庭、社群與禮俗。食物不僅是身體的滋養，也承載著待客之道、節制之美、感恩之心與共同體的情感聯結。不同文明的飲食傳統，展現了人與自然相互依存的關係，也呈現了文化如何在日常生活中被實踐、傳承與分享。透過飲食，文化成為可感、可親、可延續的生活智慧。",
    },
    {
      id: "ritual-arts",
      title: "禮儀藝術",
      subtitle: "Ritual Arts",
      text: "禮儀藝術是傳統文化中表達敬意、秩序、歸屬與共同意義的重要形式。無論是儀式、節慶、象徵性動作，還是群體共同參與的禮俗實踐，皆體現了人類對生命、自然、祖先、社群與神聖感的尊重。禮儀藝術提醒我們，文化並不只是被觀看的遺產，更是在人們的行動、關係與共同記憶中被持續實踐的活態傳統。",
    },
    {
      id: "opera",
      title: "戲曲藝術",
      subtitle: "Traditional Opera",
      text: "戲曲藝術融匯文學、音樂、表演、服飾、身段與舞台美學，是傳統文化高度綜合的藝術形態。它以故事傳遞倫理，以程式展現美感，以聲腔與身段保存社群的歷史記憶與精神想像。戲曲不僅是舞台藝術，也是文化教育的重要形式，使觀眾在審美經驗中感受忠孝、仁義、節制、悲憫與智慧等傳統價值。作為活態藝術，戲曲在傳承中不斷更新，持續展現傳統文化的生命力。",
    },
  ],
};

const logoStoryFr: LogoStoryContent = {
  sectionTitle: "Un symbole de traditions vivantes",
  sectionSubtitle:
    "L’emblème de la Fondation rassemble musique, architecture, littérature, calligraphie, culture culinaire, arts du spectacle et arts rituels — un cercle partagé de sagesse civilisationnelle formé par la transmission, l’échange et l’apprentissage mutuel.",
  steps: logoStoryEn.steps.map((step) => ({ ...step })),
};

export const logoStoryByLocale: Record<Locale, LogoStoryContent> = {
  en: logoStoryEn,
  zh: logoStoryZh,
  fr: logoStoryFr,
};

export function getLogoStory(locale: Locale): LogoStoryContent {
  return logoStoryByLocale[locale] ?? logoStoryEn;
}
