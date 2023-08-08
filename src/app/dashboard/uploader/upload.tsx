"use client";

import { useAccount, useEnsName } from "wagmi";
import { TestENS, TestMode } from "@/lib/constant";
import { Suspense, useCallback, useEffect, useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import Link from "next/link";
import Image from "next/image";
import { FileQuestion, FileX2 } from "lucide-react";
import UploadedListPage from "./uploaded-list";

const secret = process.env.NEXT_PUBLIC_UPLOADER_SECRET_KEY as string;

type Props = {};
const UploadModule = async (props: Props) => {
  const { address } = useAccount();
  const [poolBalance, setPoolBalance] = useState<number>(0);
  const [log, setLog] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [blob, setBlob] = useState<any | null>(null);
  const [fileBuffer, setFileBuffer] = useState<any | null>(null);
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [arweaveURL, setArweaveURL] = useState<string>("");

  let { data: ens } = useEnsName({
    address,
  });

  //   if (TestMode) {
  //     ens = TestENS;
  //   }

  const handleUpload = useCallback(
    async (e: any) => {
      if (!file) {
        return;
      }
      setLog(`Uploading ${file.name}...`);

      const data = {
        name: file.name,
        type: file.type,
        ens: ens,
        file: fileBuffer,
      };

      const res = await fetch("/api/bundlr", {
        method: "POST",
        body: JSON.stringify({
          type: "uploadFile",
          secret: secret,
          data: data,
        }),
      });

      const { message, data: resData } = await res.json();

      setLog(message);
      setUploaded(true);
      setArweaveURL(resData.url);

      console.log(resData);
    },
    [file]
  );

  useEffect(() => {
    setLog("");
    setUploaded(false);
    setFile(null);
    setBlob(null);
    setFileBuffer(null);
  }, []);

  //   useEffect(() => {
  //     console.log(file);
  //     console.log(blob);
  //     //   console.log(fileBuffer);
  //   }, [file, blob, fileBuffer]);

  //   useEffect(() => {
  //     const res = fetch("/api/bundlr", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         type: "balance",
  //         secret: secret,
  //         data: {
  //           text: "hello",
  //         },
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then(({ data }) => {
  //         setPoolBalance(data.balance);
  //       });
  //   }, [uploaded]);

  return (
    <>
      {/* <span className="font-chakra text-5xl uppercase text-zinc-400">
        [upload module]
      </span> */}
      {ens && (
        <>
          {/* <span className="text-zinc-200">Welcome N1, you are verified.</span>
          <Suspense
            fallback={<span className="text-zinc-200">Loading...</span>}
          >
            {poolBalance > 0 && (
              <span className="text-zinc-200">
                Pool balance: {poolBalance} MATIC
              </span>
            )}
          </Suspense> */}
          <Suspense
            fallback={<span className="text-zinc-200">Loading...</span>}
          >
            <Dropzone
              onDrop={(acceptedFiles) => {
                const file = acceptedFiles[0];
                const reader = new FileReader();
                setFile(file);

                reader.onload = (e) => {
                  const res = e.target?.result;
                  if (!res) {
                    return;
                  }
                  setLog(`${file.name} loaded.`);
                  setFileBuffer(res);
                  const blob = new Blob([res], { type: file.type });
                  setBlob(blob);
                };

                const res = reader.readAsDataURL(file);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section className="w-full">
                  <div
                    {...getRootProps({
                      className:
                        "border-2 border-dashed border-zinc-700 p-40 text-zinc-200 w-full items-center text-center justify-center",
                    })}
                  >
                    <input {...getInputProps()} />
                    {file && (
                      <div className="flex flex-col items-center justify-center gap-4 text-center font-chakra text-3xl uppercase">
                        <span className="text-2xl text-prim">{file.name}</span>
                        <span className="text-xl">{file.size} bytes</span>
                      </div>
                    )}
                    {!file && (
                      <p className="text-center font-chakra text-3xl uppercase">
                        Drag &apos;n&apos; drop file here, or click to select
                        file
                      </p>
                    )}
                  </div>
                </section>
              )}
            </Dropzone>
          </Suspense>

          {file && (
            <div className="flex w-full flex-row items-center justify-between gap-8 p-4">
              <div>
                {log && log.length > 0 && (
                  <span className="h-auto whitespace-pre-line font-jetbrains text-zinc-200">
                    {log}
                  </span>
                )}{" "}
              </div>
              <div className="flex flex-row gap-8">
                <button
                  className="rounded-md border-2 border-zinc-700 px-6 py-4 font-jetbrains text-xl uppercase text-prim hover:border-prim hover:bg-prim hover:text-zinc-800"
                  onClick={handleUpload}
                >
                  Upload
                </button>
                <button
                  className="rounded-md border-2 border-zinc-700 px-6 py-4 font-jetbrains text-xl uppercase text-prim hover:border-prim hover:bg-prim hover:text-zinc-800"
                  onClick={() => {
                    setFile(null);
                    setBlob(null);
                    setLog("");
                    setFileBuffer(null);
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </>
      )}
      {ens && (
        <UploadedListPage ens={ens} address={address} uploaded={uploaded} />
      )}
      {!ens && (
        <div className="flex flex-col items-center justify-center gap-8 p-8 text-center">
          <span className="font-jetbrains text-4xl uppercase text-zinc-200">
            Please sign in. ENS is required.
          </span>
        </div>
      )}
    </>
  );
};
export default UploadModule;
