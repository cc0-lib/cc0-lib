import {
  GitCommit,
  HelpingHand,
  Info,
  MoveLeft,
  Star,
  TrophyIcon,
} from "lucide-react";
import Link from "next/link";
import Log from "./log";

export const generateMetadata = async () => {
  const title = `Log | CC0-LIB`;
  const description = "Changelog - Release notes";
  const image = `https://cc0-lib.wtf/og.png`;
  const url = `https://cc0-lib.wtf/info`;

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

const log = Log();

const LogPage = () => {
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

      <div className="focus:outline-noneation-250 focus:bg-zinc-8 peer flex w-full flex-col gap-8 bg-transparent px-4 py-16 text-white drop-shadow-md transition-all ease-linear selection:bg-zinc-800 selection:text-sec placeholder:text-zinc-600 focus:rounded-sm focus:bg-opacity-50 focus:backdrop-blur-md sm:p-16">
        <h1 className="font-rubik text-4xl text-prim dark:text-prim sm:text-6xl">
          changelog
        </h1>
        <p className="w-full max-w-prose text-lg text-white">
          this is a list of all the changes that have been made to the website.
        </p>
        <div className="flex flex-col gap-8">
          {log.map((item) => (
            <div key={item.version} className="flex flex-col gap-2">
              <h2 className="text-2xl text-prim sm:text-3xl">{item.version}</h2>
              <p className="text-md sm:text-lg">{item.date}</p>

              <ul className="text-md flex flex-col gap-2 sm:text-lg">
                {item.changes.map((change) => (
                  <li key={change} className="flex flex-row items-center gap-2">
                    <GitCommit className="h-4 w-4" />
                    <p className="w-full max-w-prose text-white">{change}</p>
                  </li>
                ))}
              </ul>
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
export default LogPage;
