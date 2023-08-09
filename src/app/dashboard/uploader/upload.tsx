"use client";

import { useAccount, useEnsName } from "wagmi";
import { TestENS, TestMode } from "@/lib/constant";
import { Suspense, useCallback, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import Link from "next/link";
import Image from "next/image";
import { LinkIcon, RotateCw, UploadCloud } from "lucide-react";
import UploadedListPage from "./uploaded-list";
import { Route } from "next";
import { useSIWE } from "connectkit";
import { bytesToString } from "@/lib/utils";

const secret = process.env.NEXT_PUBLIC_UPLOADER_SECRET_KEY as string;

type Props = {};
const UploadModule = async (props: Props) => {
  const { address } = useAccount();
  const [log, setLog] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [fileBuffer, setFileBuffer] = useState<any | null>(null);
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [arweaveURL, setArweaveURL] = useState<string>("");
  const [arweaveTimestamp, setArweaveTimestamp] = useState<string>("");
  const [arweaveID, setArweaveID] = useState<string>("");
  const [uploadedIsImage, setUploadedIsImage] = useState<boolean>(false);
  const [uploadedIsVideo, setUploadedIsVideo] = useState<boolean>(false);

  let { data: ens } = useEnsName({
    address,
  });

  if (TestMode) {
    ens = TestENS;
  }

  const { isSignedIn } = useSIWE();

  const handleFile = useCallback(async (acceptedFiles: any) => {
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
    };

    reader.readAsDataURL(file);
  }, []);

  const handleUpload = useCallback(
    async (e: any) => {
      if (!file) {
        return;
      }
      setLog(`Uploading ${file.name}...`);

      const data: UploaderFileRequestData = {
        name: file.name,
        type: file.type,
        ens: ens as string,
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

      const { message, data: resData } =
        (await res.json()) as UploaderFileResponse;

      setLog(message);
      setUploaded(true);
      setArweaveURL(resData.url);
      setArweaveID(resData.id);
      setArweaveTimestamp(resData.timestamp);
    },
    [file]
  );

  const handleReset = useCallback(() => {
    setFile(null);
    setLog("");
    setFileBuffer(null);
    setUploaded(false);
    setArweaveURL("");
    setArweaveID("");
    setArweaveTimestamp("");
  }, []);

  useEffect(() => {
    handleReset;
  }, []);

  useEffect(() => {
    if (file) {
      const checkIfImage = () => {
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
      };

      const checkIfVideo = () => {
        const allowedContentTypes = ["video/mp4", "video/webm"];

        if (allowedContentTypes.includes(file.type)) {
          return true;
        } else {
          return false;
        }
      };

      setUploadedIsImage(checkIfImage());
      setUploadedIsVideo(checkIfVideo());
    }
  }, [file]);

  return (
    <>
      {ens && isSignedIn && (
        <>
          <Suspense
            fallback={<span className="text-zinc-200">Loading...</span>}
          >
            <Dropzone
              onDrop={(acceptedFiles) => {
                handleFile(acceptedFiles);
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
                    {!uploaded && file && fileBuffer && uploadedIsImage && (
                      <div className="mb-8 flex h-auto w-full items-center justify-center">
                        <Image
                          src={fileBuffer}
                          width={300}
                          height={300}
                          alt={file.name}
                          className="h-auto w-full max-w-md object-contain"
                        />
                      </div>
                    )}
                    {!uploaded && file && fileBuffer && uploadedIsVideo && (
                      <video
                        src={fileBuffer}
                        controls
                        className="mb-8 h-auto w-full object-contain"
                      />
                    )}
                    {!uploaded && file && (
                      <div className="flex flex-col items-center justify-center gap-4 text-center font-jetbrains text-3xl uppercase">
                        <span className="text-2xl text-prim">{file.name}</span>
                        <span className="text-xl">
                          {bytesToString(file.size)}
                        </span>
                      </div>
                    )}
                    {!uploaded && !file && (
                      <p className="text-center font-jetbrains text-3xl uppercase">
                        Drag &apos;n&apos; drop file here, or click to select
                        file
                      </p>
                    )}
                    {uploaded &&
                      file &&
                      uploadedIsImage &&
                      arweaveID &&
                      arweaveURL && (
                        <div className="flex h-auto w-full items-center justify-center">
                          <Image
                            src={arweaveURL}
                            width={300}
                            height={300}
                            alt={arweaveID}
                            className="h-auto w-full max-w-md object-contain"
                          />
                        </div>
                      )}
                    {uploaded &&
                      file &&
                      uploadedIsVideo &&
                      arweaveID &&
                      arweaveURL && (
                        <video
                          src={arweaveURL}
                          controls
                          className="h-auto w-full object-contain"
                        />
                      )}
                  </div>
                </section>
              )}
            </Dropzone>
          </Suspense>

          {file && (
            <div className="flex w-full flex-row items-center justify-between gap-8 p-2">
              <div className="flex flex-col items-center gap-4">
                {log && log.length > 0 && (
                  <span className="h-auto whitespace-pre-line font-jetbrains text-zinc-200">
                    {log}
                  </span>
                )}{" "}
              </div>

              <div className="flex flex-row gap-8">
                {arweaveURL && arweaveURL.length > 0 && (
                  <div className="flex flex-row items-center gap-8">
                    <span className="h-auto whitespace-pre-line font-jetbrains text-zinc-200">
                      <Link
                        href={arweaveURL as Route}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="hover:text-prim"
                      >
                        <LinkIcon className="h-8 w-8 items-center" />
                      </Link>
                    </span>
                    <span className="flex h-auto flex-col whitespace-pre-line font-jetbrains text-zinc-200">
                      <span>
                        {new Date(arweaveTimestamp).toLocaleDateString("en-US")}
                      </span>
                      <span>
                        {new Date(arweaveTimestamp).toLocaleTimeString(
                          "en-US",
                          {
                            hour12: false,
                          }
                        )}
                      </span>
                    </span>
                  </div>
                )}
                {!uploaded && (
                  <button
                    className="rounded-md border-2 border-zinc-700 px-6 py-4 font-jetbrains text-xl uppercase text-prim hover:border-prim hover:bg-prim hover:text-zinc-800"
                    onClick={handleUpload}
                    title="Upload"
                  >
                    <UploadCloud className="h-6 w-6 items-center" />
                  </button>
                )}
                <button
                  className="rounded-md border-2 border-zinc-700 px-6 py-4 font-jetbrains text-xl uppercase text-prim hover:border-prim hover:bg-prim hover:text-zinc-800"
                  onClick={handleReset}
                  title="Reset"
                >
                  <RotateCw className="h-6 w-6 items-center" />
                </button>
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
