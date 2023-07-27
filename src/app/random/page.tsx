import DownloadFile from "@/components/dl";
import Container from "@/components/ui/container";
import { getAllItems, slugify } from "@/lib/utils";
import { MoreHorizontal, RefreshCcw } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";

type RandomItem = {
  image: Image;
  data: Item;
};

type Image = {
  url: string;
};

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

  // const filteredData = data.filter(
  //   (item: Item) => item.Type.toLowerCase() === "audio"
  // );

  const formatData = (items: Item[]): RandomItem => {
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

  const image = randomData?.image?.url;

  const action = async () => {
    "use server";
    revalidatePath("/random");
  };

  return (
    <Container>
      <div className="flex flex-col items-center justify-center gap-8 p-2">
        <div className="items-center">
          <img
            src={image}
            alt="random image"
            width={384}
            height={384}
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
              <button aria-label="refresh content">
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
    </Container>
  );
};
export default RandomPage;
