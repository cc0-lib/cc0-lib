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
          do you have any cc0 materials you&apos;d like to share with us? refer
          the dashboard section below to get started.
        </span>
        <span className="w-full max-w-prose text-lg text-white sm:w-1/2">
          you could also check the{" "}
          <Link
            href={"/leaderboard"}
            className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
          >
            leaderboard
          </Link>{" "}
          to get some inspirations
        </span>

        <span className="font-rubik text-4xl sm:text-6xl">
          dashboard{" "}
          <span className="rounded-md px-1 py-[2px] align-top text-base outline outline-1 outline-prim hover:bg-prim hover:text-zinc-800">
            new
          </span>
        </span>
        <span className="w-full max-w-prose text-lg text-white sm:w-1/2">
          contributor&apos;s{" "}
          <Link
            href={"/dashboard"}
            className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
          >
            dashboard
          </Link>{" "}
          is now live. a one stop center for you to manage your cc0 submissions.
        </span>
        <span className="w-full max-w-prose text-lg text-white sm:w-1/2">
          you can upload files, add and edit submissions, check and track your
          submission status here.
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

        {/* <Link
          href="/submit"
          className="-mt-4 w-full max-w-prose text-lg text-white sm:w-1/2"
        >
          <div className="group flex flex-row items-center gap-2 hover:text-prim">
            <span className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800">
              submit here
            </span>
          </div>
        </Link> */}

        <span className="font-rubik text-4xl sm:text-6xl">bulk submission</span>
        <span className="w-full max-w-prose text-lg text-white sm:w-1/2">
          do you have a large dataset to submit at once?
        </span>
        <span className="w-full max-w-prose text-lg text-white sm:w-1/2">
          use the provided csv file to bulk submit. download
          <FileDownloader
            data={{
              url: "https://arweave.net/MmkebGQjN6kxcW8Hl84w7hXtBsa57QG4T3Mrhe4jLgU",
              filename: "cc0-lib-bulk.csv",
            }}
          />
        </span>
        <span className="w-full max-w-prose text-lg text-white sm:w-1/2">
          you can complete the csv file with all the necessary submission
          information and email the file back to us.
        </span>

        <span className="text-2xl text-prim">guide</span>
        <ul className="-mt-4 w-full max-w-prose text-base text-white sm:w-1/2">
          <li className="ml-2">thumbnail image</li>
          <li className="ml-4">
            <Dot className="inline-block h-8 w-8" />
            use direct link (eg: http://site.com/image.png)
          </li>
          <li className="ml-4">
            <Dot className="inline-block h-8 w-8" />
            alternative: upload it on{" "}
            <Link
              href="https://imgur.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
            >
              imgur
            </Link>
          </li>
          <li className="ml-2">file</li>
          <li className="ml-4">
            <Dot className="inline-block h-8 w-8" />
            use direct link (eg: http://site.com/file.zip)
          </li>
          <li className="ml-4">
            <Dot className="inline-block h-8 w-8" />
            alternative: amazon s3 / google drive / dropbox / ipfs / arweave
          </li>
          <li className="ml-4">
            <Dot className="inline-block h-8 w-8" />
            you can upload to arweave using our{" "}
            <Link
              href="/dashboard/uploader"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
            >
              uploader
            </Link>{" "}
            here.
          </li>
          <li className="ml-4">
            <Dot className="inline-block h-8 w-8" />
            you can also upload to arweave on polygon network using{" "}
            <Link
              href="https://uploadr.app"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
            >
              uploadr.app
            </Link>
            . you must have MATIC in your wallet to utilise this dapp.
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
