import { GitCommit } from "lucide-react";
import Log from "./log";
import Container from "@/components/ui/container";

export const generateMetadata = async () => {
  const title = `Log | CC0-LIB`;
  const description = "Changelog - Release notes";
  const image = `https://cc0-lib.wtf/og.png`;
  const url = `https://cc0-lib.wtf/log`;

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

const LogPage = () => {
  const log = Log();
  return (
    <Container>
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
    </Container>
  );
};
export default LogPage;
