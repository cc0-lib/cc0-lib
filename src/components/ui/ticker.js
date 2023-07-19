const Ticker = ({ children, position, className }) => {
  return (
    <div
      className={`fixed ${position === "top" && `top-0`} ${
        position === "bottom" && `bottom-0`
      } ${className} left-0 z-30
       flex h-2 w-full flex-row items-center justify-center gap-4 bg-zinc-900/80
        py-3 font-chakra text-xs uppercase
         text-zinc-300 backdrop-blur-sm`}
    >
      <marquee>{children}</marquee>
    </div>
  );
};

export default Ticker;
