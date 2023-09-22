import ConnectButton from "@/components/web3/connect-button";
import { Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <>
      <div className="hidden md:block">
        <div className="flex h-auto w-full min-w-min max-w-7xl flex-col border-2 border-zinc-700">
          <header className="flex w-full flex-row items-center justify-between border-b-2 border-zinc-700 bg-zinc-900">
            <Link
              href="/"
              className="flex h-full flex-row items-center justify-start gap-8 border-r-2 border-zinc-700 px-16 py-8"
            >
              <Image src="/cc0lib.svg" alt="logo" width={60} height={60} />
              <Link href="/dashboard">
                <h1 className="mr-12 font-jetbrains text-xl uppercase hover:text-prim">
                  dashboard
                </h1>
              </Link>
            </Link>

            <div className="flex flex-row items-center justify-end gap-4 p-4">
              <Marquee className="font-jetbrains uppercase" pauseOnHover={true}>
                <div className="mr-8">
                  Dashboard is now out of beta. You can check add new
                  submission, view or edit your submissions and check statuses.
                  Please report any bugs at our{" "}
                  <Link
                    href="https://cc0-lib.canny.io/feature-request"
                    rel="noopener noreferrer"
                    target="_blank"
                    className=" underline hover:text-prim"
                  >
                    Canny page
                  </Link>
                  .
                </div>
                <div className="mr-8">
                  Uploader now support batch uploading. Max size is 4MB per
                  file.
                </div>
              </Marquee>
              <div className="px-4">
                <ConnectButton />
              </div>
            </div>
          </header>
          {children}
        </div>
      </div>
      <div className="flex h-auto min-h-screen w-full flex-col items-center justify-center md:hidden">
        <span className="font-jetbrains uppercase">
          Dashboard is not available on mobile. Please use a desktop browser.
        </span>
      </div>
    </>
  );
};
export default DashboardLayout;
