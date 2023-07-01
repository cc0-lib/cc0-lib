import getAllItems from "@/lib/getAllItems";
import { NextResponse } from "next/server";

export async function GET(request) {
  const data = await getAllItems();
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const tag = searchParams.get("tag");
  const type = searchParams.get("type");
  const fileType = searchParams.get("fileType");
  const ens = searchParams.get("ens");

  const spKey = searchParams.keys().next().value;

  const allowedKeys = ["title", "tag", "type", "fileType", "ens"];

  if (spKey && !allowedKeys.includes(spKey)) {
    return NextResponse.json({
      message: "Invalid search parameter",
    });
  }

  if (title) {
    const items = data.filter((item) =>
      item.Title.toLowerCase().includes(title)
    );
    if (items.length > 0) {
      return NextResponse.json(items);
    }
    return NextResponse.json({
      message: `No item found with title ${title}`,
    });
  }

  if (tag) {
    const items = data.filter((item) =>
      item.Tags.map((tag) => tag.toLowerCase()).includes(tag)
    );
    if (items.length > 0) {
      return NextResponse.json(items);
    }
    return NextResponse.json({
      message: `No item found with tag ${tag}`,
    });
  }

  if (type) {
    const items = data.filter((item) => item.Type.toLowerCase().includes(type));

    if (items.length > 0) {
      return NextResponse.json(items);
    }
    return NextResponse.json({
      message: `No item found with type ${type}`,
    });
  }

  if (fileType) {
    const items = data.filter((item) =>
      item.Filetype.toLowerCase().includes(fileType)
    );

    if (items.length > 0) {
      return NextResponse.json(items);
    }
    return NextResponse.json({
      message: `No item found with filetype ${fileType}`,
    });
  }

  if (ens) {
    const items = data.filter((item) => item.ENS?.toLowerCase().includes(ens));

    if (items.length > 0) {
      return NextResponse.json(items);
    }
    return NextResponse.json({
      message: `No item found with ENS ${ens}`,
    });
  }

  return NextResponse.json(data);
}
