"use client";

import { slugify } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type SearchDataProps = {
  data: Item[];
};

const SearchData = ({ data }: SearchDataProps) => {
  return (
    <>
      {data && data.length > 0 && (
        <div
          className={`masonry ${data.length < 2 && "w-full max-w-xl"}  ${
            data.length == 2 && "sm:masonry-sm w-full max-w-4xl"
          } ${
            data.length > 2 && "md:masonry-md 2xl:masonry-lg my-16  max-w-none"
          } my-16 space-y-6 `}
        >
          {data.map((item) => {
            return (
              <Link
                key={item.id}
                href={`/${slugify(item?.Title)}`}
                className="group relative flex h-auto w-full break-inside-avoid"
              >
                <Image
                  src={item.ThumbnailURL as string}
                  alt={item.Title}
                  width={500}
                  height={500}
                  loading="lazy"
                  className="h-auto w-full rounded-sm opacity-80 transition-all duration-100 ease-in-out hover:opacity-100 hover:ring-2 hover:ring-prim hover:ring-offset-1 hover:ring-offset-zinc-900"
                />
                <h1 className="absolute right-4 top-4 hidden bg-zinc-800 bg-opacity-50 px-3 py-1 font-chakra uppercase text-white backdrop-blur-sm group-hover:block">
                  {item.Filetype}
                </h1>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};
export default SearchData;
