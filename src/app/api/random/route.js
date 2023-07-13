import { Ratelimit } from "@upstash/ratelimit";
import kv from "@vercel/kv";
import { getAllItems } from "@/lib/utils";
import { NextResponse } from "next/server";

const rateLimit = new Ratelimit({
  redis: kv,
  analytics: true,
  limiter: Ratelimit.slidingWindow(5, "10s"),
});

export async function GET(request) {
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

  const data = await getAllItems();

  const createResponse = (items) => {
    const data = items[0];

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

  const randomItem = data[Math.floor(Math.random() * data.length)];
  const randomData = createResponse([randomItem]);
  return NextResponse.json(randomData);
}
