"use client";

import { Maximize, Pause, Play, Square } from "lucide-react";
import { useEffect, useState } from "react";

type VideoPlayerProps = {
  data: Item;
  src: string;
  className?: string;
};

const VideoPlayer = ({ data, src, className }: VideoPlayerProps) => {
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const videoPlayer = document.getElementById(
      "video-player"
    ) as HTMLVideoElement;
    setPlaying(!playing);

    if (!playing) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
  };

  const handleStop = () => {
    const videoPlayer = document.getElementById(
      "video-player"
    ) as HTMLVideoElement;

    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    videoPlayer.play();

    setPlaying(true);
  };

  const toggleFullScreen = () => {
    const video = document.getElementById("video-player") as HTMLVideoElement;
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
        //@ts-ignore
      } else if (video.webkitRequestFullscreen) {
        //@ts-ignore
        video.webkitRequestFullscreen();
        //@ts-ignore
      } else if (video.msRequestFullscreen) {
        //@ts-ignore
        video.msRequestFullscreen();
        //@ts-ignore
      } else if (video.mozRequestFullScreen) {
        //@ts-ignore
        video.mozRequestFullScreen();
      }
    }
  };

  useEffect(() => {
    const video = document.getElementById("video-player") as HTMLVideoElement;

    const handlePlay = () => {
      setPlaying(true);
    };

    const handlePause = () => {
      setPlaying(false);
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  return (
    <div className="relative w-full max-w-6xl px-2 py-16 text-sm sm:p-16 sm:text-lg">
      <video
        src={src}
        className={`${className} peer hidden h-auto w-full object-cover drop-shadow-md sm:block`}
        id="video-player"
        onClick={togglePlay}
      />
      <video
        src={src}
        className={`${className} peer block h-auto w-full object-cover drop-shadow-md sm:hidden`}
        id="video-player-mobile"
        onClick={togglePlay}
        controls={true}
      />
      <div
        onClick={togglePlay}
        className="absolute inset-0 left-0 top-0 hidden h-full w-full flex-col items-center justify-between bg-zinc-900 bg-opacity-50 px-2 py-10 font-chakra uppercase opacity-0 transition-all duration-150 ease-in-out hover:opacity-100 sm:flex sm:px-16 sm:py-12 "
      >
        <div className="flex w-full flex-row items-center justify-between p-8">
          <img
            src="/cc0lib.svg"
            alt="cc0lib-logo"
            width={32}
            height={32}
            className="h-8 w-8 sm:h-16 sm:w-16"
          />
          <Maximize
            id="maximize-icon"
            className="h-4 w-4 hover:cursor-pointer hover:stroke-prim sm:h-8 sm:w-8"
            onClick={toggleFullScreen}
          />
          {/* <span>{data.Filetype}</span> */}
        </div>
        {playing ? (
          <Pause
            id="pause-icon"
            className="-mt-6 h-8 w-8 hover:cursor-pointer hover:stroke-prim sm:-mt-0 sm:h-16 sm:w-16"
            onClick={togglePlay}
          />
        ) : (
          <Play
            id="play-icon"
            className="-mt-6 h-8 w-8 hover:cursor-pointer hover:stroke-prim sm:-mt-0 sm:h-16 sm:w-16"
            onClick={togglePlay}
          />
        )}
        <div className="flex w-full flex-row items-center justify-between p-8">
          <span>{data.Title}</span>
          <span
            id="replay"
            className="hover:cursor-pointer hover:text-prim"
            onClick={handleStop}
          >
            replay
          </span>
        </div>
      </div>
    </div>
  );
};
export default VideoPlayer;
