"use client";

import Rive, {
  StateMachineInput,
  useRive,
  useStateMachineInput,
} from "@rive-app/react-canvas";
import { useEffect, useRef, useState } from "react";

type Props = {};
const RivePage = (props: Props) => {
  const { rive, RiveComponent } = useRive({
    src: "/loading.riv",
    autoplay: true,
    stateMachines: "SM1",
  });

  const [animState, setAnimState] = useState("Idle");

  const flashRef = useRef<StateMachineInput | null>(null);
  const outRef = useRef<StateMachineInput | null>(null);
  const inRef = useRef<StateMachineInput | null>(null);
  const flashRepRef = useRef<StateMachineInput | null>(null);

  const flashInput = useStateMachineInput(rive, "SM1", "Flash");
  const outInput = useStateMachineInput(rive, "SM1", "Out");
  const inInput = useStateMachineInput(rive, "SM1", "In");
  const flashRepInput = useStateMachineInput(rive, "SM1", "FlashR");

  useEffect(() => {
    if (rive) {
      flashRef.current = flashInput;
      outRef.current = outInput;
      inRef.current = inInput;
      flashRepRef.current = flashRepInput;
    }
  }, [rive, flashInput, outInput, inInput, flashRepInput]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "f":
          flashInput?.fire();
          break;
        case "o":
          outInput?.fire();
          break;
        case "i":
          inInput?.fire();
          break;
        case "r":
          flashRepInput?.fire();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [flashInput, outInput, inInput, flashRepInput]);

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-8">
      <div className="flex h-96 w-full flex-col items-center justify-center">
        <RiveComponent />
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        {flashRef.current && (
          <button
            onClick={() => {
              flashInput?.fire();
              setAnimState("Flash");
            }}
          >
            <span
              className={`font-jetbrains uppercase hover:text-prim ${
                animState === "Flash" && "text-prim"
              }`}
            >
              flash
            </span>
          </button>
        )}

        {outRef.current && (
          <button
            onClick={() => {
              outInput?.fire();
              setAnimState("Out");
            }}
          >
            <span
              className={`font-jetbrains uppercase hover:text-prim ${
                animState === "Out" && "text-prim"
              }`}
            >
              out
            </span>
          </button>
        )}

        {inRef.current && (
          <button
            onClick={() => {
              inInput?.fire();
              setAnimState("In");
            }}
          >
            <span
              className={`font-jetbrains uppercase hover:text-prim ${
                animState === "In" && "text-prim"
              }`}
            >
              in
            </span>
          </button>
        )}

        {flashRepRef.current && (
          <button
            onClick={() => {
              flashRepInput?.fire();
              setAnimState("FlashR");
            }}
          >
            <span
              className={`font-jetbrains uppercase hover:text-prim ${
                animState === "FlashR" && "text-prim"
              }`}
            >
              flash loop
            </span>
          </button>
        )}
      </div>
    </div>
  );
};
export default RivePage;
