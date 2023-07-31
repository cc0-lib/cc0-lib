import Container from "@/components/ui/container";
import { BookOpen } from "lucide-react";

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
    <Container>
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

          <Point
            title="Content Ownership"
            sub="cc0-lib.wtf serves as a platform for sharing Creative Commons Zero
            (CC0) licensed content. However, we do not claim ownership or
            authorship of the content available on this website. The content is
            contributed by various individuals and entities under the CC0
            license, which allows users to freely use, adapt, and distribute the
            content without any restrictions."
          />
          <Point
            title="Accuracy and Validity"
            sub=" While we strive to ensure the accuracy and validity of the content
            available on cc0-lib.wtf, we do not guarantee its completeness,
            reliability, or timeliness. We cannot be held accountable for any
            errors, omissions, or outdated information in the content provided."
          />
          <Point
            title="Use at Your Own Risk"
            sub="By using the content and materials from cc0-lib.wtf, you acknowledge
            and agree that you do so at your own risk. We are not responsible
            for any consequences that may arise from using the content,
            including but not limited to legal issues, loss of data, or damages
            to your computer systems."
          />
          <Point
            title="Content Attribution"
            sub="As per the CC0 license, attribution is not required for the content
            provided on cc0-lib.wtf. However, we encourage users to consider
            giving subtle credit to the original authors or creators of the
            content whenever possible. This helps people to acknowledge their
            contributions, grow their reach and find new audiences and support a
            culture of appreciation for creators."
          />
          <Point
            title="Third-Party Content"
            sub="cc0-lib.wtf may include links, references, or content from
            third-party sources for informational purposes. We are not
            responsible for the content, accuracy, or legality of any
            third-party websites or resources that may be accessed through these
            links. It is your responsibility to evaluate and use such resources
            at your own discretion."
          />
          <Point
            title="Changes to Terms"
            sub="This disclaimer page for cc0-lib.wtf may be updated from time to
            time without notice. We encourage you to review it regularly to stay
            informed about any modifications."
          />

          <Divider />

          <span className="mt-4">
            If you have any questions or concerns regarding this disclaimer,
            please contact us at cc0-lib[at]archives.wtf.
          </span>
          <span>Last updated: 5th July 2023</span>
        </p>
      </div>
    </Container>
  );
};
export default DisclaimerPage;

const Point = ({ title, sub }) => {
  return (
    <>
      <span className=" text-xl text-prim">{title}</span>
      <span>{sub}</span>
    </>
  );
};

const Divider = () => {
  return <span className="h-4 w-full border-b-2 border-zinc-800"></span>;
};
