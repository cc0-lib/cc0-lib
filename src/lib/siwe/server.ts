import { configureServerSideSIWE } from "connectkit-next-siwe";

export const SiweServer = configureServerSideSIWE({
  session: {
    cookieName: "cc0-lib-siwe",
    password: process.env.SIWE_SECRET,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});
