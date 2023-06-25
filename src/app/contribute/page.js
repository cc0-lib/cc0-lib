import { Info } from "lucide-react";
import Link from "next/link";

const ContributePage = () => {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-12 bg-zinc-900 bg-grid
        selection:bg-zinc-800 selection:text-prim font-spline"
    >
      <header className="flex-row flex fixed justify-between items-center w-full px-20 z-10">
        <Link href="/" className="flex gap-2">
          {/* <img src="./cc0lib.svg" alt="cc0lib" /> */}
          <img src="./cc0lib-h.svg" alt="cc0lib" className="w-40" />
        </Link>
        <ul className="flex gap-4 items-center">
          <li>
            <Link
              href="/info"
              className="flex flex-row items-center gap-2 group"
            >
              <span className="opacity-0 group-hover:opacity-100 duration-250 ease-linear transition-all">
                info
              </span>
              <Info className="w-8 h-8 group-hover:stroke-prim" />
            </Link>
          </li>
        </ul>
      </header>

      <div className="flex flex-col text-prim p-16 mt-64 text-8xl bg-transparent focus:outline-none selection:text-sec selection:bg-zinc-800 placeholder:text-zinc-600 focus:backdrop-blur-md drop-shadow-md focus:bg-zinc-800 focus:bg-opacity-50 w-full h-40 focus:rounded-sm peer duration-250 ease-linear transition-all">
        <span className="font-rubik">contribute</span>
        <span className="text-xl mt-8 text-white max-w-prose w-1/2">
          got more cc0 content? want to contribute?
        </span>
        <span className="text-xl mt-8 text-white max-w-prose w-1/2">
          mail us: cc0-lib[at]archives.wtf
        </span>
      </div>
      <h1 className="text-white p-16 text-md bg-transparent focus:outline-none selection:text-sec selection:bg-zinc-800 drop-shadow-md duration-250 ease-linear transition-all"></h1>
    </main>
  );
};
export default ContributePage;
