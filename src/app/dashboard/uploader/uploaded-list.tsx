"use client";

import Image from "next/image";
import { fetchUploadedData } from "./actions";
import { useCallback, useEffect, useState } from "react";
import { addUploaded } from "@/lib/redis";
import Link from "next/link";

const UploadedListPage = ({ ens, address, uploaded }) => {
  const [uploadedData, setUploadedData] = useState<any[]>([]);
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

  useEffect(() => {
    if (uploadedDataCount > 0) {
      addUploaded(uploadedDataCount, address);
    }
  }, [uploadedDataCount]);

  return (
    <>
      <div className="h-96 w-full overflow-auto">
        <table className="w-full table-auto border border-zinc-800 font-jetbrains uppercase text-zinc-200">
          <thead className="sticky -top-1 bg-zinc-950">
            <tr>
              <th className="border border-zinc-800 px-2">+++</th>
              <th className="w-full border border-zinc-800 px-4 py-4 text-left">
                Filename
              </th>

              <th className="border border-zinc-800 px-4 text-left">Type</th>

              <th className="border border-zinc-800 px-4 text-left">
                Arweave ID
              </th>

              <th className="border border-zinc-800 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {uploadedData &&
              uploadedData.length > 1 &&
              uploadedData.map((e) => {
                return <TableItem node={e.node} />;
              })}
          </tbody>
        </table>

        {uploadedDataCount === 0 && (
          <div className="flex h-full w-full items-center justify-center">
            <h1 className="uppercase text-zinc-200">No uploads yet</h1>
          </div>
        )}
      </div>
      {/* {uploadedDataCount > 0 && (
        <div className="flex h-full w-full items-center justify-center">
          <h1 className="uppercase text-zinc-200">
            {uploadedDataCount} uploads
          </h1>
        </div>
      )} */}
    </>
  );
};
export default UploadedListPage;

const TableItem = async ({ node }) => {
  const checkIfImage = (node) => {
    const allowedContentTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];

    const contentTypes = node.tags
      .filter((tag) => tag.name === "Content-Type")
      .map((tag) => tag.value);

    const isImage = contentTypes.some((contentType) =>
      allowedContentTypes.includes(contentType)
    );
    return isImage;
  };

  return (
    <tr key={node.id} className="font-spline normal-case">
      <td className="p-2">
        <Image
          src={
            (await checkIfImage(node))
              ? `https://arweave.net/${node.id}`
              : "https://placehold.co/32x32/black/white/svg?text=cc0-lib&font=roboto"
          }
          alt="logo"
          width={32}
          height={32}
          className="h-8 w-8 items-center justify-center object-contain"
        />
      </td>
      <td className="border border-zinc-800 px-4 py-2">
        <h1>
          {node.tags.map((tag) => {
            if (tag.name === "Filename") {
              return tag.value;
            }
          })}
        </h1>
      </td>
      <td className="border border-zinc-800 px-4 uppercase">
        {node.tags.map((tag) => {
          if (tag.name === "Content-Type") {
            return tag.value;
          }
        })}
      </td>
      <td className="border border-zinc-800 px-4">{node.id}</td>
      {/* <td className="border border-zinc-800 px-4">{status}</td> */}

      <td className="border border-zinc-800 px-4 uppercase hover:text-prim">
        <Link
          href={`https://arweave.net/${node.id}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <>View</>
        </Link>
      </td>
    </tr>
  );
};
