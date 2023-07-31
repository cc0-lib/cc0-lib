import { getAllItems } from "@/lib/utils";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { NextRequest, NextResponse } from "next/server";
import { PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  const n = searchParams.get("n");
  const score = searchParams.get("score");
  const d = searchParams.get("d");

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

  if (!d) {
    return NextResponse.json(
      {
        message: "No data requested",
      },
      { status: 400 }
    );
  }

  const client = new PineconeClient();

  await client.init({
    apiKey: process.env.PINECONE_API_KEY as string,
    environment: process.env.PINECONE_ENVIRONMENT as string,
  });

  const pineconeIndex = client.Index(process.env.PINECONE_INDEX_NAME as string);

  const checkStatus = async () => {
    const { status } = await client.describeIndex({
      indexName: process.env.PINECONE_INDEX_NAME as any,
    });
    if (status?.ready) {
      return status;
    } else {
      return new Promise((resolve) => {
        setTimeout(() => resolve(checkStatus()), 5000);
      });
    }
  };

  await checkStatus();

  try {
    const start = performance.now() / 1000;

    const data = await getAllItems();

    const embeddings = new OpenAIEmbeddings({
      modelName: "text-embedding-ada-002",
    });

    let vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
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
        data: relevantItemsData,
      },
      { status: 200 }
    );

    if (score === "true") {
      return NextResponse.json(
        {
          query: q,
          count: relevantItems.length,
          score: relevantItemsScore,
        },
        { status: 200 }
      );
    }
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
