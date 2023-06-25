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
      className={`font-chakra uppercase items-center flex flex-row justify-between gap-8 px-8 py-4 w-full ring-2 hover:ring-prim ring-zinc-700 rounded-lg transition-all duration-200 ease-in-out ${className}`}
    >
      <audio id="c-audio" src={href}></audio>
      <Play
        id="play-icon"
        className="w-8 h-8 hover:stroke-prim hover:cursor-pointer"
        onClick={playAudio}
      />
      <Pause
        id="pause-icon"
        className="w-8 h-8 hover:stroke-prim hover:cursor-pointer hidden"
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
          className="w-full rounded-lg h-2 accent-sec touch-manipulation cursor-pointer"
        />
      </div>
      <span id="current-time">{currentTime ? currentTime : "0:00"}</span>
    </div>
  );
};
export default AudioPlayer;
