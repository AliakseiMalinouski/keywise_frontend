# Keywise frontend

React UI for comparing digital game prices. It calls the Keywise Backend API:

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

## Search

- **Game** is required.
- **Region** is a select. Default is `pl`.
- Known regions: `au`, `be`, `br`, `ca`, `ch`, `de`, `dk`, `es`, `eu`, `fi`, `fr`, `gb`, `ie`, `it`, `nl`, `no`, `pl`, `se`, `us`.

A successful response is `{ result, best }`. `result` is one block per source (CheapShark, GG.deals, IsThereAnyDeal). `best` is the cheapest offer in the region currency, or `null`.
