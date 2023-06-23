"use client";

import { Filter, HelpingHand, Info } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [initialData, setInitialData] = useState([]);
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await fetch(
      "https://notion-api.splitbee.io/v1/table/872d317db9c64d3d88195b217cb3dc2f"
    );
    const data = await res.json();
    setInitialData(data);

    return data;
  };

  useEffect(() => {
    getData();
  }, []);

  const handleKeyPress = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      document.querySelector("input").focus();
    }
  };

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredData = initialData.filter((item) => {
      if (searchQuery.length < 2) return false;
      console.log(item);
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
  };

  useEffect(() => {
    document.querySelector("input").focus();
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    document.getElementById("search").focus();
  }, []);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-12 bg-zinc-900 bg-grid
    selection:bg-zinc-800 selection:text-prim font-overpass"
    >
      <header className="flex-row flex fixed justify-between items-center w-full px-20 z-10">
        <Link
          href="/"
          className="flex gap-2"
          onClick={() => {
            setData([]);
            document.getElementById("search").value = "";
          }}
        >
          {/* <img src="./cc0lib.svg" alt="cc0lib" /> */}
          <img src="./cc0lib-h.svg" alt="cc0lib" className="w-40" />
        </Link>
        {/* {data && data.length <= 1 ? (
          <p className="font-overpass text-sm ">{data.length} RESULT</p>
        ) : (
          <p className="font-overpass text-sm ">{data.length} RESULTS</p>
        )} */}
        <ul className="flex gap-4 items-center">
          <li>
            <Link
              href="/info"
              className="flex flex-row items-center gap-2 group"
            >
              <span className="opacity-0 group-hover:opacity-100 duration-250 ease-linear transition-all">
                info
              </span>
              <Info className="w-8 h-8 group-hover:stroke-prim" />
            </Link>
          </li>
        </ul>
      </header>

      {data && (
        <div className="masonry sm:masonry-sm md:masonry-md space-y-6 my-16 ">
          {data.map((item) => {
            return (
              <div key={item.id} className="group relative">
                <img
                  src={item.Thumbnails?.[0].url}
                  className="hover:ring-2 hover:ring-offset-1 hover:ring-offset-zinc-900 hover:ring-prim ease-in-out duration-100 rounded-sm"
                />
                <h1 className="top-4 right-4 absolute hidden group-hover:block font-chakra text-white backdrop-blur-sm bg-zinc-800 bg-opacity-50 px-3 py-1">
                  {item.Filetype}
                </h1>
              </div>
            );
          })}
        </div>
      )}
      <div className="fixed mb-60 bottom-0 z-10 left-0 flex flex-col">
        <input
          onChange={handleSearch}
          id="search"
          type="text"
          className="text-white px-6 mx-20 text-8xl bg-transparent focus:outline-none selection:text-sec selection:bg-zinc-800 placeholder:text-zinc-600 focus:backdrop-blur-md drop-shadow-md focus:bg-zinc-800 focus:bg-opacity-50 w-1/2 h-40 focus:rounded-sm peer duration-250 ease-linear transition-all focus:ring-none"
          placeholder="search here"
        />
        {/* <span className="px-8 mx-20 -mt-6 text-zinc-700 duration-250 ease-linear transition-all">
          ctrl+k / cmd+k
        </span> */}
      </div>
      <footer className="flex-row flex fixed justify-between items-center w-full px-20 mb-12 bottom-0">
        {/* <div className="flex flex-row items-center gap-2 group" id="filter">
          <Filter className="w-8 h-8 group-hover:stroke-prim" />
          <span className="opacity-0 group-hover:opacity-100 duration-250 ease-linear transition-all">
            filter
          </span>

          <ul className="flex justify-center gap-2 items-center">
            <li className="hover:text-prim">image</li>
            <li className="hover:text-prim">video</li>
            <li className="hover:text-prim">audio</li>
            <li className="hover:text-prim">gif</li>
            <li className="hover:text-prim">3d</li>
          </ul>
        </div> */}
        <div></div>
        <div className="flex flex-row items-center gap-2 group" id="contribute">
          <span className="opacity-0 group-hover:opacity-100 duration-250 ease-linear transition-all">
            contribute
          </span>
          <HelpingHand className="w-8 h-8 group-hover:stroke-prim" />
        </div>
      </footer>
    </main>
  );
}
