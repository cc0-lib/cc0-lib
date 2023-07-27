"use client";

import { ConnectKitButton, useSIWE } from "connectkit";
import { Shield, ShieldAlert, ShieldCheck } from "lucide-react";

const ConnectButton = () => {
  const { isSignedIn }: { isSignedIn: boolean } = useSIWE();
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
        return (
          <button
            aria-label="Connect to wallet"
            onClick={show}
            className="flex items-center"
          >
            {isConnected ? (
              isSignedIn ? (
                <ShieldCheck className="h-8 w-8 text-prim" />
              ) : (
                <ShieldAlert className="h-8 w-8 text-red-400" />
              )
            ) : (
              <Shield className="h-8 w-8 " />
            )}
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
export default ConnectButton;
