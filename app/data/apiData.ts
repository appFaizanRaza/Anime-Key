// ============================================================
// MOCK API RESPONSE — mirrors the provided JSON exactly
// ============================================================
export interface Genre {
  _id: string;
  name: string;
}
export interface Category {
  _id: string;
  name: string;
}
export interface ContentType {
  _id: string;
  name: string;
}
export interface ImageAsset {
  platform: string;
  path: string;
  type: "HORIZONTAL" | "VERTICAL";
  aspectRatio: string;
}

export interface ContentItem {
  _id: string;
  id: string;
  title: string;
  description: string;
  year: number;
  isPremium: boolean;
  categories: Category[];
  genres: Genre[];
  type: string;
  discretion: string;
  imdb: string;
  estimatedRunTime: string;
  titleImages: ImageAsset[];
  isWatchlisted: boolean;
  isLiked: boolean;
  contentType: ContentType;
  banners: ImageAsset[];
  promoBanners: ImageAsset[];
  thumbnails: ImageAsset[];
}

export interface ListingSection {
  _id: string;
  name: string;
  type: string;
  cardType: string;
  result: ContentItem[];
}

export function getImage(
  assets: ImageAsset[],
  preferType: "HORIZONTAL" | "VERTICAL" = "HORIZONTAL",
): string | null {
  if (!assets || assets.length === 0) return null;
  const match = assets.find((a) => a.type === preferType);
  return (match || assets[0]).path;
}

// Placeholder fallback image (gradient SVG data URI)
export const FALLBACK_IMG = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNjAiIGhlaWdodD0iMjQwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9IkciIHg9IjAlIiB5PSIwJSIgeD0iMTAwJSIgeT0iTTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzFhMWEyZSIvPjxzdG9wIG9mZnNldD0iTjAwJSIgc3RvcC1jb2xvcj0iIzE2MTYyZSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxNjAiIGhlaWdodD0iMjQwIiBmaWxsPSJ1cmwoI0cpIi8+PHRleHQgeD0iODAiIHk9IjEyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzNhM2EzYSIgZm9udC1zaXplPSIyNCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPjg8L3RleHQ+PC9zdmc+`;

export const bannerItems: ContentItem[] = [
  {
    _id: "671e7175",
    id: "CON-KCXM14DC75",
    title: "Goblin Slayer",
    description:
      "The 15-year-old Priestess, a new Porcelain-ranked adventurer, joins a group to investigate goblins kidnapping women.",
    year: 2018,
    isPremium: true,
    categories: [
      { _id: "c1", name: "Featured" },
      { _id: "c2", name: "Trending" },
    ],
    genres: [
      { _id: "g1", name: "Action" },
      { _id: "g2", name: "Adventure" },
      { _id: "g3", name: "Fantasy" },
    ],
    type: "Series",
    discretion: "A 18+",
    imdb: "5",
    estimatedRunTime: "23",
    titleImages: [
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-4PE5BKCEBJ/thumbnail_1765880181944.png",
        type: "HORIZONTAL",
        aspectRatio: "16:9",
      },
    ],
    isWatchlisted: false,
    isLiked: false,
    contentType: { _id: "ct1", name: "Series" },
    banners: [
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-ZMSUR4VJHB/thumbnail_1766569590471.jpg",
        type: "HORIZONTAL",
        aspectRatio: "16:9",
      },
    ],
    promoBanners: [],
    thumbnails: [
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-617MWATAGV/thumbnail_1730048368742.jpg",
        type: "VERTICAL",
        aspectRatio: "9:16",
      },
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-BNIY5QBWJT/thumbnail_1730355972782.jpg",
        type: "HORIZONTAL",
        aspectRatio: "16:9",
      },
    ],
  },
  {
    _id: "67e51b2d",
    id: "CON-66AJ55BC4H",
    title: "YOUR FORMA",
    description:
      'In 1992, a medical technology called "Your Forma" saved people from a viral encephalitis pandemic. Now, it has evolved into a brain-connected information terminal. In a world where everything is recorded, Echika Hieda, a genius girl, becomes the youngest "Densaku-kan" (special investigator) who can dive into the memory archives to investigate major crimes. Her new partner, Harold, is a humanoid robot with blonde hair and blue eyes. Together, they uncover every hidden truth!',
    year: 2025,
    isPremium: true,
    categories: [
      { _id: "c1", name: "Featured" },
      { _id: "c2", name: "Top Banner" },
    ],
    genres: [
      { _id: "g1", name: "Mystery" },
      { _id: "g2", name: "Sci Fi" },
    ],
    type: "Series",
    discretion: "U/A 12+",
    imdb: "4",
    estimatedRunTime: "24",
    titleImages: [
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-JFY0G833MC/thumbnail_1743067949074.png",
        type: "HORIZONTAL",
        aspectRatio: "16:9",
      },
    ],
    isWatchlisted: false,
    isLiked: false,
    contentType: { _id: "ct1", name: "Series" },
    banners: [
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-23QVAFH59K/thumbnail_1750242104321.jpg",
        type: "HORIZONTAL",
        aspectRatio: "16:9",
      },
    ],
    promoBanners: [
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-Z4LVUJ83LR/thumbnail_1750682629227.jpg",
        type: "HORIZONTAL",
        aspectRatio: "16:9",
      },
    ],
    thumbnails: [
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-KASGRN14WV/thumbnail_1743067948240.png",
        type: "VERTICAL",
        aspectRatio: "9:16",
      },
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-R5PAUZ08R0/thumbnail_1743522770534.png",
        type: "HORIZONTAL",
        aspectRatio: "16:9",
      },
    ],
  },
  {
    _id: "6776701a",
    id: "CON-1MJFQLZ6S7",
    title: "Tasokare Hotel",
    description:
      'In the "Twilight Hotel," souls undecided between the afterlife and the living world rest. The protagonist, Neko Tsukahara, has lost her memory and wanders the hotel, guided by staff to a room where items linked to her past may help restore her memories. She faces an unexpected event during her search to return to the living world.',
    year: 2025,
    isPremium: true,
    categories: [
      { _id: "c1", name: "Featured" },
      { _id: "c2", name: "Trending" },
      { _id: "c3", name: "Top Banner" },
      { _id: "c4", name: "Top Five" },
    ],
    genres: [
      { _id: "g1", name: "Mystery" },
      { _id: "g2", name: "Supernatural" },
    ],
    type: "Series",
    discretion: "U/A 12+",
    imdb: "3",
    estimatedRunTime: "24",
    titleImages: [
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-YL4QVW1PKM/thumbnail_1765876087256.png",
        type: "HORIZONTAL",
        aspectRatio: "16:9",
      },
    ],
    isWatchlisted: false,
    isLiked: false,
    contentType: { _id: "ct1", name: "Series" },
    banners: [
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-UEKFRSS1FF/thumbnail_1750064826582.jpg",
        type: "HORIZONTAL",
        aspectRatio: "16:9",
      },
    ],
    promoBanners: [
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-V40W1LWHJP/thumbnail_1740055656284.jpg",
        type: "HORIZONTAL",
        aspectRatio: "16:9",
      },
    ],
    thumbnails: [
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-1FKU5VM69H/thumbnail_1737013780593.jpg",
        type: "HORIZONTAL",
        aspectRatio: "16:9",
      },
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-F5KPC6MGHG/thumbnail_1737357005500.jpg",
        type: "VERTICAL",
        aspectRatio: "9:16",
      },
    ],
  },
  {
    _id: "6770f853",
    id: "CON-GGXEA2C82C",
    title: "Arifureta: Special",
    description:
      "In this special prologue episode, viewers are introduced to Nagumo and his classmates as they are unexpectedly summoned to a fantastical world. This thrilling opening sets the stage for the epic journey that will unfold in Season 1.",
    year: 2024,
    isPremium: true,
    categories: [
      { _id: "c1", name: "Featured" },
      { _id: "c2", name: "Trending" },
      { _id: "c3", name: "Top Banner" },
    ],
    genres: [
      { _id: "g1", name: "Action" },
      { _id: "g2", name: "Adventure" },
      { _id: "g3", name: "Fantasy" },
    ],
    type: "Series",
    discretion: "U/A 12+",
    imdb: "4",
    estimatedRunTime: "29",
    titleImages: [
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-K93G89B704/thumbnail_1765878586142.png",
        type: "HORIZONTAL",
        aspectRatio: "16:9",
      },
    ],
    isWatchlisted: false,
    isLiked: false,
    contentType: { _id: "ct1", name: "Series" },
    banners: [
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-E0SVMIWRXZ/thumbnail_1735456850170.jpg",
        type: "HORIZONTAL",
        aspectRatio: "16:9",
      },
    ],
    promoBanners: [],
    thumbnails: [
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-WVLSULHKQP/thumbnail_1761719529065.png",
        type: "HORIZONTAL",
        aspectRatio: "16:9",
      },
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-HRML1QW90M/thumbnail_1761719530165.jpg",
        type: "VERTICAL",
        aspectRatio: "9:16",
      },
    ],
  },
  {
    _id: "671de805",
    id: "CON-Q56FCWY3SG",
    title: "Devil May Cry",
    description:
      'Patty Lowell, the lost heir of a prestigious family, is taken in by Dante, the owner of "Devil May Cry," to be guarded. Though initially annoyed by the babysitting job, Dante, a skilled demon hunter, soon realizes there\'s more to the case as demons target Patty.',
    year: 2007,
    isPremium: true,
    categories: [
      { _id: "c1", name: "Featured" },
      { _id: "c2", name: "Top Banner" },
      { _id: "c3", name: "Top Five" },
    ],
    genres: [
      { _id: "g1", name: "Action" },
      { _id: "g2", name: "Fantasy" },
    ],
    type: "Series",
    discretion: "A 18+",
    imdb: "4.5",
    estimatedRunTime: "24",
    titleImages: [
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-DN774F3UJB/thumbnail_1765876714068.png",
        type: "HORIZONTAL",
        aspectRatio: "16:9",
      },
    ],
    isWatchlisted: false,
    isLiked: false,
    contentType: { _id: "ct1", name: "Series" },
    banners: [
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-IRHAPOPPX7/thumbnail_1749728289611.jpg",
        type: "HORIZONTAL",
        aspectRatio: "16:9",
      },
    ],
    promoBanners: [],
    thumbnails: [
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-WCQRB56HVS/thumbnail_1730013127228.jpg",
        type: "HORIZONTAL",
        aspectRatio: "16:9",
      },
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-73PR6QL2YH/thumbnail_1730013156295.jpg",
        type: "VERTICAL",
        aspectRatio: "9:16",
      },
    ],
  },
];

export const trendingItems: ContentItem[] = [
  {
    _id: "671e7175",
    id: "CON-KCXM15DC75",
    title: "Goblin Slayer",
    description:
      "The 15-year-old Priestess, a new Porcelain-ranked adventurer, joins a group to investigate goblins kidnapping women.",
    year: 2018,
    isPremium: true,
    categories: [
      { _id: "c1", name: "Featured" },
      { _id: "c2", name: "Trending" },
    ],
    genres: [
      { _id: "g1", name: "Action" },
      { _id: "g2", name: "Adventure" },
      { _id: "g3", name: "Fantasy" },
    ],
    type: "Series",
    discretion: "A 18+",
    imdb: "5",
    estimatedRunTime: "23",
    titleImages: [
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-4PE5BKCEBJ/thumbnail_1765880181944.png",
        type: "HORIZONTAL",
        aspectRatio: "16:9",
      },
    ],
    isWatchlisted: false,
    isLiked: false,
    contentType: { _id: "ct1", name: "Series" },
    banners: [
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-ZMSUR4VJHB/thumbnail_1766569590471.jpg",
        type: "HORIZONTAL",
        aspectRatio: "16:9",
      },
    ],
    promoBanners: [],
    thumbnails: [
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-617MWATAGV/thumbnail_1730048368742.jpg",
        type: "VERTICAL",
        aspectRatio: "9:16",
      },
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-BNIY5QBWJT/thumbnail_1730355972782.jpg",
        type: "HORIZONTAL",
        aspectRatio: "16:9",
      },
    ],
  },
  {
    _id: "dsr2",
    id: "CON-DSR2",
    title: "Devil Survivor 2",
    description:
      "After a catastrophic event, teens who downloaded a mysterious app discover they can summon demons to fight off an apocalyptic threat.",
    year: 2013,
    isPremium: true,
    categories: [{ _id: "c1", name: "Trending" }],
    genres: [
      { _id: "g1", name: "Action" },
      { _id: "g2", name: "Sci Fi" },
    ],
    type: "Series",
    discretion: "U/A 12+",
    imdb: "4",
    estimatedRunTime: "24",
    titleImages: [],
    isWatchlisted: false,
    isLiked: false,
    contentType: { _id: "ct1", name: "Series" },
    banners: [],
    promoBanners: [],
    thumbnails: [
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-617MWATAGV/thumbnail_1730048368742.jpg",
        type: "VERTICAL",
        aspectRatio: "9:16",
      },
    ],
  },
  {
    _id: "dnd",
    id: "CON-DND",
    title: "Danganronpa",
    description:
      "Hope's Peak Academy's top students are locked inside the school by a sadistic bear named Monokuma, forced to commit murder to escape.",
    year: 2013,
    isPremium: true,
    categories: [{ _id: "c1", name: "Trending" }],
    genres: [
      { _id: "g1", name: "Mystery" },
      { _id: "g2", name: "Thriller" },
    ],
    type: "Series_AND_EPISODES",
    discretion: "U/A 12+",
    imdb: "4",
    estimatedRunTime: "24",
    titleImages: [],
    isWatchlisted: false,
    isLiked: false,
    contentType: { _id: "ct1", name: "Series" },
    banners: [],
    promoBanners: [],
    thumbnails: [
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-KASGRN14WV/thumbnail_1743067948240.png",
        type: "VERTICAL",
        aspectRatio: "9:16",
      },
    ],
  },
  {
    _id: "fate",
    id: "CON-FATE",
    title: "Fate/stay night",
    description:
      "Shirou Emiya, a high school student, is drawn into the Holy Grail War — a deadly battle between seven Masters and their powerful Servant spirits.",
    year: 2006,
    isPremium: true,
    categories: [{ _id: "c1", name: "Trending" }],
    genres: [
      { _id: "g1", name: "Action" },
      { _id: "g2", name: "Fantasy" },
    ],
    type: "Series_AND_EPISODES",
    discretion: "U/A 12+",
    imdb: "5",
    estimatedRunTime: "24",
    titleImages: [],
    isWatchlisted: false,
    isLiked: false,
    contentType: { _id: "ct1", name: "Series" },
    banners: [],
    promoBanners: [],
    thumbnails: [
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-R5PAUZ08R0/thumbnail_1743522770534.png",
        type: "VERTICAL",
        aspectRatio: "9:16",
      },
    ],
  },
  {
    _id: "btoom",
    id: "CON-BTOOM",
    title: "Btoom !",
    description:
      "Ryūta Inoue wakes up on a remote island with no memory, armed with explosive orbs. He must survive by battling other contestants in a deadly game.",
    year: 2012,
    isPremium: true,
    categories: [{ _id: "c1", name: "Trending" }],
    genres: [
      { _id: "g1", name: "Action" },
      { _id: "g2", name: "Survival" },
    ],
    type: "Series",
    discretion: "A 18+",
    imdb: "4",
    estimatedRunTime: "24",
    titleImages: [],
    isWatchlisted: false,
    isLiked: false,
    contentType: { _id: "ct1", name: "Series" },
    banners: [],
    promoBanners: [],
    thumbnails: [
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-OIUGZPM4OS/thumbnail_1750242162348.jpg",
        type: "VERTICAL",
        aspectRatio: "9:16",
      },
    ],
  },
  {
    _id: "ngl",
    id: "CON-NGL",
    title: "No Guns Life",
    description:
      "In a city where cyborg soldiers called Extenders roam after a war, a giant-armed gunslinger named Juzo Kabaneri runs a shady business.",
    year: 2019,
    isPremium: true,
    categories: [{ _id: "c1", name: "Trending" }],
    genres: [
      { _id: "g1", name: "Action" },
      { _id: "g2", name: "Sci Fi" },
    ],
    type: "Series_AND_EPISODES",
    discretion: "U/A 12+",
    imdb: "4",
    estimatedRunTime: "24",
    titleImages: [],
    isWatchlisted: false,
    isLiked: false,
    contentType: { _id: "ct1", name: "Series" },
    banners: [],
    promoBanners: [],
    thumbnails: [
      {
        platform: "3",
        path: "https://prod-media.animekey.tv/public/videos/CON-1ZIOKNKVAK/thumbnail_1729688232355.jpg",
        type: "VERTICAL",
        aspectRatio: "9:16",
      },
    ],
  },
];
