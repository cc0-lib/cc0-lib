"use client";

import { useCallback, useEffect, useState } from "react";
import { useAccount, useEnsName } from "wagmi";
import { getSubmissionData } from "@/app/dashboard/actions";
import { TestENS, TestMode } from "@/lib/constant";
import Link from "next/link";
import { slugify } from "@/lib/utils";

const SubmissionData = async () => {
  const { address } = useAccount();

  const [submissionData, setSubmissionData] = useState<Item[]>([]);

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
    const filteredData = res.data.filter((item) => item.Status === "published");
    setSubmissionData(filteredData);
  }, [ens]);

  useEffect(() => {
    if (ens) {
      fetchData();
    }
  }, [ens]);

  return (
    <>
      {submissionData && submissionData.length > 0 ? (
        <GridContent className="flex h-48 w-full flex-col items-start justify-around gap-4 text-zinc-400">
          {submissionData.slice(0, 4).map((item, index) => {
            return (
              <Link
                href={`/${slugify(item.Title)}`}
                key={item.id}
                className="hover:text-prim"
              >
                {item.Title}
              </Link>
            );
          })}
        </GridContent>
      ) : (
        <GridNumber>N/A</GridNumber>
      )}
    </>
  );
};
export default SubmissionData;

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
