export const staticPages: string[] = [
  "",
  "leaderboard",
  "info",
  "contribute",
  "submit",
  "disclaimer",
  "log",
  "privacy",
  "api",
  "sitemap",
  "random",
  "fav",
];

// export const TestMode: boolean = false;
export const TestMode: boolean = process.env.NODE_ENV === "development";
export const TestENS: string = "voadz.eth";
