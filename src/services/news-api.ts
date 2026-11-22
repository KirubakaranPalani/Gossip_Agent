import type { AppLanguage } from "../i18n";

export type NewsRegion = "india" | "world";
export type NewsCategory = "all" | "politics" | "business" | "technology" | "science" | "sports" | "culture";
export type StoryCategory = Exclude<NewsCategory, "all">;

export type NewsArticle = {
  id: string;
  region: NewsRegion;
  category: StoryCategory;
  title: string;
  summary: string;
  highlights: string[];
  source: string;
  publishedAt: string;
  url: string;
  imageUrl?: string;
  author?: string;
  sourceCountry?: string;
  language?: string;
  provider?: string;
};

export type NewsPage = {
  articles: NewsArticle[];
  page: number;
  hasMore: boolean;
  updatedAt: string;
};

const NEWS_API_URL = import.meta.env.VITE_NEWS_API_URL || "https://gossip-agent-backend.onrender.com/api/v1/news";
const PAGE_SIZE = 20;
const CATEGORIES: readonly string[] = ["politics", "business", "technology", "science", "sports", "culture"];

function readErrorMessage(payload: unknown): string | null {
  if (typeof payload !== "object" || payload === null) return null;
  const body = payload as Record<string, unknown>;
  if (typeof body.message === "string") return body.message;
  if (typeof body.detail === "string") return body.detail;
  if (typeof body.error === "string") return body.error;
  if (typeof body.error === "object" && body.error !== null) {
    const nestedMessage = (body.error as Record<string, unknown>).message;
    if (typeof nestedMessage === "string") return nestedMessage;
  }
  return null;
}

function isNewsArticle(value: unknown): value is NewsArticle {
  if (typeof value !== "object" || value === null) return false;
  const article = value as Record<string, unknown>;
  return typeof article.id === "string"
    && (article.region === "india" || article.region === "world")
    && typeof article.category === "string"
    && CATEGORIES.includes(article.category)
    && typeof article.title === "string"
    && typeof article.summary === "string"
    && Array.isArray(article.highlights)
    && article.highlights.every((highlight) => typeof highlight === "string")
    && typeof article.source === "string"
    && typeof article.publishedAt === "string"
    && typeof article.url === "string"
    && (article.imageUrl === undefined || typeof article.imageUrl === "string");
}

export async function getNewsPage(
  region: NewsRegion,
  category: NewsCategory,
  page: number,
  query = "",
  language: AppLanguage = "en",
): Promise<NewsPage> {
  const params = new URLSearchParams({ region, category, page: String(page), limit: String(PAGE_SIZE), language });
  const normalizedQuery = query.trim();
  if (normalizedQuery) params.set("q", normalizedQuery);

  const response = await fetch(`${NEWS_API_URL}?${params.toString()}`, {
    headers: { accept: "application/json" },
    cache: "no-store",
  });
  if (!response.ok) {
    const errorPayload: unknown = await response.json().catch(() => null);
    throw new Error(readErrorMessage(errorPayload) ?? `The live news feed could not be loaded (${response.status}).`);
  }

  const payload: unknown = await response.json();
  if (typeof payload !== "object" || payload === null) throw new Error("The news API returned an invalid response.");
  const feed = payload as Record<string, unknown>;
  if (!Array.isArray(feed.articles)
      || !feed.articles.every(isNewsArticle)
      || typeof feed.page !== "number"
      || typeof feed.hasMore !== "boolean"
      || typeof feed.updatedAt !== "string") {
    throw new Error("The news API returned an invalid response.");
  }
  return feed as NewsPage;
}
