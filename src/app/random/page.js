import DownloadFile from "@/components/dl";
import { getAllItems, slugify } from "@/lib/utils";
import {
  HelpingHand,
  Info,
  MoreHorizontal,
  MoveLeft,
  RefreshCcw,
} from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export const generateMetadata = async () => {
  const title = `Random | CC0-LIB`;
  const description = "Random image from CC0-LIB";
  const image = `https://cc0-lib.wtf/og.png`;
  const url = `https://cc0-lib.wtf/random`;

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

const RandomPage = async () => {
  const data = await getAllItems();

  const filteredData = data.filter(
    (item) => item.Type.toLowerCase() === "audio"
  );

  const formatData = (items) => {
    const data = items[0];

    return {
      image: {
        url: data.Thumbnails[0].url,
      },
      data: data,
    };
  };

  // const randomItem =
  //   filteredData[Math.floor(Math.random() * filteredData.length)];
  const randomItem = data[Math.floor(Math.random() * data.length)];

  const randomData = formatData([randomItem]);

  const image = randomData.image.url;

  const action = async () => {
    "use server";
    revalidatePath("/random");
  };

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

      <div className="flex flex-col items-center justify-center gap-8 p-2">
        <div className="items-center">
          <img
            src={image}
            alt="random"
            className="h-96 w-96 object-contain p-2 ring-1 ring-zinc-800 ring-offset-1 ring-offset-zinc-800 hover:ring-prim"
          />
        </div>
        <div className="flex w-full flex-col justify-between gap-4  sm:flex-row sm:gap-2">
          <div className="flex w-52 flex-row justify-items-start">
            <span className="truncate">
              {slugify(randomData.data.Title.toLowerCase())}
            </span>
            <span>.{randomData.data.Filetype.toLowerCase()}</span>
          </div>
          <div className="flex flex-row items-center gap-4">
            <DownloadFile data={randomData.data} showExtension={false} />
            <form action={action} className="hover:text-prim">
              <button>
                {/* reload{" "} */}
                <RefreshCcw className="ml-2 inline-block h-4 w-4 items-center" />
              </button>
            </form>
            <Link href={`/${slugify(randomData.data.Title)}`} className="">
              {/* details{" "} */}
              <MoreHorizontal className="ml-2 inline-block h-4 w-4 items-center hover:text-prim" />{" "}
            </Link>
          </div>
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
export default RandomPage;
