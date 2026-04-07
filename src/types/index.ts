// ─────────────────────────────────────────────────────────────────────────────
// Fisiatría UCN — Domain Types
// These types define the data contracts for the application.
// In Fase 6 each type maps 1:1 to a Prisma model.
// ─────────────────────────────────────────────────────────────────────────────

export type JournalSource = "AJPM&R" | "Minerva Medica" | "The Lancet Oncology" | "NEJM Archive";

export type SourceVariant = "primary" | "secondary";

/** Maps a JournalSource to its visual variant for color theming */
export const SOURCE_VARIANT: Record<JournalSource, SourceVariant> = {
  "AJPM&R":              "primary",
  "Minerva Medica":      "secondary",
  "The Lancet Oncology": "secondary",
  "NEJM Archive":        "secondary",
};

// ─── Abstract / Article ──────────────────────────────────────────────────────

export type Abstract = {
  id: string;
  title: string;
  authors: string[];
  /** ISO date string: "2024-10-14" */
  publishedAt: string;
  /** Formatted display date: "14 de Octubre, 2024" */
  publishedAtLabel: string;
  /** Short label for list views: "OCT 2024" */
  publishedAtShort: string;
  doi: string;
  journal: JournalSource;
  excerpt: string;
  /** Full abstract paragraphs */
  body: string[];
  keywords: string[];
  tags: string[];
  imageUrl: string;
  imageAlt: string;
  /** Whether the article has been peer-reviewed */
  peerReviewed: boolean;
  openAccess: boolean;
  featured: boolean;
  href: string;
};

// ─── User / Profile ──────────────────────────────────────────────────────────

export type UserProfile = {
  id: string;
  fullName: string;
  email: string;
  institution: string;
  role: string;
  avatarUrl?: string;
  specialties: SpecialtyInterest[];
  preferences: UserPreferences;
};

export type SpecialtyInterest = {
  label: string;
  active: boolean;
};

export type UserPreferences = {
  notificationsNewAbstracts: boolean;
  weeklyEmailDigest: boolean;
};

// ─── Seminar / Event ─────────────────────────────────────────────────────────

export type Seminar = {
  id: string;
  title: string;
  /** ISO date string */
  date: string;
  /** Display date: "25 Oct, 2023" */
  dateLabel: string;
  /** Time string: "11:30 AM" */
  time: string;
  speakerName: string;
  speakerAvatarUrl?: string;
  sourceTags: JournalSource[];
  featured: boolean;
  imageUrl: string;
  imageAlt: string;
  streamingUrl?: string;
  href: string;
  /** Calendar display: month abbrev */
  month: string;
  /** Calendar display: day number */
  day: number;
  /** Calendar display: weekday name */
  weekday: string;
};

// ─── Saved Items ─────────────────────────────────────────────────────────────

export type SavedAbstract = {
  savedAt: string;
  abstract: Abstract;
};

export type SavedSeminar = {
  savedAt: string;
  seminar: Seminar;
};

// ─── Search / Filter ─────────────────────────────────────────────────────────

export type SearchFilters = {
  keywords: string;
  journals: JournalSource[];
  dateFrom: string;
  dateTo: string;
};

export const DEFAULT_SEARCH_FILTERS: SearchFilters = {
  keywords: "",
  journals: ["AJPM&R", "Minerva Medica"],
  dateFrom: "2019-01-01",
  dateTo: new Date().toISOString().slice(0, 10),
};
