"use client";

import { SiweClient } from "@/lib/siwe/client";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { WagmiConfig, createConfig } from "wagmi";
import { mainnet, polygon, zora } from "wagmi/chains";

const chains = [mainnet, zora];

const wcID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;
const alchemyID = process.env.NEXT_PUBLIC_ALCHEMY_ID;

const config = createConfig(
  getDefaultConfig({
    alchemyId: alchemyID,
    walletConnectProjectId: wcID,
    appName: "cc0-lib",
    appDescription: "CC0-LIB is a free and open source library of CC0 assets",
    appUrl: "https://cc0-lib.wtf",
    appIcon: "https://cc0-lib.wtf/cc0-lib-circle.png",
    chains,
  })
);

type Web3ProviderProps = {
  children: React.ReactNode;
};

const Web3Provider = ({ children }: Web3ProviderProps) => {
  return (
    <WagmiConfig config={config}>
      <SiweClient.Provider
        // Optional parameters
        enabled={true} // defaults true
        nonceRefetchInterval={300000} // in milliseconds, defaults to 5 minutes
        sessionRefetchInterval={300000} // in milliseconds, defaults to 5 minutes
        signOutOnDisconnect={true} // defaults true
        signOutOnAccountChange={true} // defaults true
        signOutOnNetworkChange={true} // defaults true
        // onSignIn={(session) => {
        //   console.log(session);
        // }}
        // onSignOut={() => {
        //   console.log("sign out");
        // }}
      >
        <ConnectKitProvider
          mode="dark"
          customTheme={{
            "--ck-font-family": '"Rubik", sans-serif',
            "--ck-accent-color": "#E9FF5F",
            "--ck-accent-text-color": "#292929",
          }}
        >
          {children}
        </ConnectKitProvider>
      </SiweClient.Provider>
    </WagmiConfig>
  );
};

export default Web3Provider;
