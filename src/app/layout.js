import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Web3Provider from "@/components/web3-provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Web3Provider>
          <MainContainer>
            {children}
            <Analytics />
          </MainContainer>
        </Web3Provider>
      </body>
    </html>
  );
}

const MainContainer = ({ children }) => {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between bg-zinc-900 bg-grid p-8
        font-spline text-white selection:bg-zinc-800 selection:text-prim dark:text-white sm:p-12"
    >
      {children}
    </main>
  );
};
