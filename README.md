# Keywise frontend

**[Keywise](https://github.com/AliakseiMalinouski/keywise)** is a free web app for comparing PC game key prices in one search—no account, no hopping between deal sites.

**Live:** [keywise-frontend.vercel.app](https://keywise-frontend.vercel.app/)

Enter a game name and a store region (EU, US, PL, and others). The app queries the [Keywise API](https://github.com/AliakseiMalinouski/keywise) and lists offers from several sources, highlights the cheapest deal, and shows the rest in a table. Paste a Steam profile link or SteamID to see whether the game is on that wishlist, plus Steam review summary and recent reviews beside the prices.

The interface is a client-rendered SPA, but the homepage ships with a static layer so search engines and messengers get a clear English title, description, canonical URL, sitemap, and Open Graph preview (`public/og-image.webp`, 1200×630). A lightweight HTML shell in `index.html` gives crawlers and the first paint something meaningful before JavaScript loads.

## License

[MIT](LICENSE) © Aliaksei Malinouski
