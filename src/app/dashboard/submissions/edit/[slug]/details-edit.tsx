"use client";

import TextEdit from "@/app/dashboard/abc/text-edit";
import { SAMPLE_ENS, DEV_MODE } from "@/lib/constant";
import { useSIWE } from "connectkit";
import { AlertTriangle, RotateCw, Save } from "lucide-react";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useAccount, useEnsName } from "wagmi";
import NotionUtils from "@/lib/notion/utils";
import * as z from "zod";
import { updateSubmission } from "./actions";

import ConfettiExplosion from "react-confetti-explosion";
import Link from "next/link";

type Props = {
  data: Item;
};
const EditDetails = ({ data: initialData }: Props) => {
  const { address } = useAccount();
  const { isSignedIn } = useSIWE();
  const [edited, setEdited] = useState<boolean>(false);
  const [editedProps, setEditedProps] = useState<string[]>([]);
  const [preparedData, setPreparedData] = useState<{}>();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  let { data: ens } = useEnsName({
    address,
  });

  if (DEV_MODE) {
    ens = SAMPLE_ENS;
  }

  const keys = ["Title", "Description", "Source", "Type", "Filetype"];

  if (initialData.File && initialData.File?.length > 0) {
    keys.push("File");
  }

  const nonEditableKeys = ["ENS", "ID"];
  const statusKeys = ["SubmissionStatus", "Status"];

  const dataSchema = z.object({
    Title: z.string().min(3).max(50),
    Description: z.string().min(3).max(300),
    Source: z.string().url(),
    Type: z.string(),
    Filetype: z.string(),
    ID: z.number(),
    Tags: z.array(z.string().min(1).max(20)),
    ENS: z.string().endsWith(".eth"),
    File: z.string().url().optional(),
    "Social Link": z.string().url().optional(),
    Status: z.string(),
    SubmissionStatus: z.string(),
  });

  const [data, setData] = useState<Item>(initialData);

  const tags = data.Tags.join(", ");

  const handleChange = (newValue: string, id: string, edited: boolean) => {
    if (edited) {
      if (keys.includes(id)) {
        setData({
          ...(data as Item),
          SubmissionStatus: "draft",
          Status: "draft",
          [id]: newValue,
        });
        setEdited(true);
      }
      const newEditedProps = [...editedProps];

      if (!newEditedProps.includes(id)) {
        newEditedProps.push(id);
      }

      setEditedProps(newEditedProps);
    }
  };

  const handleTagsChange = (newValue: string, id: string, edited: boolean) => {
    const newTags = newValue.split(",").map((e) => e.trim());
    if (edited) {
      if (id === "Tags") {
        setData({
          ...(data as Item),
          SubmissionStatus: "draft",
          Status: "draft",
          [id]: newTags,
        });
        setEdited(true);
      }

      const newEditedProps = [...editedProps];

      if (!newEditedProps.includes(id)) {
        newEditedProps.push(id);
      }

      setEditedProps(newEditedProps);
    }
  };

  const handleSubmit = async () => {
    const res = await updateSubmission(data.id, preparedData as {});

    if (res.status === 200) {
      console.log("submission updated");
      setSubmitted(true);
    } else {
      console.log("submission update failed");
    }

    setEdited(false);
    setEditedProps([]);
    setSubmitted(false);
  };

  const prepData = useCallback(() => {
    const prep = editedProps.map((e) => {
      const properties = {
        [e]: {},
      };
      if (NotionUtils.richTextProps.includes(e)) {
        properties[e] = NotionUtils.RichTextType(data[e]);
      } else if (NotionUtils.multiSelectProps.includes(e)) {
        properties[e] = NotionUtils.MultiSelectType(data[e]);
      } else if (NotionUtils.selectProps.includes(e)) {
        properties[e] = NotionUtils.SelectType(data[e]);
      } else if (NotionUtils.titleProps.includes(e)) {
        properties[e] = NotionUtils.TitleType(data[e]);
      } else if (NotionUtils.urlProps.includes(e)) {
        properties[e] = NotionUtils.URLType(data[e]);
      } else if (NotionUtils.numberProps.includes(e)) {
        properties[e] = NotionUtils.NumberType(data[e]);
      }

      properties["Status"] = NotionUtils.SelectType("draft");
      properties["SubmissionStatus"] = NotionUtils.SelectType("submitted");

      return properties;
    });

    const properties = Object.assign({}, ...prep);

    setPreparedData(properties);
  }, [data, editedProps]);

  useEffect(() => {
    console.log("prepared data =>", preparedData);
  }, [preparedData]);

  useEffect(() => {
    const res = dataSchema.safeParse(data);

    if (res.success) {
      setError("");

      prepData();
    } else {
      setError(
        res.error.issues.map((e) => e.path + " Error : " + e.message).join(", ")
      );
    }
  }, [data]);

  useEffect(() => {
    setSubmitted(false);
  }, []);

  if (isSignedIn && ens === initialData.ENS) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        {data && (
          <div className="flex w-full max-w-5xl flex-col items-start gap-4 overflow-auto">
            {keys.map((key) => {
              return (
                <TextEdit
                  initialValue={data[key]}
                  id={key}
                  onEdit={handleChange}
                  key={key}
                  rows={key === "Description" ? 2 : 1}
                  editable={true}
                />
              );
            })}
            <TextEdit
              initialValue={tags}
              id={"Tags"}
              onEdit={handleTagsChange}
              key={"Tags"}
              rows={1}
              editable={true}
            />
            {nonEditableKeys.map((key) => {
              return (
                <TextEdit
                  initialValue={data[key]}
                  id={key}
                  onEdit={() => {}}
                  key={key}
                  rows={1}
                  editable={false}
                />
              );
            })}
            {statusKeys.map((key) => {
              return (
                <TextEdit
                  initialValue={data[key].toUpperCase()}
                  id={key === "SubmissionStatus" ? "Submission Status" : key}
                  onEdit={() => {}}
                  key={key}
                  rows={1}
                  editable={false}
                />
              );
            })}
          </div>
        )}
        {submitted && <ConfettiExplosion duration={5000} particleCount={200} />}
        {edited && (
          <div className="flex w-full flex-row items-center justify-end gap-4">
            {error && (
              <span className="w-full self-start whitespace-pre-wrap p-4 text-red-500">
                {JSON.stringify(error, null, 2)}
              </span>
            )}
            {!error && (
              <>
                <button
                  className="rounded-md border-2 border-zinc-700 px-6 py-4 font-jetbrains text-xl uppercase text-prim hover:border-prim hover:bg-prim hover:text-zinc-800"
                  title="Reset"
                  onClick={() => {
                    setData(initialData);
                    setEditedProps([]);
                    setEdited(false);
                    setSubmitted(false);
                  }}
                >
                  <RotateCw className="h-6 w-6 self-center" />
                </button>
                <button
                  className="rounded-md border-2 border-zinc-700 px-6 py-4 font-jetbrains text-xl uppercase text-prim hover:border-prim hover:bg-prim hover:text-zinc-800"
                  title="Save"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  <Save className="h-6 w-6 self-center" />
                </button>
              </>
            )}
            {error && (
              <button
                className="rounded-md border-2 border-zinc-700 px-6 py-4 font-jetbrains text-xl uppercase text-red-500 hover:border-red-500 hover:bg-red-500 hover:text-zinc-800"
                title="Alert"
                disabled
              >
                <AlertTriangle className="h-6 w-6 self-center" />
              </button>
            )}
          </div>
        )}
      </Suspense>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center gap-8 p-8 text-center">
        <span className="font-jetbrains text-4xl uppercase text-zinc-200">
          Please sign in to submit
        </span>
      </div>
    );
  }

  if (!ens) {
    return (
      <div className="flex flex-col items-center justify-center gap-8 p-8 text-center">
        <span className="max-w-xl font-jetbrains text-2xl uppercase text-zinc-200">
          You also need ENS name to submit. Mint your free{" "}
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
    );
  }
  if (ens !== initialData.ENS) {
    return (
      <div className="flex flex-col items-center justify-center gap-8 p-8 text-center">
        <span className="font-jetbrains text-4xl uppercase text-zinc-200">
          You are not the submission uploader
        </span>
      </div>
    );
  }

  return <div>Something went wrong</div>;
};

export default EditDetails;
