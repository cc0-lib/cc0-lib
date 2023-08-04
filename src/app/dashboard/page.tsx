import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Suspense } from "react";
import { Route } from "next";
import SubmissionCount from "@/components/dashboard/sub-count";
import DashboardENS from "@/components/dashboard/ens";
import SubmissionData from "@/components/dashboard/sub-data";
import SubmissionStatusData from "@/components/dashboard/sub-status";
import SubmissionViews from "@/components/dashboard/sub-views";
import SubmissionComments from "@/components/dashboard/sub-comments";

type Props = {};
const DashBoard = (props: Props) => {
  return (
    <div>
      <div className="flex flex-row items-center justify-between border-b-2 border-zinc-700">
        <div className="flex h-full w-full flex-col items-start justify-start self-start">
          <div className="flex w-full flex-col items-start gap-8 border-2 border-zinc-800 p-8">
            <span className="font-jetbrains text-lg uppercase">Welcome</span>
            <span className="py-4 font-rubik text-5xl font-light  text-prim">
              <Suspense fallback={<>Loading</>}>
                <DashboardENS />
              </Suspense>
            </span>
          </div>
          <GridRow>
            <GridCard title="submissions" link="/dashboard/submissions">
              <Suspense fallback={<GridNumber>N/A</GridNumber>}>
                <SubmissionCount />
              </Suspense>
            </GridCard>
            <GridCard title="uploaded" link="/dashboard/uploader">
              {/* <GridNumber color={uploadedCount ? "active" : "inactive"}>
                {uploadedCount ?? "N/A"}
              </GridNumber> */}
              <GridNumber>N/A</GridNumber>
            </GridCard>
          </GridRow>

          <GridRow>
            <GridCard title="live submissions">
              <Suspense fallback={<GridNumber>N/A</GridNumber>}>
                <SubmissionData />
              </Suspense>
            </GridCard>
            <GridCard title="submission status" link="/dashboard/submissions">
              <Suspense fallback={<GridNumber>N/A</GridNumber>}>
                <SubmissionStatusData />
              </Suspense>
            </GridCard>
          </GridRow>
        </div>

        <GridCol className="flex flex-1 self-start">
          <GridCard title="views">
            <Suspense fallback={<GridNumber>XXX</GridNumber>}>
              <SubmissionViews />
            </Suspense>
          </GridCard>
          <GridCard title="comments">
            <Suspense fallback={<GridNumber>XXX</GridNumber>}>
              <SubmissionComments />
            </Suspense>
          </GridCard>
          <div className="flex h-max w-80 flex-col items-center justify-center">
            {/* <svg
              width="186"
              height="100"
              viewBox="0 0 186 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-4 mt-8"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M44.4901 0H94.3053V21.7628H54.9275L21.7544 63.1289V100H0V55.4782L44.4901 0ZM186 60.827H93.7614V39.0642H186V60.827ZM186 99.5647H93.7614V77.802H186V99.5647Z"
                fill="#E9FF5F"
              />
            </svg> */}

            <span className="mt-8 font-chakra text-9xl font-thin uppercase text-zinc-600">
              N/A
            </span>
            <span className="font-jetbrains text-sm uppercase text-zinc-600">
              [REDACTED]
            </span>
          </div>
        </GridCol>
      </div>
    </div>
  );
};
export default DashBoard;

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
            border-b-2 border-zinc-700 bg-zinc-900 p-8`}
      >
        <div className="flex w-full flex-row justify-between">
          <span className="font-jetbrains text-lg uppercase">{title}</span>
          {link && link.length > 0 && (
            <Link href={link as Route}>
              <ArrowUpRight className="h-6 w-6 text-zinc-600 hover:text-prim" />
            </Link>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

const GridNumber = ({
  children,
  className,
  color,
}: {
  children: React.ReactNode;
  className?: string;
  color?: "active" | "inactive";
}) => {
  return (
    <span
      className={`p-8 font-chakra text-9xl font-light uppercase ${
        color === "active" ? "text-prim" : "text-zinc-600"
      } ${className}`}
    >
      {children}
    </span>
  );
};

const GridContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <span className={`${className} p-8`}>{children}</span>;
};

const GridRow = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`${className} flex w-full flex-row`}>{children}</div>;
};

const GridCol = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`${className} flex h-full flex-col`}>{children}</div>;
};
