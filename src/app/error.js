"use client";

import Container from "@/components/ui/container";
import Link from "next/link";

const Error = () => {
  return (
    <Container>
      <Link href="/">
        <h1 className="bg-zinc-800 px-12 py-6 font-chakra text-5xl uppercase text-orange-600 hover:bg-orange-600 hover:text-zinc-800 sm:text-9xl">
          ERROR
        </h1>
      </Link>
    </Container>
  );
};
export default Error;
