import { Info } from "lucide-react";
import Link from "next/link";

const InfoPage = () => {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between bg-zinc-900 bg-grid p-12
    font-spline text-white selection:bg-zinc-800 selection:text-prim dark:text-white"
    >
      <header className="fixed z-10 flex w-full flex-row items-center justify-between px-12 sm:px-20">
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

      <div className="duration-250 peer mt-64 flex h-40 w-full flex-col bg-transparent p-4 text-prim  drop-shadow-md transition-all ease-linear selection:bg-zinc-800 selection:text-sec placeholder:text-zinc-600 focus:rounded-sm focus:bg-zinc-800 focus:bg-opacity-50 focus:outline-none focus:backdrop-blur-md sm:p-16">
        <span className="font-rubik text-6xl">wtf is this?</span>
        <span className="mt-8 w-full max-w-prose text-lg text-white sm:w-1/2">
          library of cc0 content for you to refer/use/remix/do whatever with it
        </span>
        <span className="mt-8 font-rubik text-6xl">leaderboard</span>
        <span className="mt-8 w-full max-w-prose text-lg text-white sm:w-1/2">
          <Link
            href="/leaderboard"
            className="cursor-pointer text-lg text-white hover:text-prim"
          >
            who's the greatest contributor? click here to find out
          </Link>
        </span>
        <span className="mt-8 font-rubik text-6xl">donation</span>
        <span className="mt-8 flex w-full max-w-prose flex-row gap-2 text-lg text-white sm:w-1/2">
          <Link
            target="_blank"
            href="ethereum:0xcC0D45aD21224186e8C0450086aF57f30eD88CC0"
            className="cursor-pointer text-white hover:text-prim"
          >
            cc0-lib.eth
          </Link>
        </span>
      </div>
      <h1 className="text-md duration-250 bg-transparent p-16 text-white drop-shadow-md transition-all ease-linear selection:bg-zinc-800 selection:text-sec focus:outline-none"></h1>
    </main>
  );
};
export default InfoPage;
