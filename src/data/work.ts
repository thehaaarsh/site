/**
 * PORTFOLIO VIDEOS
 * Paste any YouTube link (watch, youtu.be, or shorts) into `url`.
 * Set `vertical: true` for 9:16 content like reels, shorts and UGC.
 */
export type Category =
  | "UGC Videos"
  | "Commercial Ads"
  | "Social Media & Reels"
  | "AI Content"
  | "Motion Graphics"
  | "Real Estate"
  | "Startup Campaigns";

export const categories: Category[] = [
  "UGC Videos",
  "Commercial Ads",
  "Social Media & Reels",
  "AI Content",
  "Motion Graphics",
  "Real Estate",
  "Startup Campaigns",
];

export type WorkItem = {
  title: string;
  client: string;
  category: Category;
  url: string;
  vertical?: boolean;
};

// Placeholder links — replace with your own YouTube videos.
export const work: WorkItem[] = [
  { title: "Morning Routine Unboxing", client: "Glow Skincare", category: "UGC Videos", url: "https://youtube.com/shorts/aqz-KE-bpKQ", vertical: true },
  { title: "Honest Review Series", client: "FitFuel", category: "UGC Videos", url: "https://www.youtube.com/watch?v=LXb3EKWsInQ", vertical: true },
  { title: "Built For The Road", client: "Velo Motors", category: "Commercial Ads", url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ" },
  { title: "Taste The Craft", client: "Ember Coffee", category: "Commercial Ads", url: "https://www.youtube.com/watch?v=LXb3EKWsInQ" },
  { title: "30-Day Reel Sprint", client: "Urban Threads", category: "Social Media & Reels", url: "https://youtube.com/shorts/LXb3EKWsInQ", vertical: true },
  { title: "Trend Hooks Pack", client: "Nova Beauty", category: "Social Media & Reels", url: "https://youtube.com/shorts/aqz-KE-bpKQ", vertical: true },
  { title: "Dreamscapes", client: "Lumen AI", category: "AI Content", url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ" },
  { title: "Synthetic Spokesperson", client: "Brightline", category: "AI Content", url: "https://www.youtube.com/watch?v=LXb3EKWsInQ" },
  { title: "Product Explainer", client: "Stackly", category: "Motion Graphics", url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ" },
  { title: "Brand Identity Reveal", client: "Orbit", category: "Motion Graphics", url: "https://www.youtube.com/watch?v=LXb3EKWsInQ" },
  { title: "Skyline Penthouse Tour", client: "Prime Estates", category: "Real Estate", url: "https://www.youtube.com/watch?v=LXb3EKWsInQ" },
  { title: "Villa Walkthrough", client: "Coastline Homes", category: "Real Estate", url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ" },
  { title: "Launch Day Film", client: "Finly", category: "Startup Campaigns", url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ" },
  { title: "Series A Story", client: "Kraft Labs", category: "Startup Campaigns", url: "https://www.youtube.com/watch?v=LXb3EKWsInQ" },
];

export function youtubeId(url: string): string {
  const m = url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([A-Za-z0-9_-]{11})/);
  return m?.[1] ?? url;
}
