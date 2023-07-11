"use client";

import { Pause, Play } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const AudioPlayer = ({ format, href, className }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [supported, setSupported] = useState(false);

  const isIOS = useCallback(() => {
    return (
      /iPad|iPhone|iPod/.test(window.navigator.userAgent) && !window.MSStream
    );
  }, [window, window.navigator.userAgent]);

  const isAndroid = useCallback(() => {
    return /Android/.test(window.navigator.userAgent);
  }, [window, window.navigator.userAgent]);

  const isAudioFormatSupported = useCallback(
    (fileFormat) => {
      const iosSupportedFormats = [
        "MP3",
        "AAC",
        "WAV",
        "FLAC",
        "AIFF",
        "ALAC",
        "M4A",
        "MIDI",
      ];
      const androidSupportedFormats = [
        "MP3",
        "AAC",
        "WAV",
        "FLAC",
        "OGG",
        "AIFF",
        "WMA",
        "M4A",
        "AMR",
        "MIDI",
        "OPUS",
      ];

      // Check if the file format is supported on iOS and Android
      if (isIOS() && iosSupportedFormats.includes(fileFormat.toUpperCase())) {
        return setSupported(true);
      }

      if (
        isAndroid() &&
        androidSupportedFormats.includes(fileFormat.toUpperCase())
      ) {
        return setSupported(true);
      }

      return setSupported(false);
    },
    [isAndroid, isIOS]
  );

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
    isAudioFormatSupported(format);
  }, [format, isAudioFormatSupported]);

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
    <>
      {supported && (
        <audio
          id="d-audio"
          src={href}
          className="block h-16 w-full sm:hidden"
          controls
        ></audio>
      )}
      <div
        id="audio-player"
        className={`${className} mt-4 hidden flex-row items-center justify-between gap-8 rounded-lg px-8 py-4 font-chakra uppercase ring-2 ring-zinc-700 transition-all duration-200 ease-in-out hover:ring-prim sm:flex`}
      >
        <audio id="c-audio" src={href} className="hidden sm:block"></audio>

        <Play
          id="play-icon"
          className="hidden h-8 w-8 hover:cursor-pointer hover:stroke-prim sm:block"
          onClick={playAudio}
        />
        <Pause
          id="pause-icon"
          className="hidden h-8 w-8 hover:cursor-pointer hover:stroke-prim sm:block"
          onClick={pauseAudio}
        />
        <div className="hidden w-full items-center sm:block">
          <input
            onChange={seek}
            type="range"
            name="seek-slider"
            id="seek-slider"
            max="100"
            min="0"
            value={progress ? progress : 0}
            className="h-2 w-full cursor-pointer touch-manipulation rounded-lg accent-sec "
          />
        </div>
        <span id="current-time">{currentTime ? currentTime : "0:00"}</span>
      </div>
    </>
  );
};

export default AudioPlayer;
