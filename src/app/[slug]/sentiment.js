"use client";

import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import va from "@vercel/analytics";

const Sentiment = (data) => {
  return (
    <div className="mt-4 flex flex-row gap-4">
      <div>
        <ThumbsUpIcon
          className="peer h-6 w-6 cursor-pointer transition-all duration-200 ease-out active:scale-150 active:stroke-prim"
          onClick={() => {
            if (data.data.Title) {
              const title = data.data.Title;
              va.track(title, { like: true });
            }
          }}
        />
      </div>
      <div>
        <ThumbsDownIcon
          className="peer h-6 w-6 cursor-pointer transition-all duration-200 ease-out active:scale-150 active:stroke-red-400"
          onClick={() => {
            if (data.data.Title) {
              const title = data.data.Title;
              va.track(title, { like: false });
            }
          }}
        />
      </div>
    </div>
  );
};
export default Sentiment;
