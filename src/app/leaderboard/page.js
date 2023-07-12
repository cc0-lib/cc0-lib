import { getAllItems, handleENSLeaderboard } from "@/lib/utils";
import { HelpingHand, Info, MoveLeft, ScrollIcon, Send } from "lucide-react";
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
  const data = await getAllItems();

  const top10 = handleENSLeaderboard(data).top10;
  const top10Data = handleENSLeaderboard(data).top10Data;
  const full = handleENSLeaderboard(data).full;

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between bg-zinc-900 bg-grid p-12
        font-spline text-white selection:bg-zinc-800 selection:text-prim dark:text-white"
    >
      <header className="z-10 flex w-full flex-row items-center justify-between sm:px-8">
        <Link href="/" className="flex gap-2">
          <img src="./cc0lib.svg" alt="cc0lib" className="block sm:hidden" />
          <img
            src="./cc0lib-h.svg"
            alt="cc0lib"
            className="hidden w-40 sm:block"
          />
        </Link>

        <ul className="flex items-center gap-4">
          <li>
            <Link
              href="/info"
              className="group flex flex-row items-center gap-2"
            >
              <span className="duration-250 opacity-0 transition-all ease-linear group-hover:opacity-100">
                info
              </span>
              <Info className="h-8 w-8 group-hover:stroke-prim" />
            </Link>
          </li>
        </ul>
      </header>

      <div className="flex flex-col items-center gap-4">
        <h1 className="bg-zinc-800 px-6 py-4 font-chakra text-4xl uppercase text-white sm:text-8xl">
          Leaderboard
        </h1>
        <h1 className="bg-zinc-800 px-4 py-2 font-chakra text-2xl uppercase text-white sm:text-6xl">
          TOP 10 Contributors
        </h1>
      </div>

      <div className="mt-12 flex w-full max-w-sm flex-col gap-4">
        <div className="flex flex-col items-center justify-center gap-4 font-chakra uppercase">
          {top10Data.map((item, index) => (
            <div
              key={item.ens}
              className="flex w-full flex-row items-center justify-between rounded-lg bg-zinc-800 px-4 py-2"
            >
              <div className="flex w-full flex-row items-center justify-between gap-6 text-lg sm:gap-16 sm:text-2xl">
                <div className="flex w-60 flex-row gap-4 text-zinc-500">
                  <span>{index + 1}.</span>
                  <Link
                    href={item.data[0]["Social Link"]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate text-prim hover:bg-prim hover:text-zinc-700"
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
          <Link href="/submit">
            <div className="group flex w-full flex-row items-center gap-2 hover:text-prim">
              <span>submit here</span>
              <Send className="h-4 w-4 group-hover:stroke-prim" />
            </div>
          </Link>
        </div>
      </div>
      <footer className="mt-4 flex w-full flex-row items-center justify-between sm:px-8">
        <Link href="/">
          <div className="group flex flex-row items-center gap-2" id="back">
            <MoveLeft className="h-8 w-8 group-hover:stroke-prim" />
            <span className="duration-250 opacity-0 transition-all ease-linear group-hover:opacity-100">
              back
            </span>
          </div>
        </Link>
        <Link href="/contribute">
          <div
            className="group flex flex-row items-center gap-2"
            id="contribute"
          >
            <span className="duration-250 opacity-0 transition-all ease-linear group-hover:opacity-100">
              contribute
            </span>
            <HelpingHand className="h-8 w-8 group-hover:stroke-prim" />
          </div>
        </Link>
      </footer>
    </main>
  );
};
export default LeaderboardPage;
