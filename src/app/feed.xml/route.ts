import { NextResponse } from "next/server";
import RSS from "rss";
import { getPublishedItems, getDateFromItem, slugify } from "@/lib/utils";

const feed = new RSS({
  title: "CC0-LIB",
  description: "A library of CC0 images",
  site_url: "https://cc0-lib.wtf",
  feed_url: "https://cc0-lib.wtf/feed.xml",
  image_url: "https://cc0-lib.wtf/og.png",
  language: "en",
  pubDate: new Date().toISOString(),
  copyright: "cc0",
});

export async function GET() {
  const data = await getPublishedItems();

  const datedData: ExtendedItem[] = await Promise.all(
    data.map(async (item) => {
      const { createdAt, lastEdited } = await getDateFromItem(item?.id);
      return { ...item, createdAt, lastEdited };
    })
  );

  await Promise.all(
    datedData.map(async (item) => {
      feed.item({
        title: item.Title,
        description: item.Description,
        url: `https://cc0-lib.wtf/${slugify(item.Title)}`,
        guid: item.id,
        date: item.lastEdited,
        categories: item.Tags,
        enclosure: {
          url: item.Thumbnails[0].url,
          type: `image/${item.Filetype.toLowerCase()}`,
        },
        author: item.ENS,
      });
    })
  );

  return new NextResponse(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/rss+xml",
    },
  });
}
