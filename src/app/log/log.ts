type LogType = {
  version: string;
  changes: string[];
};

const Log = () => {
  const log: LogType[] = [
    {
      version: "1.0.0",
      changes: [
        "instant search & filtering contents",
        "random button",
        "filter contents by type",
        "details page with title, description, type, filetype, tags",
        "custom video & audio player",
        "info & contribute page",
        "search persistence",
      ],
    },
    {
      version: "1.1.0",
      changes: [
        "mobile responsive design",
        "figma embed",
        "better image viewer in detail page",
        "og image",
      ],
    },
    {
      version: "1.2.0",
      changes: ["opengraph", "analytics", "social share (twitter & email)"],
    },
    {
      version: "1.3.0",
      changes: [
        "major rework & data improvisation",
        "faster cc0-lib",
        "data fetching on server",
        "dynamic metadata + OpenGraph for better sharing",
        "data shuffle refresh for better discovery",
      ],
    },
    {
      version: "1.4.0",
      changes: [
        "contributor's leaderboard",
        "store faves persistently on local device",
        "pref with 'cc0' on search bar for new users instead of empty by default",
        "fav icon on header to view back your fav contents",
        "site-wide ui and ux improvement",
      ],
    },
    {
      version: "1.5.0",
      changes: [
        "public api endpoint at cc0-lib.wtf/api/data",
        "api query for title, tag, type, filetype and even ens",
        "api return more info like query, tags, count and types",
        "robots and sitemap.xml",
        "pdf file support",
        "better copy for social sharing",
        "changelog page",
        "new category 'all' to show all contents",
        "add log link in info page",
        "show contributor's ens in detail page",
        "showing source domain instead of 'source' in detail page",
        "mobile category",
        "search by contributor ens",
        "change category icon",
        "privacy policy and disclaimer",
        "file download improved with proper file name and extension",
        "animation when downloading file",
        "refactor search by type, tag and format",
        "site-wide ui and ux improvement",
        "audio player only show if format supported by device",
        "added guide for bulk submission",
        "sitemap page with all contents in text format",
      ],
    },
    {
      version: "1.5.1",
      changes: [
        "fixed visual bug on leaderboard page",
        "leaderboard page now link to contributor's social and contributions",
      ],
    },
    {
      version: "1.5.2",
      changes: [
        "added /api page for API documentation",
        "added static pages to sitemap",
      ],
    },
    {
      version: "1.5.3",
      changes: [
        "added /random page for fun browsing experience",
        "added a new api route /api/random for random content",
        "updated api docs page with new route",
      ],
    },
    {
      version: "1.5.4",
      changes: ["code refactor for better readability"],
    },
    {
      version: "1.6.0",
      changes: [
        "rss feed at cc0-lib.wtf/feed.xml",
        "detail page show last updated date for content",
      ],
    },
    {
      version: "1.7.0",
      changes: [
        "added image enclosure and categories to rss feed",
        "view count for each content",
        "comment section for each content",
      ],
    },
    {
      version: "1.8.0",
      changes: ["farcaster comments!", "fc comments for each content page"],
    },
    {
      version: "1.9.0",
      changes: [
        "UI and UX improvements",
        "new layout for info page on desktop",
        "details page now looks better on desktop",
      ],
    },
    {
      version: "1.10.0",
      changes: [
        "shiny nounish cursor!",
        "change versioning to use semantic versioning",
      ],
    },
    {
      version: "1.11.0",
      changes: [
        "you can now share to warpcast",
        "added warpcast to social share",
      ],
    },
    {
      version: "1.12.0",
      changes: [
        "ticker to show announcement",
        "prop 343 is live on nouns dao",
        "you can now mint cc0-lib nft(support us) from info page",
        "ui fixes",
      ],
    },
    {
      version: "1.12.1",
      changes: [
        "fixed ticker link",
        "removed cursor for mobile",
        "added canny link in info page",
      ],
    },
    {
      version: "1.12.2",
      changes: ["fixed og image for detail page"],
    },
    {
      version: "1.13.0",
      changes: [
        "web3 wallet integration with connectkit",
        "favourites now linked to wallet",
        "custom wallet button + sign in with ethereum",
        "new fav page at cc0-lib.wtf/fav",
        "ui and ux improvements",
        "fix broken links",
      ],
    },
    {
      version: "1.13.1",
      changes: ["fixed cursor", "fixed fav page"],
    },
    {
      version: "1.13.2",
      changes: ["minor fix"],
    },
    {
      version: "1.13.3",
      changes: [
        "infinite scroll fix",
        "layout fix",
        "sync fav with wallet fix",
      ],
    },
    {
      version: "1.14.0",
      changes: [
        "migrate codebase to typescript for better overall type safety",
      ],
    },
    {
      version: "1.14.1",
      changes: [
        "remove zora iframe",
        "add zora link in info page",
        "accessibility fixes",
        "image viewer fix",
        "infinite scroll fix",
      ],
    },
    {
      version: "1.15.0",
      changes: [
        "semantic search update",
        "new /ai page for ai-assisted search",
        "openAI integration",
      ],
    },
    {
      version: "1.15.1",
      changes: ["fix ai api", "fix random api"],
    },
    {
      version: "1.15.2",
      changes: [
        "fixes and bug squashing",
        "update ticker",
        "data update",
        "add raycast link in info page",
        "thank you nouns dao",
      ],
    },
    {
      version: "1.15.3",
      changes: ["update ticker"],
    },
    {
      version: "1.16.0",
      changes: ["dashboard module"],
    },
    {
      version: "1.16.1",
      changes: [
        "dashboard view fix",
        "dashboard submission fix",
        "middleware fix",
        "type fix",
      ],
    },
    {
      version: "1.16.2",
      changes: [
        "dashboard link fix",
        "filter submission list based on filters",
      ],
    },
    {
      version: "1.16.3",
      changes: [
        "temp hide dashboard on small screen",
        "filter and sort for submission list",
        "fix walletconnect",
      ],
    },
    {
      version: "1.16.4",
      changes: [
        "changed ticker message on dashboard",
        "added /ai page to the sitemap",
        "og for /ai",
      ],

    },
  ];

  return log.reverse();
};

export default Log;
