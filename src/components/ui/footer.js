import Link from "next/link";
import { HelpingHand, MoveLeft } from "lucide-react";

const Footer = () => (
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
      <div className="group flex flex-row items-center gap-2" id="contribute">
        <span className="duration-250 opacity-0 transition-all ease-linear group-hover:opacity-100">
          contribute
        </span>
        <HelpingHand className="h-8 w-8 group-hover:stroke-prim" />
      </div>
    </Link>
  </footer>
);

export default Footer;
