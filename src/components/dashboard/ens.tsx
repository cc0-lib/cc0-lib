"use client";

import { useSIWE } from "connectkit";
import { useAccount, useEnsName } from "wagmi";

const DashboardENS = () => {
  const { address } = useAccount();
  const { isSignedIn } = useSIWE();

  const { data: ens } = useEnsName({
    address,
  });

  // const ens = "voadz.eth";

  const truncatedAddress = address?.slice(0, 6) + "..." + address?.slice(-4);

  return <>{isSignedIn ? ens ?? truncatedAddress : "SIGN IN TO GAIN ACCESS"}</>;
};
export default DashboardENS;
