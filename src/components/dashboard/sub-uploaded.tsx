"use client";

import { useCallback, useEffect, useState } from "react";
import { useAccount, useEnsName } from "wagmi";
import { TestENS, TestMode } from "@/lib/constant";
import { fetchUploadedData } from "@/app/dashboard/uploader/actions";

const UploadedCount = async () => {
  const [uploadedData, setUploadedData] = useState<any[]>([]);
  const [uploadedDataCount, setUploadedDataCount] = useState<number>(0);

  const { address } = useAccount();

  let { data: ens } = useEnsName({
    address,
  });

  if (TestMode) {
    ens = TestENS;
  }

  const fetchData = useCallback(() => {
    fetchUploadedData(ens as string).then((res) => {
      if (res.length > 0) {
        setUploadedDataCount(res.length);
        setUploadedData(res);
      }
    });
  }, [ens]);

  useEffect(() => {
    if (ens) {
      fetchData();
    }
  }, [ens]);

  if (!uploadedData || uploadedData?.length === 0) {
    return (
      <>
        <GridNumber>N/A</GridNumber>
      </>
    );
  }

  return (
    <>
      <GridNumber color={uploadedDataCount ? "active" : "inactive"}>
        {uploadedDataCount ?? "N/A"}
      </GridNumber>
    </>
  );
};
export default UploadedCount;

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
