import Container from "@/components/ui/container";
import AISearchPage from "./search";
import { Suspense } from "react";

export const generateMetadata = async () => {
  const title = `AI Search | CC0-LIB`;
  const description = "Search using AI-assisted tool";
  const image = `https://cc0-lib.wtf/og.png`;
  const url = `https://cc0-lib.wtf/ai`;

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

const AIPage = () => {
  return (
    <Container>
      <div className="flex w-full flex-col items-center gap-8">
        <Suspense fallback={<div>Loading...</div>}>
          <AISearchPage />
        </Suspense>
      </div>
    </Container>
  );
};
export default AIPage;
