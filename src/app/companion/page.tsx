import FileDownloader from "@/components/data/file-dl";
import Container from "@/components/ui/container";

import Image from "next/image";
import Link from "next/link";

export const generateMetadata = async () => {
  const title = `Companion | CC0-LIB`;
  const description = "Download Desktop Companion App to upload files for free";
  const image = `https://cc0-lib.wtf/og.png`;
  const url = `https://cc0-lib.wtf/companion`;

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

const CompanionPage = async () => {
  const images = [
    "https://arweave.net/xIO6XfPaj1tjIpCI0RwqoKnCHj_Zdka-4sWJ8Nb6484/cc0-lib-uploader-1.png",
    "https://arweave.net/k9LFVryRaN11IEpw_Rv0gycq0-90xXSZao_6XZ8CszE/cc0-lib-uploader-2.png",
    "https://arweave.net/54svwF8JNjHI2ZMA6tdrFTKujH3hWaWMXg9TcVzJW1M/cc0-lib-uploader-3.png",
    "https://arweave.net/Kg3ufcJiO1V_QFZCcHZGU9WW2CJFVVWtZf-mIlsaTOc/cc0-lib-uploader-5.png",
  ];

  const dmgURL = "https://r2.nero1.run/cc0-lib-uploader_0.4.0_universal.dmg";

  return (
    <Container>
      <div className="mt-24 flex w-full flex-col items-center justify-around gap-8 p-2">
        <h1 className="font-rubik text-4xl sm:text-6xl">
          cc0-lib desktop companion app
        </h1>
        <div>
          {images.map((image, index) => (
            <Image
              src={image}
              width={800}
              height={400}
              alt={`screenshot-${index + 1}`}
              key={image.split("/")[3]}
            />
          ))}
        </div>
      </div>

      <div className="mt-16 flex w-full max-w-xl flex-col items-start justify-center gap-8 p-2 text-prim">
        <span className="font-rubik text-4xl sm:text-6xl">source code</span>

        <Link
          href="https://github.com/cc0-lib/cc0-lib-companion-app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-prim"
        >
          <h1 className="font-rubik text-xl text-white hover:text-zinc-800 sm:text-lg">
            github.com/cc0-lib/cc0-lib-companion-app
          </h1>
        </Link>

        <span className="self-start font-rubik text-4xl sm:text-6xl">
          features
        </span>

        <ul className="w-full max-w-prose list-inside list-disc text-lg text-white">
          <li>store data permanently</li>
          <li>batch upload</li>
          <li>track your uploaded files</li>
          <li>max size per file: 4MB</li>
          <li>free, just need ENS</li>
        </ul>
      </div>
      <div className="mt-8 flex w-full max-w-xl flex-col items-start justify-center gap-4 p-2">
        <span className=" font-rubik text-4xl text-prim sm:text-6xl">
          download now
        </span>

        <div className="mt-8 flex flex-col items-start justify-center">
          <h1 className="font-rubik text-2xl sm:text-2xl">
            macOS universal (Intel & Apple Silicon)
          </h1>

          <FileDownloader
            data={{
              url: dmgURL,
              filename: "cc0-lib-uploader_0.4.0_universal.dmg",
            }}
            className="mt-8"
          />
        </div>
      </div>
    </Container>
  );
};
export default CompanionPage;
