import { getAllItems } from "@/lib/utils";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { NextRequest, NextResponse } from "next/server";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RedisVectorStore } from "langchain/vectorstores/redis";
import { createClient } from "redis";

export const GET = async (request: NextRequest) => {
  const client = createClient({
    url: process.env.REDIS_URL ?? "redis://localhost:6379",
  });

  await client.connect();

  try {
    const start = performance.now() / 1000;

    const data = await getAllItems();

    const embedText = data.map((item) => {
      return `title:${item.Title} desc:${
        item.Description
      } tags:${item.Tags.join(",")} type:${item.Type} filetype:${
        item.Filetype
      } ${item.ENS ? "ens:" + item.ENS : ""} `;
      //   return `Title:${item.Title}\n\nDescription:${
      //     item.Description
      //   }\n\nTags:${item.Tags.join(",")}\n\nType:${item.Type}\n\nFile Type:${
      //     item.Filetype
      //   }\n\nENS:${item.ENS}\n\n`;
    });

    const metadata = data.map((item) => {
      return {
        id: item.ID,
      };
    });

    const embeddings = new OpenAIEmbeddings({
      modelName: "text-embedding-ada-002",
    });

    const vectorStore = await RedisVectorStore.fromTexts(
      embedText,
      metadata,
      embeddings,
      {
        redisClient: client,
        indexName: "cc0-lib",
      }
    );

    await client.disconnect();

    const end = performance.now() / 1000;

    console.log(`Took ${(end - start).toFixed(2)}s`);
    return NextResponse.json(
      {
        message: "Embeddings generated",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error generating embeddings",
      },
      { status: 500 }
    );
  }
};
