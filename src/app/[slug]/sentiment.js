"use client";

import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import va from "@vercel/analytics";

const Sentiment = (data) => {
  return (
    <div className="flex flex-row gap-4">
      <ThumbsUpIcon
        className="h-6 w-6 cursor-pointer transition-all duration-200 ease-out active:scale-150 active:stroke-prim"
        onClick={() => {
          if (data.data.Title) {
            const title = data.data.Title;
            va.track(title, { like: true });
          }
        }}
      />
      <ThumbsDownIcon
        className="peer h-6 w-6 cursor-pointer transition-all duration-200 ease-out active:scale-150 active:stroke-prim"
        onClick={() => {
          if (data.data.Title) {
            const title = data.data.Title;
            va.track(title, { like: false });
          }
        }}
      />
      <span className="hidden peer-active:block">Thanks!</span>
    </div>
  );
};
export default Sentiment;
