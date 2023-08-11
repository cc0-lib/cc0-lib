"use client";

import { use, useEffect, useState } from "react";
import TextEdit from "./text-edit";

type Data = {
  title: string;
  desc: string;
  url: string;
};

type Props = {};
const TextTestList = (props: Props) => {
  const [data, setData] = useState<Data>({
    title: "Frank Go Nounish",
    desc: "A little nounish story",
    url: "https://placehold.co",
  });

  const types = ["title", "desc", "url"];

  const handleChange = (newValue: string, id: string, edited: boolean) => {
    if (edited) {
      if (types.includes(id)) {
        setData({ ...(data as Data), [id]: newValue });
      }
    }
  };

  useEffect(() => {
    console.log("data changed =>", data);
  }, [data]);

  return (
    <div className="flex w-full max-w-md flex-col items-start gap-2">
      <TextEdit initialValue={data.title} id="title" onEdit={handleChange} />
      <TextEdit initialValue={data.desc} id="desc" onEdit={handleChange} />
      <TextEdit initialValue={data.url} id="url" onEdit={handleChange} />
    </div>
  );
};
export default TextTestList;
