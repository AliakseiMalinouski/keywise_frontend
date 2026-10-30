# Keywise frontend

Public full free web app for **[Keywise](https://github.com/AliakseiMalinouski/keywise)** — compare prices for PC game keys in one place instead of jumping between deal sites.

**Live app:** [keywise-frontend.vercel.app](https://keywise-frontend.vercel.app/)

Enter a game name and a store region (EU, US, PL, and others). Keywise pulls offers from several price sources, highlights the cheapest deal, and shows the rest in a table. Optionally paste a Steam profile link or SteamID: the app checks whether the game is on that wishlist and loads Steam review summary and recent reviews next to the prices.

Free to use, no account required. Data comes from the Keywise API ([backend repo](https://github.com/AliakseiMalinouski/keywise)).

## SEO (static)

The UI is a client-rendered SPA; discoverability and link previews rely on a **static layer** in this repo (no SSR): meta tags, sitemap, OG image, and a small styled HTML shell before the app loads.

| Location | Purpose |
| -------- | ------- |
| [`index.html`](index.html) | `title`, meta description, canonical, Open Graph / Twitter, JSON-LD (`WebApplication`), `lang="en"`. Static shell in `#root` for crawlers and first paint. |
| [`public/shell.css`](public/shell.css) | Styles for the HTML shell (`kw-*` classes). Copied to `dist/` on build. |
| [`public/robots.txt`](public/robots.txt) | Crawler rules + sitemap URL. |
| [`public/sitemap.xml`](public/sitemap.xml) | Single entry for the homepage. |
| [`public/og-image.webp`](public/og-image.webp) | Link preview image (1200×630). |

When you change marketing copy, keep **English** strings in sync: `index.html` (meta + shell), [`src/constants/text.ts`](src/constants/text.ts) (UI), and OG/JSON-LD in `index.html`.

## License

[MIT](LICENSE) © Aliaksei Malinouski
