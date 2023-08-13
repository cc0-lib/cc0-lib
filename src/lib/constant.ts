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
  "ai",
];

export const DEV_MODE: boolean = process.env.NODE_ENV === "development";

export const HOST = {
  PROD: "https://cc0-lib.wtf",
  DEV: "http://localhost:1311",
  PREV: {
    DASHBOARD: "https://cc0-lib-git-dashboard-nouns-archive.vercel.app",
    UPLOADER: "https://cc0-lib-git-uploader-nouns-archive.vercel.app",
    SUBMISSION: "https://cc0-lib-git-submission-edit-nouns-archive.vercel.app",
  },
};

export const PREV_MODE: boolean = false;
export const PREV_HOSTNAME = HOST.PREV.SUBMISSION;
export const HOSTNAME = DEV_MODE ? HOST.DEV : HOST.PROD;

export const SAMPLE_ENS: string = "neroone.eth";
