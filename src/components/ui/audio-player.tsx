"use client";

import { Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type AudioPlayerProps = {
  format: string;
  href: string;
  className: string;
};

const AudioPlayer = ({ format, href, className }: AudioPlayerProps) => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const [supported, setSupported] = useState(false);
  const [playing, setPlaying] = useState(false);

  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const playIconRef = useRef<SVGSVGElement>(null);
  const pauseIconRef = useRef<SVGSVGElement>(null);

  const isIOS = useCallback(() => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }, []);

  const isAndroid = useCallback(() => {
    return /Android/.test(navigator.userAgent);
  }, []);

  const isAudioFormatSupported = useCallback(
    (fileFormat: string) => {
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
    if (audioPlayerRef.current && playIconRef.current && pauseIconRef.current) {
      audioPlayerRef.current?.play();
      setPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioPlayerRef.current && playIconRef.current && pauseIconRef.current) {
      audioPlayerRef.current?.pause();
      setPlaying(false);
    }
  };

  const updateProgress = () => {
    if (
      audioPlayerRef.current?.currentTime &&
      audioPlayerRef.current?.duration
    ) {
      setProgress(
        (audioPlayerRef.current?.currentTime /
          audioPlayerRef.current?.duration) *
          100
      );
      const formattedTime = formatTime(audioPlayerRef.current?.currentTime);
      setCurrentTime(formattedTime);
    }
  };

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60) || 0;
    const seconds = Math.floor(secs - minutes * 60) || 0;

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const seek = (e) => {
    if (
      audioPlayerRef.current?.duration &&
      audioPlayerRef.current?.currentTime
    ) {
      const seekTime = (audioPlayerRef.current.duration / 100) * e.target.value;

      audioPlayerRef.current.currentTime = seekTime;
      setProgress(e.target.value);
    }
  };

  useEffect(() => {
    isAudioFormatSupported(format);
  }, [format, isAudioFormatSupported]);

  useEffect(() => {
    updateProgress();
  }, [currentTime]);

  useEffect(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current?.addEventListener("timeupdate", updateProgress);
    }

    return () => {
      if (audioPlayerRef.current) {
        audioPlayerRef.current?.removeEventListener(
          "timeupdate",
          updateProgress
        );
      }
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
        <audio
          ref={audioPlayerRef}
          src={href}
          className="hidden sm:block"
        ></audio>

        <Play
          ref={playIconRef}
          className={`${
            playing ? "hidden" : "sm:block"
          } h-8 w-8 hover:cursor-pointer hover:stroke-prim`}
          onClick={playAudio}
        />
        <Pause
          ref={pauseIconRef}
          className={`${
            !playing ? "hidden" : "sm:block"
          } h-8 w-8 hover:cursor-pointer hover:stroke-prim`}
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
