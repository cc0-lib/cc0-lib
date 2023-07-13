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
      <div className="duration-250 peer flex w-full flex-col gap-8 bg-transparent px-4 py-16 text-prim  drop-shadow-md transition-all ease-linear selection:bg-zinc-800 selection:text-sec placeholder:text-zinc-600 focus:rounded-sm focus:bg-zinc-800 focus:bg-opacity-50 focus:outline-none focus:backdrop-blur-md sm:p-16">
        {/* <span className="font-rubik text-4xl sm:text-6xl">wtf is this?</span> */}
        <Title>wtf is this?</Title>
        <Description>
          library of cc0 content for you to refer/use/remix/do whatever with it
        </Description>

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

        <Title>who worked on this?</Title>
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

        <Title>leaderboard</Title>
        <Description>
          who&apos;s the greatest contributor? find out{" "}
          <Link
            href="/leaderboard"
            className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
          >
            here
          </Link>
        </Description>

        <Title>contribute</Title>
        <Description>
          contribute{" "}
          <Link
            href="/contribute"
            className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
          >
            here
          </Link>
        </Description>

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

        <Title>sitemap</Title>
        <Description>
          <Link
            href="/sitemap"
            className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
          >
            explore
          </Link>
        </Description>

        <Title>fun mode</Title>
        <Description>
          browse{" "}
          <Link
            href="/random"
            className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
          >
            here
          </Link>
        </Description>

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
      </div>
    </Container>
  );
};
export default InfoPage;

const Title = ({ children }) => (
  <span className="font-rubik text-4xl sm:text-6xl">{children}</span>
);

const Description = ({ children }) => (
  <span className="w-full max-w-prose text-lg text-white sm:w-1/2">
    {children}
  </span>
);
