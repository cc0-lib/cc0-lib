import Link from "next/link";
import { HelpingHand, Info, MoveLeft, TrophyIcon } from "lucide-react";

const Header = () => {
  return (
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
          <Link href="/info" className="group flex flex-row items-center gap-2">
            <span className="duration-250 opacity-0 transition-all ease-linear group-hover:opacity-100">
              info
            </span>
            <Info className="h-8 w-8 group-hover:stroke-prim" />
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
