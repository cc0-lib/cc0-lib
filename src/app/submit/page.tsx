import Header from "@/components/ui/header";

export const generateMetadata = async () => {
  const title = `Submit | CC0-LIB`;
  const description = "Submit CC0 content to CC0-LIB";
  const image = `https://cc0-lib.wtf/og.png`;
  const url = `https://cc0-lib.wtf/submit`;

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

const SubmissionPage = () => {
  return (
    <>
      <Header />
      <iframe
        title="CC0-LIB Submission Form"
        className="fixed inset-0 left-0 top-0 h-screen w-full border-0 bg-[#191919] px-2 pt-32"
        src="https://notionforms.io/forms/cc0-library-submission-r8hfbs"
      ></iframe>
    </>
  );
};
export default SubmissionPage;
