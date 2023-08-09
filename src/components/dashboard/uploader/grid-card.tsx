import { Route } from "next";
import Link from "next/link";

const GridCard = ({
  title,
  children,
  link,
  subtitle,
}: {
  title: string;
  children?: React.ReactNode;
  link?: string;
  subtitle?: string;
}) => {
  return (
    <div className="flex w-full flex-col items-start border-2 border-zinc-700">
      <div
        className={`self-align-start inset-0 flex w-full flex-col items-start gap-8 
              border-b-2 border-zinc-700 bg-zinc-900 px-16 py-8`}
      >
        <div className="flex w-full flex-row items-center justify-between">
          {link ? (
            <Link href={link as Route}>
              <h1 className="font-jetbrains text-lg uppercase hover:text-prim">
                {title}
              </h1>
            </Link>
          ) : (
            <span className="font-jetbrains text-lg uppercase">{title}</span>
          )}

          {subtitle && (
            <div className="flex max-w-md flex-row items-center justify-center gap-4 text-right font-jetbrains text-sm uppercase text-zinc-400">
              {subtitle}
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default GridCard;
