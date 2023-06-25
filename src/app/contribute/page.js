import { Info } from "lucide-react";
import Link from "next/link";

const ContributePage = () => {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between bg-zinc-900 bg-grid p-12
        font-spline selection:bg-zinc-800 selection:text-prim"
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

      <div className="duration-250 peer mt-64 flex h-40 w-full flex-col bg-transparent p-4 text-prim drop-shadow-md transition-all ease-linear selection:bg-zinc-800 selection:text-sec placeholder:text-zinc-600 focus:rounded-sm focus:bg-zinc-800 focus:bg-opacity-50 focus:outline-none focus:backdrop-blur-md sm:p-16">
        <span className="font-rubik text-6xl">contribute</span>
        <span className="mt-8 w-1/2 max-w-prose text-lg text-white">
          got more cc0 content? want to contribute?
        </span>
        <span className="mt-8 w-1/2 max-w-prose text-lg text-white">
          mail us: cc0-lib[at]archives.wtf
        </span>
      </div>
      <h1 className="text-md duration-250 bg-transparent p-16 text-white drop-shadow-md transition-all ease-linear selection:bg-zinc-800 selection:text-sec focus:outline-none"></h1>
    </main>
  );
};
export default ContributePage;
