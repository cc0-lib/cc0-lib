import { use } from "react";
import {
  ArrowUpRight,
  HelpingHand,
  Info,
  MoveLeft,
  Pause,
  Play,
} from "lucide-react";
import Link from "next/link";
import AudioPlayer from "@/components/ui/AudioPlayer";
import VideoPlayer from "@/components/ui/VideoPlayer";
import { slugify } from "@/lib/utils";
import Iframe from "react-iframe";
import Script from "next/script";

const getData = async (slug) => {
  const res = await fetch(
    "https://notion-api.splitbee.io/v1/table/872d317db9c64d3d88195b217cb3dc2f",
    {
      next: {
        revalidate: 60,
      },
    }
  );

  const data = await res.json();

  const filteredData = data.filter((item) => {
    return slugify(item.Title) === slug;
  });

  // console.log(filteredData[0]);
  return filteredData[0];
};

const DetailsPage = ({ params }) => {
  const data = use(getData(params.slug));

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between bg-zinc-900 bg-grid p-12
    font-spline selection:bg-zinc-800 selection:text-prim"
    >
      <header className="z-10 flex w-full flex-row items-center justify-between px-8">
        <Link href="/" className="flex gap-2">
          {/* <img src="./cc0lib.svg" alt="cc0lib" /> */}
          <img src="./cc0lib-h.svg" alt="cc0lib" className="w-40" />
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

      {data && data?.Type === "3D" && data?.Filetype === "GLB" && (
        <div className="h-auto w-full items-center justify-center">
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
        <AudioPlayer href={data.File} className="w-3/5" />
      )}

      {data && data?.Type === "Working Files" && data?.Filetype === "Figma" && (
        <iframe
          src={`https://www.figma.com/embed?embed_host=share&url=${data.File}`}
          className="h-screen w-full p-16"
          allowFullScreen
        />
      )}

      {data && data?.Type === "Working Files" && data?.Filetype === "PDF" && (
        <Iframe url={data.File} className="h-screen w-full p-16" />
      )}

      {data && (data?.Type === "Image" || data?.Type === "GIF") && (
        <img
          src={data.Thumbnails[0].url}
          alt=""
          className=" h-auto w-full object-cover p-16 shadow-md"
        />
      )}

      {!data && (
        <Link href="/">
          <h1 className="bg-zinc-800 px-12 py-6 font-chakra text-9xl uppercase text-orange-600 hover:bg-orange-600 hover:text-zinc-800">
            ERROR
          </h1>
        </Link>
      )}

      {data && (
        <div className="flex w-full flex-row items-center justify-between gap-4 p-16">
          <div className="duration-250 flex flex-col gap-8 font-spline text-2xl text-white transition-all ease-linear">
            <span className="font-rubik text-7xl text-prim">{data?.Title}</span>
            <span className="max-w-prose">{data?.Description}</span>
            <div className="flex w-1/3 flex-col gap-2 lowercase">
              {data?.Source && (
                <Link
                  href={data?.Source}
                  className="group flex flex-row gap-2 hover:text-prim"
                >
                  source <ArrowUpRight className="group-hover:stroke-prim" />
                </Link>
              )}
              {data?.File && (
                <Link
                  href={data.File}
                  className="group flex flex-row gap-2 hover:text-prim"
                >
                  {data.Filetype}{" "}
                  <ArrowUpRight className="group-hover:stroke-prim" />
                </Link>
              )}
              {!data?.File && data?.Thumbnails[0].url && (
                <Link
                  href={data.Thumbnails[0].url}
                  className="group flex flex-row gap-2 hover:text-prim"
                >
                  {data.Filetype}{" "}
                  <ArrowUpRight className="group-hover:stroke-prim" />
                </Link>
              )}
            </div>
            <div className="flex flex-col text-sm text-zinc-400">
              {data?.Type && (
                <span className="flex flex-row items-center gap-2 lowercase ">
                  <span>type:</span>

                  <Link
                    href={`/?search=${data.Type}`}
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
                    href={`/?search=${data.Filetype}`}
                    className="hover:text-prim"
                  >
                    {data.Filetype}
                  </Link>
                </span>
              )}
              {data?.Tags && (
                <span className="flex flex-row items-center gap-2 lowercase">
                  <span>tags:</span>
                  {data.Tags.map((tag) => {
                    return (
                      <Link
                        href={`/?search=${tag}`}
                        key={tag}
                        className="hover:text-prim"
                      >
                        {tag}
                      </Link>
                    );
                  })}
                </span>
              )}
            </div>
          </div>
          {(data?.Type === "Image" ||
            data?.Type === "GIF" ||
            data?.Type === "Working Files" ||
            data?.Type === "3D") && (
            <img
              src={data.Thumbnails[0].url}
              alt=""
              className=" h-auto w-2/5 object-cover px-2 shadow-md"
            />
          )}

          {data?.Type === "Video" && (
            <img
              src={data.Thumbnails[0].url}
              alt=""
              className="h-auto w-1/3 object-cover px-2 shadow-md"
            />
          )}

          {data?.Type === "Audio" && (
            <img
              src={data.Thumbnails[0].url}
              alt=""
              className="h-auto w-2/5 object-cover px-2 shadow-md"
            />
          )}
        </div>
      )}

      <footer className="flex w-full flex-row items-center justify-between px-8">
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
export default DetailsPage;
