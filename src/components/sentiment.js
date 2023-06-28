"use client";

import {
  FlagIcon,
  HeartIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react";
import va from "@vercel/analytics";
import { useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { slugify } from "@/lib/utils";
import getLikedItems from "@/lib/getLikedItems";

const Sentiment = (data) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const slug = slugify(data?.data.Title);
  const [sentiment, setSentiment] = useLocalStorage(`${slug}-sentiment`, "");

  const toggleLike = () => {
    setLiked(!liked);
    setDisliked(false);
  };

  const toggleDislike = () => {
    setDisliked(!disliked);
    setLiked(false);
  };

  useEffect(() => {
    if (data) {
      if (sentiment === "") {
        setLiked(false);
        setDisliked(false);
      }
      if (sentiment === "like") {
        setLiked(true);
        setDisliked(false);
      }
      if (sentiment === "dislike") {
        setLiked(false);
        setDisliked(true);
      }
    }
  }, []);

  useEffect(() => {
    if (liked) {
      setSentiment("like");
    } else if (!liked && !disliked) {
      setSentiment("");
    } else if (disliked) {
      setSentiment("dislike");
    }
  }, [liked, disliked]);

  return (
    <div className="mt-4 flex flex-row gap-4">
      <div>
        <HeartIcon
          className={`peer h-6 w-6 cursor-pointer transition-all duration-200 ease-out active:scale-150 active:stroke-prim ${
            liked ? "stroke-prim" : "stroke-white"
          }`}
          onClick={() => {
            toggleLike();
            if (!liked && data.data.Title) {
              const title = data.data.Title;
              va.track(title, { like: true });
              setLiked(true);
            }
          }}
        />
      </div>
      <div>
        <FlagIcon
          className={`peer h-6 w-6 cursor-pointer transition-all duration-200 ease-out active:scale-150 active:stroke-red-500 ${
            disliked ? "stroke-red-500" : "stroke-white"
          }`}
          onClick={() => {
            toggleDislike();
            if (!disliked && data.data.Title) {
              const title = data.data.Title;
              va.track(title, { like: false });
              setDisliked(true);
            }
          }}
        />
      </div>
    </div>
  );
};
export default Sentiment;
