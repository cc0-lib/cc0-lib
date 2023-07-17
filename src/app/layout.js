import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <MainContainer>
          {children}
          <Analytics />
        </MainContainer>
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
