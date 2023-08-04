"use client";

import { TestENS, TestMode } from "@/lib/constant";
import { slugify } from "@/lib/utils";
import {
  Eye,
  FileCheck2,
  FileEdit,
  FilePlus2,
  FileQuestion,
  FileSearch,
  FileX2,
} from "lucide-react";
import { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount, useEnsName } from "wagmi";

const SubmissionListPage = ({ rawData }: { rawData: Item[] }) => {
  const [data, setData] = useState<Item[]>([]);
  const [submissionListType, setSubmissionListType] = useState<string>("");

  const searchParams = useSearchParams();

  const draft = searchParams?.get("draft") as string;
  const published = searchParams?.get("published") as string;

  console.log(draft, published);

  const { address } = useAccount();

  let { data: ens } = useEnsName({
    address,
  });

  if (TestMode) {
    ens = TestENS;
  }

  useEffect(() => {
    if (ens) {
      const filteredData = rawData.filter((item) => item.ENS === ens);

      if (draft && draft?.length > 0) {
        const draftData = filteredData.filter(
          (item) => item.Status === "draft"
        );
        setSubmissionListType("draft");
        setData(draftData);
      } else if (published && published?.length > 0) {
        const publishedData = filteredData.filter(
          (item) => item.Status === "published"
        );
        setSubmissionListType("published");
        setData(publishedData);
      } else {
        setSubmissionListType("all");
        setData(filteredData);
      }
    }
  }, [ens, published, draft]);

  const act = (status: string) => {
    if (status === "submitted" || status === "under-review") {
      return "wait";
    }
    return "edit";
  };

  return (
    <GridCard title={`${submissionListType} Submissions by ${ens}`}>
      <table className="w-full table-auto border border-zinc-800 font-jetbrains uppercase">
        <thead className="bg-zinc-950/70">
          <tr>
            <th className="border border-zinc-800 px-2">+++</th>
            <th className="w-full border border-zinc-800 px-4 py-4 text-left">
              Title
            </th>
            <th className="border border-zinc-800 px-4 text-right">ID</th>
            <th className="border border-zinc-800 px-4 text-left">Type</th>
            <th className="border border-zinc-800 px-4 text-right">Format</th>
            {/* <th className="border border-zinc-800 px-4 text-left">Status</th> */}
            <th className="border border-zinc-800 px-2 text-left">
              <div className="h-full w-full p-4">
                <FileQuestion className="h-6 w-6 items-center" />
              </div>
            </th>

            <th className="border border-zinc-800 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length > 0 &&
            data.map((item, index) => (
              <TableItem
                key={index}
                title={item.Title}
                type={item.Type}
                id={item.ID}
                format={item.Filetype}
                status={item.SubmissionStatus as string}
                action={act(item.SubmissionStatus as string)}
                imageUri={item.Thumbnails[0].url}
              />
            ))}
        </tbody>
      </table>
      <GridCard title="back" link="/dashboard"></GridCard>
    </GridCard>
  );
};
export default SubmissionListPage;

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

const TableItem = ({
  title,
  type,
  id,
  format,
  status,
  action,
  imageUri,
}: {
  title: string;
  type: string;
  id: number;
  format: string;
  status: string;
  action: string;
  imageUri: string;
}) => {
  return (
    <tr key={id} className="font-spline normal-case">
      <td className="p-2">
        <Image
          src={imageUri}
          alt="logo"
          width={32}
          height={32}
          className="h-8 w-8 items-center justify-center object-contain"
        />
      </td>
      <td className="border border-zinc-800 px-4 py-2">
        <Link
          href={`/dashboard/submissions/${slugify(title)}` as Route}
          className="w-max hover:text-prim"
        >
          <h1>{title}</h1>
        </Link>
      </td>
      <td className="border border-zinc-800 px-4 text-right">{id}</td>
      <td className="border border-zinc-800 px-4 uppercase">{type}</td>
      <td className="border border-zinc-800 px-4">{format}</td>
      {/* <td className="border border-zinc-800 px-4">{status}</td> */}
      <td className="border border-zinc-800 px-4">
        {status && status.length > 0 && (
          <span
            title={status}
            className="flex h-auto w-full items-center justify-center p-2"
          >
            {status === "rejected" && (
              <FileX2 className="h-5 w-5 text-red-400" />
            )}
            {status === "under-review" && (
              <FileSearch className="h-5 w-5 text-orange-400" />
            )}
            {status === "submitted" && (
              <FilePlus2 className="h-5 w-5 text-prim" />
            )}
            {status === "approved" && (
              <FileCheck2 className="h-5 w-5 text-green-400" />
            )}
            {status === "draft" && (
              <FileEdit className="h-5 w-5 text-zinc-300" />
            )}
          </span>
        )}
      </td>
      {title && title.length > 0 && action === "preview" && (
        <td className="border border-zinc-800 px-4 uppercase text-zinc-700 hover:text-prim">
          <Link href={`/dashboard/submissions/${slugify(title)}` as Route}>
            {action}
          </Link>
        </td>
      )}
      {title && title.length > 0 && action === "view" && (
        <td className="border border-zinc-800 px-4 uppercase text-zinc-700 hover:text-prim">
          <Link href={`/${slugify(title)}` as Route}>{action}</Link>
        </td>
      )}
      {title && title.length > 0 && action === "edit" && (
        <td className="border border-zinc-800 px-4 uppercase text-zinc-700 line-through ">
          <>{action}</>
        </td>
      )}
      {title && title.length > 0 && action === "wait" && (
        <td className="border border-zinc-800 px-4 uppercase text-zinc-700">
          <>{action}</>
        </td>
      )}
    </tr>
  );
};
