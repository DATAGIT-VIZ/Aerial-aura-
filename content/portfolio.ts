export type Category = "Weddings" | "Real Estate" | "Freestyle" | "Cinematic";

export interface PortfolioItem {
  id: string;
  title: string;
  category: Category;
  flightLog: string;           // e.g. "SHOT 01 — ALT 40M — 03:12"
  muxPlaybackId: string;       // Mux playback ID — set to "" until footage is uploaded
  muxThumbnailTime?: number;   // seconds into video for thumbnail, default 0
  featured: boolean;
}

export const portfolio: PortfolioItem[] = [
  {
    id: "alpine-chalet",
    title: "Alpine Chalet",
    category: "Weddings",
    flightLog: "SHOT 01 — ALT 40M — 03:12",
    muxPlaybackId: "",
    featured: true,
  },
  {
    id: "lakeside-villa",
    title: "Lakeside Villa",
    category: "Real Estate",
    flightLog: "SHOT 02 — ALT 60M — 01:48",
    muxPlaybackId: "",
    featured: true,
  },
  {
    id: "freeride-line",
    title: "Freeride Line",
    category: "Freestyle",
    flightLog: "SHOT 03 — ALT 12M — 00:52",
    muxPlaybackId: "",
    featured: true,
  },
  {
    id: "glacier-line",
    title: "Glacier Line",
    category: "Cinematic",
    flightLog: "SHOT 04 — ALT 210M — 02:30",
    muxPlaybackId: "",
    featured: false,
  },
  {
    id: "vineyard-terraces",
    title: "Vineyard Terraces",
    category: "Real Estate",
    flightLog: "SHOT 05 — ALT 75M — 01:20",
    muxPlaybackId: "",
    featured: false,
  },
  {
    id: "rooftop-reception",
    title: "Rooftop Reception",
    category: "Weddings",
    flightLog: "SHOT 06 — ALT 55M — 02:05",
    muxPlaybackId: "",
    featured: false,
  },
];
