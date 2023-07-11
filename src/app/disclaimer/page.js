import { BookOpen, HelpingHand, Info, MoveLeft } from "lucide-react";
import Link from "next/link";

export const generateMetadata = async () => {
  const title = `Disclaimer | CC0-LIB`;
  const description = "Disclaimer";
  const image = `https://cc0-lib.wtf/og.png`;
  const url = `https://cc0-lib.wtf/disclaimer`;

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

const DisclaimerPage = () => {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between bg-zinc-900 bg-grid p-12
      font-spline text-white selection:bg-zinc-800 selection:text-prim dark:text-white"
    >
      <header className="z-10 flex w-full flex-row items-center justify-between sm:px-8">
        <Link href="/" className="flex gap-2">
          <img src="./cc0lib.svg" alt="cc0lib" className="block sm:hidden" />
          <img
            src="./cc0lib-h.svg"
            alt="cc0lib"
            className="hidden w-40 sm:block"
          />
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

      <div className="focus:outline-noneation-250 focus:bg-zinc-8 peer flex w-full flex-col gap-8 bg-transparent px-4 py-16 text-white drop-shadow-md transition-all ease-linear selection:bg-zinc-800 selection:text-sec placeholder:text-zinc-600 focus:rounded-sm focus:bg-opacity-50 focus:backdrop-blur-md sm:p-16">
        <h1 className="font-rubik text-4xl text-prim dark:text-prim sm:text-6xl">
          <BookOpen className="inline-block h-10 w-10" /> disclaimer
        </h1>
        <p className="text-md flex w-full max-w-prose flex-col gap-4 lowercase text-white">
          <span>
            Thank you for visiting cc0-lib.wtf, our CC0 media website.
          </span>
          <span className="mb-4">
            Before you start using the content and materials provided on this
            platform, please take a moment to read and understand the following
            disclaimer:
          </span>
          <span className=" text-xl text-prim">Content Ownership</span>
          <span>
            cc0-lib.wtf serves as a platform for sharing Creative Commons Zero
            (CC0) licensed content. However, we do not claim ownership or
            authorship of the content available on this website. The content is
            contributed by various individuals and entities under the CC0
            license, which allows users to freely use, adapt, and distribute the
            content without any restrictions.
          </span>
          <span className="text-xl text-prim">Accuracy and Validity</span>
          <span>
            While we strive to ensure the accuracy and validity of the content
            available on cc0-lib.wtf, we do not guarantee its completeness,
            reliability, or timeliness. We cannot be held accountable for any
            errors, omissions, or outdated information in the content provided.
          </span>
          <span className="text-xl text-prim">Use at Your Own Risk</span>
          <span>
            By using the content and materials from cc0-lib.wtf, you acknowledge
            and agree that you do so at your own risk. We are not responsible
            for any consequences that may arise from using the content,
            including but not limited to legal issues, loss of data, or damages
            to your computer systems.
          </span>
          <span className="text-xl text-prim">Content Attribution</span>
          <span>
            As per the CC0 license, attribution is not required for the content
            provided on cc0-lib.wtf. However, we encourage users to consider
            giving subtle credit to the original authors or creators of the
            content whenever possible. This helps people to acknowledge their
            contributions, grow their reach and find new audiences and support a
            culture of appreciation for creators.
          </span>
          <span className="text-xl text-prim">Third-Party Content</span>
          <span>
            cc0-lib.wtf may include links, references, or content from
            third-party sources for informational purposes. We are not
            responsible for the content, accuracy, or legality of any
            third-party websites or resources that may be accessed through these
            links. It is your responsibility to evaluate and use such resources
            at your own discretion.
          </span>
          <span className="text-xl text-prim">Changes to Terms</span>
          <span>
            This disclaimer page for cc0-lib.wtf may be updated from time to
            time without notice. We encourage you to review it regularly to stay
            informed about any modifications.
          </span>
          <span>
            By using our CC0 media library website, cc0-lib.wtf, you agree to
            abide by the terms and conditions outlined in this disclaimer. If
            you do not agree with any of the terms, please refrain from using
            our platform.
          </span>
          <span className="mt-4">
            If you have any questions or concerns regarding this disclaimer,
            please contact us at cc0-lib[at]archives.wtf.
          </span>
          <span>Last updated: 5th July 2023</span>
        </p>
      </div>

      <footer className="mt-4 flex w-full flex-row items-center justify-between sm:px-8">
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
export default DisclaimerPage;
