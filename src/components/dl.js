"use client";

import { blobSize, slugify } from "@/lib/utils";
import { ArrowDownToLine, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as Toast from "@radix-ui/react-toast";
import Link from "next/link";

const DownloadFile = ({ data, showExtension }) => {
  const [filetype, setFiletype] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const timerRef = useRef(null);

  const restrictedFiletypes = ["figma"];
  const restrictedTypes = ["Image", "GIF"];

  const click = async () => {
    try {
      console.log(
        `Downloading ${slugify(data?.Title)}.${data?.Filetype.toLowerCase()}`
      );
      setOpen(false);
      setIsDownloading(true);

      const res = await fetch(data?.File);

      const blob = await res.blob();
      const size = blobSize(blob);

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${slugify(data?.Title)}.${data?.Filetype.toLowerCase()}`;
      document.body.appendChild(link);
      link.click();
      console.log(
        `Downloaded ${slugify(
          data?.Title
        )}.${data?.Filetype.toLowerCase()} : ${size}`
      );
      setIsDownloading(false);
      document.body.removeChild(link);

      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        setOpen(true);
      }, 100);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (
      restrictedFiletypes
        .map((type) => type.toLowerCase())
        .includes(data?.Filetype.toLowerCase()) ||
      restrictedTypes.includes(data?.Type)
    ) {
      setFiletype(null);
    } else {
      setFiletype(data?.Filetype.toLowerCase());
    }
  }, [data]);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <>
      {filetype?.length > 0 && (
        <Toast.Provider swipeDirection="right">
          <button
            onClick={click}
            disabled={isDownloading && !error}
            className="group -mr-4 flex flex-row gap-1 hover:text-prim"
          >
            {showExtension && data.Filetype.toLowerCase()}{" "}
            <ArrowDownToLine
              className={`h-4 w-4 self-center group-hover:stroke-prim ${
                isDownloading && !error
                  ? "animate-pulse stroke-prim"
                  : "animate-none"
              }`}
            />
          </button>

          <Toast.Root
            className="data-[state=open]:animate-slideIn 
            data-[state=closed]:animate-hide 
            data-[swipe=end]:animate-swipeOut 
            grid grid-cols-[auto_max-content] 
            items-center gap-x-4 rounded-md bg-zinc-900/50 p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] backdrop-blur-sm [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:transition-[transform_200ms_ease-out]"
            open={isDownloading && !open}
            onOpenChange={setOpen}
          >
            {isDownloading && (
              <Toast.Title
                className={`animate-pulse text-sm [grid-area:_title] ${
                  error ? "animate-none text-red-500" : "text-prim"
                }`}
              >
                {error ? "Error" : "Downloading"}
              </Toast.Title>
            )}
            <Toast.Description className="text-xs [grid-area:_description]">
              {error ? error : slugify(data?.Title) + "." + filetype}
            </Toast.Description>
            <Toast.Action
              className="[grid-area:_action]"
              asChild
              onClick={() => {
                setOpen(false);
                setIsDownloading(false);
              }}
              altText="Goto schedule to undo"
            >
              <button className="text-xs hover:text-red-500">
                <XCircle className="h-4 w-4 items-center" />
              </button>
            </Toast.Action>
          </Toast.Root>
          <Toast.Viewport className="fixed inset-0 z-50 flex flex-col items-end justify-end p-4" />
        </Toast.Provider>
      )}

      {restrictedTypes.includes(data?.Type) && (
        <Link
          href={data?.Thumbnails[0].url}
          target="_blank"
          rel="noreferrer noopener"
          className="group flex flex-row gap-1 hover:text-prim"
        >
          {showExtension && data.Filetype.toLowerCase()}{" "}
          <ArrowDownToLine
            className={`h-4 w-4 self-center group-hover:stroke-prim ${
              isDownloading && !error
                ? "animate-pulse stroke-prim"
                : "animate-none"
            }`}
          />
        </Link>
      )}
    </>
  );
};

export default DownloadFile;
