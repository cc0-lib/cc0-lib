import { configureClientSIWE } from "connectkit-next-siwe";

export const SiweClient = configureClientSIWE({
  apiRoutePrefix: "/api/auth/siwe", // Your API route directory
  statement: "Sign In With Ethereum to prove you control this wallet.", // optional
});
