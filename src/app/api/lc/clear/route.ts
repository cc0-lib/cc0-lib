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
    const deleted = await pineconeIndex._delete({
      deleteRequest: {
        deleteAll: true,
      },
    });

    return NextResponse.json(
      {
        message: "Index cleared",
        data: deleted,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error clearing index",
      },
      { status: 500 }
    );
  }
};
