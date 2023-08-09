import Bundlr from "@bundlr-network/client";
import { NextRequest, NextResponse } from "next/server";
import { Buffer } from "buffer";

const key = process.env.BUNDLR_SECRET_KEY as string;
const uploaderSecret = process.env.UPLOADER_SECRET_KEY as string;
const bundlrNode = "https://node1.bundlr.network";

const bundlr = new Bundlr(bundlrNode, "matic", key, {
  providerUrl: "https://polygon-rpc.com/",
});

export const GET = async () => {
  return NextResponse.json(
    {
      data: "miao",
    },
    { status: 200 }
  );
};

export const POST = async (request: NextRequest) => {
  const { type, data, secret } = await request.json();

  if (secret !== uploaderSecret) {
    return NextResponse.json(
      {
        message: "invalid secret",
      },
      { status: 400 }
    );
  }

  const allowedTypes = [
    "fund",
    "balance",
    "checkPrice",
    "uploadFile",
    "uploadFolder",
  ];

  if (!allowedTypes.includes(type) || !type) {
    return NextResponse.json(
      {
        message: "invalid type",
      },
      { status: 400 }
    );
  }

  if (type === "fund") {
    if (!data) {
      return NextResponse.json(
        {
          message: "invalid data / no data",
        },
        { status: 400 }
      );
    }
    try {
      if (!data.amount || data.amount === 0) {
        return NextResponse.json(
          {
            message: `funding failed. amount is required`,
          },
          { status: 400 }
        );
      }

      if (data.amount > 0) {
        const amount = bundlr.utils.toAtomic(data.amount);
        const res = await bundlr.fund(amount);
        return NextResponse.json(
          {
            message: `funding successful. tx: ${res.id} - amount funded ${res.quantity}`,
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            message: `funding failed. amount must be greater than 0`,
          },
          { status: 400 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        {
          message: `funding failed. ${error}`,
        },
        { status: 400 }
      );
    }
  }

  if (type === "balance") {
    try {
      const atomicBal = await bundlr.getLoadedBalance();

      const convertedBal = bundlr.utils.fromAtomic(atomicBal);

      return NextResponse.json(
        {
          message: `success getting balance`,
          data: {
            balance: convertedBal,
          },
        },
        {
          status: 200,
        }
      );
    } catch (error) {
      return NextResponse.json(
        {
          message: `getting balance failed. ${error}`,
        },
        { status: 400 }
      );
    }
  }

  if (type === "checkPrice") {
    if (!data) {
      return NextResponse.json(
        {
          message: "invalid data / no data",
        },
        { status: 400 }
      );
    }
    if (!data.bytes || data.bytes === 0 || typeof data.bytes !== "number") {
      return NextResponse.json(
        {
          message: `getting price failed. bytes is required / must be greater than 0 / must be a number`,
        },
        { status: 400 }
      );
    }
    try {
      const bytes = data.bytes;
      const priceAtomic = await bundlr.getPrice(bytes);
      const price = bundlr.utils.fromAtomic(priceAtomic);
      return NextResponse.json(
        {
          message: `uploading ${bytes} bytes will cost ${price} MATIC`,
          data: {
            price: price,
          },
        },
        {
          status: 200,
        }
      );
    } catch (error) {
      return NextResponse.json(
        {
          message: `getting price failed. ${error}`,
        },
        { status: 400 }
      );
    }
  }

  if (type === "uploadFile") {
    if (!data) {
      return NextResponse.json(
        {
          message: "invalid data / no data",
        },
        { status: 400 }
      );
    }

    try {
      const { file, name, ens, type } = data;

      if (!file || !name || !ens || !type) {
        return NextResponse.json(
          {
            message:
              "file upload failed. file, name, type, and ens are required",
          },
          { status: 400 }
        );
      }

      const tags = [
        {
          name: "Filename",
          value: name,
        },
        {
          name: "Content-Type",
          value: type ?? "application/octet-stream",
        },
        {
          name: "Uploader",
          value: ens,
        },
        {
          name: "App",
          value: "cc0-lib uploader",
        },
      ];

      const base64 = file.split(",")[1];
      const buffer = Buffer.from(base64, "base64");
      const uploader = bundlr.uploader.chunkedUploader;
      const tx = bundlr.createTransaction(buffer, {
        tags,
      });

      await tx.sign();
      // const { id, timestamp } = await tx.upload();
      const res = await uploader.uploadTransaction(tx);
      const { id, timestamp } = res.data;

      return NextResponse.json(
        {
          message: `file upload successful.`,
          data: {
            id: id,
            url: `https://arweave.net/${id}`,
            timestamp: timestamp,
          },
        },
        {
          status: 200,
        }
      );
    } catch (error) {
      return NextResponse.json(
        {
          message: `file upload failed. ${error}`,
        },
        { status: 400 }
      );
    }
  }

  if (type === "uploadFolder") {
    if (!data) {
      return NextResponse.json(
        {
          message: "invalid data / no data",
        },
        { status: 400 }
      );
    }

    if (!data.file) {
      return NextResponse.json(
        {
          message: "uploading folder failed. file is required",
        },
        { status: 400 }
      );
    }

    try {
      const { path, ens } = data.file;

      if (!path || !ens) {
        return NextResponse.json(
          {
            message: "uploading file failed. path and ens are required",
          },
          { status: 400 }
        );
      }

      const { id, timestamp } = (await bundlr.uploadFolder(path)) as any;

      return NextResponse.json(
        {
          message: `uploading folder successful. tx: ${id} - timestamp ${timestamp}`,
          data: {
            tx: id,
            url: `https://arweave.net/${id}`,
            timestamp: timestamp,
          },
        },
        {
          status: 200,
        }
      );
    } catch (error) {
      return NextResponse.json(
        {
          message: `uploading folder failed. ${error}`,
        },
        { status: 400 }
      );
    }
  }
};
