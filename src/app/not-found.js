import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <span></span>
      <Link href="/">
        <h1 className="bg-zinc-800 px-12 py-6 font-chakra text-5xl uppercase text-orange-600 hover:bg-orange-600 hover:text-zinc-800 sm:text-9xl">
          NOT FOUND
        </h1>
      </Link>
      <span></span>
    </>
  );
};
export default NotFound;
