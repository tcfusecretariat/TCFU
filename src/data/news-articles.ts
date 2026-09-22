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

const conceptNoteBody = [
  block(
    "p1",
    "The International Conference on Peace: Igniting the Vital Spark of the Heart through Education of Traditional Culture for Youth is conceived as a continuation of the 2025 International Peace Conference on Education for Well-Being. It seeks to explore how traditional culture education can nurture the inner growth, emotional balance, ethical awareness and spiritual resilience of young people in a rapidly changing world."
  ),
  {
    _type: "block" as const,
    _key: "p2",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span" as const,
        _key: "p2a",
        marks: [],
        text: "The theme “Ignite the Vital Spark of the Heart” echoes the philosophical insight of Henri Bergson, whose idea of "
      },
      {
        _type: "span" as const,
        _key: "p2b",
        marks: ["em"],
        text: "élan vital"
      },
      {
        _type: "span" as const,
        _key: "p2c",
        marks: [],
        text: " points to the creative impulse of life, the inner vitality through which human beings grow, renew themselves and participate in the unfolding of life. In this spirit, the conference understands education not merely as the transmission of knowledge, but as the awakening of the living force within each young person: the capacity to think, to feel, to create, to care and to act responsibly."
      }
    ]
  },
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
];

const conceptNoteArticle = {
  title:
    "International Conference on Peace:\nIgniting the Vital Spark of the Heart\nthrough Education of Traditional Culture for Youth",
  slug: CONCEPT_NOTE_SLUG,
  category: "Conference",
  publishDate: "2026-09-22T00:00:00.000Z",
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
  body: conceptNoteBody,
  pdfUrl: CONCEPT_NOTE_PDF,
  pdfSize: CONCEPT_NOTE_PDF_SIZE,
  pdfLabel: "Concept Note (PDF)",
  seoTitle: "International Conference on Peace 2026 – Concept Note",
  seoDescription:
    "Concept Note for the International Conference on Peace: Igniting the Vital Spark of the Heart through Education of Traditional Culture for Youth. 1–2 October 2026, UNESCO Headquarters, Paris."
};

export const fallbackNews: Record<Locale, typeof conceptNoteArticle[]> = {
  en: [conceptNoteArticle],
  zh: [],
  fr: []
};
