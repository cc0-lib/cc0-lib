import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Web3Provider from "@/components/web3/web3-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
