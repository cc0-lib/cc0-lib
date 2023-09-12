import FileDownloader from "@/components/data/file-dl";
import Container from "@/components/ui/container";
import { Dot } from "lucide-react";
import Link from "next/link";

export const generateMetadata = async () => {
  const title = `Contribute | CC0-LIB`;
  const description = "How to contribute to CC0-LIB";
  const image = `https://cc0-lib.wtf/og.png`;
  const url = `https://cc0-lib.wtf/contribute`;

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

const ContributePage = () => {
  return (
    <Container>
      <div className="duration-250 peer flex w-full flex-col gap-8 bg-transparent px-4 py-16 text-prim drop-shadow-md transition-all ease-linear selection:bg-zinc-800 selection:text-sec placeholder:text-zinc-600 focus:rounded-sm focus:bg-zinc-800 focus:bg-opacity-50 focus:outline-none focus:backdrop-blur-md sm:p-16">
        <span className="font-rubik text-4xl sm:text-6xl">contribute</span>
        <span className="w-full max-w-prose text-lg text-white sm:w-1/2">
          got cc0 content? want to contribute? contribute to cc0-lib, get your
          name on the{" "}
          <Link
            href={"/leaderboard"}
            className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
          >
            leaderboard
          </Link>
          !
        </span>

        <span className="font-rubik text-4xl sm:text-6xl">
          dashboard{" "}
          <span className="rounded-md px-1 py-[2px] align-top text-base outline outline-1 outline-prim hover:bg-prim hover:text-zinc-800">
            new
          </span>
        </span>
        <span className="w-full max-w-prose text-lg text-white sm:w-1/2">
          <Link
            href={"/dashboard"}
            className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
          >
            dashboard
          </Link>{" "}
          is now live. use it to add, edit and track your submissions.
        </span>

        {/* <span className="font-rubik text-4xl sm:text-6xl">
          single submission{" "}
          <span className="rounded-md px-1 py-[2px] align-top text-base text-zinc-400 outline outline-1 outline-zinc-400 hover:bg-zinc-400 hover:text-zinc-800">
            old
          </span>
        </span>
        <span className="w-full max-w-prose text-lg text-white sm:w-1/2">
          single submission is easy, just fill in the form
        </span> */}

        <Link
          href="/submit"
          className="-mt-4 w-full max-w-prose text-lg text-white sm:w-1/2"
        >
          <div className="group flex flex-row items-center gap-2 hover:text-prim">
            <span className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800">
              submit here
            </span>
          </div>
        </Link>

        <span className="font-rubik text-4xl sm:text-6xl">bulk submission</span>
        <span className="w-full max-w-prose text-lg text-white sm:w-1/2">
          too many to submit? bulk submit instead
        </span>
        <span className="flex w-full max-w-prose flex-row gap-2 text-lg text-white sm:w-1/2">
          download
          <FileDownloader
            data={{
              url: "https://arweave.net/MmkebGQjN6kxcW8Hl84w7hXtBsa57QG4T3Mrhe4jLgU",
              filename: "cc0-lib-bulk.csv",
            }}
          />
        </span>
        <span className="-mt-8 text-lg text-white">
          edit the csv and mail us
        </span>

        <span className="text-2xl text-prim">guide</span>
        <ul className="-mt-4 w-full max-w-prose text-base text-white sm:w-1/2">
          <li>
            <Dot className="inline-block h-8 w-8" />
            thumbnail image
          </li>
          <li className="ml-4">
            <Dot className="inline-block h-8 w-8" />
            use direct link (eg: http://site.com/image.png)
          </li>
          <li className="ml-4">
            <Dot className="inline-block h-8 w-8" />
            alternative: imgur
          </li>
          <li>
            <Dot className="inline-block h-8 w-8" />
            file
          </li>
          <li className="ml-4">
            <Dot className="inline-block h-8 w-8" />
            use direct link (eg: http://site.com/file.zip)
          </li>
          <li className="ml-4">
            <Dot className="inline-block h-8 w-8" />
            alternative: s3/drive/dropbox/ipfs/arweave
          </li>
          <li className="ml-4">
            <Dot className="inline-block h-8 w-8" />
            want to upload to arweave? use{" "}
            <Link
              href="https://uploadr.app"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
            >
              uploadr.app
            </Link>{" "}
            on polygon network
          </li>
        </ul>
        {/* <span className="font-rubik text-4xl sm:text-6xl">contributed?</span>
        <span className="w-full max-w-prose text-lg text-white sm:w-1/2">
          view and{" "}
          <Link
            href={"/dashboard"}
            className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
          >
            track your submission
          </Link>{" "}
          here .
        </span> */}
        <span className="font-rubik text-4xl sm:text-6xl">mail us</span>
        <span className="w-full max-w-prose text-lg text-white sm:w-1/2">
          mail us: submissions[at]cc0-lib.wtf
        </span>
      </div>
    </Container>
  );
};
export default ContributePage;
