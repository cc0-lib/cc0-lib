import notion from "@/lib/notion";
import { NextRequest, NextResponse } from "next/server";

const notionSecret = process.env.NOTION_SECRET_KEY as string;

export const PATCH = async (request: NextRequest) => {
  const { id, properties, secret } = await request.json();

  if (!id || !properties) {
    return NextResponse.json(
      {
        message: "invalid data",
      },
      { status: 400 }
    );
  }

  if (!secret || secret !== notionSecret) {
    return NextResponse.json(
      {
        message: "invalid secret",
      },
      { status: 400 }
    );
  }

  const response = await notion.pages.update({
    page_id: id,
    properties: properties,
  });

  return NextResponse.json(
    {
      id: id,
      response: response,
    },
    { status: 200 }
  );
};

export const POST = async (request: NextRequest) => {
  const { properties, secret } = await request.json();

  if (!properties) {
    return NextResponse.json(
      {
        message: "invalid data",
      },
      { status: 400 }
    );
  }

  if (!secret || secret !== notionSecret) {
    return NextResponse.json(
      {
        message: "invalid secret",
      },
      { status: 400 }
    );
  }

  const db =
    process.env.NODE_ENV === "development"
      ? process.env.NOTION_DEV_DATABASE_ID
      : process.env.NOTION_DATABASE_ID;

  try {
    const response = await notion.pages.create({
      parent: {
        database_id: db as string,
      },
      properties: properties,
    });

    return NextResponse.json(
      {
        id: db,
        response: response,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 400 }
    );
  }
};
