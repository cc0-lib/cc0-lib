"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

const AudioPlayer = ({ href, className }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);

  const playAudio = () => {
    document.querySelector("#c-audio").play();
    document.querySelector("#play-icon").style.display = "none";
    document.querySelector("#pause-icon").style.display = "block";
  };

  const pauseAudio = () => {
    document.querySelector("#c-audio").pause();
    document.querySelector("#play-icon").style.display = "block";
    document.querySelector("#pause-icon").style.display = "none";
  };

  const updateProgress = () => {
    const audio = document.querySelector("#c-audio");
    setProgress((audio.currentTime / audio.duration) * 100);
    setCurrentTime(formatTime(audio.currentTime));
  };

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60) || 0;
    const seconds = Math.floor(secs - minutes * 60) || 0;

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const seek = (e) => {
    const audio = document.querySelector("#c-audio");
    const seekTime = (audio.duration / 100) * e.target.value;

    audio.currentTime = seekTime;
    setProgress(e.target.value);
  };

  useEffect(() => {
    updateProgress();
  }, [currentTime]);

  useEffect(() => {
    const audio = document.querySelector("#c-audio");
    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  return (
    <div
      id="audio-player"
      className={`${className} mt-4 flex flex-row items-center justify-between gap-8 rounded-lg px-8 py-4 font-chakra uppercase ring-2 ring-zinc-700 transition-all duration-200 ease-in-out hover:ring-prim`}
    >
      <audio id="c-audio" src={href}></audio>
      <Play
        id="play-icon"
        className="h-8 w-8 hover:cursor-pointer hover:stroke-prim"
        onClick={playAudio}
      />
      <Pause
        id="pause-icon"
        className="hidden h-8 w-8 hover:cursor-pointer hover:stroke-prim"
        onClick={pauseAudio}
      />
      <div className="w-full items-center">
        <input
          onChange={seek}
          type="range"
          name="seek-slider"
          id="seek-slider"
          max="100"
          min="0"
          value={progress ? progress : 0}
          className="h-2 w-full cursor-pointer touch-manipulation rounded-lg accent-sec"
        />
      </div>
      <span id="current-time">{currentTime ? currentTime : "0:00"}</span>
    </div>
  );
};
export default AudioPlayer;
