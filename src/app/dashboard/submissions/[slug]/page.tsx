import Link from "next/link";
import { notFound } from "next/navigation";
import Iframe from "react-iframe";
import AudioPlayer from "@/components/ui/audio-player";
import VideoPlayer from "@/components/ui/video-player";
import { getAllRawItems, slugify } from "@/lib/utils";
import ModelViewer from "@/components/ui/model-viewer";
import Image from "next/image";
import { Route } from "next";

const getItem = async (slug: string) => {
  const data = await getAllRawItems();

  const filteredData = data.filter((item) => {
    return slugify(item.Title) === slug;
  });

  return filteredData[0];
};

type DetailsPageProps = {
  params: {
    slug: string;
  };
};

const DetailsPage = async ({ params }: DetailsPageProps) => {
  const data = await getItem(params.slug);

  if (!data) {
    notFound();
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <GridCard title={`viewing ${data.Title}`}></GridCard>
      {data && data?.Type === "3D" && data?.Filetype === "GLB" && (
        <div className="hidden h-auto w-full max-w-5xl items-center justify-center sm:block">
          <ModelViewer data={data} />
        </div>
      )}

      {data && data?.Type === "Video" && data.File && (
        <VideoPlayer src={data.File} data={data} className="" />
      )}

      {data && data?.Type === "Audio" && data.File && (
        <AudioPlayer
          format={data.Filetype}
          href={data.File}
          className="w-full max-w-3xl sm:w-3/5"
        />
      )}

      {data && data?.Type === "Working Files" && data?.Filetype === "Figma" && (
        <iframe
          src={`https://www.figma.com/embed?embed_host=share&url=${data.File}`}
          title="Figma Viewer"
          className="hidden h-screen w-full max-w-5xl px-2 py-16 sm:block sm:p-16"
          allowFullScreen
        />
      )}

      {data &&
        data?.Type === "Working Files" &&
        data?.Filetype === "PDF" &&
        data.File && (
          <Iframe
            url={data.File}
            title="PDF Viewer"
            className="h-screen w-full max-w-5xl px-0 py-8 sm:p-16"
          />
        )}

      {data && (data?.Type === "Image" || data?.Type === "GIF") && (
        <Image
          src={
            data.Thumbnails
              ? data.Thumbnails[0].url
              : "https://placehold.co/300x300/black/white/?text=Under+Review"
          }
          alt={data.Title}
          width={768}
          height={768}
          className=" h-auto w-full max-w-3xl object-cover px-2 py-16 shadow-md sm:w-3/4 sm:p-16"
        />
      )}

      {data && (data?.Type === "3D" || data?.Type === "Working Files") && (
        <Image
          src={
            data.Thumbnails
              ? data.Thumbnails[0].url
              : "https://placehold.co/300x300/black/white/?text=Under+Review"
          }
          alt={data.Title}
          width={768}
          height={768}
          className="block h-auto w-full max-w-5xl object-cover px-2 py-16 shadow-md sm:hidden sm:p-16"
        />
      )}

      {!data && (
        <Link href="/">
          <h1 className="bg-zinc-800 px-12 py-6 font-jetbrains text-5xl uppercase text-orange-600 hover:bg-orange-600 hover:text-zinc-800 sm:text-9xl">
            ERROR
          </h1>
        </Link>
      )}

      <GridCard title="view details">
        <GridRow className="px-16 py-8">
          <GridCol className="w-full gap-4 font-jetbrains">
            <div className="group flex flex-col gap-1">
              <span className="text-sm uppercase text-zinc-300">Title</span>
              <span className="w-full max-w-max">{data.Title}</span>
            </div>
            <div className="group flex flex-col gap-1">
              <span className="text-sm uppercase text-zinc-300">
                Description:
              </span>
              <span className="w-full max-w-max">{data.Description}</span>
            </div>
            <div className="group flex flex-col gap-1">
              <span className="text-sm uppercase text-zinc-300">Source</span>
              <span className="w-full max-w-max">{data.Source}</span>
            </div>
            <div className="group flex flex-col gap-1">
              <span className="text-sm uppercase text-zinc-300">Type</span>
              <span className="w-full max-w-max">{data.Type}</span>
            </div>
            <div className="group flex flex-col gap-1">
              <span className="text-sm uppercase text-zinc-300">Format</span>
              <span className="w-full max-w-max">{data.Filetype}</span>
            </div>
            <div className="group flex flex-col gap-1">
              <span className="text-sm uppercase text-zinc-300">Tags</span>
              <span className="w-full max-w-max">{data.Tags.join(", ")}</span>
            </div>
            <div className="group flex flex-col gap-1">
              <span className="text-sm uppercase text-zinc-300">ENS</span>
              <span className="w-full max-w-max">{data.ENS}</span>
            </div>
            <div className="group flex flex-col gap-1">
              <span className="text-sm uppercase text-zinc-300">ID</span>
              <span className="w-full max-w-max">{data.ID}</span>
            </div>
            <div className="group flex flex-col gap-1">
              <span className="text-sm uppercase text-zinc-300">
                Submission Status
              </span>
              <span className="w-full max-w-max uppercase">
                {data.SubmissionStatus}
              </span>
            </div>
            <div className="group flex flex-col gap-1">
              <span className="text-sm uppercase text-zinc-300">Status</span>
              <span className="w-full max-w-max uppercase">{data.Status}</span>
            </div>
          </GridCol>
        </GridRow>
      </GridCard>

      <GridCard title="back" link="/dashboard/submissions"></GridCard>
    </div>
  );
};
export default DetailsPage;

const GridCard = ({
  title,
  children,
  link,
}: {
  title: string;
  children?: React.ReactNode;
  link?: string;
}) => {
  return (
    <div className="flex w-full flex-col items-start border-2 border-zinc-700">
      <div
        className={`self-align-start inset-0 flex w-full flex-col items-start gap-8 
            border-b-2 border-zinc-700 bg-zinc-900 px-16 py-8`}
      >
        <div className="flex w-full flex-row justify-between">
          {link ? (
            <Link href={link as Route}>
              <h1 className="font-jetbrains text-lg uppercase hover:text-prim">
                {title}
              </h1>
            </Link>
          ) : (
            <span className="font-jetbrains text-lg uppercase">{title}</span>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

const GridRow = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`${className} flex w-full flex-row`}>{children}</div>;
};

const GridCol = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`${className} flex h-full flex-col`}>{children}</div>;
};
