import { getAllItems } from "@/lib/utils";
import FrontPage from "./front-page";

export const generateMetadata = async () => {
  const title = `CC0-LIB`;
  const description = "CC0-LIB is a free and open source library of CC0 assets";
  const image = `https://cc0-lib.wtf/og.png`;
  const url = `https://cc0-lib.wtf`;

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

export default async function Home() {
  const data = await getAllItems();

  return (
    <>
      <FrontPage initialData={data} />
    </>
  );
}
