import { getAllItems } from "@/lib/utils";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { NextRequest, NextResponse } from "next/server";
import { PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";

export const GET = async (request: NextRequest) => {
  const client = new PineconeClient();

  await client.init({
    apiKey: process.env.PINECONE_API_KEY as string,
    environment: process.env.PINECONE_ENVIRONMENT as string,
  });

  const pineconeIndex = client.Index(process.env.PINECONE_INDEX_NAME as any);

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

    const embedText = data.map((item) => {
      return `title:${item.Title} desc:${
        item.Description
      } tags:${item.Tags.join(",")} type:${item.Type} filetype:${
        item.Filetype
      } ${item.ENS ? "ens:" + item.ENS : ""} `;
    });

    const metadata = data.map((item) => {
      return {
        id: item.ID,
      };
    });

    const embeddings = new OpenAIEmbeddings({
      modelName: "text-embedding-ada-002",
    });

    await PineconeStore.fromTexts(embedText, metadata, embeddings, {
      pineconeIndex,
    });

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
