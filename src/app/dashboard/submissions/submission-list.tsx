"use client";

import { TestENS, TestMode } from "@/lib/constant";
import { slugify } from "@/lib/utils";
import {
  Clock4,
  Eye,
  FileCheck2,
  FileEdit,
  FilePlus2,
  FileQuestion,
  FileSearch,
  FileX2,
  Pencil,
  Send,
  View,
} from "lucide-react";
import { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount, useEnsName } from "wagmi";

type submissionListType = "draft" | "published" | "all";

type sortType = "title" | "id" | "type" | "format" | "status";

const SubmissionListPage = ({ rawData }: { rawData: Item[] }) => {
  const [data, setData] = useState<Item[]>([]);
  const [submissionListType, setSubmissionListType] =
    useState<submissionListType>("all");
  const [filteredData, setFilteredData] = useState<Item[]>([]);
  const [isSorted, setIsSorted] = useState<boolean>(false);

  const searchParams = useSearchParams();

  const draft = searchParams?.get("draft") as string;
  const published = searchParams?.get("published") as string;
  const all = searchParams?.get("all") as string;
  const sortBy = searchParams?.get("sortBy") as sortType;

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
        setFilteredData(draftData);
        setData(draftData);
      } else if (published && published?.length > 0) {
        const publishedData = filteredData.filter(
          (item) => item.Status === "published"
        );
        setSubmissionListType("published");
        setFilteredData(publishedData);
        setData(publishedData);
      } else {
        setSubmissionListType("all");
        setFilteredData(filteredData);
        setData(filteredData);
      }
    }
  }, [ens, published, draft, all]);

  useEffect(() => {
    if (
      sortBy &&
      sortBy?.length > 0 &&
      filteredData &&
      filteredData?.length > 0
    ) {
      const sortedData = filteredData.sort((a, b) => {
        if (sortBy === "title") {
          return a.Title.localeCompare(b.Title);
        }
        if (sortBy === "id") {
          return a.ID - b.ID;
        }
        if (sortBy === "type") {
          return a.Type.localeCompare(b.Type);
        }
        if (sortBy === "format") {
          return a.Filetype.localeCompare(b.Filetype);
        }
        if (sortBy === "status") {
          if (
            a.SubmissionStatus &&
            b.SubmissionStatus &&
            a.SubmissionStatus?.length > 0 &&
            b.SubmissionStatus?.length > 0
          ) {
            return a.SubmissionStatus.localeCompare(b.SubmissionStatus);
          }
        }
        return 0;
      });
      setData(sortedData);
    }
  }, [sortBy, filteredData]);

  const handleSortToggle = () => {
    setIsSorted((prevIsSorted) => !prevIsSorted);
  };

  useEffect(() => {
    if (isSorted) {
      setData(data.reverse());
    }
  }, [isSorted]);

  const act = (status: string) => {
    const statuses = ["preview", "edit"];
    if (status === "submitted" || status === "under-review") {
      const index = statuses.indexOf("edit");
      if (index > -1) {
        statuses.splice(index, 1);
      }
      statuses.push("wait");
    } else if (status === "draft") {
      statuses.push("submit");
    } else if (status === "approved") {
      statuses.push("view");
    }
    return statuses;
  };

  return (
    <GridCard title={`${submissionListType} Submissions by ${ens}`}>
      <GridCardSmall title="filter">
        <div className="flex flex-row items-center justify-between gap-4 font-jetbrains uppercase">
          <Link
            className={`${
              submissionListType === "published" && "text-prim"
            } hover:text-prim`}
            href={`?published=true` as Route}
          >
            Published
          </Link>
          <Link
            className={`${
              submissionListType === "draft" && "text-prim"
            } hover:text-prim`}
            href={`?draft=true` as Route}
          >
            Draft
          </Link>
          <Link
            className={`${
              submissionListType === "all" && "text-prim"
            } hover:text-prim`}
            href={`?all=true` as Route}
          >
            All
          </Link>
        </div>
      </GridCardSmall>
      <table className="w-full table-auto border border-zinc-800 font-jetbrains uppercase">
        <thead className="bg-zinc-950/70">
          <tr>
            <th className="border border-zinc-800 px-2">+++</th>
            <th className="w-full border border-zinc-800 px-4 py-4 text-left">
              <Link
                href={`?${submissionListType}=true&sortBy=title` as Route}
                onClick={handleSortToggle}
                className={`${
                  sortBy === "title" && "text-prim"
                } hover:text-prim`}
              >
                Title
              </Link>
            </th>
            <th className="border border-zinc-800 px-4 text-right">
              <Link
                href={`?${submissionListType}=true&sortBy=id` as Route}
                onClick={handleSortToggle}
                className={`${sortBy === "id" && "text-prim"} hover:text-prim`}
              >
                ID
              </Link>
            </th>
            <th className="border border-zinc-800 px-4 text-left">
              <Link
                href={`?${submissionListType}=true&sortBy=type` as Route}
                onClick={handleSortToggle}
                className={`${
                  sortBy === "type" && "text-prim"
                } hover:text-prim`}
              >
                Type
              </Link>
            </th>
            <th className="border border-zinc-800 px-4 text-right">
              <Link
                href={`?${submissionListType}=true&sortBy=format` as Route}
                onClick={handleSortToggle}
                className={`${
                  sortBy === "format" && "text-prim"
                } hover:text-prim`}
              >
                Format
              </Link>
            </th>
            <th className="border border-zinc-800 px-2 text-left">
              <Link
                href={`?${submissionListType}=true&sortBy=status` as Route}
                onClick={handleSortToggle}
                className={`${
                  sortBy === "status" && "text-prim"
                } hover:text-prim`}
              >
                <div className="h-full w-full p-4">
                  <FileQuestion className="h-6 w-6 items-center" />
                </div>
              </Link>
            </th>

            <th className="border border-zinc-800 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length > 0 &&
            data.map((item, index) => (
              <TableItem
                key={item.id}
                title={item.Title}
                type={item.Type}
                id={item.ID}
                format={item.Filetype}
                status={item.SubmissionStatus as string}
                actions={act(item.SubmissionStatus as string)}
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

const GridCardSmall = ({
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
              border-b-2 border-zinc-700 bg-zinc-900 px-16 py-4 pr-8`}
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
          {children}
        </div>
      </div>
    </div>
  );
};

const TableItem = ({
  title,
  type,
  id,
  format,
  status,
  actions,
  imageUri,
}: {
  title: string;
  type: string;
  id: number;
  format: string;
  status: string;
  actions: string[];
  imageUri: string;
}) => {
  const submissionEdit: boolean = true;

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
      <td className="border border-zinc-800 px-4 uppercase text-zinc-200">
        <div className="flex flex-row items-center justify-start gap-2">
          {actions &&
            title &&
            title.length > 0 &&
            actions.map((action) => {
              if (action === "view") {
                return (
                  <span className="text-lg" key={action}>
                    <Link href={`/${slugify(title)}` as Route}>
                      <View className="h-5 w-5 hover:text-prim" />
                    </Link>
                  </span>
                );
              }
              if (action === "edit") {
                return (
                  <span className="text-lg" key={action}>
                    {submissionEdit ? (
                      <Link
                        href={
                          `/dashboard/submissions/edit/${slugify(
                            title
                          )}` as Route
                        }
                      >
                        <Pencil className="h-5 w-5 hover:text-prim" />
                      </Link>
                    ) : (
                      <Pencil className="h-5 w-5 text-zinc-700" />
                    )}
                  </span>
                );
              }
              if (action === "preview") {
                return (
                  <span className="text-lg" key={action}>
                    <Link
                      href={`/dashboard/submissions/${slugify(title)}` as Route}
                    >
                      <Eye className="h-5 w-5 hover:text-prim" />
                    </Link>
                  </span>
                );
              }
              if (action === "wait") {
                return (
                  <span className="text-lg" key={action}>
                    <Clock4 className="h-5 w-5" />
                  </span>
                );
              }
            })}
          {/* {title && title.length > 0 && action === "preview" && (
            // <td className="border border-zinc-800 px-4 uppercase text-zinc-700 hover:text-prim">
            <Link href={`/dashboard/submissions/${slugify(title)}` as Route}>
              {action}
            </Link>
            // </td>
          )}
          {title && title.length > 0 && action === "view" && (
            // <td className="border border-zinc-800 px-4 uppercase text-zinc-700 hover:text-prim">
            <Link href={`/${slugify(title)}` as Route}>{action}</Link>
            // </td>
          )}
          {title && title.length > 0 && action === "edit" && (
            // <td className="border border-zinc-800 px-4 uppercase text-zinc-700 hover:text-prim ">
            <Link
              href={`/dashboard/submissions/edit/${slugify(title)}` as Route}
            >
              {action}
            </Link>
            // </td>
          )}
          {title && title.length > 0 && action === "submit" && (
            // <td className="border border-zinc-800 px-4 uppercase text-zinc-700 hover:text-prim ">
            <div className="flex flex-row items-center justify-center gap-2"></div>
            // </td>
          )}
          {title && title.length > 0 && action === "wait" && (
            // <td className="border border-zinc-800 px-4 uppercase text-zinc-700">
            <>{action}</>
            // </td>
          )} */}
        </div>
      </td>
    </tr>
  );
};
