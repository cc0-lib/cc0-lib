import { DB_LIST_ID, DEV_MODE } from "@/lib/constant";
import notion from "@/lib/notion";
import { NextRequest, NextResponse } from "next/server";

const notionSecret = process.env.NOTION_SECRET_KEY as string;
const notionAPIKey = process.env.NOTION_API_KEY as string;

export const GET = async (request: NextRequest) => {
  let dbs = [];
  let data = [];

  const url = `https://notion-api.splitbee.io/v1/table/${DB_LIST_ID}`;
  const res = await fetch(url, {
    next: {
      revalidate: 3600,
    },
  });

  const dbList = await res.json();
  dbs = dbList.map((item) => item.ID);

  await Promise.all(
    dbs.map(async (db) => {
      const url = `https://notion-api.splitbee.io/v1/table/${db}`;
      const res = await fetch(url, {
        next: {
          revalidate: 3600,
        },
      });
      const result = await res.json();
      const editedResult = result.map((item) => {
        return {
          ...item,
          ParentDB: db,
        };
      });
      data = [...data, ...editedResult].flat() as [];
    })
  );

  // const uniqueData = [...new Set(data)];

  return NextResponse.json({
    dbs: dbs,
    count: data.length,
    data: data as Item[],
  });
};

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

  let dbs = [];

  const url = `https://notion-api.splitbee.io/v1/table/${DB_LIST_ID}`;
  const res = await fetch(url, {
    next: {
      revalidate: 3600,
    },
  });

  const dbList = await res.json();
  dbs = dbList.map((item) => item.ID);
  const db = dbs[dbs.length - 1];

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
