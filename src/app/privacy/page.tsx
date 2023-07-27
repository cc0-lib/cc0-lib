import Container from "@/components/ui/container";
import { BookOpen, Dot } from "lucide-react";

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
    <Container>
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

          <Point
            title="Information We Collect"
            subs={[
              "Personal Information: We do not collect any personally identifiable information about you unless you voluntarily provide it to us through forms or communication channels on cc0-lib.wtf.",
              "Non-Personal Information: We may collect non-personal information, such as your IP address, browser type, device information, and usage data, to analyze trends, administer the site, and gather demographic information.",
            ]}
          />

          <Point
            title="Use of Information"
            subs={[
              "Personal Information: Any personal information you provide may be used to respond to your inquiries, improve our services, and communicate with you.",
              "Non-Personal Information: Non-personal information is used for statistical analysis, website administration, and to enhance user experience.",
            ]}
          />

          <Point
            title="Cookies and Tracking Technologies"
            subs={[
              "cc0-lib.wtf uses cookies and similar tracking technologies to enhance your browsing experience. Cookies are small files stored on your device that enable certain features and functionalities. You can manage your cookie preferences through your browser settings.",
              "We may also use third-party analytics services that utilize cookies and other tracking technologies to collect and analyze non-personally identifiable information regarding website usage patterns.",
            ]}
          />

          <Point
            title="Disclosure of Information"
            subs={[
              "We highly value your privacy and do not sell, trade, or rent your personal information to third parties for marketing purposes.",
              "We may share your personal information with trusted third parties who assist us in operating our website, conducting business, or providing services. These third parties are required to maintain the confidentiality of your information.",
              "We may disclose your information if required by law or in good faith belief that such action is necessary to protect our rights, comply with legal processes, or protect the safety and security of our users.",
              "We will only disclose your personal information outside the scope mentioned above with your explicit consent or as otherwise permitted by applicable privacy laws.",
            ]}
          />

          <Point
            title="Links to Third-Party Websites"
            subs={[
              "cc0-lib.wtf may contain links to third-party websites. We are not responsible for the privacy practices or content of such websites. We encourage you to review the privacy policies of third-party sites before providing any personal information.",
            ]}
          />

          <Point
            title="Security"
            subs={[
              "We implement reasonable security measures to protect the confidentiality and integrity of any personal information we collect. However, no data transmission over the internet or electronic storage can be guaranteed to be 100% secure. We cannot ensure or warrant the security of any information you transmit to us.",
            ]}
          />

          <Point
            title="Children’s Privacy"
            subs={[
              "cc0-lib.wtf is not intended for individuals under the age of 13. We do not knowingly collect or solicit personal information from children. If we become aware that we have collected personal information from a child without parental consent, we will promptly delete it from our records.",
            ]}
          />

          <Point
            title="Changes to the Privacy Policy"
            subs={[
              "This Privacy Policy may be updated from time to time. Any changes will be posted on this page, along with the effective date of the revised policy.",
            ]}
          />

          <Divider />

          <span className="mt-4">
            If you have any questions or concerns regarding this privacy policy,
            please contact us at cc0-lib[at]archives.wtf.
          </span>
          <span>Last updated: 5th July 2023</span>
        </p>
      </div>
    </Container>
  );
};
export default PrivacyPage;

const Point = ({ title, subs }: { title: string; subs: string[] }) => {
  return (
    <>
      <span className=" text-xl text-prim">{title}</span>

      {subs.map((sub) => (
        <span key={sub[0]}>
          <Dot className="inline-block h-4 w-4" />
          {sub}
        </span>
      ))}
    </>
  );
};

const Divider = () => {
  return <span className="h-4 w-full border-b-2 border-zinc-800"></span>;
};
