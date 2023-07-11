const Log = () => {
  const log = [
    {
      version: "v1.0",
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
      version: "v1.1",
      changes: [
        "mobile responsive design",
        "figma embed",
        "better image viewer in detail page",
        "og image",
      ],
    },
    {
      version: "v1.2",
      changes: ["opengraph", "analytics", "social share (twitter & email)"],
    },
    {
      version: "v1.5",
      changes: [
        "major rework & data improvisation",
        "faster cc0-lib",
        "data fetching on server",
        "dynamic metadata + OpenGraph for better sharing",
        "data shuffle refresh for better discovery",
      ],
    },
    {
      version: "v2.0",
      changes: [
        "contributor's leaderboard",
        "store faves persistently on local device",
        "prefill with 'cc0' on search bar for new users instead of empty by default",
        "fav icon on header to view back your fav contents",
        "site-wide ui and ux improvement",
      ],
    },
    {
      version: "v2.5",
      changes: [
        "public api endpoint at cc0-lib.wtf/api/data",
        "api query for title, tag, type, filetype and even ens",
        "api return more info like query, tags, count and types",
        "robots and sitemap",
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
      ],
    },
  ];

  return log.reverse();
};

export default Log;
