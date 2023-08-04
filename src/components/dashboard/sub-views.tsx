"use client";

import { useCallback, useEffect, useState } from "react";
import { useAccount, useEnsName } from "wagmi";
import { getSubmissionData } from "@/app/dashboard/actions";
import { getComments, getViews } from "@/lib/redis";
import { TestENS, TestMode } from "@/lib/constant";

const SubmissionViews = async () => {
  const { address } = useAccount();

  const [submissionData, setSubmissionData] = useState<any[]>([]);
  const [submissionViews, setSubmissionViews] = useState<number>(0);

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
    setSubmissionData(res.data);
  }, [ens]);

  useEffect(() => {
    if (ens) {
      fetchData();
    }
  }, [ens]);

  const getKVData = useCallback(async () => {
    if (submissionData && submissionData?.length > 0) {
      const views = await Promise.all(
        submissionData.map(async (item) => {
          const view = (await getViews(item.ID)) as any;
          return view;
        })
      );

      if (views && views.length > 0) {
        const sum = views.reduce((a, b) => a + b, 0);
        setSubmissionViews(sum);
      }
    }
  }, [submissionData]);

  useEffect(() => {
    getKVData();
  }, [submissionData]);

  return (
    <>
      <GridNumber color={submissionViews ? "active" : "inactive"}>
        {submissionViews ?? "N/A"}
      </GridNumber>
    </>
  );
};
export default SubmissionViews;

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
