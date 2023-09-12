"use client";

import { useCallback, useEffect, useState } from "react";
import TextEdit from "../../abc/text-edit";
import NotionUtils from "@/lib/notion/utils";
import { AlertTriangle, RotateCw, Save } from "lucide-react";
import { SAMPLE_ENS, DEV_MODE } from "@/lib/constant";
import { useAccount, useEnsName } from "wagmi";
import { useSIWE } from "connectkit";
import Link from "next/link";
import * as z from "zod";
import { addSubmission } from "./actions";
import ConfettiExplosion from "react-confetti-explosion";

type Props = {};
const AddSubmission = (props: Props) => {
  const [edited, setEdited] = useState<boolean>(false);
  const [editedProps, setEditedProps] = useState<string[]>([]);
  const [preparedData, setPreparedData] = useState<{}>();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { address } = useAccount();
  const { isSignedIn } = useSIWE();
  let { data: ens } = useEnsName({
    address,
  });

  if (DEV_MODE) {
    ens = SAMPLE_ENS;
  }

  const initialData: ItemForSubmission = {
    Title: "Sample Title",
    Description: "Basic Description",
    Source: "https://www.source.com",
    Type: "Image",
    Filetype: "PNG",
    ID: 10001,
    Tags: ["Tag1", "Tag2", "Tag3"],
    ENS: ens ? ens : "0xtest.eth",
    ThumbnailURL: "https://arweave.net/arweaveID/file.png",
    File: "https://arweave.net/arweaveID/file.png",
    "Social Link": "https://twitter.com/0xtest",
    Status: "draft",
    SubmissionStatus: "draft",
  };

  const dataSchema = z.object({
    Title: z.string().min(3).max(50),
    Description: z.string().min(3).max(300),
    Source: z.string().url(),
    Type: z.string(),
    Filetype: z.string(),
    ID: z.number(),
    Tags: z.array(z.string()),
    ENS: z.string().endsWith(".eth"),
    ThumbnailURL: z.string().url(),
    File: z.string().url(),
    "Social Link": z.string().url(),
    Status: z.string(),
    SubmissionStatus: z.string(),
  });

  const [data, setData] = useState<ItemForSubmission>(initialData);

  const keys = Object.keys(data).filter((key) => {
    return (
      key !== "ID" &&
      key !== "Tags" &&
      key !== "ENS" &&
      key !== "Status" &&
      key !== "SubmissionStatus"
    );
  });

  const IDNumber = data.ID;
  const tags = data.Tags.join(", ");

  const handleChange = (newValue: string, id: string, edited: boolean) => {
    if (edited) {
      if (keys.includes(id)) {
        if (ens) {
          setData({
            ...(data as ItemForSubmission),
            SubmissionStatus: "submitted",
            Status: "draft",
            ENS: ens,
            ID: IDNumber,

            [id]: newValue,
          });
          setEdited(true);
        }
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
        if (ens) {
          setData({
            ...(data as ItemForSubmission),
            SubmissionStatus: "submitted",
            Status: "draft",
            ENS: ens,
            ID: IDNumber,
            [id]: newTags,
          });
          setEdited(true);
        }
      }

      const newEditedProps = [...editedProps];

      if (!newEditedProps.includes(id)) {
        newEditedProps.push(id);
      }

      setEditedProps(newEditedProps);
    }
  };

  const handleSubmit = async () => {
    const res = await addSubmission(preparedData as {});

    if (res.status === 200) {
      console.log("submission added");
      setSubmitted(true);
    } else {
      setError(res.data);
      console.log("submission add failed");
    }

    setEdited(false);
    setEditedProps([]);
    setSubmitted(false);
  };

  const prepData = useCallback(() => {
    const allKeys = Object.keys(data);
    const prep = allKeys.map((e) => {
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

  if (isSignedIn && ens && ens.length > 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center p-4">
        <div className="flex w-full max-w-5xl flex-col items-start gap-4 overflow-auto p-4">
          {data.ThumbnailURL && (
            <div className="flex w-full flex-row items-center justify-center gap-4">
              <img
                src={data.ThumbnailURL}
                alt="thumbnail"
                className="w-1/2 rounded-md"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/300x300/black/white/?text=Invalid+Thumbnail";
                }}
              />
            </div>
          )}
          {keys.map((key) => {
            return (
              <TextEdit
                key={key}
                initialValue={data[key]}
                editable={true}
                onEdit={handleChange}
                id={key}
                rows={1}
              />
            );
          })}
          <TextEdit
            initialValue={ens}
            id={"ENS"}
            onEdit={() => {}}
            key={"ENS"}
            rows={1}
            editable={false}
          />
          <TextEdit
            initialValue={tags}
            id={"Tags"}
            onEdit={handleTagsChange}
            key={"Tags"}
            rows={1}
            editable={true}
          />
        </div>

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
        {DEV_MODE && submitted && preparedData && (
          <span className="w-full whitespace-pre-wrap">
            {JSON.stringify(preparedData, null, 2)}
          </span>
        )}
      </div>
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

  return <div>Something went wrong. {ens}</div>;
};
export default AddSubmission;
