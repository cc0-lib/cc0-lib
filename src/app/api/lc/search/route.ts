import { getAllItems } from "@/lib/utils";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { NextRequest, NextResponse } from "next/server";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RedisVectorStore } from "langchain/vectorstores/redis";
import { createClient } from "redis";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  const n = searchParams.get("n");

  const client = createClient({
    url: process.env.REDIS_URL ?? "redis://localhost:6379",
  });

  await client.connect();

  if (!q) {
    return NextResponse.json(
      {
        message: "No query found",
      },
      { status: 400 }
    );
  }

  if (!n) {
    return NextResponse.json(
      {
        message: "No number of results found",
      },
      { status: 400 }
    );
  }

  try {
    const start = performance.now() / 1000;

    const data = await getAllItems();

    const embeddings = new OpenAIEmbeddings({
      modelName: "text-embedding-ada-002",
    });

    let vectorStore = new RedisVectorStore(embeddings, {
      redisClient: client,
      indexName: "cc0-lib",
    });

    const relevantItems = await vectorStore.similaritySearch(q, Number(n));
    const relevantItemsScore = await vectorStore.similaritySearchWithScore(
      q,
      Number(n)
    );

    const relevantItemsData = relevantItems.map((doc) => {
      const id = doc.metadata.id;
      const items = data.find((item) => item.ID === id);
      return items;
    });

    const end = performance.now() / 1000;

    console.log(`Took ${(end - start).toFixed(2)}s`);

    return NextResponse.json(
      {
        query: q,
        count: relevantItems.length,
        // items: relevantItems,
        score: relevantItemsScore,
        // results: relevantItemsData,
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
