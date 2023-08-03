"use client";

import { useCallback, useEffect, useState } from "react";
import { useAccount, useEnsName } from "wagmi";
import { getSubmissionData } from "@/app/dashboard/actions";
import { shuffle } from "@/lib/utils";
import {
  ArrowUpRight,
  FileCheck2,
  FileEdit,
  FilePlus2,
  FileSearch,
  FileX2,
} from "lucide-react";

const SubmissionStatusData = async () => {
  const { address } = useAccount();

  const [submissionCount, setSubmissionCount] = useState<number>(0);
  const [submissionData, setSubmissionData] = useState<any[]>([]);
  const [submmissionStatusData, setSubmissionStatusData] = useState<any[]>([]);

  const { data: ens } = useEnsName({
    address,
  });

  // const ens = "voadz.eth";

  const fetchData = useCallback(async () => {
    if (!ens) {
      return;
    }
    const res = await getSubmissionData(ens);
    setSubmissionData(res.data);
    setSubmissionCount(res.count);
  }, [ens]);

  useEffect(() => {
    if (ens) {
      fetchData();
    }
  }, [ens]);

  useEffect(() => {
    if (submissionData && submissionData?.length > 0) {
      const filteredData = submissionData.filter(
        (item) => item.Status === "draft"
      );
      // sort submission based on submission status. rejected > under-review > submitted > approved > draft
      const sortedData = filteredData.sort((a, b) => {
        if (a.SubmissionStatus === "rejected") {
          return -1;
        }
        if (a.SubmissionStatus === "under-review") {
          return -1;
        }
        if (a.SubmissionStatus === "submitted") {
          return -1;
        }
        if (a.SubmissionStatus === "approved") {
          return -1;
        }
        if (a.SubmissionStatus === "draft") {
          return -1;
        }
        return 1;
      });
      const shuffledData = shuffle(sortedData);
      setSubmissionStatusData(shuffledData);
    }
  }, [submissionData]);

  return (
    <>
      {submmissionStatusData && submmissionStatusData.length > 0 ? (
        <GridContent className="flex h-48 flex-col items-start justify-around gap-4 text-zinc-400">
          {submmissionStatusData.slice(0, 4).map((item, index) => {
            return (
              <span
                className="flex w-full flex-row items-center justify-between"
                key={item.id}
              >
                <h1>{item.Title}</h1>
                {item.SubmissionStatus && item.SubmissionStatus?.length > 0 && (
                  <span title={item.SubmissionStatus}>
                    {item.SubmissionStatus === "rejected" && (
                      <FileX2 className="h-5 w-5 text-red-400" />
                    )}
                    {item.SubmissionStatus === "under-review" && (
                      <FileSearch className="h-5 w-5 text-orange-400" />
                    )}
                    {item.SubmissionStatus === "submitted" && (
                      <FilePlus2 className="h-5 w-5 text-prim" />
                    )}
                    {item.SubmissionStatus === "approved" && (
                      <FileCheck2 className="h-5 w-5 text-green-400" />
                    )}
                    {item.SubmissionStatus === "draft" && (
                      <FileEdit className="h-5 w-5 text-zinc-300" />
                    )}
                  </span>
                )}
              </span>
            );
          })}
        </GridContent>
      ) : (
        <GridNumber>N/A</GridNumber>
      )}
    </>
  );
};
export default SubmissionStatusData;

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
