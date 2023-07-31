import Container from "@/components/ui/container";
import { staticPages } from "@/lib/constant";
import { getAllItems, shuffle, slugify } from "@/lib/utils";
import Link from "next/link";

export const generateMetadata = async () => {
  const title = `Sitemap | CC0-LIB`;
  const description = "CC0-LIB sitemap";
  const image = `https://cc0-lib.wtf/og.png`;
  const url = `https://cc0-lib.wtf/sitemap`;

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

const SiteMapPage = async () => {
  const data = await getAllItems();

  const tagsList: string[] = shuffle(
    Array.from(
      new Set(
        data
          .map((item) => {
            if (!item.Tags) return [];
            return item.Tags;
          })
          .flat()
      )
    )
  );

  const typeList: string[] = shuffle(
    Array.from(
      new Set(
        data
          .map((item) => {
            if (!item.Type) return [];
            return item.Type;
          })
          .flat()
      )
    )
  );

  const formatList: string[] = shuffle(
    Array.from(
      new Set(
        data
          .map((item) => {
            if (!item.Filetype) return [];
            return item.Filetype;
          })
          .flat()
      )
    )
  );

  const pages: string[] = shuffle(staticPages);

  return (
    <Container>
      <div className="duration-250 peer w-full bg-transparent px-4 py-16 font-rubik leading-8 text-prim drop-shadow-md transition-all ease-linear selection:bg-zinc-800 selection:text-sec placeholder:text-zinc-600 focus:rounded-sm focus:bg-zinc-800 focus:bg-opacity-50 focus:outline-none focus:backdrop-blur-md sm:p-16">
        {/* <div className="duration-250 peer flex w-full flex-col gap-8 bg-transparent px-4 py-16 text-prim  drop-shadow-md transition-all ease-linear selection:bg-zinc-800 selection:text-sec placeholder:text-zinc-600 focus:rounded-sm focus:bg-zinc-800 focus:bg-opacity-50 focus:outline-none focus:backdrop-blur-md sm:p-16"> */}

        {data.length > 0 && (
          <span className="mr-4 font-rubik text-2xl sm:text-4xl">
            {data.length} items in the library +++
          </span>
        )}
        {pages.map((page) => (
          <Link
            href={`/${page.toLowerCase()}`}
            className="mr-4 break-all text-2xl lowercase text-zinc-600 hover:text-prim sm:text-4xl"
            key={page}
          >
            {page}
          </Link>
        ))}
        {typeList.map((type) => (
          <Link
            href={`/?type=${type.toLowerCase()}`}
            className="mr-4 break-all text-2xl lowercase text-zinc-600 hover:text-prim sm:text-4xl"
            key={type}
          >
            {type}
          </Link>
        ))}
        {formatList.map((format) => (
          <Link
            href={`/?format=${format.toLowerCase()}`}
            className="mr-4 break-all text-2xl lowercase text-zinc-600 hover:text-prim sm:text-4xl"
            key={format}
          >
            {format}
          </Link>
        ))}
        {tagsList.map((tag) => (
          <Link
            href={`/?tag=${tag.toLowerCase()}`}
            className="mr-4 break-all text-2xl lowercase text-zinc-600 hover:text-prim sm:text-4xl"
            key={tag}
          >
            {tag}
          </Link>
        ))}
        {data.map((item) => (
          <Link
            href={`/${slugify(item.Title)}`}
            className="mr-4 break-all text-2xl lowercase text-zinc-600 hover:text-prim sm:text-4xl"
            key={item.id}
          >
            {item.Title}
          </Link>
        ))}
      </div>
    </Container>
  );
};
export default SiteMapPage;
