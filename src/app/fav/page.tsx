import { getAllItems } from "@/lib/utils";
import FavPage from "./fav-page";

export const generateMetadata = async () => {
  const title = `Fav | CC0-LIB`;
  const description = "Favourite Content";
  const image = `https://cc0-lib.wtf/og.png`;
  const url = `https://cc0-lib.wtf/fav`;

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
      <FavPage initialData={data} />
    </>
  );
}
