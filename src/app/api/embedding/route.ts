import { getPublishedItems } from "@/lib/utils";
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

  try {
    const start = performance.now() / 1000;

    const data = await getPublishedItems();

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

    let vectorStore = new RedisVectorStore(embeddings, {
      redisClient: client,
      indexName: "cc0-lib",
    });

    // use memory vector store
    // const vectorStore = await MemoryVectorStore.fromTexts(
    //   embedText,
    //   metadata,
    //   embeddings
    // );

    // const someData = JSON.stringify(data);
    // const blob = new Blob([someData], { type: "application/json" });

    // const loader = new JSONLoader(blob);

    // const docs = await loader.load();

    // const splitter = new RecursiveCharacterTextSplitter({
    //   chunkSize: 500,
    //   chunkOverlap: 0,
    // });

    // const splitDocs = await splitter.splitDocuments(docs);

    // const vectorStore = await MemoryVectorStore.fromDocuments(
    //   splitDocs,
    //   embeddings
    // );

    const relevantItems = await vectorStore.similaritySearch(q, Number(n) ?? 5);

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
        items: relevantItems,
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
