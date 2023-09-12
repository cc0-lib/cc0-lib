"use client";

import { SAMPLE_ENS, DEV_MODE } from "@/lib/constant";
import { useSIWE } from "connectkit";
import { useAccount, useEnsName } from "wagmi";

const DashboardENS = () => {
  const { address } = useAccount();
  const { isSignedIn } = useSIWE();

  let { data: ens } = useEnsName({
    address,
  });

  if (DEV_MODE) {
    ens = SAMPLE_ENS;
  }

  const truncatedAddress = address?.slice(0, 6) + "..." + address?.slice(-4);

  return <>{isSignedIn ? ens ?? truncatedAddress : "SIGN IN TO GAIN ACCESS"}</>;
};
export default DashboardENS;
