import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "CC0-LIB",
  description: "CC0 content library",
  metadataBase: new URL("https://cc0-lib.wtf"),
  openGraph: {
    title: "CC0-LIB",
    description: "CC0 content library for the masses",
    image: "https://cc0-lib.wtf/og.png",
    url: "https://cc0-lib.wtf",
    siteName: "CC0-LIB",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
