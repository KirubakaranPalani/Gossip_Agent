import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { NewsArticle, NewsCategory, NewsRegion } from "./services/news-api";
import { getNewsPage } from "./services/news-api";
import { categoryName, formatDate, formatShortDate, formatTimeAgo, translate, type AppLanguage } from "./i18n";

type MainTab = NewsRegion | "saved";
const categories: Array<{ label: string; value: NewsCategory }> = [
  { label: "savedStories", value: "all" },
  { label: "politics", value: "politics" },
  { label: "business", value: "business" },
  { label: "technology", value: "technology" },
  { label: "science", value: "science" },
  { label: "sports", value: "sports" },
  { label: "culture", value: "culture" },
];

function readSaved(): NewsArticle[] {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem("gossip-agent:saved") ?? "[]");
    return Array.isArray(parsed) ? parsed as NewsArticle[] : [];
  } catch {
    return [];
  }
}

function Icon({ name, size = 18 }: { name: "spark" | "search" | "bookmark" | "arrow" | "globe" | "india" | "clock" | "close" | "external" | "refresh"; size?: number }) {
  const shared = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  const paths: Record<typeof name, ReactNode> = {
    spark: <><path d="m12 3 1.35 5.65L19 10l-5.65 1.35L12 17l-1.35-5.65L5 10l5.65-1.35L12 3Z" /><path d="m19 16 .65 2.35L22 19l-2.35.65L19 22l-.65-2.35L16 19l2.35-.65L19 16Z" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.6" /><path d="m16 16 4.2 4.2" /></>,
    bookmark: <><path d="M6.5 4.5h11v16L12 17l-5.5 3.5v-16Z" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3.5 12h17M12 3c2.4 2.4 3.5 5.4 3.5 9s-1.1 6.6-3.5 9c-2.4-2.4-3.5-5.4-3.5-9S9.6 5.4 12 3Z" /></>,
    india: <><path d="m8 3 7 .3 2.4 3.1-.8 2.4 2.4 3.4-2.7 2.1-.8 5.2-3.1 1.1-1.8-4.3-2.8-2.1-.9-4.1L5 7.4 8 3Z" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.2 2" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    external: <><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" /></>,
    refresh: <><path d="M20 7v5h-5" /><path d="M4 17v-5h5" /><path d="M5.8 9a7 7 0 0 1 11.5-2L20 12M4 12l2.7 5a7 7 0 0 0 11.5-2" /></>,
  };
  return <svg {...shared}>{paths[name]}</svg>;
}

function ArticleCard({ article, index, saved, language, onOpen, onSave }: {
  article: NewsArticle; index: number; saved: boolean; language: AppLanguage; onOpen: (article: NewsArticle) => void; onSave: (article: NewsArticle) => void;
}) {
  return (
    <article className={`article-card ${index === 0 ? "article-card-featured" : ""}`}>
      <button className="article-open" onClick={() => onOpen(article)} aria-label={`${translate(language, "readStory")}: ${article.title}`}>
        {article.imageUrl && <img className="article-image" src={article.imageUrl} alt="" loading="lazy" />}
        <div className="article-meta">
          <span className="category-tag">{categoryName(article.category, language)}</span><span className="meta-separator">·</span>
          <span className="article-source">{article.source}</span><span className="meta-separator">·</span>
          <span>{formatTimeAgo(article.publishedAt, language)}</span>
        </div>
        <h2>{article.title}</h2>
        <p className="article-summary">{article.summary}</p>
        {article.highlights.length > 0 && (
          <div className="highlight-preview"><span className="highlight-label">{translate(language, "quickRead")}</span><p>{article.highlights[0]}</p></div>
        )}
        <span className="read-story">{translate(language, "readStory")} <Icon name="arrow" size={15} /></span>
      </button>
      <button className={`save-button ${saved ? "is-saved" : ""}`} onClick={() => onSave(article)} aria-label={saved ? translate(language, "removeSaved") : translate(language, "saveStory")} aria-pressed={saved}>
        <Icon name="bookmark" size={17} />
      </button>
    </article>
  );
}

function ArticleDetail({ article, onBack, saved, language, onSave }: { article: NewsArticle; onBack: () => void; saved: boolean; language: AppLanguage; onSave: (article: NewsArticle) => void }) {
  return (
    <article className="detail-page">
      <button className="back-button" onClick={onBack}>← <span>{translate(language, "backToStories")}</span></button>
      <div className="detail-meta"><span className="category-tag">{categoryName(article.category, language)}</span><span>{article.source}</span><span>{formatDate(article.publishedAt, language)}</span></div>
      <h1>{article.title}</h1>
      <p className="detail-deck">{article.summary}</p>
      {article.imageUrl && <img className="detail-image" src={article.imageUrl} alt="" />}
      <section className="detail-section"><span className="eyebrow">{translate(language, "whatWeKnow")}</span><h2>{translate(language, "keyPoints")}</h2>
        <ul className="detail-highlights">{article.highlights.map((highlight, index) => <li key={`${index}-${highlight}`}><span className="point-marker">0{index + 1}</span><p>{highlight}</p></li>)}</ul>
      </section>
      <div className="detail-source-box"><div><span className="eyebrow">{translate(language, "fromSource")}</span><strong>{article.source}</strong><p>{translate(language, "sourceDescription")}</p></div>
        <a className="source-button" href={article.url} target="_blank" rel="noreferrer">{translate(language, "readOriginal")} <Icon name="external" size={15} /></a>
      </div>
      <button className={`detail-save ${saved ? "is-saved" : ""}`} onClick={() => onSave(article)}><Icon name="bookmark" size={17} />{saved ? translate(language, "savedToList") : translate(language, "saveThisStory")}</button>
    </article>
  );
}

function App() {
  const [language, setLanguage] = useState<AppLanguage>(() => {
    try { return window.localStorage.getItem("gossip-agent:language") === "ta" ? "ta" : "en"; }
    catch { return "en"; }
  });
  const [tab, setTab] = useState<MainTab>("india");
  useEffect(() => {
    try { window.localStorage.setItem("gossip-agent:language", language); } catch { /* Storage may be unavailable. */ }
  }, [language]);

  const [category, setCategory] = useState<NewsCategory>("all");
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPending, setSearchPending] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [savedArticles, setSavedArticles] = useState<NewsArticle[]>(readSaved);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const sentinel = useRef<HTMLDivElement | null>(null);
  const requestGeneration = useRef(0);
  const region: NewsRegion = tab === "world" ? "world" : "india";
  const savedIds = useMemo(() => new Set(savedArticles.map((article) => article.id)), [savedArticles]);
  const visibleArticles = useMemo(() => {
    if (tab !== "saved") return searchPending ? [] : articles;
    const normalized = search.trim().toLocaleLowerCase();
    return normalized.length === 0 ? savedArticles : savedArticles.filter((article) => `${article.title} ${article.source} ${article.summary}`.toLocaleLowerCase().includes(normalized));
  }, [articles, savedArticles, search, searchPending, tab]);

  useEffect(() => {
    const normalized = search.trim();
    if (normalized === searchQuery) {
      setSearchPending(false);
      return;
    }
    setSearchPending(true);
    const timeout = window.setTimeout(() => {
      setSearchQuery(normalized);
      setSearchPending(false);
    }, 500);
    return () => window.clearTimeout(timeout);
  }, [search, searchQuery]);

  const loadPage = useCallback(async (nextPage: number, replace = false) => {
    const generation = requestGeneration.current;
    setLoading(true);
    setError("");
    try {
      const response = await getNewsPage(region, category, nextPage, searchQuery, language);
      if (requestGeneration.current !== generation) return;
      setArticles((current) => replace ? response.articles : [...current, ...response.articles.filter((item) => !current.some((existing) => existing.id === item.id))]);
      setPage(response.page);
      setHasMore(response.hasMore);
    } catch (loadError) {
      if (requestGeneration.current === generation) setError(loadError instanceof Error ? loadError.message : "Could not load stories right now.");
    } finally {
      if (requestGeneration.current === generation) setLoading(false);
    }
  }, [category, language, region, searchQuery]);

  useEffect(() => {
    if (tab === "saved") return;
    requestGeneration.current += 1;
    setArticles([]);
    setPage(0);
    setHasMore(true);
    void loadPage(0, true);
  }, [loadPage, tab]);

  useEffect(() => {
    try { window.localStorage.setItem("gossip-agent:saved", JSON.stringify(savedArticles)); } catch { /* Storage may be unavailable. */ }
  }, [savedArticles]);

  useEffect(() => {
    if (tab === "saved" || !hasMore || loading || searchPending || error || selectedArticle) return;
    const element = sentinel.current;
    if (!element) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) void loadPage(page + 1);
    }, { rootMargin: "520px 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, [error, hasMore, loadPage, loading, page, searchPending, selectedArticle, tab]);

  function changeTab(next: MainTab) {
    setSelectedArticle(null);
    setSearch("");
    setSearchQuery("");
    setSearchPending(false);
    setTab(next);
    if (next === "saved") setSearchOpen(false);
  }

  function toggleSaved(article: NewsArticle) {
    setSavedArticles((current) => current.some((saved) => saved.id === article.id)
      ? current.filter((saved) => saved.id !== article.id)
      : [article, ...current]);
  }

  function openArticle(article: NewsArticle) {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleLanguage() {
    const nextLanguage: AppLanguage = language === "en" ? "ta" : "en";
    const openArticleAtSwitch = selectedArticle;
    setLanguage(nextLanguage);
    if (!openArticleAtSwitch) return;

    // The feed endpoint can also find the open story by title, so its detail
    // view follows the selected language without requiring a separate detail API.
    void getNewsPage(openArticleAtSwitch.region, "all", 0, openArticleAtSwitch.title, nextLanguage)
      .then((response) => {
        const translatedArticle = response.articles.find((article) => article.id === openArticleAtSwitch.id);
        if (translatedArticle) setSelectedArticle(translatedArticle);
      })
      .catch(() => undefined);
  }

  async function refreshFeed() {
    setRefreshing(true);
    requestGeneration.current += 1;
    setArticles([]);
    setPage(0);
    setHasMore(true);
    await loadPage(0, true);
    setRefreshing(false);
  }

  const title = selectedArticle ? translate(language, "story") : tab === "saved" ? translate(language, "savedStories") : tab === "india" ? translate(language, "indiaTitle") : translate(language, "worldTitle");
  const subtitle = tab === "saved" ? translate(language, "savedSubtitle") : tab === "india" ? translate(language, "indiaSubtitle") : translate(language, "worldSubtitle");

  return (
    <div className="app-shell" lang={language === "ta" ? "ta" : "en"}>
      <header className="topbar"><a className="brand" href="#home" onClick={(event) => { event.preventDefault(); changeTab("india"); }}><span className="brand-mark"><Icon name="spark" size={21} /></span><span className="brand-name">gossip<span>agent</span></span></a>
        <div className="topbar-center"><span className="live-pip" />{translate(language, "liveFeed")}</div>
        <div className="topbar-actions"><span className="date-stamp">{formatShortDate(new Date(), language)}</span>
          <button className={`language-toggle ${language === "ta" ? "active" : ""}`} onClick={toggleLanguage} aria-label={translate(language, language === "en" ? "switchToTamil" : "switchToEnglish")} title={translate(language, language === "en" ? "switchToTamil" : "switchToEnglish")} aria-pressed={language === "ta"}>{translate(language, "languageSwitch")}</button>
          <button className={`icon-action ${searchOpen ? "active" : ""}`} onClick={() => { setSearchOpen((value) => !value); setSearch(""); }} aria-label={translate(language, "searchStories")}><Icon name={searchOpen ? "close" : "search"} size={18} /></button>
          <button className="profile-dot" onClick={() => changeTab("saved")} aria-label={translate(language, "openSaved")}>G</button></div>
      </header>

      <div className="layout">
        <aside className="sidebar"><div className="side-overline">{translate(language, "yourEdition")}</div>
          <nav className="side-nav" aria-label={translate(language, "newsEditions")}>
            <button className={`side-link ${tab === "india" ? "selected" : ""}`} onClick={() => changeTab("india")}><span className="nav-icon"><Icon name="india" size={18} /></span><span>{translate(language, "india")}</span><span className="nav-arrow">→</span></button>
            <button className={`side-link ${tab === "world" ? "selected" : ""}`} onClick={() => changeTab("world")}><span className="nav-icon"><Icon name="globe" size={18} /></span><span>{translate(language, "world")}</span><span className="nav-arrow">→</span></button>
          </nav>
          <div className="side-rule" />
          <div className="side-overline">{translate(language, "yourLibrary")}</div>
          <nav className="side-nav" aria-label={translate(language, "savedStories")}><button className={`side-link ${tab === "saved" ? "selected" : ""}`} onClick={() => changeTab("saved")}><span className="nav-icon"><Icon name="bookmark" size={17} /></span><span>{translate(language, "savedStories")}</span><span className="saved-count">{savedArticles.length}</span></button></nav>
          <div className="sidebar-note"><span className="note-spark"><Icon name="spark" size={16} /></span><strong>{translate(language, "sidebarTitle")}</strong><p>{translate(language, "sidebarBody")}</p></div>
          <div className="sidebar-foot">{translate(language, "sidebarFoot")} <span>✳</span></div>
        </aside>

        <main className="main-content">
          {!selectedArticle ? <>
            <section className="page-heading"><div className="heading-copy"><span className="eyebrow">{tab === "saved" ? translate(language, "readingList") : translate(language, region === "india" ? "indiaEdition" : "worldEdition")}</span><h1>{title}<span className="heading-period">.</span></h1><p>{subtitle}</p></div>
              {tab !== "saved" && <button className={`refresh-button ${refreshing ? "spinning" : ""}`} onClick={() => void refreshFeed()} disabled={loading || searchPending}><Icon name="refresh" size={16} /><span>{translate(language, "refresh")}</span></button>}
            </section>
            {searchOpen && <div className="search-box"><Icon name="search" size={17} /><input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder={translate(language, "searchPlaceholder")} maxLength={500} /><span>{searchPending ? translate(language, "searching") : `${visibleArticles.length} ${translate(language, "loaded")}`}</span></div>}
            {tab !== "saved" && <div className="edition-tabs" role="tablist" aria-label={translate(language, "chooseEdition")}><button role="tab" aria-selected={tab === "india"} className={tab === "india" ? "active" : ""} onClick={() => changeTab("india")}><Icon name="india" size={16} />{translate(language, "india")}</button><button role="tab" aria-selected={tab === "world"} className={tab === "world" ? "active" : ""} onClick={() => changeTab("world")}><Icon name="globe" size={16} />{translate(language, "world")}</button><span className="edition-hint">{translate(language, "freshLook")}</span></div>}
            {tab !== "saved" && <div className="category-scroller"><div className="category-list" role="tablist" aria-label={translate(language, "filterStories")}>{categories.map((item) => <button key={item.value} className={category === item.value ? "chosen" : ""} role="tab" aria-selected={category === item.value} onClick={() => setCategory(item.value)}>{item.value === "all" ? (language === "en" ? "For you" : "உங்களுக்காக") : categoryName(item.label, language)}</button>)}</div></div>}
            <div className="feed-layout"><section className="story-column" aria-label={tab === "saved" ? translate(language, "savedStories") : `${translate(language, region)} news`}>
              {tab !== "saved" && !searchPending && articles.length > 0 && <div className="feed-caption"><span><i /> {translate(language, "updated")} {formatTimeAgo(articles[0].publishedAt, language).toUpperCase()}</span><span>{visibleArticles.length} {category === "all" ? translate(language, "stories") : `${categoryName(category, language)} ${translate(language, "stories")}`}</span></div>}
              {visibleArticles.length > 0 ? <div className="story-list">{visibleArticles.map((article, index) => <ArticleCard key={article.id} article={article} index={index} saved={savedIds.has(article.id)} language={language} onOpen={(item) => void openArticle(item)} onSave={toggleSaved} />)}</div>
                : tab !== "saved" && (loading || searchPending) ? <div className="skeleton-list">{[0, 1, 2].map((item) => <div className="story-skeleton" key={item}><i /><span /><span /><span /></div>)}</div>
                    : tab !== "saved" && error ? <div className="empty-state"><span className="empty-mark">!</span><h2>{translate(language, "missedBeat")}</h2><p>{translate(language, "loadError")}</p><button className="primary-button" onClick={() => void refreshFeed()}>{translate(language, "tryAgain")} <Icon name="arrow" size={15} /></button></div>
                    : <div className="empty-state"><span className="empty-mark"><Icon name={tab === "saved" ? "bookmark" : "search"} size={20} /></span><h2>{tab === "saved" ? translate(language, "nothingSaved") : search ? translate(language, "noMatches") : translate(language, "noCorner")}</h2><p>{tab === "saved" ? translate(language, "savedHint") : search ? translate(language, "searchHint") : translate(language, "topicHint")}</p>{tab === "saved" && <button className="text-button" onClick={() => changeTab("india")}>{translate(language, "exploreLatest")} <Icon name="arrow" size={14} /></button>}</div>}
              {tab !== "saved" && <><div className="feed-sentinel" ref={sentinel} />{loading && articles.length > 0 && <div className="load-indicator"><span className="loader" /> {translate(language, "gatheringMore")}</div>}{!searchPending && !hasMore && articles.length > 0 && <div className="feed-end"><span /> {translate(language, "caughtUp")} <span /></div>}{!searchPending && error && articles.length > 0 && <button className="load-error" onClick={() => void loadPage(page + 1)}>{translate(language, "retryMore")}</button>}</>}
            </section>
            <aside className="right-rail"><div className="rail-card today-card"><span className="rail-icon"><Icon name="spark" size={17} /></span><span className="eyebrow">{translate(language, "betterBriefing")}</span><h3>{translate(language, "stayInKnow")}</h3><p>{translate(language, "railDescription")}</p><div className="rail-rule" /><span className="reading-note"><Icon name="clock" size={14} /> {translate(language, "fewMinutes")}</span></div>
              <div className="rail-card source-card"><div className="source-card-top"><span className="eyebrow">{translate(language, "todaysEdition")}</span><span className="edition-orbit">✳</span></div><strong>{translate(language, region === "india" ? "closerHome" : "widerPerspective")}</strong><p>{translate(language, region === "india" ? "indiaReporting" : "globalReporting")}</p><span className="source-card-footer">{translate(language, region === "india" ? "indiaDesk" : "worldDesk")} <span>·</span> GOSSIP AGENT</span></div>
              <p className="rail-disclaimer">{translate(language, "disclaimer")}</p></aside></div>
          </> : <ArticleDetail article={selectedArticle} onBack={() => setSelectedArticle(null)} saved={savedIds.has(selectedArticle.id)} language={language} onSave={toggleSaved} />}
          <footer className="page-footer"><span>{translate(language, "footerCuriosity")}</span><span>{translate(language, "footerPublisher")}</span></footer>
        </main>
      </div>

      <nav className="mobile-nav" aria-label={translate(language, "mainNavigation")}><button className={tab === "india" ? "active" : ""} onClick={() => changeTab("india")}><Icon name="india" size={19} /><span>{translate(language, "india")}</span></button><button className={tab === "world" ? "active" : ""} onClick={() => changeTab("world")}><Icon name="globe" size={19} /><span>{translate(language, "world")}</span></button><button className={tab === "saved" ? "active" : ""} onClick={() => changeTab("saved")}><Icon name="bookmark" size={18} /><span>{translate(language, "saved")}</span>{savedArticles.length > 0 && <i />}</button></nav>
    </div>
  );
}

export default App;
