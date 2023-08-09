"use client";

import { fetchUploadedData } from "./actions";
import { useCallback, useEffect, useState } from "react";
import UploaderTableItem from "@/components/dashboard/uploader/table-item";

const UploadedListPage = ({
  ens,
  address,
  uploaded,
}: {
  ens: string;
  address: string;
  uploaded: boolean;
}) => {
  const [uploadedData, setUploadedData] = useState<BundlrFilteredData>([]);
  const [uploadedDataCount, setUploadedDataCount] = useState<number>(0);

  const fetchData = useCallback(() => {
    fetchUploadedData(ens).then((res) => {
      setUploadedDataCount(res.length);
      setUploadedData(res);
    });
  }, [ens, uploaded]);

  useEffect(() => {
    if (ens) {
      fetchData();
    }
  }, [ens, uploaded]);

  return (
    <>
      <div className="h-96 w-full overflow-auto">
        <table className="w-full table-auto border border-zinc-800 font-jetbrains uppercase text-zinc-200">
          <thead className="sticky -top-1 bg-zinc-950">
            <tr>
              <th className="border border-zinc-800 px-2">+++++</th>
              <th className="w-full border border-zinc-800 px-4 py-4 text-left">
                Filename
              </th>

              <th className="border border-zinc-800 px-4 text-left">Type</th>

              <th className="border border-zinc-800 px-4 text-left">
                Arweave ID
              </th>
              <th className="border border-zinc-800 px-4 text-right">Date</th>

              <th className="border border-zinc-800 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {uploadedData &&
              uploadedData.length > 1 &&
              uploadedData.map((e) => {
                return <UploaderTableItem node={e.node} key={e.node.id} />;
              })}
          </tbody>
        </table>

        {uploadedDataCount === 0 && (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-jetbrains text-4xl uppercase text-zinc-200">
              No uploads found
            </span>
          </div>
        )}
      </div>
    </>
  );
};
export default UploadedListPage;
