import { Route } from "next";
import Link from "next/link";
import UploadModule from "./upload";

type Props = {};
const UploaderPage = (props: Props) => {
  return (
    <>
      <GridCard title="uploader">
        <div className="flex h-fit w-full flex-col items-center justify-center gap-8 p-8 text-zinc-700">
          <UploadModule />
        </div>
      </GridCard>
      <GridCard title="back" link="/dashboard"></GridCard>
    </>
  );
};
export default UploaderPage;

const GridCard = ({
  title,
  children,
  link,
}: {
  title: string;
  children?: React.ReactNode;
  link?: string;
}) => {
  return (
    <div className="flex w-full flex-col items-start border-2 border-zinc-700">
      <div
        className={`self-align-start inset-0 flex w-full flex-col items-start gap-8 
            border-b-2 border-zinc-700 bg-zinc-900 px-16 py-8`}
      >
        <div className="flex w-full flex-row justify-between">
          {link ? (
            <Link href={link as Route}>
              <h1 className="font-jetbrains text-lg uppercase hover:text-prim">
                {title}
              </h1>
            </Link>
          ) : (
            <span className="font-jetbrains text-lg uppercase">{title}</span>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};
