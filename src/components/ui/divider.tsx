type DividerProps = {
  className?: string;
};

const Divider = ({ className }: DividerProps) => {
  return (
    <span
      className={`h-4 w-full border-b-2 border-zinc-800 ${className}`}
    ></span>
  );
};

export default Divider;
