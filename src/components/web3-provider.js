"use client";

import { SiweClient } from "@/lib/siwe/client";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { WagmiConfig, createConfig } from "wagmi";
import { mainnet, polygon, zora } from "wagmi/chains";

const chains = [mainnet, zora];

const config = createConfig(
  getDefaultConfig({
    alchemyId: process.env.ALCHEMY_ID,
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID,
    appName: "cc0-lib",
    appDescription: "CC0-LIB is a free and open source library of CC0 assets",
    appUrl: "https://cc0-lib.wtf",
    appLogo: "https://cc0-lib.wtf/cc0lib.svg",
    chains,
  })
);

const Web3Provider = ({ children }) => {
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
          showAvatar={false}
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
