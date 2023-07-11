import { HelpingHand, Info, MoveLeft, TrophyIcon } from "lucide-react";
import Link from "next/link";

export const generateMetadata = async () => {
  const title = `Info | CC0-LIB`;
  const description = "What is CC0-LIB";
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

const InfoPage = () => {
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

      <div className="duration-250 peer flex w-full flex-col gap-8 bg-transparent px-4 py-16 text-prim  drop-shadow-md transition-all ease-linear selection:bg-zinc-800 selection:text-sec placeholder:text-zinc-600 focus:rounded-sm focus:bg-zinc-800 focus:bg-opacity-50 focus:outline-none focus:backdrop-blur-md sm:p-16">
        <span className="font-rubik text-4xl sm:text-6xl">wtf is this?</span>
        <span className="w-full max-w-prose text-lg text-white sm:w-1/2">
          library of cc0 content for you to refer/use/remix/do whatever with it
        </span>

        <span className="font-rubik text-4xl sm:text-6xl">what is cc0</span>
        <span className=" w-full max-w-prose text-lg text-white sm:w-1/2">
          learn more about{" "}
          <Link
            href="https://creativecommons.org/publicdomain/zero/1.0"
            target="_blank"
            rel="noreferrer noopener"
            className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
          >
            creative commons zero
          </Link>
        </span>
        <span className="font-rubik text-4xl sm:text-6xl">
          who worked on this?
        </span>
        <span className=" w-full max-w-prose text-lg text-white sm:w-1/2">
          the same team that brought you{" "}
          <Link
            href="https://archives.wtf"
            target="_blank"
            rel="noreferrer noopener"
            className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
          >
            archives.wtf
          </Link>{" "}
          -{" "}
          <Link
            href="https://twitter.com/thevoadz"
            target="_blank"
            rel="noreferrer noopener"
            className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
          >
            voadz
          </Link>{" "}
          and{" "}
          <Link
            href="https://twitter.com/0xNeroOne"
            target="_blank"
            rel="noreferrer noopener"
            className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
          >
            neroone
          </Link>
        </span>
        <span className="font-rubik text-4xl sm:text-6xl">changelog</span>
        <span className=" w-full max-w-prose text-lg text-white sm:w-1/2">
          check{" "}
          <Link
            href="/log"
            className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
          >
            what&apos;s new
          </Link>
        </span>

        <span className="font-rubik text-4xl sm:text-6xl">leaderboard</span>
        <span className=" w-full max-w-prose text-lg text-white sm:w-1/2">
          who&apos;s the greatest contributor? find out{" "}
          <Link
            href="/leaderboard"
            className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
          >
            here
          </Link>
        </span>
        <span className="font-rubik text-4xl sm:text-6xl">contribute</span>
        <span className=" w-full max-w-prose text-lg text-white sm:w-1/2">
          contribute{" "}
          <Link
            href="/contribute"
            className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
          >
            here
          </Link>
        </span>
        <span className="font-rubik text-4xl sm:text-6xl">donation</span>
        <span className="flex w-full max-w-prose flex-row gap-2 text-lg text-white sm:w-1/2">
          <Link
            target="_blank"
            href="ethereum:0xcC0D45aD21224186e8C0450086aF57f30eD88CC0"
            className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
          >
            cc0-lib.eth
          </Link>
        </span>
        <span className="font-rubik text-4xl sm:text-6xl">sitemap</span>
        <span className=" w-full max-w-prose text-lg text-white sm:w-1/2">
          <Link
            href="/sitemap"
            className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
          >
            explore
          </Link>
        </span>
        <span className="font-rubik text-4xl sm:text-6xl">privacy policy</span>
        <span className=" w-full max-w-prose text-lg text-white sm:w-1/2">
          read our{" "}
          <Link
            href="/privacy"
            className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
          >
            privacy policy
          </Link>
        </span>
        <span className="font-rubik text-4xl sm:text-6xl">disclaimer</span>
        <span className=" w-full max-w-prose text-lg text-white sm:w-1/2">
          read our{" "}
          <Link
            href="/disclaimer"
            className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
          >
            disclaimer
          </Link>
        </span>
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
export default InfoPage;
