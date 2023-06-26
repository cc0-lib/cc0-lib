import { Info } from "lucide-react";
import Link from "next/link";

const SubmissionPage = () => {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between bg-white p-12 font-spline text-black
        selection:bg-zinc-800 selection:text-prim dark:bg-[#191919] dark:text-white"
    >
      <header className="fixed z-10 flex w-full flex-row items-center justify-between px-12 sm:px-20">
        <Link href="/" className="flex gap-2">
          <img
            src="./cc0lib.svg"
            alt="cc0lib"
            className="block invert dark:invert-0 sm:hidden"
          />
          <img
            src="./cc0lib-h.svg"
            alt="cc0lib"
            className="hidden w-40 invert dark:invert-0 sm:block"
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

      <iframe
        className="inset-0 left-0 top-0 h-screen w-full border-0 bg-white pt-16 dark:bg-[#191919]"
        src="https://notionforms.io/forms/cc0-library-submission-r8hfbs"
      ></iframe>
      <h1 className="text-md duration-250 bg-transparent p-16 text-white drop-shadow-md transition-all ease-linear selection:bg-zinc-800 selection:text-sec focus:outline-none"></h1>
    </main>
  );
};
export default SubmissionPage;
