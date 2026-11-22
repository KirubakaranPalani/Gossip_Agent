# NewsScope

A mobile-first news reader with India and World editions, topic filters, search, saved stories, and article detail pages.

## Run locally

For local development, copy `.env.example` to `.env` to use the backend at `http://localhost:8080`, then run:

```sh
npm install
npm run dev
```

The production fallback is `https://gossip-agent-backend.onrender.com/api/v1/news`. Set `VITE_NEWS_API_URL` to override it. The API must allow the UI's origin through CORS (normally `http://localhost:5173` during local development and `https://localhost` in the Android Capacitor WebView).

## Deploy to Cloudflare Workers

The app is configured with the Cloudflare Vite plugin and Wrangler. Deploy with:

```sh
npm run deploy
```

Cloudflare Workers Builds can use `npm run deploy` as its deploy command. The frontend uses the Render backend URL above unless `VITE_NEWS_API_URL` is set in the Cloudflare build environment.

## Build the Android app with Capacitor

This project is configured with Capacitor 8 and the Android platform. You need Node.js 22+, Android Studio 2025.2.1 or later, an Android SDK (API 24+), and JDK 21. On Linux, make sure `JAVA_HOME` points to JDK 21 before running Gradle.

After cloning the project, install packages and sync the web assets into Android:

```sh
npm install
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
export PATH="$JAVA_HOME/bin:$PATH"
npm run mobile:sync
```

Build an installable debug APK:

```sh
npm run android:apk
```

The APK is created at `android/app/build/outputs/apk/debug/app-debug.apk`. Install it on a connected Android device with:

```sh
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

To open the native project in Android Studio, run `npx cap open android`. For each web UI change, rerun `npm run android:apk` so the new `dist` assets are copied into the app. A debug APK is for development and direct testing; for Play Store distribution, use Android Studio's **Build > Generate Signed App Bundle or APK** flow and keep the signing keystore secure.

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
