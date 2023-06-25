"use client";

import { HelpingHand, Info, MoveLeft } from "lucide-react";
import Link from "next/link";

const DetailsPageError = () => {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-12 bg-zinc-900 bg-grid
selection:bg-zinc-800 selection:text-prim font-spline"
    >
      <header className="flex-row flex justify-between items-center w-full px-8 z-10">
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

      <h1 className="text-9xl font-chakra uppercase px-6 py-4 bg-zinc-800 text-sec">
        Error
      </h1>

      <footer className="flex-row flex justify-between items-center w-full px-8">
        <Link href="/">
          <div className="flex flex-row items-center gap-2 group" id="back">
            <MoveLeft className="w-8 h-8 group-hover:stroke-prim" />
            <span className="opacity-0 group-hover:opacity-100 duration-250 ease-linear transition-all">
              back
            </span>
          </div>
        </Link>
        <Link href="/contribute">
          <div
            className="flex flex-row items-center gap-2 group"
            id="contribute"
          >
            <span className="opacity-0 group-hover:opacity-100 duration-250 ease-linear transition-all">
              contribute
            </span>
            <HelpingHand className="w-8 h-8 group-hover:stroke-prim" />
          </div>
        </Link>
      </footer>
    </main>
  );
};
export default DetailsPageError;
