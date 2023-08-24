"use client";

import { useCallback, useEffect, useState } from "react";
import { useAccount, useEnsName } from "wagmi";
import { getSubmissionData } from "@/app/dashboard/actions";
import { getComments, getViews } from "@/lib/redis";
import { TestENS, TestMode } from "@/lib/constant";

const SubmissionComments = async () => {
  const { address } = useAccount();

  const [submissionData, setSubmissionData] = useState<any[]>([]);
  const [submissionComments, setSubmissionComments] = useState<number>(0);

  let { data: ens } = useEnsName({
    address,
  });

  if (TestMode) {
    ens = TestENS;
  }

  const fetchData = useCallback(async () => {
    if (!ens) {
      return;
    }
    const res = await getSubmissionData(ens);
    if (res.count === 0) {
      return;
    }
    setSubmissionData(res.data);
  }, [ens]);

  useEffect(() => {
    if (ens) {
      fetchData();
    }
  }, [ens]);

  const getKVData = useCallback(async () => {
    if (submissionData && submissionData?.length > 0) {
      const comments = await Promise.all(
        submissionData.map(async (item) => {
          const comment = (await getComments(item.ID)) as any;
          return comment;
        })
      );

      if (comments && comments.length > 0) {
        setSubmissionComments(comments.length);
      }
    }
  }, [submissionData]);

  useEffect(() => {
    getKVData();
  }, [submissionData]);

  if (!submissionData || submissionData?.length === 0) {
    return (
      <>
        <GridNumber>N/A</GridNumber>
      </>
    );
  }

  return (
    <>
      <GridNumber color={submissionComments ? "active" : "inactive"}>
        {submissionComments ?? "N/A"}
      </GridNumber>
    </>
  );
};
export default SubmissionComments;

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
