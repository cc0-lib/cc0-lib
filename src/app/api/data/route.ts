import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { getAllItems, getAllRawItems } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

const rateLimit = new Ratelimit({
  redis: kv,
  analytics: true,
  limiter: Ratelimit.slidingWindow(10, "10s"),
});

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

  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const tag = searchParams.get("tag");
  const type = searchParams.get("type");
  const fileType = searchParams.get("fileType");
  const ens = searchParams.get("ens");
  const raw = searchParams.get("raw");

  let data = raw === "true" ? await getAllRawItems() : await getAllItems();

  const spKey = searchParams.keys().next().value;

  const allowedKeys = ["title", "tag", "type", "fileType", "ens"];

  const createResponse = (query: string, items: Item[]): APIData => {
    const uniqueTypes: string[] = [...new Set(items.map((item) => item.Type))];
    const uniqueTags: string[] = [
      ...new Set(items.map((item) => item.Tags).flat()),
    ];
    const uniqueFileTypes: string[] = [
      ...new Set(items.map((item) => item.Filetype)),
    ];

    const data = {
      query: query,
      count: items.length,
      types: uniqueTypes,
      fileTypes: uniqueFileTypes,
      tags: uniqueTags,
      date: new Date().toISOString(),
      data: items,
    };

    return data;
  };

  if (spKey && !allowedKeys.includes(spKey)) {
    return NextResponse.json(
      {
        message:
          "Invalid search parameter. use either title, tag, type, fileType or ens",
      },
      { status: 400 }
    );
  }

  if (title) {
    const items = data.filter((item) =>
      item.Title.toLowerCase().includes(title)
    );
    if (items.length > 0) {
      const data = createResponse(title, items);
      return NextResponse.json(data);
    }
    return NextResponse.json(
      {
        message: `No item found with title ${title}`,
      },
      { status: 400 }
    );
  }

  if (tag) {
    const items = data.filter((item) =>
      item.Tags.map((tag) => tag.toLowerCase()).includes(tag)
    );
    if (items.length > 0) {
      const data = createResponse(tag, items);
      return NextResponse.json(data);
    }
    return NextResponse.json(
      {
        message: `No item found with tag ${tag}`,
      },
      { status: 400 }
    );
  }

  if (type) {
    const items = data.filter((item) => item.Type.toLowerCase().includes(type));

    if (items.length > 0) {
      const data = createResponse(type, items);
      return NextResponse.json(data);
    }
    return NextResponse.json(
      {
        message: `No item found with type ${type}`,
      },
      { status: 400 }
    );
  }

  if (fileType) {
    const items = data.filter((item) =>
      item.Filetype.toLowerCase().includes(fileType)
    );

    if (items.length > 0) {
      const data = createResponse(fileType, items);
      return NextResponse.json(data);
    }
    return NextResponse.json(
      {
        message: `No item found with filetype ${fileType}`,
      },
      { status: 400 }
    );
  }

  if (ens) {
    const items = data.filter((item) => item.ENS?.toLowerCase().includes(ens));

    if (items.length > 0) {
      const data = createResponse(ens, items);
      return NextResponse.json(data);
    }
    return NextResponse.json(
      {
        message: `No item found with ENS ${ens}`,
      },
      { status: 400 }
    );
  }

  if (!data) {
    return NextResponse.json(
      {
        message: "No data found",
      },
      { status: 400 }
    );
  }

  const res = createResponse("", data);
  return NextResponse.json(res);
}
