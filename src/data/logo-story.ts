import type { Locale } from "@data/site";

export type LogoStoryStepId =
  | "main-ring"
  | "opera"
  | "dance-literature"
  | "music"
  | "architecture"
  | "culinary-culture"
  | "penmanship"
  | "drum-music"
  | "ritual-arts"
  | "complete";

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
    "Our emblem brings together diverse expressions of traditional culture — music, architecture, literature, calligraphy, culinary culture, performance, and ritual arts — as a shared circle of human wisdom.",
  steps: [
    {
      id: "main-ring",
      title: "Main Circular Emblem",
      subtitle: "Continuity, harmony, and the shared inheritance of humanity.",
      text: "At the heart of the emblem is a circle — a symbol of continuity, harmony, and the shared inheritance of humanity. It represents traditional culture as a living source of wisdom connecting generations and peoples.",
    },
    {
      id: "opera",
      title: "Opera / 戲曲",
      subtitle: "Memory transformed into living performance.",
      text: "Traditional opera preserves stories, emotions, gestures, and moral imagination. It carries the voices of communities across time and transforms memory into living performance.",
    },
    {
      id: "dance-literature",
      title: "Dance & Literature / 舞蹈・文學",
      subtitle: "The movement of the human spirit.",
      text: "Dance and literature express the movement of the human spirit. Through rhythm, language, and narrative, they transmit values, beauty, and cultural identity.",
    },
    {
      id: "music",
      title: "Music / 音樂",
      subtitle: "Harmony beyond borders and languages.",
      text: "Music gives form to harmony. It transcends borders and languages, allowing cultures to meet through sound, resonance, and shared feeling.",
    },
    {
      id: "architecture",
      title: "Unit / Architecture / 建築",
      subtitle: "Cultural memory shaped in space.",
      text: "Architecture reflects the way communities understand space, order, nature, and belonging. It is the material expression of cultural memory.",
    },
    {
      id: "culinary-culture",
      title: "Culinary Culture / 飲食文化",
      subtitle: "The wisdom of daily life, nourishment, and shared harmony.",
      text: "Culinary culture reflects the wisdom of daily life, the relationship between people and nature, and the values of hospitality, balance, and shared community. Through food, culture becomes nourishment for both body and spirit.",
    },
    {
      id: "penmanship",
      title: "Penmanship / 書法",
      subtitle: "The rhythm of discipline, beauty, and inner cultivation.",
      text: "Calligraphy and penmanship unite discipline, beauty, and inner cultivation. Each stroke reflects both cultural heritage and the rhythm of the heart.",
    },
    {
      id: "drum-music",
      title: "Drum Music / 鼓樂",
      subtitle: "Ceremony, community, and collective energy.",
      text: "Drum music evokes ceremony, community, and collective energy. It reminds us that rhythm has long accompanied human gathering, celebration, and remembrance.",
    },
    {
      id: "ritual-arts",
      title: "Ritual Arts / 禮儀藝術",
      subtitle: "The cultural forms of reverence, community, and shared meaning.",
      text: "Ritual arts embody the gestures, symbols, and ceremonies through which communities express reverence, belonging, and shared meaning. They remind us that culture is not only preserved in objects, but lived through practice.",
    },
    {
      id: "complete",
      title: "Complete Emblem",
      subtitle: "A living force for education, dialogue, and peace.",
      text: "Together, these cultural forms express the mission of the Foundation: to preserve, transmit, and renew traditional culture as a living force for education, dialogue, and peace.",
    },
  ],
};

const logoStoryZh: LogoStoryContent = {
  sectionTitle: "活態傳統的象徵",
  sectionSubtitle:
    "基金會徽識匯聚音樂、建築、文學、書法、飲食文化、表演藝術與禮儀藝術等多元傳統文化形態，寓意人類智慧在傳承、交流與互鑒中凝結為一個共同的文明圓環。",
  steps: logoStoryEn.steps.map((step) => ({ ...step })),
};

const logoStoryFr: LogoStoryContent = {
  sectionTitle: "Un symbole de traditions vivantes",
  sectionSubtitle:
    "Notre emblème rassemble diverses expressions de la culture traditionnelle — musique, architecture, littérature, calligraphie, culture culinaire, arts du spectacle et arts rituels — en un cercle partagé de sagesse humaine.",
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
