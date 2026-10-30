export const STEAM_REVIEW_LANGUAGE_CODES = [
  'arabic',
  'brazilian',
  'bulgarian',
  'czech',
  'danish',
  'dutch',
  'english',
  'finnish',
  'french',
  'german',
  'greek',
  'hungarian',
  'indonesian',
  'italian',
  'japanese',
  'koreana',
  'latam',
  'norwegian',
  'polish',
  'portuguese',
  'romanian',
  'russian',
  'schinese',
  'spanish',
  'swedish',
  'tchinese',
  'thai',
  'turkish',
  'ukrainian',
  'vietnamese',
] as const;

export type SteamReviewLanguageCode = (typeof STEAM_REVIEW_LANGUAGE_CODES)[number];

export type ReviewLang = 'all' | SteamReviewLanguageCode;

export const DEFAULT_REVIEW_LANG: ReviewLang = 'all';

type ReviewLanguageOption = {
  value: ReviewLang;
  label: string;
};

const LANGUAGE_LABELS: Record<SteamReviewLanguageCode, string> = {
  arabic: 'Arabic',
  brazilian: 'Brazilian Portuguese',
  bulgarian: 'Bulgarian',
  czech: 'Czech',
  danish: 'Danish',
  dutch: 'Dutch',
  english: 'English',
  finnish: 'Finnish',
  french: 'French',
  german: 'German',
  greek: 'Greek',
  hungarian: 'Hungarian',
  indonesian: 'Indonesian',
  italian: 'Italian',
  japanese: 'Japanese',
  koreana: 'Korean',
  latam: 'Spanish (Latin America)',
  norwegian: 'Norwegian',
  polish: 'Polish',
  portuguese: 'Portuguese',
  romanian: 'Romanian',
  russian: 'Russian',
  schinese: 'Chinese (Simplified)',
  spanish: 'Spanish',
  swedish: 'Swedish',
  tchinese: 'Chinese (Traditional)',
  thai: 'Thai',
  turkish: 'Turkish',
  ukrainian: 'Ukrainian',
  vietnamese: 'Vietnamese',
};

export const REVIEW_LANGUAGE_OPTIONS: readonly ReviewLanguageOption[] = [
  { value: 'all', label: 'All languages' },
  ...STEAM_REVIEW_LANGUAGE_CODES.map((code) => ({
    value: code,
    label: LANGUAGE_LABELS[code],
  })),
];
