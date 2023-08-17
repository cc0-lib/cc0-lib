import { staticPages } from "@/lib/constant";
import { slugify, getPublishedItems } from "@/lib/utils";

const url = "https://cc0-lib.wtf";

export const sitemap = async () => {
  const itemData = await getPublishedItems();
  const items = itemData.map((item) => ({
    url: `${url}/${slugify(item.Title)}`,
    lastModified: new Date().toISOString(),
  }));

  const pages = staticPages.map((page) => ({
    url: `${url}/${page}`,
    lastModified: new Date().toISOString(),
  }));

  return [...pages, ...items];
};

export default sitemap;
