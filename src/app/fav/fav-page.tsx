"use client";

import Container from "@/components/ui/container";
import { getLikeFromKV } from "@/lib/redis";
import { getLikedItems, shuffle, slugify } from "@/lib/utils";
import { useSIWE } from "connectkit";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useAccount } from "wagmi";

type FavPageProps = {
  initialData: Item[];
};

const FavPage = ({ initialData }: FavPageProps) => {
  const { isSignedIn } = useSIWE();
  const [data, setData] = useState<Item[]>([]);
  const { address } = useAccount();

  useEffect(() => {
    const fetchLikedItems = async () => {
      const localLikedItems = getLikedItems();
      let finalData: Item[] = [];

      if (isSignedIn && address) {
        const redisLikedItems = await getLikeFromKV(address);
        const finalLikedItemsSet = new Set([
          ...localLikedItems,
          ...redisLikedItems,
        ]);
        const finalLikedItems = Array.from(finalLikedItemsSet);

        finalData = initialData.filter((item) =>
          finalLikedItems.includes(slugify(item.Title.toLowerCase()))
        );
      } else {
        finalData = initialData.filter((item) =>
          localLikedItems.includes(slugify(item.Title.toLowerCase()))
        );
      }

      const shuffledData = shuffle(finalData) as Item[];
      setData(shuffledData);
    };

    fetchLikedItems();
  }, [isSignedIn, address, initialData]);

  return (
    <>
      <Container>
        <div className="mt-8">
          {data && data.length > 0 && data.length < 2 && (
            <p className="bg-zinc-800 px-4 py-2 text-center font-chakra text-sm uppercase">
              {data?.length} result
            </p>
          )}
          {data && data.length > 1 && (
            <p className="bg-zinc-800 px-4 py-2 text-center font-chakra text-sm uppercase">
              {data?.length} results
            </p>
          )}
        </div>
        {data.length == 0 && (
          <div className="flex w-full flex-col items-center justify-center gap-8">
            <p className="text-2xl lowercase">
              Add some favorites! Begin browsing and curating your perfect list
              now
            </p>

            <Link
              href="/"
              className="w-max bg-zinc-800 text-2xl lowercase text-prim underline hover:bg-prim hover:text-zinc-800"
            >
              BROWSE
            </Link>
          </div>
        )}

        <Suspense fallback={<div>Loading</div>}>
          {data && (
            <div className="masonry sm:masonry-sm md:masonry-md 2xl:masonry-lg my-16 space-y-6">
              {data.map((item) => {
                return (
                  <Link
                    key={item.id}
                    href={`/${slugify(item.Title)}`}
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
        </Suspense>
      </Container>
    </>
  );
};
export default FavPage;
