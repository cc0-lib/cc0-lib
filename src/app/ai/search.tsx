"use client";

import { useSIWE } from "connectkit";
import { Wand2 } from "lucide-react";
import { Suspense, useCallback, useEffect, useState } from "react";
import SearchData from "./search-data";
import { useAccount } from "wagmi";
import { getLCResults } from "./action";

const AISearchPage = () => {
  const [data, setData] = useState<Item[]>([]);
  const [query, setQuery] = useState<string>("");

  const { isConnected } = useAccount();
  const { isSignedIn } = useSIWE();

  const fetchData = async () => {
    const res = await getLCResults(query);

    const filteredData = res.filter(
      (item, index, self) => index === self.findIndex((t) => t.id === item.id)
    );

    setData(filteredData);
  };

  const onClick = async () => {
    await fetchData();
  };

  if (isSignedIn && isConnected) {
    return (
      <>
        <div className="mt-16 flex w-full max-w-prose flex-row justify-between gap-4">
          <input
            type="text"
            placeholder="cute food svg"
            name="query"
            className="peer w-full border-b-2 border-zinc-800 bg-zinc-900 p-4 text-xl text-zinc-200 placeholder:text-zinc-600 focus:border-b-2 focus:border-prim focus:outline-none"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            minLength={6}
            maxLength={100}
            required
            autoFocus
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchData();
              }
            }}
          />
          <button
            onClick={onClick}
            type="submit"
            className="text-zinc-600 hover:text-prim peer-focus:text-sec "
          >
            <Wand2 className="h-8 w-8 self-center" />
          </button>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <SearchData data={data} />
        </Suspense>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-center font-chakra text-5xl uppercase">
          Sign in to use AI Search
        </h1>
      </div>
    </>
  );
};

export default AISearchPage;
