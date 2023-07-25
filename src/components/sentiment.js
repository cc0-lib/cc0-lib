"use client";

import { FlagIcon, HeartIcon } from "lucide-react";
import va from "@vercel/analytics";
import { useEffect, useState } from "react";
import useLocalStorage from "@/hooks/use-local-storage";
import { slugify } from "@/lib/utils";
import { useAccount } from "wagmi";
import { useSIWE } from "connectkit";
import { addLike, getLikeFromKV, remLike } from "@/lib/redis";

const Sentiment = (data) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const slug = slugify(data?.data.Title);
  const [sentiment, setSentiment] = useLocalStorage(`${slug}-sentiment`, "");
  const { address } = useAccount();
  const { isSignedIn } = useSIWE();

  const toggleLike = () => {
    setLiked(!liked);

    if (isSignedIn) {
      if (liked) {
        removeFromRedis();
      } else {
        saveToRedis();
      }
    }

    setDisliked(false);
  };

  const toggleDislike = () => {
    setDisliked(!disliked);
    setLiked(false);
  };

  const saveToRedis = async () => {
    if (address) {
      try {
        await addLike(slug, address);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("no address provided");
    }
  };

  const removeFromRedis = async () => {
    if (address) {
      try {
        await remLike(slug, address);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("no address provided");
    }
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

  useEffect(() => {
    // check if slug is in redis
    if (isSignedIn && address) {
      const fetchLikedItems = async () => {
        const redisLikedItems = await getLikeFromKV(address);
        if (redisLikedItems.includes(slug)) {
          setLiked(true);
        }
      };
      fetchLikedItems();
    }
  }, [isSignedIn]);

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
              if (isSignedIn) {
                saveToRedis();
              }
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
              // if (isSignedIn) {
              //   removeFromRedis();
              // }
            }
          }}
        />
      </div>
    </div>
  );
};
export default Sentiment;
