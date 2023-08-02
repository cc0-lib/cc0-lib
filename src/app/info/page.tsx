import Link from "next/link";
import Container from "@/components/ui/container";

export const generateMetadata = async () => {
  const title = `Info | CC0-LIB`;
  const description = "What is CC0-LIB";
  const image = `https://cc0-lib.wtf/og.png`;
  const url = `https://cc0-lib.wtf/info`;

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

const InfoPage = () => {
  return (
    <Container>
      <div className="sm:masonry sm:masonry-sm lg:masonry-md 2xl:masonry-lg flex w-full flex-col gap-8 px-4 py-16 text-prim sm:block sm:gap-0 sm:space-y-16 sm:px-16 sm:py-16">
        <Card>
          <Title>wtf is this?</Title>
          <Description>
            library of cc0 content for you to refer/use/remix/do whatever with
            it
          </Description>
        </Card>

        <Card>
          <Title>what is cc0</Title>
          <Description>
            learn more about{" "}
            <Link
              href="https://creativecommons.org/publicdomain/zero/1.0"
              target="_blank"
              rel="noreferrer noopener"
              className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
            >
              creative commons zero
            </Link>
          </Description>
        </Card>

        <Card>
          <Title>team</Title>
          <Description>
            the same team that brought you{" "}
            <Link
              href="https://archives.wtf"
              target="_blank"
              rel="noreferrer noopener"
              className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
            >
              archives.wtf
            </Link>{" "}
            -{" "}
            <Link
              href="https://twitter.com/thevoadz"
              target="_blank"
              rel="noreferrer noopener"
              className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
            >
              voadz
            </Link>{" "}
            and{" "}
            <Link
              href="https://twitter.com/0xNeroOne"
              target="_blank"
              rel="noreferrer noopener"
              className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
            >
              neroone
            </Link>
          </Description>
        </Card>

        <Card>
          <Title>leaderboard</Title>
          <Description>
            who&apos;s the greatest{" "}
            <Link
              href="/leaderboard"
              className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
            >
              contributor?
            </Link>
          </Description>
        </Card>

        <Card>
          <Title>contribute</Title>
          <Description>
            be a{" "}
            <Link
              href="/contribute"
              className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
            >
              contributor
            </Link>
          </Description>
        </Card>

        <Card>
          <Title>changelog</Title>
          <Description>
            check{" "}
            <Link
              href="/log"
              className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
            >
              what&apos;s new
            </Link>
          </Description>
        </Card>

        <Card>
          <Title>sitemap</Title>
          <Description>
            <Link
              href="/sitemap"
              className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
            >
              explore
            </Link>
          </Description>
        </Card>

        <Card>
          <Title>fun mode</Title>
          <Description>
            browse{" "}
            <Link
              href="/random"
              className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
            >
              content
            </Link>
          </Description>
        </Card>

        <Card>
          <Title>intelligent search</Title>
          <Description>
            ai{" "}
            <Link
              href="/ai"
              className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
            >
              assisted search
            </Link>
          </Description>
        </Card>

        <Card>
          <Title>raycast</Title>
          <Description>
            get our companion{" "}
            <Link
              href="https://www.raycast.com/0xN1/cc0-lib"
              rel="noreferrer noopener"
              target="_blank"
              className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
            >
              raycast extension
            </Link>
          </Description>
        </Card>

        <Card>
          <Title>public api</Title>
          <Description>
            want to proliferate cc0 content? use our{" "}
            <Link
              href="/api"
              className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
            >
              public api
            </Link>
          </Description>
        </Card>

        <Card>
          <Title>privacy policy</Title>
          <Description>
            read our{" "}
            <Link
              href="/privacy"
              className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
            >
              privacy policy
            </Link>
          </Description>
        </Card>

        <Card>
          <Title>disclaimer</Title>
          <Description>
            read our{" "}
            <Link
              href="/disclaimer"
              className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
            >
              disclaimer
            </Link>
          </Description>
        </Card>

        <Card>
          <Title>donation</Title>
          <Description>
            <Link
              target="_blank"
              href="ethereum:0xcC0D45aD21224186e8C0450086aF57f30eD88CC0"
              className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
            >
              cc0-lib.eth
            </Link>
          </Description>
        </Card>

        <Card>
          <Title>support us!</Title>

          <Description>
            every purchase of this{" "}
            <Link
              target="_blank"
              rel="noreferrer noopener"
              href="https://zora.co/editions/zora:0xa219da25a9c147e29f825a75fab7d0e4faf4c692"
              title="cc0-lib NFT"
              className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
            >
              NFT
            </Link>{" "}
            will go towards the development of cc0-lib.
          </Description>
        </Card>

        <Card>
          <Title>ideas/request?</Title>
          <Description>
            submit your{" "}
            <Link
              target="_blank"
              href="https://cc0-lib.canny.io/feature-request"
              className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
            >
              ideas
            </Link>
          </Description>
        </Card>
      </div>
    </Container>
  );
};
export default InfoPage;

const Title = ({ children }) => (
  <span className="font-rubik text-4xl sm:text-4xl">{children}</span>
);

const Description = ({ children }) => (
  <span className="w-full max-w-prose text-lg text-white sm:w-1/2">
    {children}
  </span>
);

const Card = ({ children }) => (
  <div className="flex h-auto w-full break-inside-avoid flex-col gap-4 sm:ml-8">
    {children}
  </div>
);
