# Keywise frontend

React UI for comparing digital game prices. It calls the [Keywise](https://github.com/AliakseiMalinouski/keywise) Backend API:

```
GET /search?q=<game>&region=<code>
```

The form stays on screen. After a search it shows a loading spinner, an error, the best offer, and a table of the rest.

## Setup

Requires Yarn 4.18.0 (pinned in the repo).

```bash
yarn install
```

Copy `.env.example` to `.env` and set the API origin:

```bash
KEYWISE_API_PATH=https://keywise-virid.vercel.app/
```

`KEYWISE_API_PATH` is public. A trailing slash is optional.

## Run

```bash
yarn dev
```

The app is at <http://localhost:8080>.

```bash
yarn build
yarn preview
```

## SEO (static)

The app is a client-rendered SPA; SEO is handled with a small **static layer** (no SSR). Production URL: `https://keywise-frontend.vercel.app/`.

| Location | Purpose |
| -------- | ------- |
| [`index.html`](index.html) | `title`, meta description, canonical, Open Graph / Twitter, JSON-LD (`WebApplication`), `lang="en"`. Static shell in `#root` (search UI outline for crawlers and first paint). |
| [`public/shell.css`](public/shell.css) | Styles for the HTML shell (`kw-*` classes). Copied to `dist/` on build. |
| [`public/robots.txt`](public/robots.txt) | Crawler rules + sitemap URL. |
| [`public/sitemap.xml`](public/sitemap.xml) | Single entry for the homepage. |
| [`public/og-image.webp`](public/og-image.webp) | Link preview image (1200×630). |

After deploy, submit the sitemap in [Google Search Console](https://search.google.com/search-console) and check link previews (OG) if you share the URL.

When you change marketing copy, keep **English** strings in sync: `index.html` (meta + shell), [`src/constants/text.ts`](src/constants/text.ts) (UI), and OG/JSON-LD in `index.html`.

## Search

- **Game** is required.
- **Region** is a select. Default is `pl`.
- Known regions: `au`, `be`, `br`, `ca`, `ch`, `de`, `dk`, `es`, `eu`, `fi`, `fr`, `gb`, `ie`, `it`, `nl`, `no`, `pl`, `se`, `us`.

A successful response is `{ result, best }`. `result` is one block per source (CheapShark, GG.deals, IsThereAnyDeal). `best` is the cheapest offer in the region currency, or `null`.
