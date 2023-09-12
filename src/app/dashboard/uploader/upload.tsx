"use client";

import { useAccount, useEnsName } from "wagmi";
import { SAMPLE_ENS, DEV_MODE } from "@/lib/constant";
import { Suspense, useCallback, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import Link from "next/link";
import Image from "next/image";
import { BadgeCheck, RotateCw, UploadCloud } from "lucide-react";
import UploadedListPage from "./uploaded-list";
import { Route } from "next";
import { useSIWE } from "connectkit";
import { bytesToString } from "@/lib/utils";

const secret = process.env.NEXT_PUBLIC_UPLOADER_SECRET_KEY as string;

type Props = {};
const UploadModule = (props: Props) => {
  const { address } = useAccount();
  const [log, setLog] = useState<string>("");
  const [files, setFiles] = useState<File[] | null>(null);
  const [fileBuffers, setFileBuffers] = useState<any[] | null>(null);
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [fileURLs, setFileURLs] = useState<string[]>([]);
  const [fileTimestamps, setFileTimestamps] = useState<string[]>([]);
  const [fileIDs, setFileIDs] = useState<string[]>([]);
  const [largeFile, setLargeFile] = useState<boolean>(false);
  const [preview, setPreview] = useState<boolean>(false);
  const [processingFiles, setProcessingFiles] = useState<boolean>(false);

  let { data: ens } = useEnsName({
    address,
  });

  if (DEV_MODE) {
    ens = SAMPLE_ENS;
  }

  const { isSignedIn } = useSIWE();

  const handleMultipleFiles = useCallback(async (acceptedFiles: any) => {
    const buffers: any[] = [];
    const files: any[] = [];

    const filteredFiles = acceptedFiles.filter((file: File) => {
      return file.size < 4000000;
    });

    for (const file of filteredFiles) {
      console.log(file);
      const reader = new FileReader();

      reader.onload = (e) => {
        const res = e.target?.result;
        if (!res) {
          return;
        }
        files.push(file);
        buffers.push(res);
      };

      reader.readAsDataURL(file);
    }

    // wait for all files to be read
    while (buffers.length < acceptedFiles.length) {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    setLog(`${files.length} ${files.length > 1 ? "files" : "file"} loaded`);
    setFiles(files);
    setFileBuffers(buffers);
  }, []);

  const handleMultipleUpload = useCallback(
    async (e: any) => {
      if (!files) {
        return;
      }

      const arweaveURLs: string[] = [];
      const arweaveIDs: string[] = [];
      const arweaveTimestamps: string[] = [];

      for (const file of files) {
        setLog(
          `Uploading ${files.length} ${files.length > 1 ? "files" : "file"}...`
        );

        if (fileBuffers === null) {
          return;
        }

        const data: UploaderFileRequestData = {
          name: file.name,
          type: file.type,
          ens: ens as string,
          file: fileBuffers[files.indexOf(file)],
        };

        const res = await fetch("/api/bundlr", {
          method: "POST",
          body: JSON.stringify({
            type: "uploadFile",
            secret: secret,
            data: data,
          }),
        });

        const { message, data: resData } =
          (await res.json()) as UploaderFileResponse;

        if (!resData) {
          return;
        }

        arweaveIDs.push(resData.id);
        arweaveURLs.push(resData.url);
        arweaveTimestamps.push(resData.timestamp);
        setFileURLs(arweaveURLs);
        setFileIDs(arweaveIDs);
        setFileTimestamps(arweaveTimestamps);
      }
      setLog(`${files.length} ${files.length > 1 ? "files" : "file"} uploaded`);
      setUploaded(true);
    },
    [files]
  );

  const checkIfImage = useCallback((file: File) => {
    const allowedContentTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];

    if (allowedContentTypes.includes(file.type)) {
      return true;
    } else {
      return false;
    }
  }, []);

  const checkIfVideo = useCallback((file: File) => {
    const allowedContentTypes = ["video/mp4", "video/webm"];

    if (allowedContentTypes.includes(file.type)) {
      return true;
    } else {
      return false;
    }
  }, []);

  const truncateString = useCallback((str: string, len: number): string => {
    const string = str.length > len ? str.slice(0, len) + "..." : str;
    return string;
  }, []);

  const handleReset = useCallback(() => {
    setLog("");
    setFiles(null);
    setFileBuffers(null);
    setUploaded(false);
    setFileURLs([]);
    setFileIDs([]);
    setFileTimestamps([]);
    setLargeFile(false);
    setPreview(false);
  }, []);

  useEffect(() => {
    handleReset;
  }, []);

  return (
    <>
      {ens && isSignedIn && (
        <>
          <Dropzone
            onDrop={async (acceptedFiles) => {
              setFiles(null);
              setFileBuffers(null);
              setUploaded(false);
              setProcessingFiles(true);
              await handleMultipleFiles(acceptedFiles);
              setPreview(true);
              setProcessingFiles(false);
            }}
            maxSize={4000000}
            onDropRejected={(err) => {
              const fileErr = err[0].errors[0].code === "file-too-large";
              if (fileErr) {
                setLargeFile(true);
                setLog(
                  `File size too large. Please upload files less than 4MB.`
                );
              }
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section className="w-full">
                <div
                  {...getRootProps({
                    className:
                      "border-2 border-dashed border-zinc-700 p-16 text-zinc-200 w-full items-center text-center justify-center",
                  })}
                >
                  <input {...getInputProps()} />
                  {!uploaded && files && fileBuffers && preview && (
                    <div
                      className={`${files.length < 2 && "w-full"} 
                        ${files.length === 2 && "grid grid-cols-2"}
                        ${files.length > 2 && "grid grid-cols-3"}
                        items-center justify-center gap-4 font-jetbrains
                         `}
                    >
                      {files.map((file) => (
                        <div
                          key={file.name}
                          className="flex h-full w-full flex-col items-center justify-between gap-8"
                        >
                          <Suspense fallback={<div>Loading...</div>}>
                            {checkIfImage(file) &&
                              fileBuffers[files.indexOf(file)] && (
                                <Image
                                  src={fileBuffers[files.indexOf(file)]}
                                  width={300}
                                  height={300}
                                  alt={file.name}
                                  className="h-full w-full max-w-md object-contain"
                                />
                              )}
                          </Suspense>

                          {checkIfVideo(file) && (
                            <video
                              src={fileBuffers[files.indexOf(file)]}
                              controls
                              className="mb-8 h-auto w-full object-contain"
                            />
                          )}
                          {!checkIfVideo(file) && !checkIfImage(file) && (
                            <Image
                              src={`https://placehold.co/300x300/black/white/?text=${file.type}`}
                              width={300}
                              height={300}
                              alt={file.name}
                              className="h-auto w-full max-w-md object-contain"
                            />
                          )}
                          <div
                            key={file.name}
                            className="flex w-full max-w-sm flex-row items-center justify-between gap-4 p-2"
                          >
                            <span className="text-lg text-prim">
                              {truncateString(file.name, 15)}
                            </span>
                            <span className="text-sm">
                              {bytesToString(file.size)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {uploaded && files && fileBuffers && (
                    <div
                      className={`${files.length < 2 && "w-full"} 
                      ${files.length === 2 && "grid grid-cols-2"}
                      ${files.length > 2 && "grid grid-cols-3"}
                      items-center justify-center gap-4 font-jetbrains
                       `}
                    >
                      {files.map((file) => (
                        <div
                          key={file.name}
                          className="flex h-full w-full flex-col items-center justify-between gap-8"
                        >
                          {checkIfImage(file) && (
                            <Image
                              src={fileBuffers[files.indexOf(file)]}
                              width={300}
                              height={300}
                              alt={file.name}
                              className="h-full w-full max-w-md object-contain"
                            />
                          )}

                          {checkIfVideo(file) && (
                            <video
                              src={fileBuffers[files.indexOf(file)]}
                              controls
                              className="mb-8 h-auto w-full object-contain"
                            />
                          )}
                          {!checkIfVideo(file) && !checkIfImage(file) && (
                            <Image
                              src={`https://placehold.co/300x300/black/white/?text=${file.name}`}
                              width={300}
                              height={300}
                              alt={file.name}
                              className="h-auto w-full max-w-md object-contain"
                            />
                          )}
                          <div className="flex w-full max-w-sm flex-row items-center justify-between gap-4 p-2">
                            <span className="text-lg text-prim">
                              {truncateString(file.name, 20)}
                              <BadgeCheck className="ml-2 inline-block h-6 w-6 items-center" />
                            </span>
                            <span className="text-sm">
                              {bytesToString(file.size)}
                            </span>
                            {/* {arweaveURL && arweaveURL.length > 0 && (
                                <Link
                                  href={
                                    arweaveURL.split("\n")[
                                      files.indexOf(file)
                                    ] as Route
                                  }
                                  rel="noopener noreferrer"
                                  target="_blank"
                                  className="hover:text-prim"
                                >
                                  <LinkIcon className="h-6 w-6 items-center" />
                                </Link>
                              )} */}
                          </div>
                          {fileIDs.length > 0 &&
                            fileURLs.length > 0 &&
                            fileTimestamps.length > 0 && (
                              <div className="-mt-8 flex w-full max-w-sm flex-row items-center justify-between gap-2 p-2">
                                {fileTimestamps && (
                                  <>
                                    <span>
                                      {new Date(
                                        Number(
                                          fileTimestamps[files.indexOf(file)]
                                        )
                                      ).toLocaleDateString("en-US")}
                                    </span>
                                    <span>
                                      {new Date(
                                        Number(
                                          fileTimestamps[files.indexOf(file)]
                                        )
                                      ).toLocaleTimeString("en-US", {
                                        hour12: false,
                                      })}
                                    </span>
                                  </>
                                )}
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  )}

                  {!uploaded && !files && !largeFile && !processingFiles && (
                    <div className="flex flex-col gap-4">
                      <p className="text-center font-jetbrains text-3xl uppercase">
                        Drag &apos;n&apos; drop files here, or click to select
                        files.
                      </p>
                      <p className="text-center font-jetbrains text-xl uppercase">
                        Max per file size: 4MB
                      </p>
                    </div>
                  )}
                  {!uploaded && !files && largeFile && !processingFiles && (
                    <p className="text-center font-jetbrains text-3xl uppercase">
                      File too large. Please upload files less than 4MB.
                    </p>
                  )}
                  {!uploaded && !files && !fileBuffers && processingFiles && (
                    <p className="mt-4 text-center font-jetbrains text-3xl uppercase">
                      Processing files...
                    </p>
                  )}
                </div>
              </section>
            )}
          </Dropzone>

          {files && (
            <div className="flex w-full flex-row items-center justify-between gap-8 p-2">
              <div className="flex flex-col items-center gap-4">
                {log && log.length > 0 && (
                  <span className="h-auto whitespace-pre-line font-jetbrains text-zinc-200">
                    {log}
                  </span>
                )}{" "}
              </div>

              <div className="flex flex-row gap-8">
                <button
                  className="rounded-md border-2 border-zinc-700 px-6 py-4 font-jetbrains text-xl uppercase text-prim hover:border-prim hover:bg-prim hover:text-zinc-800"
                  onClick={handleReset}
                  title="Reset"
                >
                  <RotateCw className="h-6 w-6 items-center" />
                </button>
                {!uploaded && fileBuffers && fileBuffers.length > 0 && (
                  <button
                    className="rounded-md border-2 border-zinc-700 px-6 py-4 font-jetbrains text-xl uppercase text-prim hover:border-prim hover:bg-prim hover:text-zinc-800"
                    onClick={handleMultipleUpload}
                    title="Upload"
                  >
                    <UploadCloud className="h-6 w-6 items-center" />
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}
      {ens && isSignedIn && (
        <Suspense
          fallback={
            <span className="font-jetbrains text-4xl uppercase text-zinc-200">
              getting satellite data
            </span>
          }
        >
          <UploadedListPage
            ens={ens}
            address={address as string}
            uploaded={uploaded}
          />
        </Suspense>
      )}

      {!isSignedIn && (
        <div className="flex flex-col items-center justify-center gap-8 p-8 text-center">
          <span className="font-jetbrains text-4xl uppercase text-zinc-200">
            Please sign in to upload
          </span>
        </div>
      )}

      {!ens && (
        <div className="flex flex-col items-center justify-center gap-8 p-8 text-center">
          <span className="max-w-xl font-jetbrains text-2xl uppercase text-zinc-200">
            You also need ENS name to upload. Mint your free{" "}
            <Link
              href="https://ens.vision/name/cc0-gang"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-prim"
            >
              name.cc0-gang.eth
            </Link>{" "}
            ENS now!
          </span>
        </div>
      )}
    </>
  );
};
export default UploadModule;
