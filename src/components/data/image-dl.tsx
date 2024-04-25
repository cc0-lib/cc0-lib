"use client";

import { ArrowDownToLine } from "lucide-react";
import Link from "next/link";
import { Route } from "next";

type ImageDownloaderProps = {
  data: Item;
};

const ImageDownloader = ({ data }: ImageDownloaderProps) => {
  return (
    <>
      <Link
        href={data?.ThumbnailURL as Route}
        target="_blank"
        rel="noreferrer noopener"
        className="group flex flex-row gap-1 hover:text-prim"
      >
        image
        <ArrowDownToLine
          className={`h-4 w-4 self-center group-hover:stroke-prim `}
        />
      </Link>
    </>
  );
};

export default ImageDownloader;
