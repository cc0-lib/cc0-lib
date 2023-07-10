"use client";

import { slugify } from "@/lib/utils";
import { ArrowDownToLine } from "lucide-react";
import { useEffect, useState } from "react";

const DownloadFile = ({ data }) => {
  const [filetype, setFiletype] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const restrictedFiletypes = ["figma", "gif"];

  const click = async () => {
    console.log(
      `Downloading ${slugify(data?.Title)}.${data?.Filetype.toLowerCase()}`
    );
    setIsDownloading(true);
    const res = await fetch(data?.File);
    const blob = await res.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${slugify(data?.Title)}.${data?.Filetype.toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    console.log(
      `Downloaded ${slugify(data?.Title)}.${data?.Filetype.toLowerCase()}`
    );
    setIsDownloading(false);
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (
      restrictedFiletypes
        .map((type) => type.toLowerCase())
        .includes(data?.Filetype.toLowerCase())
    ) {
      setFiletype(null);
    } else {
      setFiletype(data?.Filetype.toLowerCase());
    }
  }, [data]);

  return (
    <>
      {filetype?.length > 0 && (
        <button
          onClick={click}
          className="group flex flex-row gap-1 hover:text-prim"
        >
          {data.Filetype.toLowerCase()}{" "}
          <ArrowDownToLine
            className={`h-4 w-4 self-center group-hover:stroke-prim ${
              isDownloading && "animate-pulse stroke-prim"
            }`}
          />
        </button>
      )}
    </>
  );
};

export default DownloadFile;
