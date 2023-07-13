import { ChevronsDown, LinkIcon, User } from "lucide-react";
import Link from "next/link";
import AudioPlayer from "@/components/ui/audio-player";
import VideoPlayer from "@/components/ui/video-player";
import SocialShare from "@/components/ui/social-share";
import { getAllItems, shortDomainName, slugify } from "@/lib/utils";
import Iframe from "react-iframe";
import Script from "next/script";
import Sentiment from "@/components/sentiment";
import { notFound } from "next/navigation";
import DownloadFile from "@/components/dl";
import Container from "@/components/ui/container";

const getItem = async (slug) => {
  const data = await getAllItems();

  const filteredData = data.filter((item) => {
    return slugify(item.Title) === slug;
  });

  return filteredData[0];
};

export const generateMetadata = async ({ params }) => {
  const data = await getItem(params.slug);
  return {
    title: `${data?.Title} | CC0-LIB`,
    description: data?.Description,
    // image: data.Thumbnails[0].url,
    image: `https://cc0-lib.wtf/og.png`,
    url: `https://cc0-lib.wtf/${params.slug}`,
    type: "website",
    openGraph: {
      title: `${data?.Title} | CC0-LIB`,
      description: data?.Description,
      url: `https://cc0-lib.wtf/${params.slug}`,
      type: "website",
      images: [
        {
          // url: data.Thumbnails[0].url,
          url: `https://cc0-lib.wtf/og.png`,
          width: 800,
          height: 400,
          alt: data?.Title,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${data?.Title} | CC0-LIB`,
      description: data?.Description,
      // images: [data.Thumbnails[0].url],
      images: [`https://cc0-lib.wtf/og.png`],
    },
  };
};

const DetailsPage = async ({ params }) => {
  const data = await getItem(params.slug);

  if (!data) {
    notFound();
  }

  return (
    <Container>
      {data && data?.Type === "3D" && data?.Filetype === "GLB" && (
        <div className="hidden h-auto w-full items-center justify-center sm:block">
          <Script
            type="module"
            crossOrigin="anonymous"
            src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.1.1/model-viewer.min.js"
          ></Script>
          <model-viewer
            src={data.File}
            shadow-intensity="1"
            camera-controls
            touch-action="pan-y"
            auto-rotate
            ar
            poster={data.Thumbnails[0].url}
            style={{
              width: "auto",
              height: "60vh",

              alignSelf: "center",
            }}
          />
        </div>
      )}

      {data && data?.Type === "Video" && (
        <VideoPlayer src={data.File} data={data} />
      )}

      {data && data?.Type === "Audio" && (
        <AudioPlayer
          format={data.Filetype}
          href={data.File}
          className="w-full sm:w-3/5"
        />
      )}

      {data && data?.Type === "Working Files" && data?.Filetype === "Figma" && (
        <iframe
          src={`https://www.figma.com/embed?embed_host=share&url=${data.File}`}
          className="hidden h-screen w-full px-2 py-16 sm:block sm:p-16"
          allowFullScreen
        />
      )}

      {data && data?.Type === "Working Files" && data?.Filetype === "PDF" && (
        <Iframe url={data.File} className="h-screen w-full px-0 py-8 sm:p-16" />
      )}

      {data && (data?.Type === "Image" || data?.Type === "GIF") && (
        <img
          src={data.Thumbnails[0].url}
          alt=""
          className=" h-auto w-3/4 object-cover px-2 py-16 shadow-md sm:p-16"
        />
      )}

      {data && (data?.Type === "3D" || data?.Type === "Working Files") && (
        <img
          src={data.Thumbnails[0].url}
          alt=""
          className="block h-auto w-full object-cover px-2 py-16 shadow-md sm:hidden sm:p-16"
        />
      )}

      {!data && (
        <Link href="/">
          <h1 className="bg-zinc-800 px-12 py-6 font-chakra text-5xl uppercase text-orange-600 hover:bg-orange-600 hover:text-zinc-800 sm:text-9xl">
            ERROR
          </h1>
        </Link>
      )}

      {data &&
        (data?.Type === "Image" ||
          data?.Type === "GIF" ||
          data?.Type === "Video" ||
          data?.Filetype === "Figma") && (
          <div className="hidden flex-row items-center justify-between gap-4 text-zinc-600 sm:flex">
            <span>more</span>
            <ChevronsDown className="h-6 w-6 " />
            <span>details</span>
          </div>
        )}

      {data && (
        <div className="flex w-full flex-col items-center justify-between gap-4 p-4 sm:flex-row sm:p-16">
          <div className="duration-250 flex w-full flex-col gap-4 font-spline text-2xl text-white transition-all ease-linear">
            <span className=" flex flex-row gap-2 text-sm text-zinc-400">
              <User className="h-4 w-4 self-center" />
              {data?.ENS ? (
                <Link
                  href={data?.["Social Link"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-row gap-1 hover:text-prim"
                >
                  {data?.ENS}{" "}
                </Link>
              ) : (
                <span>cc0-lib</span>
              )}
            </span>

            <span className="font-rubik text-3xl text-prim md:-ml-1 md:text-5xl">
              {data?.Title}
            </span>
            <span className="max-w-prose text-lg">{data?.Description}</span>
            <div className="place flex w-full flex-row justify-between gap-4 text-base lowercase sm:w-1/3 sm:text-lg">
              {data?.Source && (
                <Link
                  href={data?.Source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-row gap-1 hover:text-prim"
                >
                  {shortDomainName(data?.Source)}{" "}
                  <LinkIcon className="h-4 w-4 self-center group-hover:stroke-prim" />
                </Link>
              )}
              <DownloadFile data={data} showExtension={true} />
              <SocialShare data={data} />
            </div>

            <div className="flex w-full flex-col gap-1 text-sm text-zinc-400">
              {data?.Type && (
                <span className="flex flex-row items-center gap-2 lowercase ">
                  <span>type:</span>

                  <Link
                    href={`/?type=${data.Type.toLowerCase()}`}
                    className="hover:text-prim"
                  >
                    {data.Type}
                  </Link>
                </span>
              )}
              {data?.Filetype && (
                <span className="flex flex-row items-center gap-2 lowercase ">
                  <span>format:</span>

                  <Link
                    href={`/?format=${data.Filetype.toLowerCase()}`}
                    className="hover:text-prim"
                  >
                    {data.Filetype}
                  </Link>
                </span>
              )}
              {data?.Tags && data?.Tags.length >= 1 && (
                <span className="flex flex-row items-start gap-2 lowercase">
                  <span>tags:</span>
                  <div className="grid grid-cols-3 text-center sm:grid-cols-5">
                    {data.Tags.map((tag) => {
                      return (
                        <Link
                          href={`/?tag=${tag.toLowerCase()}`}
                          key={tag}
                          className="sm:py-1/12 px-1 py-0 hover:text-prim sm:px-2"
                        >
                          {tag}
                        </Link>
                      );
                    })}
                  </div>
                </span>
              )}
            </div>
            <Sentiment data={data} />
          </div>

          {(data?.Type === "Image" ||
            data?.Type === "GIF" ||
            data?.Type === "Working Files" ||
            data?.Type === "3D") && (
            <img
              src={data.Thumbnails[0].url}
              alt=""
              className=" hidden h-auto w-2/5 object-cover px-2 shadow-md lg:block"
            />
          )}

          {data?.Type === "Video" && (
            <img
              src={data.Thumbnails[0].url}
              alt=""
              className="hidden h-auto w-1/3 object-cover px-2 shadow-md sm:block"
            />
          )}

          {data?.Type === "Audio" && (
            <img
              src={data.Thumbnails[0].url}
              alt=""
              className="hidden h-auto w-2/5 object-cover px-2 shadow-md sm:block"
            />
          )}
        </div>
      )}
    </Container>
  );
};
export default DetailsPage;
