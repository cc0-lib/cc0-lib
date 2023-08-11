"use client";

import { revalidate } from "@/app/api/random/route";
import TextEdit from "@/app/dashboard/abc/text-edit";
import GridCard from "@/components/dashboard/uploader/grid-card";
import { TestENS, TestMode } from "@/lib/constant";
import { useSIWE } from "connectkit";
import { RotateCw, Save } from "lucide-react";
import { revalidatePath } from "next/cache";
import { Suspense, useEffect, useState } from "react";
import { useAccount, useEnsName } from "wagmi";

type Props = {
  data: Item;
};
const EditDetails = ({ data: initialData }: Props) => {
  const { address } = useAccount();
  const { isSignedIn } = useSIWE();
  const [edited, setEdited] = useState<boolean>(false);

  let { data: ens } = useEnsName({
    address,
  });

  if (TestMode) {
    ens = TestENS;
  }

  const keys = ["Title", "Description", "Source", "Type", "Filetype"];

  if (initialData.File && initialData.File?.length > 0) {
    keys.push("File");
  }

  const nonEditableKeys = ["ENS", "ID"];
  const statusKeys = ["SubmissionStatus", "Status"];

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
      console.log(`${id} edited. ${id} => ${newValue}`);
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
      console.log(`${id} edited. ${id} => ${newTags}`);
    }
  };

  const handleSubmit = () => {
    setData({
      ...(data as Item),
      SubmissionStatus: "submitted",
    });
  };

  // useEffect(() => {
  //   console.log("data changed =>", data);
  // }, [data]);

  if (isSignedIn && ens === initialData.ENS) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        {data && (
          <div className="flex w-full flex-col items-start gap-4">
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
        {edited && (
          <div className="flex w-full flex-row items-center justify-end gap-4">
            <button
              className="rounded-md border-2 border-zinc-700 px-6 py-4 font-jetbrains text-xl uppercase text-prim hover:border-prim hover:bg-prim hover:text-zinc-800"
              title="Reset"
              onClick={() => {
                setData(initialData);
                setEdited(false);
              }}
            >
              <RotateCw className="h-6 w-6 self-center" />
            </button>
            <button
              className="rounded-md border-2 border-zinc-700 px-6 py-4 font-jetbrains text-xl uppercase text-prim hover:border-prim hover:bg-prim hover:text-zinc-800"
              title="Save"
              onClick={() => {
                handleSubmit();
                console.log("data changed =>", data);
              }}
            >
              <Save className="h-6 w-6 self-center" />
            </button>
          </div>
        )}
      </Suspense>
    );
  }

  if (!isSignedIn) {
    return <div>Not signed in</div>;
  }
  if (ens !== initialData.ENS) {
    return <div>You are not the submission uploader</div>;
  }

  return <div>Something went wrong</div>;
};
export default EditDetails;
