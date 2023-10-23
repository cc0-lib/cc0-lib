"use client";

import { useRive } from "@rive-app/react-canvas";

type Props = {};
const RiveLoading = (props: Props) => {
  const { rive, RiveComponent } = useRive({
    src: "/cc0-lib-logo.riv",
    autoplay: true,
    stateMachines: "LoadingState",
  });

  return (
    <div className="flex h-96 w-full flex-col items-center justify-center">
      <RiveComponent />
    </div>
  );
};
export default RiveLoading;
