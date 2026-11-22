export type AppLanguage = "en" | "ta";

const messages = {
  en: {
    liveFeed: "LIVE NEWS · PUBLISHER FEEDS",
    languageSwitch: "தமிழ்",
    switchToTamil: "Switch language to Tamil",
    switchToEnglish: "Switch language to English",
    searchStories: "Search stories",
    openSaved: "Open saved stories",
    yourEdition: "YOUR EDITION",
    yourLibrary: "YOUR LIBRARY",
    newsEditions: "News editions",
    savedStories: "Saved stories",
    india: "India",
    world: "World",
    saved: "Saved",
    sidebarTitle: "A little more signal.",
    sidebarBody: "Headlines to keep you in the conversation. No doomscroll required.",
    sidebarFoot: "Made for the curious",
    readingList: "YOUR READING LIST",
    indiaEdition: "THE INDIA EDITION",
    worldEdition: "THE WORLD EDITION",
    story: "The story",
    indiaTitle: "India, in the know",
    worldTitle: "The world, in the know",
    savedSubtitle: "Your little corner of the news.",
    indiaSubtitle: "The stories shaping the day, closer to home.",
    worldSubtitle: "A wider view of the stories moving the world.",
    refresh: "Refresh",
    searchPlaceholder: "Search headlines, sources, topics…",
    searching: "Searching…",
    loaded: "loaded",
    chooseEdition: "Choose news edition",
    freshLook: "A fresh look at what matters",
    filterStories: "Filter stories",
    updated: "UPDATED",
    stories: "stories",
    quickRead: "THE QUICK READ",
    readStory: "Read the story",
    removeSaved: "Remove from saved stories",
    saveStory: "Save story",
    backToStories: "Back to stories",
    whatWeKnow: "WHAT WE KNOW",
    keyPoints: "The key points",
    fromSource: "FROM THE SOURCE",
    sourceDescription: "Gossip Agent brings the headline and available summary together. Read the original report for the full story and context.",
    readOriginal: "Read original",
    savedToList: "Saved to your list",
    saveThisStory: "Save this story",
    missedBeat: "We missed a beat.",
    tryAgain: "Try again",
    nothingSaved: "Nothing saved just yet.",
    noMatches: "No stories match that search.",
    noCorner: "No stories in this corner.",
    savedHint: "Tap the bookmark on any story and it will be waiting here.",
    searchHint: "Try another keyword or clear your search.",
    topicHint: "Try another topic or come back in a little while.",
    exploreLatest: "Explore the latest",
    gatheringMore: "Gathering more stories…",
    caughtUp: "You’re all caught up",
    retryMore: "Couldn’t load more. Tap to retry.",
    betterBriefing: "A BETTER BRIEFING",
    stayInKnow: "Stay in the know, at your pace.",
    railDescription: "Clear headlines, a quick read, then the original source when you want to go deeper.",
    fewMinutes: "A few minutes, well spent",
    todaysEdition: "TODAY’S EDITION",
    closerHome: "Closer to home.",
    widerPerspective: "A wider perspective.",
    indiaReporting: "Reporting from across India, gathered in one place.",
    globalReporting: "Important stories and perspectives from around the globe.",
    indiaDesk: "INDIA DESK",
    worldDesk: "WORLD DESK",
    disclaimer: "Headlines and available excerpts come from publisher feeds. Open the source for the full report.",
    footerCuriosity: "Curiosity looks good on you.",
    footerPublisher: "Publisher headlines · Gossip Agent",
    mainNavigation: "Main navigation",
    justNow: "Just now",
    loadError: "Could not load stories right now.",
    politics: "Politics",
    business: "Business",
    technology: "Technology",
    science: "Science",
    sports: "Sports",
    culture: "Culture",
  },
  ta: {
    liveFeed: "நேரலை செய்திகள் · பதிப்பாளர் ஊட்டங்கள்",
    languageSwitch: "English",
    switchToTamil: "மொழியைத் தமிழுக்கு மாற்று",
    switchToEnglish: "மொழியை ஆங்கிலத்திற்கு மாற்று",
    searchStories: "செய்திகளைத் தேடு",
    openSaved: "சேமித்த செய்திகளைத் திற",
    yourEdition: "உங்கள் பதிப்பு",
    yourLibrary: "உங்கள் சேமிப்பகம்",
    newsEditions: "செய்திப் பதிப்புகள்",
    savedStories: "சேமித்த செய்திகள்",
    india: "இந்தியா",
    world: "உலகம்",
    saved: "சேமித்தவை",
    sidebarTitle: "தெளிவான செய்திகள், எளிமையாக.",
    sidebarBody: "உரையாடலில் பங்கேற்க உதவும் தலைப்புச் செய்திகள். முடிவில்லா ஸ்க்ரோலிங் வேண்டாம்.",
    sidebarFoot: "ஆர்வமுள்ளவர்களுக்காக",
    readingList: "உங்கள் வாசிப்புப் பட்டியல்",
    indiaEdition: "இந்தியப் பதிப்பு",
    worldEdition: "உலகப் பதிப்பு",
    story: "செய்தி",
    indiaTitle: "இந்தியச் செய்திகள்",
    worldTitle: "உலகச் செய்திகள்",
    savedSubtitle: "நீங்கள் சேமித்த செய்திகளின் தொகுப்பு.",
    indiaSubtitle: "நாட்டைச் சுற்றி இன்றைய நாளை வடிவமைக்கும் செய்திகள்.",
    worldSubtitle: "உலகை மாற்றும் செய்திகளைப் பற்றிய விரிவான பார்வை.",
    refresh: "புதுப்பி",
    searchPlaceholder: "தலைப்புகள், ஊடகங்கள், தலைப்புகளைத் தேடு…",
    searching: "தேடுகிறது…",
    loaded: "செய்திகள் ஏற்றப்பட்டன",
    chooseEdition: "செய்திப் பதிப்பைத் தேர்வு செய்",
    freshLook: "முக்கியமானவற்றின் புதிய பார்வை",
    filterStories: "செய்திகளை வடிகட்டு",
    updated: "புதுப்பிக்கப்பட்டது",
    stories: "செய்திகள்",
    quickRead: "சுருக்கமாக",
    readStory: "செய்தியைப் படி",
    removeSaved: "சேமித்த செய்திகளிலிருந்து நீக்கு",
    saveStory: "செய்தியைச் சேமி",
    backToStories: "செய்திகளுக்குத் திரும்பு",
    whatWeKnow: "தெரிந்த தகவல்கள்",
    keyPoints: "முக்கிய அம்சங்கள்",
    fromSource: "மூலச் செய்தி",
    sourceDescription: "தலைப்பையும் கிடைக்கும் சுருக்கத்தையும் Gossip Agent ஒரே இடத்தில் வழங்குகிறது. முழுச் செய்தியையும் பின்னணியையும் அறிய மூல அறிக்கையைப் படிக்கவும்.",
    readOriginal: "மூலச் செய்தியைப் படி",
    savedToList: "உங்கள் பட்டியலில் சேமிக்கப்பட்டது",
    saveThisStory: "இந்தச் செய்தியைச் சேமி",
    missedBeat: "செய்திகளை ஏற்ற முடியவில்லை.",
    tryAgain: "மீண்டும் முயற்சி",
    nothingSaved: "இன்னும் செய்திகள் சேமிக்கப்படவில்லை.",
    noMatches: "இந்தத் தேடலுக்குப் பொருத்தமான செய்திகள் இல்லை.",
    noCorner: "இந்தப் பகுதியில் செய்திகள் இல்லை.",
    savedHint: "எந்தச் செய்தியிலும் உள்ள புத்தகக்குறியைத் தொட்டால், அது இங்கே சேமிக்கப்படும்.",
    searchHint: "வேறு சொல்லை முயற்சிக்கவும் அல்லது தேடலை அழிக்கவும்.",
    topicHint: "வேறு தலைப்பை முயற்சிக்கவும் அல்லது சிறிது நேரம் கழித்து வாருங்கள்.",
    exploreLatest: "சமீபத்திய செய்திகளைப் பார்",
    gatheringMore: "மேலும் செய்திகள் ஏற்றப்படுகின்றன…",
    caughtUp: "அனைத்துச் செய்திகளையும் பார்த்துவிட்டீர்கள்",
    retryMore: "மேலும் செய்திகளை ஏற்ற முடியவில்லை. மீண்டும் முயற்சிக்கத் தொடவும்.",
    betterBriefing: "சிறந்த செய்தித் தொகுப்பு",
    stayInKnow: "உங்கள் வேகத்தில் செய்திகளை அறிந்துகொள்ளுங்கள்.",
    railDescription: "தெளிவான தலைப்புகள், விரைவான வாசிப்பு; மேலும் அறிய விரும்பினால் மூலச் செய்தி.",
    fewMinutes: "சில நிமிடங்கள் பயனுள்ள வாசிப்பு",
    todaysEdition: "இன்றைய பதிப்பு",
    closerHome: "நமக்கு அருகிலுள்ள செய்திகள்.",
    widerPerspective: "விரிவான உலகப் பார்வை.",
    indiaReporting: "இந்தியா முழுவதிலுமிருந்து வரும் செய்திகள் ஒரே இடத்தில்.",
    globalReporting: "உலகம் முழுவதிலுமிருந்து முக்கியச் செய்திகள் மற்றும் பார்வைகள்.",
    indiaDesk: "இந்தியச் செய்திகள்",
    worldDesk: "உலகச் செய்திகள்",
    disclaimer: "தலைப்புகளும் கிடைக்கும் பகுதிகளும் பதிப்பாளர் ஊட்டங்களிலிருந்து பெறப்படுகின்றன. முழுச் செய்திக்கு மூல இணைப்பைத் திறக்கவும்.",
    footerCuriosity: "உங்கள் ஆர்வம் அழகாக இருக்கிறது.",
    footerPublisher: "பதிப்பாளர் தலைப்புச் செய்திகள் · Gossip Agent",
    mainNavigation: "முதன்மை வழிசெலுத்தல்",
    justNow: "இப்போது",
    loadError: "இப்போது செய்திகளை ஏற்ற முடியவில்லை.",
    politics: "அரசியல்",
    business: "வணிகம்",
    technology: "தொழில்நுட்பம்",
    science: "அறிவியல்",
    sports: "விளையாட்டு",
    culture: "கலாசாரம்",
  },
} as const;

type MessageKey = keyof typeof messages.en;
export function translate(language: AppLanguage, key: MessageKey): string {
  return messages[language][key];
}

export function categoryName(category: string | null, language: AppLanguage): string {
  if (category?.toLowerCase() === "all") return language === "ta" ? "உங்களுக்காக" : "For you";
  const categoryKey: Record<string, MessageKey> = {
    politics: "politics",
    business: "business",
    technology: "technology",
    science: "science",
    sports: "sports",
    culture: "culture",
  };
  const key = category ? categoryKey[category.toLowerCase()] : undefined;
  return key ? translate(language, key) : category ?? "";
}

export function formatTimeAgo(value: string, language: AppLanguage): string {
  const elapsed = Date.now() - new Date(value).getTime();
  if (!Number.isFinite(elapsed) || elapsed < 0) return translate(language, "justNow");
  const minutes = Math.floor(elapsed / 60_000);
  if (minutes < 1) return translate(language, "justNow");
  if (language === "en") {
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  }
  if (minutes < 60) return `${minutes} நிமிடங்களுக்கு முன்`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} மணி நேரங்களுக்கு முன்`;
  return `${Math.floor(hours / 24)} நாட்களுக்கு முன்`;
}

export function formatDate(value: string, language: AppLanguage): string {
  return new Intl.DateTimeFormat(language === "ta" ? "ta-IN" : "en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function formatShortDate(value: Date, language: AppLanguage): string {
  return new Intl.DateTimeFormat(language === "ta" ? "ta-IN" : "en-IN", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(value);
}
