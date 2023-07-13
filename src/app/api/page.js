import { HelpingHand, Info, MoveLeft } from "lucide-react";
import Link from "next/link";

export const generateMetadata = async () => {
  const title = `API | CC0-LIB`;
  const description = "API Documentation";
  const image = `https://cc0-lib.wtf/og.png`;
  const url = `https://cc0-lib.wtf/api`;

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

const sampleData = {
  query: {
    title: "example",
  },
  count: 1,
  types: ["type1"],
  fileTypes: ["fileType1"],
  tags: ["tag1", "tag2", "tag3"],
  date: "2023-07-12T05:15:47Z",
  data: [
    {
      id: "data1",
      Source: "https://example.com",
      Type: "type1",
      "Social Link": "https://twisder.com/example",
      ENS: "example.eth",
      Description: "Sample description",
      Thumbnails: [
        {
          name: "sample.svg",
          url: "https://sample.com/sample.svg",
          rawUrl: "https://sample.com/sample.svg",
        },
      ],
      Tags: ["tag1", "tag2", "tag3"],
      ID: 370,
      Title: "sample title",
    },
  ],
};
const sampleRandomData = {
  image: {
    url: "https://sample.com/sample.svg",
  },
  data: {
    id: "data1",
    Source: "https://example.com",
    Type: "type1",
    "Social Link": "https://twisder.com/example",
    ENS: "example.eth",
    Description: "Sample description",
    Thumbnails: [
      {
        name: "sample.svg",
        url: "https://sample.com/sample.svg",
        rawUrl: "https://sample.com/sample.svg",
      },
    ],
    Tags: ["tag1", "tag2", "tag3"],
    ID: 370,
    Title: "sample title",
  },
};

const APIPage = () => {
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

      <div className="focus:outline-noneation-250 focus:bg-zinc-8 peer flex w-full flex-col gap-8 bg-transparent px-4 py-16 lowercase text-white drop-shadow-md transition-all ease-linear selection:bg-zinc-800 selection:text-sec placeholder:text-zinc-600 focus:rounded-sm focus:bg-opacity-50 focus:backdrop-blur-md sm:p-16">
        <h1 className="font-rubik text-4xl text-prim dark:text-prim sm:text-6xl">
          cc0-lib public API
        </h1>
        <p className="w-full max-w-prose text-lg text-white">
          cc0-lib Public API allows developers to access and retrieve data from
          our extensive library of content. With this API, you can search for
          items based on various parameters such as title, tag, type, filetype,
          and ENS.
        </p>
        <span className="h-4 w-full border-b-2 border-zinc-800"></span>
        <h1 className="font-rubik text-4xl text-prim dark:text-prim sm:text-6xl">
          main endpoint
        </h1>
        <pre className="w-max max-w-prose bg-zinc-800  p-2 text-base normal-case text-white sm:p-4 sm:text-lg">
          GET /api/data
        </pre>
        <h1 className="font-rubik text-4xl text-prim dark:text-prim sm:text-6xl">
          query parameters
        </h1>
        <ul className="flex flex-col gap-2 text-sm sm:text-base">
          <li className="flex  flex-col gap-2 sm:flex-row sm:items-center">
            <pre className="w-max max-w-prose bg-zinc-800 text-base normal-case text-white sm:text-lg">
              title
            </pre>
            (string): Retrieve items with the specified title.
          </li>
          <li className="flex  flex-col gap-2 sm:flex-row sm:items-center">
            <pre className="w-max max-w-prose bg-zinc-800 text-base normal-case text-white sm:text-lg">
              tag
            </pre>
            (string): Retrieve items with the specified tag.
          </li>
          <li className="flex  flex-col gap-2 sm:flex-row sm:items-center">
            <pre className="w-max max-w-prose bg-zinc-800 text-base normal-case text-white sm:text-lg">
              type
            </pre>
            (string): Retrieve items with the specified type.
          </li>
          <li className="flex  flex-col gap-2 sm:flex-row sm:items-center">
            <pre className="w-max max-w-prose bg-zinc-800 text-base normal-case text-white sm:text-lg">
              filetype
            </pre>
            (string): Retrieve items with the specified file type.
          </li>
          <li className="flex  flex-col gap-2 sm:flex-row sm:items-center">
            <pre className="w-max max-w-prose bg-zinc-800 text-base normal-case text-white sm:text-lg">
              ens
            </pre>
            (string): Retrieve items with the specified ENS.
          </li>
        </ul>
        <p className="w-full max-w-prose text-base text-white sm:text-lg">
          Note: Only a single query parameter can be used at a time in a
          request.
        </p>
        <h1 className="font-rubik text-4xl text-prim dark:text-prim sm:text-6xl">
          Rate Limiting
        </h1>
        <p className="w-full max-w-prose text-base text-white sm:text-lg">
          To ensure fair usage and optimal performance, the API enforces rate
          limiting. Each user is limited to 10 requests per 10 seconds.{" "}
        </p>
        <h1 className="font-rubik text-4xl text-prim dark:text-prim sm:text-6xl">
          Response Structure
        </h1>
        <ul className="flex flex-col gap-2 text-sm sm:text-base">
          <li className="flex  flex-col gap-2 sm:flex-row sm:items-center">
            <pre className="w-max max-w-prose bg-zinc-800 text-base normal-case text-white sm:text-lg">
              query
            </pre>
            : The query parameter used in the request.
          </li>
          <li className="flex  flex-col gap-2 sm:flex-row sm:items-center">
            <pre className="w-max max-w-prose bg-zinc-800 text-base normal-case text-white sm:text-lg">
              count
            </pre>
            : The number of items returned.
          </li>
          <li className="flex  flex-col gap-2 sm:flex-row sm:items-center">
            <pre className="w-max max-w-prose bg-zinc-800 text-base normal-case text-white sm:text-lg">
              types
            </pre>
            : Unique types of items.
          </li>
          <li className="flex  flex-col gap-2 sm:flex-row sm:items-center">
            <pre className="w-max max-w-prose bg-zinc-800 text-base normal-case text-white sm:text-lg">
              fileTypes
            </pre>
            : Unique file types of items.
          </li>
          <li className="flex  flex-col gap-2 sm:flex-row sm:items-center">
            <pre className="w-max max-w-prose bg-zinc-800 text-base normal-case text-white sm:text-lg">
              tags
            </pre>
            : Unique tags associated with items.
          </li>
          <li className="flex  flex-col gap-2 sm:flex-row sm:items-center">
            <pre className="w-max max-w-prose bg-zinc-800 text-base normal-case text-white sm:text-lg">
              date
            </pre>
            : Current date and time.
          </li>
          <li className="flex  flex-col gap-2 sm:flex-row sm:items-center">
            <pre className="w-max max-w-prose bg-zinc-800 text-base normal-case text-white sm:text-lg">
              data
            </pre>
            : An array of the actual items returned.
          </li>
        </ul>
        <h1 className="font-rubik text-4xl text-prim dark:text-prim sm:text-6xl">
          example response
        </h1>
        <pre className=" w-full max-w-prose overflow-clip bg-zinc-800 p-4 text-xs normal-case text-white sm:text-lg">
          <span className="">{JSON.stringify(sampleData, null, 2)}</span>
        </pre>

        <span className="h-4 w-full border-b-2 border-zinc-800"></span>
        <h1 className="font-rubik text-4xl text-prim dark:text-prim sm:text-6xl">
          random endpoint
        </h1>
        <pre className="w-max max-w-prose bg-zinc-800  p-2 text-base normal-case text-white sm:p-4 sm:text-lg">
          GET /api/random
        </pre>
        <p className="w-full max-w-prose text-lg text-white">
          this random endpoint will return a random item from the library. no
          query parameters needed.
        </p>
        <h1 className="font-rubik text-4xl text-prim dark:text-prim sm:text-6xl">
          Rate Limiting
        </h1>
        <p className="w-full max-w-prose text-base text-white sm:text-lg">
          To ensure fair usage and optimal performance, the API enforces rate
          limiting. Each user is limited to 5 requests per 10 seconds.{" "}
        </p>
        <h1 className="font-rubik text-4xl text-prim dark:text-prim sm:text-6xl">
          Response Structure
        </h1>
        <ul className="flex flex-col gap-2 text-sm sm:text-base">
          <li className="flex  flex-col gap-2 sm:flex-row sm:items-center">
            <pre className="w-max max-w-prose bg-zinc-800 text-base normal-case text-white sm:text-lg">
              image
            </pre>
            : The image url of the random item returned.
          </li>
          <li className="flex  flex-col gap-2 sm:flex-row sm:items-center">
            <pre className="w-max max-w-prose bg-zinc-800 text-base normal-case text-white sm:text-lg">
              data
            </pre>
            : The actual item returned.
          </li>
        </ul>
        <h1 className="font-rubik text-4xl text-prim dark:text-prim sm:text-6xl">
          example response
        </h1>
        <pre className=" w-full max-w-prose overflow-clip bg-zinc-800 p-4 text-xs normal-case text-white sm:text-lg">
          <span className="">{JSON.stringify(sampleRandomData, null, 2)}</span>
        </pre>
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
export default APIPage;
