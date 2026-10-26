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
  arabic: 'Арабский',
  brazilian: 'Бразильский португальский',
  bulgarian: 'Болгарский',
  czech: 'Чешский',
  danish: 'Датский',
  dutch: 'Нидерландский',
  english: 'Английский',
  finnish: 'Финский',
  french: 'Французский',
  german: 'Немецкий',
  greek: 'Греческий',
  hungarian: 'Венгерский',
  indonesian: 'Индонезийский',
  italian: 'Итальянский',
  japanese: 'Японский',
  koreana: 'Корейский',
  latam: 'Испанский (Лат. Ам.)',
  norwegian: 'Норвежский',
  polish: 'Польский',
  portuguese: 'Португальский',
  romanian: 'Румынский',
  russian: 'Русский',
  schinese: 'Китайский (упр.)',
  spanish: 'Испанский',
  swedish: 'Шведский',
  tchinese: 'Китайский (трад.)',
  thai: 'Тайский',
  turkish: 'Турецкий',
  ukrainian: 'Украинский',
  vietnamese: 'Вьетнамский',
};

export const REVIEW_LANGUAGE_OPTIONS: readonly ReviewLanguageOption[] = [
  { value: 'all', label: 'Все языки' },
  ...STEAM_REVIEW_LANGUAGE_CODES.map((code) => ({
    value: code,
    label: LANGUAGE_LABELS[code],
  })),
];
