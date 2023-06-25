"use client";

import { Filter, HelpingHand, Info, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { slugify } from "@/lib/utils";

export default function Home() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const [initialData, setInitialData] = useState(null);
  const [data, setData] = useState(null);
  const [types, setTypes] = useState(null);

  const getData = async () => {
    const res = await fetch(
      "https://notion-api.splitbee.io/v1/table/872d317db9c64d3d88195b217cb3dc2f",
      {
        next: {
          revalidate: 60,
        },
      }
    );
    const data = await res.json();
    setInitialData(data);
    return data;
  };

  const handleKeyPress = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      document.querySelector("input").focus();
    }
  };

  const handleSearch = (e) => {
    if (initialData) {
      const searchQuery = e.target.value.toLowerCase();
      const filteredData = initialData.filter((item) => {
        if (searchQuery.length < 2) return false;
        return (
          item.Title?.toLowerCase().includes(searchQuery) ||
          item.Type?.toLowerCase().includes(searchQuery) ||
          item.Filetype?.toLowerCase().includes(searchQuery) ||
          item.Description?.toLowerCase().includes(searchQuery) ||
          item.id?.toLowerCase().includes(searchQuery) ||
          item.Thumbnails?.[0].url.toLowerCase().includes(searchQuery) ||
          item.Tags?.map((e) => e.toLowerCase()).includes(searchQuery)
        );
      });
      setData(filteredData);
    }
  };

  const handleSearchBar = (e) => {
    if (initialData) {
      const searchQuery = e?.toLowerCase();
      const filteredData = initialData?.filter((item) => {
        return (
          item.Title?.toLowerCase().includes(searchQuery) ||
          item.Type?.toLowerCase().includes(searchQuery) ||
          item.Filetype?.toLowerCase().includes(searchQuery) ||
          item.Description?.toLowerCase().includes(searchQuery) ||
          item.id?.toLowerCase().includes(searchQuery) ||
          item.Thumbnails?.[0].url.toLowerCase().includes(searchQuery) ||
          item.Tags?.map((e) => e.toLowerCase()).includes(searchQuery)
        );
      });
      document.getElementById("search").value = e?.toLowerCase();
      setData(filteredData);
    }
  };

  const handleRandomData = () => {
    if (initialData) {
      // create a list of tags
      const tagsList = Array.from(
        new Set(
          initialData
            .map((item) => {
              if (!item.Tags) return null;
              return item.Tags;
            })
            .flat()
            .filter((e) => e)
        )
      );

      const randomTag = tagsList[Math.floor(Math.random() * tagsList.length)];

      const randomTagData = initialData.filter((item) => {
        if (!item.Tags) return false;
        return item.Tags.includes(randomTag);
      });

      document.getElementById("search").value = randomTag.toLowerCase();
      setData(randomTagData);
    }
  };

  const handleFilter = (e) => {
    if (initialData) {
      const filterQuery = e.toLowerCase();
      const filteredData = initialData.filter((item) => {
        if (filterQuery === "all") return true;
        return item.Type?.toLowerCase().includes(filterQuery);
      });
      document.getElementById("search").value = e.toLowerCase();
      setData(filteredData);
    }
  };

  useEffect(() => {
    if (initialData) {
      // create a list of types
      const typesList = Array.from(
        new Set(
          initialData
            .map((item) => {
              return item.Type;
            })
            .filter((e) => e)
        )
      );
      setTypes(typesList);
    }
  }, [initialData]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (initialData && search) {
      handleSearchBar(search);
    }
  }, [search, initialData]);

  useEffect(() => {
    document.querySelector("input").focus();
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (!search) {
      document.getElementById("search").focus();
    }
  }, []);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between bg-zinc-900 bg-grid p-12
    font-spline selection:bg-zinc-800 selection:text-prim"
    >
      <header className="fixed z-10 flex w-full flex-row items-center justify-between px-12 sm:px-20">
        <Link
          href="/"
          className="flex gap-2"
          onClick={() => {
            setData(null);
            document.getElementById("search").value = "";
          }}
        >
          <img src="./cc0lib.svg" alt="cc0lib" className="block sm:hidden" />
          <img
            src="./cc0lib-h.svg"
            alt="cc0lib"
            className="hidden w-40 sm:block"
          />
        </Link>
        {data && data.length > 0 && data.length < 2 && (
          <p className="bg-zinc-800 px-4 py-2 text-center font-chakra text-sm uppercase">
            {data?.length} result
          </p>
        )}
        {data && data.length > 1 && (
          <p className="bg-zinc-800 px-4 py-2 text-center font-chakra text-sm uppercase">
            {data?.length} results
          </p>
        )}
        <ul className="flex items-center gap-4">
          <li>
            <Link
              href="/info"
              className="group flex flex-row items-center gap-2"
            >
              <span className="duration-250 opacity-0 transition-all ease-linear group-hover:opacity-100">
                info
              </span>
              <Info className="h-8 w-8 group-hover:stroke-prim" />
            </Link>
          </li>
        </ul>
      </header>

      {data && (
        <div className="masonry sm:masonry-sm md:masonry-md 2xl:masonry-lg my-16 space-y-6">
          {data.map((item) => {
            return (
              <Link
                key={item.id}
                href={`/${slugify(item.Title)}`}
                className="group relative flex"
              >
                <img
                  src={item.Thumbnails?.[0].url}
                  className="h-auto w-full rounded-sm duration-100 ease-in-out hover:ring-2 hover:ring-prim hover:ring-offset-1 hover:ring-offset-zinc-900"
                />
                <h1 className="absolute right-4 top-4 hidden bg-zinc-800 bg-opacity-50 px-3 py-1 font-chakra uppercase text-white backdrop-blur-sm group-hover:block">
                  {item.Filetype}
                </h1>
              </Link>
            );
          })}
        </div>
      )}
      <div className="fixed bottom-0 left-0 z-10 mb-60 flex flex-col">
        <input
          onChange={handleSearch}
          id="search"
          type="text"
          autoComplete="off"
          className="duration-250 focus:ring-none peer mx-4 h-20 w-full bg-transparent px-6 font-rubik text-4xl text-white drop-shadow-md transition-all ease-linear selection:bg-zinc-800 selection:text-sec placeholder:text-zinc-600 focus:rounded-sm focus:bg-zinc-800 focus:bg-opacity-50 focus:outline-none focus:backdrop-blur-md sm:mx-20 sm:h-40 sm:w-1/2 sm:text-8xl"
          placeholder="search here"
        />
        {/* <span className="px-8 mx-20 -mt-6 text-zinc-700 duration-250 ease-linear transition-all">
          ctrl+k / cmd+k
        </span> */}
      </div>
      <footer className="fixed bottom-0 mb-12 flex w-full flex-row items-center justify-between px-12 sm:px-20">
        <div
          className="group hidden flex-row items-center gap-2 sm:flex"
          id="filter"
        >
          <Filter className="h-8 w-8 group-hover:stroke-prim" />
          {/* <span className="opacity-0 group-hover:opacity-100 duration-250 ease-linear transition-all">
            filter
          </span> */}

          {types && (
            <ul className="group flex flex-col items-center gap-1 lowercase sm:flex-row">
              {types.map((type) => {
                return (
                  <li
                    key={type}
                    onClick={() => handleFilter(type)}
                    className="opacity-0 hover:text-prim group-hover:opacity-100"
                  >
                    {type}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div onClick={handleRandomData}>
          <div
            className="group flex flex-row items-center gap-2 sm:-ml-12"
            id="random"
          >
            <Sparkles className="h-8 w-8 group-hover:stroke-prim" />
            <span className="duration-250 opacity-0 transition-all ease-linear group-hover:opacity-100">
              random
            </span>
          </div>
        </div>
        <Link href="/contribute">
          <div
            className="group flex flex-row items-center gap-2"
            id="contribute"
          >
            <span className="duration-250 opacity-0 transition-all ease-linear group-hover:opacity-100">
              contribute
            </span>
            <HelpingHand className="h-8 w-8 group-hover:stroke-prim" />
          </div>
        </Link>
      </footer>
    </main>
  );
}
