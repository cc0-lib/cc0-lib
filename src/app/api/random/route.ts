import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { getPublishedItems } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

type APIRandomItem = {
  image: Image;
  data: Item;
};

type Image = {
  url: string;
};

const rateLimit = new Ratelimit({
  redis: kv,
  analytics: true,
  limiter: Ratelimit.slidingWindow(5, "10s"),
});

export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET(request: NextRequest) {
  const id = request.ip ?? "anonymous";
  const limit = await rateLimit.limit(id ?? "anonymous");

  if (limit.remaining <= 0) {
    return NextResponse.json(
      {
        message: "Rate limit exceeded",
      },
      { status: 429 }
    );
  }

  const data = await getPublishedItems();

  const createResponse = (items: Item[]): APIRandomItem => {
    const data: Item = items[0];

    return {
      image: {
        url: data.Thumbnails[0].url,
      },
      data: data,
    };
  };

  if (!data) {
    return NextResponse.json(
      {
        message: "No data found",
      },
      { status: 400 }
    );
  }

  const randomNum = Math.floor(Date.now() / 1000);
  const doubleRandom = Math.floor(Math.random() * randomNum);
  const randomItem = data[doubleRandom % data.length];
  const randomData = createResponse([randomItem]);

  return NextResponse.json(randomData);
}
