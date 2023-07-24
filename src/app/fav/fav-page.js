"use client";

import Container from "@/components/ui/container";
import { getLikeFromKV } from "@/lib/redis";
import { getLikedItems, shuffle, slugify } from "@/lib/utils";
import { useSIWE } from "connectkit";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const FavPage = ({ initialData }) => {
  const { isSignedIn } = useSIWE();
  const [data, setData] = useState(initialData);
  const { address } = useAccount();

  useEffect(() => {
    const fetchLikedItems = async () => {
      const localLikedItems = getLikedItems();
      let finalData = [];

      if (isSignedIn && address) {
        const redisLikedItems = await getLikeFromKV(address);
        const finalLikedItemsSet = new Set([
          ...localLikedItems,
          ...redisLikedItems,
        ]);
        const finalLikedItems = Array.from(finalLikedItemsSet);

        console.log("got wallet, return local + redis");

        finalData = initialData.filter((item) =>
          finalLikedItems.includes(slugify(item.Title.toLowerCase()))
        );
      } else {
        finalData = initialData.filter((item) =>
          localLikedItems.includes(slugify(item.Title.toLowerCase()))
        );

        console.log("no wallet, return local storage");
      }

      const shuffledData = shuffle(finalData);
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
        {data && (
          <div className="masonry sm:masonry-sm md:masonry-md 2xl:masonry-lg my-16 space-y-6">
            {data.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={`/${slugify(item.Title)}`}
                  className="group relative flex h-auto w-full break-inside-avoid"
                >
                  <img
                    src={item.Thumbnails?.[0].url}
                    alt={item.Title}
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
      </Container>
    </>
  );
};
export default FavPage;
