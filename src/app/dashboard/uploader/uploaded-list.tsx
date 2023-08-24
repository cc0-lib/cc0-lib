"use client";

import { fetchUploadedData } from "./actions";
import { useCallback, useEffect, useState } from "react";
import UploaderTableItem from "@/components/dashboard/uploader/table-item";
import GridCard from "@/components/dashboard/uploader/grid-card";
import { useSearchParams } from "next/navigation";

type BundlrFilteredData = Array<{ node: BundlrQueryResponseNode }>;

const UploadedListPage = ({
  ens,
  address,
  uploaded,
}: {
  ens: string;
  address: string;
  uploaded: boolean;
}) => {
  const [filteredData, setFilteredData] = useState<BundlrFilteredData>([]);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [sortType, setSortType] = useState<
    "name" | "type" | "date" | "arweaveId"
  >("date");

  const searchParams = useSearchParams();

  type SortType = "name" | "type" | "date" | "arweaveId";

  const sortBy = searchParams?.get("sortBy") as SortType;

  useEffect(() => {
    if (sortBy) {
      setSortType(sortBy);
    }
  }, [sortBy]);

  const fetchData = useCallback(() => {
    fetchUploadedData(ens).then((res) => {
      setFilteredData(res);
    });
  }, [ens]);

  useEffect(() => {
    const getTag = (node: BundlrQueryResponseNode, name: string) => {
      return node.tags.find((tag) => tag.name === name)?.value;
    };

    const getNodeItem = (node: BundlrQueryResponseNode, item: string) => {
      return node[item];
    };

    if (sortType) {
      const sortedData = filteredData.sort((a, b) => {
        const nameA = getTag(a.node, "Filename");
        const nameB = getTag(b.node, "Filename");
        const typeA = getTag(a.node, "Content-Type");
        const typeB = getTag(b.node, "Content-Type");
        const dateA = getNodeItem(a.node, "timestamp");
        const dateB = getNodeItem(b.node, "timestamp");
        const arweaveIdA = getNodeItem(a.node, "id");
        const arweaveIdB = getNodeItem(b.node, "id");

        if (nameA && nameB && sortType === "name") {
          return nameA.localeCompare(nameB);
        } else if (typeA && typeB && sortType === "type") {
          return typeA.localeCompare(typeB);
        } else if (dateA && dateB && sortType === "date") {
          return dateB - dateA;
        } else if (arweaveIdA && arweaveIdB && sortType === "arweaveId") {
          return arweaveIdA.localeCompare(arweaveIdB);
        }

        return 0;
      });
      setFilteredData(sortedData);
      setIsSorted(true);
    } else {
      setFilteredData(filteredData);
      setIsSorted(false);
    }

    return () => {
      setFilteredData([]);
      setIsSorted(false);
    };
  }, [sortType, filteredData]);

  const handleSortToggle = (type: SortType) => {
    setSortType(type);
    setFilteredData(filteredData.reverse());
    setIsSorted(!isSorted);
  };

  const exportCSV = useCallback(() => {
    const data = filteredData.map(({ node }) => {
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
  }, [filteredData]);

  const exportJSON = useCallback(() => {
    const data = filteredData.map(({ node }) => {
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
  }, [filteredData]);

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
                <button
                  onClick={() => handleSortToggle("name")}
                  className={`${
                    sortType === "name" && "text-prim"
                  } uppercase hover:text-prim`}
                >
                  Filename
                </button>
              </th>

              <th className="border border-zinc-800 px-4 text-left">
                <button
                  onClick={() => handleSortToggle("type")}
                  className={`${
                    sortType === "type" && "text-prim"
                  } uppercase hover:text-prim`}
                >
                  Type
                </button>
              </th>

              <th className="border border-zinc-800 px-4 text-left">
                <button
                  onClick={() => handleSortToggle("arweaveId")}
                  className={`${
                    sortType === "arweaveId" && "text-prim"
                  } uppercase hover:text-prim`}
                >
                  Arweave ID
                </button>
              </th>
              <th className="border border-zinc-800 px-4 text-right">
                <button
                  onClick={() => handleSortToggle("date")}
                  className={`${
                    sortType === "date" && "text-prim"
                  } uppercase hover:text-prim`}
                >
                  Date
                </button>
              </th>

              <th className="border border-zinc-800 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData &&
              filteredData.length > 1 &&
              filteredData.map((e) => {
                return <UploaderTableItem node={e.node} key={e.node.id} />;
              })}
          </tbody>
        </table>

        {filteredData.length === 0 && (
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
