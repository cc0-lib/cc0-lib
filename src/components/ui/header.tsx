import Link from "next/link";
import { Heart, Info, Loader2 } from "lucide-react";
import ConnectButton from "../connect-button";
import { Suspense } from "react";

const Header = () => {
  return (
    <header className="z-10 flex w-full flex-row items-center justify-between sm:px-8">
      <Link href="/" className="flex gap-2">
        <img
          src="./cc0lib.svg"
          alt="cc0lib logo"
          width={200}
          height={200}
          className="block sm:hidden"
        />
        <img
          src="./cc0lib-h.svg"
          alt="cc0lib logo horizontal"
          width={100}
          height={100}
          className="hidden w-40 sm:block"
        />
      </Link>

      <ul className="flex items-center gap-4">
        <li>
          <Link href="/fav" className="group flex flex-row items-center gap-2">
            <span className=" duration-250 hidden opacity-0 transition-all ease-linear group-hover:opacity-100 sm:block">
              fav
            </span>
            <Heart className="h-8 w-8 group-hover:stroke-prim" />
          </Link>
        </li>
        <li>
          <Link href="/info" className="group flex flex-row items-center gap-2">
            <span className="duration-250 hidden opacity-0 transition-all ease-linear group-hover:opacity-100 sm:block">
              info
            </span>
            <Info className="h-8 w-8 group-hover:stroke-prim" />
          </Link>
        </li>
        <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin" />}>
          <span className="sm:ml-8">
            <ConnectButton />
          </span>
        </Suspense>
      </ul>
    </header>
  );
};

export default Header;
