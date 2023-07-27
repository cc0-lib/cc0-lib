import { ReactNode } from "react";
import Marquee from "react-fast-marquee";

type TickerProps = {
  children: ReactNode;
  position: "bottom" | "top";
  className?: string;
};

const Ticker = ({ children, position, className }: TickerProps) => {
  return (
    <div
      className={`fixed ${position === "top" && `top-0`} ${
        position === "bottom" && `bottom-0`
      } ${className} left-0 z-30
       flex h-2 w-full flex-row items-center justify-center gap-4 bg-zinc-900/80
        py-3 font-chakra text-xs uppercase
         text-zinc-300 backdrop-blur-sm`}
    >
      <Marquee autoFill={true}>{children}</Marquee>
    </div>
  );
};

export default Ticker;
