import Container from "@/components/ui/container";
import { getPublishedItems, handleENSLeaderboard } from "@/lib/utils";
import { ScrollIcon, Send } from "lucide-react";
import { Route } from "next";
import Link from "next/link";

export const generateMetadata = async () => {
  const title = `Leaderboard | CC0-LIB`;
  const description = "Check who contributed the most to CC0-LIB";
  const image = `https://cc0-lib.wtf/og.png`;
  const url = `https://cc0-lib.wtf/leaderboard`;

  return {
    title: title,
    description: description,
    image: image,
    url: url,
    type: "website",
    openGraph: {
      title: title,
      description: description,
      url: url,
      type: "website",
      images: [
        {
          url: image,
          width: 800,
          height: 400,
          alt: title,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [image],
    },
  };
};

const LeaderboardPage = async () => {
  const data = await getPublishedItems();

  const top10 = handleENSLeaderboard(data).top10;
  const top10Data = handleENSLeaderboard(data).top10Data;
  const full = handleENSLeaderboard(data).full;

  return (
    <Container>
      <div className="flex flex-col items-center gap-4 sm:mt-8">
        <h1 className="bg-zinc-800 px-6 py-4 font-chakra text-4xl uppercase text-white sm:text-7xl">
          Leaderboard
        </h1>
        <h1 className="bg-zinc-800 px-4 py-2 font-chakra text-2xl uppercase text-white sm:text-5xl">
          TOP Contributors
        </h1>
      </div>

      <div className="mt-12 flex w-full max-w-sm flex-col gap-4 sm:max-w-lg">
        <div className="flex flex-col items-center justify-center gap-4 font-chakra uppercase">
          {top10Data.map((item, index) => (
            <div
              key={item.ens}
              className="flex w-full flex-row items-center justify-between rounded-lg bg-zinc-800 px-4 py-2 first:outline first:outline-2 first:outline-zinc-400"
            >
              <div className="flex w-full flex-row items-center justify-between gap-6 text-lg sm:gap-16 sm:text-2xl">
                <div className="flex w-full flex-row gap-4 text-zinc-500">
                  <span className="w-4 sm:w-6">{index + 1}.</span>
                  <Link
                    href={item.data[0]["Social Link"] as Route}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full max-w-[10rem] truncate text-prim hover:bg-prim hover:text-zinc-700 sm:max-w-sm"
                  >
                    {item.ens}
                  </Link>
                </div>
                <Link href={`/?search=${item.ens}`}>
                  <span className="group flex flex-row items-center gap-1 justify-self-end text-zinc-500 hover:bg-prim hover:text-zinc-700 ">
                    [
                    <span className="h-6-w-6 text-white group-hover:text-zinc-700">
                      {JSON.stringify(item.count)}
                    </span>
                    <ScrollIcon className="h-6 w-6 stroke-white group-hover:stroke-zinc-700" />
                    ]
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="w-max-sm text-md flex w-full flex-row justify-evenly gap-4 p-8 text-center text-zinc-400 sm:text-lg">
          <span>not in the list?</span>
          <Link href="/dashboard">
            <div className="group flex w-full flex-row items-center gap-2 hover:text-prim">
              <span>submit yours</span>
              <Send className="h-4 w-4 group-hover:stroke-prim" />
            </div>
          </Link>
        </div>
      </div>
    </Container>
  );
};
export default LeaderboardPage;
