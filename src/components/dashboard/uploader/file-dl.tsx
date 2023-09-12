"use client";

import { DEV_MODE } from "@/lib/constant";
import { ArrowDownToLine, Loader2 } from "lucide-react";
import { useState } from "react";

const DownloadButton = ({ node }: { node: BundlrQueryResponseNode }) => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const downloadFile = async (): Promise<boolean> => {
    const file = node;
    const filename = file.tags.find((tag) => tag.name === "Filename")
      ?.value as string;
    const contentType = file.tags.find(
      (tag) => tag.name === "Content-Type"
    )?.value;
    const url = `https://arweave.net/${file.id}`;

    if (DEV_MODE) {
      console.log(filename, contentType, url);
    }

    try {
      setIsDownloading(true);
      const res = await fetch(url);
      const blob = await res.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log(`Downloaded ${filename}`);
      setIsDownloading(false);
      return true;
    } catch (error) {
      console.error(error);
      setIsDownloading(false);
      console.log(`Failed to download ${filename}`);
      return false;
    }
  };

  return (
    <button onClick={downloadFile}>
      {isDownloading ? (
        <Loader2 className="h-6 w-6 animate-spin self-center stroke-prim" />
      ) : (
        <ArrowDownToLine className={`h-6 w-6 self-center hover:stroke-prim`} />
      )}
    </button>
  );
};
export default DownloadButton;
