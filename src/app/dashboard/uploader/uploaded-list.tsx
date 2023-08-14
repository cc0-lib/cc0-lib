"use client";

import { fetchUploadedData } from "./actions";
import { useCallback, useEffect, useState } from "react";
import UploaderTableItem from "@/components/dashboard/uploader/table-item";
import GridCard from "@/components/dashboard/uploader/grid-card";

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
  }, [ens]);

  const exportCSV = useCallback(() => {
    const data = uploadedData.map(({ node }) => {
      const name = node.tags.find((tag) => tag.name === "Filename")?.value;
      const type = node.tags.find((tag) => tag.name === "Content-Type")?.value;
      const date = new Date(node.timestamp).toLocaleDateString();
      const time = new Date(node.timestamp).toLocaleTimeString();

      return {
        name: name,
        type: type,
        date: date,
        time: time,
        arweaveId: node.id,
        url: `https://arweave.net/${node.id}/${name}`,
      };
    });

    const csvRows: string[] = [];
    const headers: string[] = Object.keys(data[0]);
    const headersJoined = headers.join(",");
    csvRows.push(headersJoined);
    for (const row of data) {
      const values = headers.map((header) => {
        const escaped = ("" + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    }
    const csvData = csvRows.join("\n");
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", `uploader-${ens}-${Date.now()}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [uploadedData]);

  const exportJSON = useCallback(() => {
    const data = uploadedData.map(({ node }) => {
      const name = node.tags.find((tag) => tag.name === "Filename")?.value;
      const type = node.tags.find((tag) => tag.name === "Content-Type")?.value;
      const date = new Date(node.timestamp).toLocaleDateString();
      const time = new Date(node.timestamp).toLocaleTimeString();

      return {
        name: name,
        type: type,
        date: date,
        time: time,
        arweaveId: node.id,
        url: `https://arweave.net/${node.id}/${name}`,
      };
    });

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", `uploader-${ens}-${Date.now()}.json`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [uploadedData]);

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
      <GridCard
        className="text-white"
        title="Export all data"
        subtitle={
          <div className="flex flex-row items-center gap-8 text-lg uppercase text-zinc-200">
            <button
              className="hover:text-prim"
              onClick={() => {
                exportCSV();
              }}
            >
              CSV
            </button>
            <button
              className="hover:text-prim"
              onClick={() => {
                exportJSON();
              }}
            >
              JSON
            </button>
          </div>
        }
      />
    </>
  );
};
export default UploadedListPage;
