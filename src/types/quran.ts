export interface Word {
  id: number;
  position: number;
  text_uthmani: string;
  transliteration: string;
  translation_bn: string;
  translation_en: string;
  root?: string;
  grammar?: string;
}

export interface Ayah {
  surah: number;
  ayah: number;
  transliteration: string;
  translation_bn: string;
  words: Word[];
}

export interface SurahData {
  surah: number;
  ayahs: Ayah[];
}

export interface WordTiming {
  pos: number;
  start: number;
  end: number;
}

export interface AyahTiming {
  ayah: number;
  start: number;
  end: number;
  words: WordTiming[];
}

export interface SurahTimings {
  surah: number;
  timestamps: AyahTiming[];
}

export interface EnglishTranslations {
  [ayah: string]: {
    sahih_international?: string;
    pickthall?: string;
    yusuf_ali?: string;
    shakir?: string;
    muhammad_sarwar?: string;
    mohsin_khan?: string;
    arberry?: string;
  };
}

export interface SurahMeta {
  id: number;
  name_bn: string;
  name_ar: string;
  name_en: string;
  conventional_bn: string;
  conventional_en: string;
  scientific_bn: string;
  scientific_en: string;
  ayah_count?: number;
  revelation_place?: 'makkah' | 'madinah' | string;
}

export interface SurahConsistency {
  surahId: number;
  title_bn: string;
  title_en: string;
  content_bn: string;
  content_en?: string;
}

export interface LexiconEntry {
  id: number;
  root: string;
  transliteration: string;
  meaning_bn: string;
  meaning_en: string;
  scientific_notes_bn?: string;
  occurrences: number;
  derivatives?: string[];
  sample_verses?: { surah: number; ayah: number }[];
}

export interface Article {
  id: string;
  slug: string;
  title_bn: string;
  title_en: string;
  excerpt_bn: string;
  excerpt_en: string;
  content_bn?: string;
  content_en?: string;
  cover_image_url?: string | null;
  published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
  author_id: string;
  category_id?: string;
  category_ids?: string[];
  tags?: string[];
  author?: {
    id: string;
    name_bn: string;
    name_en: string;
    bio_bn: string;
    bio_en: string;
    image_url: string;
  };
  category?: {
    id: string;
    name_bn: string;
    name_en: string;
    slug: string;
    description_bn: string;
    description_en: string;
    sort_order?: number;
    is_restricted?: boolean;
  };
}

export interface Bookmark {
  id: string;
  surah: number;
  ayah: number;
  surahNameBn: string;
  textArabic: string;
  translationBn: string;
  createdAt: number;
  note?: string;
}

export type ThemeMode = 'dark' | 'sepia' | 'slate' | 'light';

export interface UserPreferences {
  themeMode: ThemeMode;
  arabicFontSize: number;
  banglaFontSize: number;
  englishFontSize: number;
  arabicFontFamily: 'Amiri' | 'Scheherazade New' | 'Uthmanic';
  showWordByWord: boolean;
  showTransliteration: boolean;
  showBanglaTranslation: boolean;
  showEnglishTranslation: boolean;
  englishTranslator: 'sahih_international' | 'pickthall' | 'yusuf_ali' | 'shakir';
  showLogicalConsistency: boolean;
  showSurahScientificMeaning: boolean;
  audioReciter: string;
  audioAutoScroll: boolean;
}
