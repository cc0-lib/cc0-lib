import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Web3Provider from "@/components/web3/web3-provider";
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>
          <MainContainer>
            {children}
            <Script
              defer
              src="https://analytics.karbonko.re/script.js"
              data-website-id="bde81510-1c80-4029-a56b-979117643070"
            />
            <Analytics />
          </MainContainer>
        </Web3Provider>
      </body>
    </html>
  );
}

type MainContainerProps = {
  children: React.ReactNode;
};

const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between bg-zinc-900 bg-grid
        p-8 font-spline text-white selection:bg-zinc-800 selection:text-prim dark:text-white sm:p-12
        "
    >
      {children}
    </main>
  );
};
