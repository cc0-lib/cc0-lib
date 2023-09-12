"use client";

import { useCallback, useEffect, useState } from "react";
import { useAccount, useEnsName } from "wagmi";
import { getSubmissionData } from "@/app/dashboard/actions";
import { SAMPLE_ENS, DEV_MODE } from "@/lib/constant";

const SubmissionCount = async () => {
  const { address } = useAccount();

  const [submissionCount, setSubmissionCount] = useState<number>(0);

  let { data: ens } = useEnsName({
    address,
  });

  if (DEV_MODE) {
    ens = SAMPLE_ENS;
  }

  const fetchData = useCallback(async () => {
    if (!ens) {
      return;
    }
    const res = await getSubmissionData(ens);
    if (res.count === 0) {
      return;
    }
    setSubmissionCount(res.count);
  }, [ens]);

  useEffect(() => {
    if (ens) {
      fetchData();
    }
  }, [ens]);

  return (
    <GridNumber
      color={submissionCount && submissionCount > 0 ? "active" : "inactive"}
    >
      {submissionCount && submissionCount > 0 ? submissionCount : "N/A"}
    </GridNumber>
  );
};
export default SubmissionCount;

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
