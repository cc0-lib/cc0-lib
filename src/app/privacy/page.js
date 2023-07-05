import { BookOpen, Dot, HelpingHand, Info, MoveLeft } from "lucide-react";
import Link from "next/link";

export const generateMetadata = async () => {
  const title = `Privacy Policy | CC0-LIB`;
  const description = "Privacy Policy";
  const image = `https://cc0-lib.wtf/og.png`;
  const url = `https://cc0-lib.wtf/privacy`;

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

const PrivacyPage = () => {
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
          <BookOpen className="inline-block h-10 w-10" /> Privacy Policy
        </h1>
        <p className="text-md flex w-full max-w-prose flex-col gap-4 lowercase text-white">
          <span>
            Thank you for visiting cc0-lib.wtf, our CC0 media website.
          </span>
          <span className="mb-4">
            This Privacy Policy outlines how we collect, use, and protect your
            personal information when you access and use our platform. By using
            cc0-lib.wtf, you consent to the practices described in this policy.
          </span>
          <span className=" text-xl text-prim">Information We Collect</span>
          <span>
            <Dot className="inline-block h-4 w-4" />
            Personal Information: We do not collect any personally identifiable
            information about you unless you voluntarily provide it to us
            through forms or communication channels on cc0-lib.wtf.
          </span>
          <span>
            <Dot className="inline-block h-4 w-4" />
            Non-Personal Information: We may collect non-personal information,
            such as your IP address, browser type, device information, and usage
            data, to analyze trends, administer the site, and gather demographic
            information.
          </span>

          <span className=" text-xl text-prim">Use of Information</span>
          <span>
            <Dot className="inline-block h-4 w-4" />
            Personal Information: Any personal information you provide may be
            used to respond to your inquiries, improve our services, and
            communicate with you.
          </span>
          <span>
            <Dot className="inline-block h-4 w-4" />
            Non-Personal Information: Non-personal information is used for
            statistical analysis, website administration, and to enhance user
            experience.
          </span>

          <span className=" text-xl text-prim">
            Cookies and Tracking Technologies
          </span>
          <span>
            <Dot className="inline-block h-4 w-4" />
            cc0-lib.wtf uses cookies and similar tracking technologies to
            enhance your browsing experience. Cookies are small files stored on
            your device that enable certain features and functionalities. You
            can manage your cookie preferences through your browser settings.
          </span>
          <span>
            <Dot className="inline-block h-4 w-4" />
            We may also use third-party analytics services that utilize cookies
            and other tracking technologies to collect and analyze
            non-personally identifiable information regarding website usage
            patterns.
          </span>

          <span className=" text-xl text-prim">Disclosure of Information</span>
          <span>
            <Dot className="inline-block h-4 w-4" />
            We highly value your privacy and do not sell, trade, or rent your
            personal information to third parties for marketing purposes.
          </span>
          <span>
            <Dot className="inline-block h-4 w-4" />
            We may share your personal information with trusted third parties
            who assist us in operating our website, conducting business, or
            providing services. These third parties are required to maintain the
            confidentiality of your information.
          </span>
          <span>
            <Dot className="inline-block h-4 w-4" />
            We may disclose your information if required by law or in good faith
            belief that such action is necessary to protect our rights, comply
            with legal processes, or protect the safety and security of our
            users.
          </span>
          <span>
            <Dot className="inline-block h-4 w-4" />
            We will only disclose your personal information outside the scope
            mentioned above with your explicit consent or as otherwise permitted
            by applicable privacy laws.
          </span>

          <span className=" text-xl text-prim">
            Links to Third-Party Websites
          </span>
          <span>
            <Dot className="inline-block h-4 w-4" />
            cc0-lib.wtf may contain links to third-party websites. We are not
            responsible for the privacy practices or content of such websites.
            We encourage you to review the privacy policies of third-party sites
            before providing any personal information.
          </span>

          <span className=" text-xl text-prim">Security</span>
          <span>
            <Dot className="inline-block h-4 w-4" />
            We implement reasonable security measures to protect the
            confidentiality and integrity of any personal information we
            collect. However, no data transmission over the internet or
            electronic storage can be guaranteed to be 100% secure. We cannot
            ensure or warrant the security of any information you transmit to
            us.
          </span>

          <span className=" text-xl text-prim">Children’s Privacy</span>
          <span>
            <Dot className="inline-block h-4 w-4" />
            cc0-lib.wtf is not intended for individuals under the age of 13. We
            do not knowingly collect or solicit personal information from
            children. If we become aware that we have collected personal
            information from a child without parental consent, we will promptly
            delete it from our records.
          </span>

          <span className=" text-xl text-prim">
            Changes to the Privacy Policy
          </span>
          <span>
            <Dot className="inline-block h-4 w-4" />
            This Privacy Policy may be updated from time to time. Any changes
            will be posted on this page, along with the effective date of the
            revised policy.
          </span>

          <span className="mt-4">
            If you have any questions or concerns regarding this privacy policy,
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
export default PrivacyPage;
