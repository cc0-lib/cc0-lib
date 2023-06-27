import getAllItems from "@/lib/getAllItems";
import { handleENSLeaderboard } from "@/lib/utils";
import { HelpingHand, Info, MoveLeft, ScrollIcon } from "lucide-react";
import Link from "next/link";

const LeaderboardPage = async () => {
  const data = await getAllItems();

  const top10 = handleENSLeaderboard(data).top10;
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
        <h1 className="bg-zinc-800 px-6 py-4 font-chakra text-5xl uppercase text-white sm:text-8xl">
          Leaderboard
        </h1>
        <h1 className="bg-zinc-800 px-6 py-4 font-chakra text-3xl uppercase text-white sm:text-6xl">
          TOP 10
        </h1>
      </div>

      <div>
        <div className="flex flex-col items-center justify-center gap-4 font-chakra uppercase">
          {top10.map((item, index) => (
            <div
              key={item.ens}
              className="flex w-full flex-row items-center justify-between rounded-lg bg-zinc-800 px-4 py-2"
            >
              <div className="flex w-full flex-row items-center justify-between gap-6 text-2xl sm:gap-16">
                <div className="flex w-60 flex-row gap-4 text-zinc-500">
                  <span>{index + 1}.</span>
                  <span className="truncate text-prim">{item.ens}</span>
                </div>
                <span className="flex flex-row items-center gap-1 justify-self-end text-zinc-500">
                  [<span className="h-6-w-6 text-white">{item.count}</span>
                  <ScrollIcon className="h-6 w-6 stroke-white" />]
                </span>
              </div>
            </div>
          ))}
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
