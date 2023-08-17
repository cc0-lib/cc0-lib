import Container from "@/components/ui/container";
import { getRawItems, getDraftItems } from "@/lib/utils";
import Image from "next/image";

type Props = {};
const TestPage = async (props: Props) => {
  const data = await getDraftItems();
  const items = data as Item[];

  const checkIfImage = (url) => {
    const allowedContentTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];

    if (allowedContentTypes.includes(url)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Container>
      <div className="masonry-lg w-full p-16">
        {items && <span>{items.length} items found</span>}
        {items &&
          items.map((item: Item) => (
            <div
              className="w-full max-w-4xl break-inside-avoid p-8 text-xs"
              key={item.id}
            >
              {item.Thumbnails && item.Thumbnails.length > 0 && (
                <Image
                  src={
                    item.Thumbnails[0].url
                      ? item.Thumbnails[0]?.url
                      : "https://placehold.co/200x200"
                  }
                  alt={item.Title}
                  width={200}
                  height={200}
                />
              )}

              {item.ThumbnailURL && (
                <Image
                  src={
                    checkIfImage(item.ThumbnailURL)
                      ? item.ThumbnailURL
                      : "https://placehold.co/200x200"
                  }
                  alt={item.Title}
                  width={200}
                  height={200}
                />
              )}
            </div>
          ))}
      </div>
    </Container>
  );
};
export default TestPage;
