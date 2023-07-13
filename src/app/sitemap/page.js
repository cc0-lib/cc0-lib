import { getAllItems, shuffle, slugify } from "@/lib/utils";
import { HelpingHand, Info, MoveLeft, TrophyIcon } from "lucide-react";
import Link from "next/link";

export const generateMetadata = async () => {
  const title = `Sitemap | CC0-LIB`;
  const description = "CC0-LIB sitemap";
  const image = `https://cc0-lib.wtf/og.png`;
  const url = `https://cc0-lib.wtf/sitemap`;

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

const SiteMapPage = async () => {
  const data = await getAllItems();

  const tagsList = shuffle(
    Array.from(
      new Set(
        data
          .map((item) => {
            if (!item.Tags) return null;
            return item.Tags;
          })
          .flat()
        // .filter((e) => e)
      )
    )
  );

  const typeList = shuffle(
    Array.from(
      new Set(
        data
          .map((item) => {
            if (!item.Type) return null;
            return item.Type;
          })
          .flat()
      )
    )
  );

  const formatList = shuffle(
    Array.from(
      new Set(
        data
          .map((item) => {
            if (!item.Filetype) return null;
            return item.Filetype;
          })
          .flat()
      )
    )
  );

  const staticPages = shuffle([
    "leaderboard",
    "info",
    "sitemap",
    "log",
    "api",
    "about",
    "disclaimer",
    "privacy",
    "/",
    "contribute",
    "submit",
    "random",
  ]);

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

      <div className="duration-250 peer w-full bg-transparent px-4 py-16 font-rubik  text-prim drop-shadow-md transition-all ease-linear selection:bg-zinc-800 selection:text-sec placeholder:text-zinc-600 focus:rounded-sm focus:bg-zinc-800 focus:bg-opacity-50 focus:outline-none focus:backdrop-blur-md sm:p-16">
        {/* <div className="duration-250 peer flex w-full flex-col gap-8 bg-transparent px-4 py-16 text-prim  drop-shadow-md transition-all ease-linear selection:bg-zinc-800 selection:text-sec placeholder:text-zinc-600 focus:rounded-sm focus:bg-zinc-800 focus:bg-opacity-50 focus:outline-none focus:backdrop-blur-md sm:p-16"> */}

        {data.length > 0 && (
          <span className="mr-4 font-rubik text-2xl sm:text-4xl">
            {data.length} items in the library +++
          </span>
        )}
        {staticPages.map((page) => (
          <Link
            href={`/${page.toLowerCase()}`}
            className="mr-2 break-all text-2xl lowercase text-zinc-600 hover:text-prim sm:text-4xl"
            key={page}
          >
            {page}
          </Link>
        ))}
        {typeList.map((type) => (
          <Link
            href={`/?type=${type.toLowerCase()}`}
            className="mr-2 break-all text-2xl lowercase text-zinc-600 hover:text-prim sm:text-4xl"
            key={type}
          >
            {type}
          </Link>
        ))}
        {formatList.map((format) => (
          <Link
            href={`/?format=${format.toLowerCase()}`}
            className="mr-2 break-all text-2xl lowercase text-zinc-600 hover:text-prim sm:text-4xl"
            key={format}
          >
            {format}
          </Link>
        ))}
        {tagsList.map((tag) => (
          <Link
            href={`/?tag=${tag.toLowerCase()}`}
            className="mr-2 break-all text-2xl lowercase text-zinc-600 hover:text-prim sm:text-4xl"
            key={tag}
          >
            {tag}
          </Link>
        ))}
        {data.map((item) => (
          <Link
            href={`/${slugify(item.Title)}`}
            className="mr-2 break-all text-2xl lowercase text-zinc-600 hover:text-prim sm:text-4xl"
            key={data.id}
          >
            {item.Title}
          </Link>
        ))}
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
export default SiteMapPage;
