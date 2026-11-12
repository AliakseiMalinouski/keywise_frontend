export const STEAM_STORE_URL = 'https://store.steampowered.com/';

export const VIBED_MARKET = {
  href: 'https://www.vibedmarket.com/app/keywise?ref=open-button',
} as const;

export const DATA_SOURCES = [
  {
    name: 'CheapShark',
    href: 'https://www.cheapshark.com/',
  },
  {
    name: 'GG.deals',
    href: 'https://gg.deals/',
  },
  {
    name: 'IsThereAnyDeal',
    href: 'https://isthereanydeal.com/',
  },
  {
    name: 'Steam',
    href: STEAM_STORE_URL,
  },
] as const;
