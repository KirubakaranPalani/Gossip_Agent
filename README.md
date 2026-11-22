# Gossip Agent

A mobile-first news reader with India and World editions, topic filters, search, saved stories, and article detail pages.

## Run locally

Start the news API at `http://localhost:8080`, then run the UI:

```sh
npm install
npm run dev
```

The UI uses `http://localhost:8080/api/v1/news` by default. Set `VITE_NEWS_API_URL` to change the endpoint. The API must allow the UI's origin through CORS (normally `http://localhost:5173` during local development).

## News feed API

The client in `src/services/news-api.ts` requests the following endpoint for each page:

```http
GET /api/v1/news?region=india&category=all&page=0&limit=20
```

It sends `region=india|world`, `category=all|politics|business|technology|science|sports|culture`, and a zero-based `page`. When searching, it also sends `q`. The API should return stories newest first and set `hasMore` to `false` on the final page.

```json
{
  "articles": [
    {
      "id": "story-123",
      "region": "india",
      "category": "politics",
      "title": "Example headline",
      "summary": "A short summary of the story.",
      "highlights": ["First key point", "Second key point"],
      "source": "Publisher name",
      "publishedAt": "2026-11-22T08:30:00.000Z",
      "url": "https://publisher.example/news/story-123",
      "imageUrl": "https://publisher.example/images/story-123.jpg"
    }
  ],
  "page": 0,
  "hasMore": true,
  "updatedAt": "2026-11-22T08:45:00.000Z"
}
```

`imageUrl` is optional. `publishedAt` and `updatedAt` should be ISO 8601 timestamps. The article response includes the summary and highlights used by the detail screen. Saved stories remain in browser local storage; they are not sent to the API.
