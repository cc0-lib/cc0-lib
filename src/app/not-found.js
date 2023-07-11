import Link from "next/link";

const NotFound = () => {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between bg-zinc-900 bg-grid p-12
        font-spline text-white selection:bg-zinc-800 selection:text-prim dark:text-white"
    >
      <header className="z-10 flex w-full flex-row items-center justify-between sm:px-8"></header>

      <Link href="/">
        <h1 className="bg-zinc-800 px-12 py-6 font-chakra text-5xl uppercase text-orange-600 hover:bg-orange-600 hover:text-zinc-800 sm:text-9xl">
          NOT FOUND
        </h1>
      </Link>

      <footer className="mt-4 flex w-full flex-row items-center justify-between sm:px-8"></footer>
    </main>
  );
};
export default NotFound;
