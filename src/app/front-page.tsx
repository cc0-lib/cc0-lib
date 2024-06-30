"use client";

import { useState, useEffect, useRef, useCallback, ChangeEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ChevronsUp,
  Heart,
  HelpingHand,
  Info,
  LayoutDashboard,
  Sparkles,
  XCircle,
} from "lucide-react";
import { shuffle, slugify } from "@/lib/utils";
import useLocalStorage from "@/hooks/use-local-storage";
import va from "@vercel/analytics";
import Cursor from "@/components/ui/cursor";
import Ticker from "@/components/ui/ticker";
import ConnectButton from "@/components/web3/connect-button";
import { useInView } from "framer-motion";
import Image from "next/image";
import { DEV_MODE } from "@/lib/constant";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

type FrontPageProps = {
  initialData: Item[];
};

const FrontPage = ({ initialData }: FrontPageProps) => {
  const searchParams = useSearchParams();

  const search = searchParams?.get("search");
  const tagSearch = searchParams?.get("tag");
  const formatSearch = searchParams?.get("format");
  const typeSearch = searchParams?.get("type");

  const [data, setData] = useState<Item[]>([]);
  const [trimmedData, setTrimmedData] = useState<Item[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [query, setQuery] = useLocalStorage("query", "");

  const filterPanelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [page, setPage] = useState(1);
  const limit = 6;
  const loadingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(loadingRef);

  useEffect(() => {
    setTrimmedData([]);
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (data) {
      const shuffledData = shuffle(data);
      setTrimmedData(shuffledData.slice(0, limit));
    }
  }, [data]);

  const loadMoreData = () => {
    if (trimmedData) {
      const nextPageData = data.slice(page * limit, (page + 1) * limit);
      setTrimmedData((trimmedData) => [...trimmedData, ...nextPageData]);
      if (trimmedData.length === data.length) {
        return;
      }
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (isInView) {
      loadMoreData();
    }
  }, [isInView]);

  const handleKeyPress = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      inputRef.current?.focus();
    }
  };

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const searchQuery = e.target.value;
      if (initialData) {
        const filteredData = initialData.filter((item) => {
          const lowerCaseSearchQuery = searchQuery.toLowerCase();
          if (lowerCaseSearchQuery.length < 2) return false;
          return (
            item.Title?.toLowerCase().includes(lowerCaseSearchQuery) ||
            item.Type?.toLowerCase().includes(lowerCaseSearchQuery) ||
            item.Filetype?.toLowerCase().includes(lowerCaseSearchQuery) ||
            item.Description?.toLowerCase().includes(lowerCaseSearchQuery) ||
            item.ENS?.toLowerCase().includes(lowerCaseSearchQuery) ||
            item.Tags?.map((e) => e.toLowerCase()).includes(
              lowerCaseSearchQuery
            )
          );
        });
        setQuery(searchQuery);

        if (searchQuery === "cc0") {
          const finalData = shuffle(initialData);
          setData(finalData);
        } else {
          const finalData = shuffle(filteredData);
          setData(finalData);
        }
      }
    },
    [setQuery, initialData]
  );

  const handleSearchBar = useCallback(
    (searchQuery: string) => {
      if (initialData && inputRef) {
        const filteredData = initialData?.filter((item) => {
          const lowerCaseSearchQuery = searchQuery.toLowerCase();
          if (lowerCaseSearchQuery.length < 2) return false;
          return (
            item.Title?.toLowerCase().includes(lowerCaseSearchQuery) ||
            item.Type?.toLowerCase().includes(lowerCaseSearchQuery) ||
            item.Filetype?.toLowerCase().includes(lowerCaseSearchQuery) ||
            item.Description?.toLowerCase().includes(lowerCaseSearchQuery) ||
            item.ENS?.toLowerCase().includes(lowerCaseSearchQuery) ||
            item.Tags?.map((e) => e.toLowerCase()).includes(
              lowerCaseSearchQuery
            )
          );
        });
        setQuery(searchQuery);
        if (inputRef.current) {
          inputRef.current.value = searchQuery.toLowerCase();
        }

        if (searchQuery === "cc0") {
          const finalData: Item[] = shuffle(initialData);
          setData(finalData);
        } else {
          const finalData: Item[] = shuffle(filteredData);
          setData(finalData);
        }
      }
    },
    [setQuery, initialData]
  );

  const handleTagSearch = useCallback(
    (searchQuery: string) => {
      if (initialData) {
        const filteredData = initialData?.filter((item) => {
          const lowerCaseSearchQuery = searchQuery.toLowerCase();
          if (lowerCaseSearchQuery.length < 2) return false;
          return item.Tags?.map((e) => e.toLowerCase()).includes(
            lowerCaseSearchQuery
          );
        });
        setQuery(searchQuery);
        if (inputRef.current) {
          inputRef.current.value = searchQuery.toLowerCase();
        }

        if (searchQuery === "cc0") {
          const finalData: Item[] = shuffle(initialData);
          setData(finalData);
        } else {
          const finalData: Item[] = shuffle(filteredData);
          setData(finalData);
        }
      }
    },
    [setQuery, initialData]
  );

  const handleFormatSearch = useCallback(
    (searchQuery: string) => {
      if (initialData) {
        const filteredData = initialData?.filter((item) => {
          const lowerCaseSearchQuery = searchQuery.toLowerCase();
          if (lowerCaseSearchQuery.length < 2) return false;
          return item.Filetype?.toLowerCase().includes(lowerCaseSearchQuery);
        });
        setQuery(searchQuery);
        if (inputRef.current) {
          inputRef.current.value = searchQuery.toLowerCase();
        }
        if (searchQuery === "cc0") {
          const finalData: Item[] = shuffle(initialData);
          setData(finalData);
        } else {
          const finalData: Item[] = shuffle(filteredData);
          setData(finalData);
        }
      }
    },
    [setQuery, initialData]
  );

  const handleTypeSearch = useCallback(
    (searchQuery: string) => {
      if (initialData) {
        const filteredData = initialData?.filter((item) => {
          const lowerCaseSearchQuery = searchQuery.toLowerCase();
          if (lowerCaseSearchQuery.length < 2) return false;
          return item.Type?.toLowerCase().includes(lowerCaseSearchQuery);
        });
        setQuery(searchQuery);
        if (inputRef.current) {
          inputRef.current.value = searchQuery.toLowerCase();
        }
        if (searchQuery === "cc0" || searchQuery === "all") {
          const finalData: Item[] = shuffle(initialData);
          setData(finalData);
        } else {
          const finalData: Item[] = shuffle(filteredData);
          setData(finalData);
        }
      }
    },
    [setQuery, initialData]
  );

  const handleRandomData = () => {
    va.track("random-data");
    if (initialData) {
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

      const randomTag = tagsList[
        Math.floor(Math.random() * tagsList.length)
      ] as string;

      const randomTagData = initialData.filter((item) => {
        if (!item.Tags) return false;
        return item.Tags.includes(randomTag);
      });
      setQuery(randomTag.toLowerCase());
      if (inputRef.current) {
        inputRef.current.value = randomTag.toLowerCase();
      }
      if (randomTag === "cc0") {
        const finalData = shuffle(randomTagData);
        setData(finalData);
      } else {
        const finalData = shuffle(randomTagData);
        setData(finalData);
      }
    }
  };

  useEffect(() => {
    if (initialData) {
      const typesList: string[] = Array.from(
        new Set(
          initialData
            .map((item) => {
              return item.Type;
            })
            .filter((e) => e)
        )
      );
      typesList.push("all");
      setTypes(typesList);
    }
  }, [initialData]);

  useEffect(() => {
    if (initialData) {
      handleSearchBar("cc0");
    }
  }, [initialData, handleSearchBar]);

  useEffect(() => {
    if (initialData && query && !typeSearch && !formatSearch && !tagSearch) {
      handleSearchBar(query);
    }
  }, [
    initialData,
    query,
    handleSearchBar,
    typeSearch,
    formatSearch,
    tagSearch,
  ]);

  useEffect(() => {
    if (initialData && search) {
      handleSearchBar(search);
    }
  }, [initialData, search, handleSearchBar]);

  useEffect(() => {
    if (initialData && tagSearch) {
      handleTagSearch(tagSearch);
    }
  }, [initialData, tagSearch, handleTagSearch]);

  useEffect(() => {
    if (initialData && formatSearch) {
      handleFormatSearch(formatSearch);
    }
  }, [initialData, formatSearch, handleFormatSearch]);

  useEffect(() => {
    if (initialData && typeSearch) {
      handleTypeSearch(typeSearch);
    }
  }, [initialData, typeSearch, handleTypeSearch]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  // useEffect(() => {
  //   if (!search || !tagSearch || !formatSearch || !typeSearch) {
  //     if (inputRef.current) {
  //       inputRef.current.focus();
  //     }
  //   }
  // }, [search, tagSearch, formatSearch, typeSearch]);

  return (
    <>
      <header className="fixed z-10 flex w-full flex-row items-center justify-between px-8 sm:px-20">
        <Link href="/" className="flex gap-2">
          <Image
            src="https://cc0-lib.wtf/cc0lib.svg"
            alt="cc0lib logo"
            width={160}
            height={160}
            className="block w-16 sm:hidden"
          />
          <Image
            src="https://cc0-lib.wtf/cc0lib-h.svg"
            alt="cc0lib logo horizontal"
            width={160}
            height={160}
            className="hidden w-40 sm:block"
          />
        </Link>
        <ul className="flex items-center gap-4">
          <li>
            <Link
              href="/fav"
              className="group flex flex-row items-center gap-2"
            >
              <span className=" duration-250 hidden opacity-0 transition-all ease-linear group-hover:opacity-100 sm:block">
                fav
              </span>
              <Heart className="h-8 w-8 group-hover:stroke-prim" />
            </Link>
          </li>
          <li>
            <Link
              href="/info"
              className="group flex flex-row items-center gap-2"
            >
              <span className="duration-250 hidden opacity-0 transition-all ease-linear group-hover:opacity-100 sm:block">
                info
              </span>
              <Info className="h-8 w-8 group-hover:stroke-prim" />
            </Link>
          </li>
          <span className="sm:ml-8">
            <ConnectButton />
          </span>
        </ul>
      </header>

      <div className="mt-16">
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
      </div>

      <Cursor name={query} optional={true} />

      {trimmedData && (
        <div
          className={`masonry ${trimmedData.length < 2 && "w-full max-w-xl"}  ${
            trimmedData.length == 2 && "sm:masonry-sm w-full max-w-4xl"
          } ${
            trimmedData.length > 2 &&
            "md:masonry-md 2xl:masonry-lg my-16 max-w-none"
          } my-16 space-y-6`}
        >
          {trimmedData.map((item) => {
            return (
              <ContextMenu key={item.id}>
                <ContextMenuTrigger className="group relative flex h-auto w-full break-inside-avoid">
                  <Link key={item.id} href={`/${slugify(item.Title)}`}>
                    <Image
                      src={item.ThumbnailURL as string}
                      alt={item.Title}
                      width={500}
                      height={500}
                      loading="lazy"
                      className="h-auto max-w-sm rounded-sm opacity-80 transition-all duration-100 ease-in-out hover:opacity-100 hover:ring-2 hover:ring-prim hover:ring-offset-1 hover:ring-offset-zinc-900"
                    />
                    <h1 className="absolute right-4 top-4 hidden bg-zinc-800 bg-opacity-50 px-3 py-1 font-chakra uppercase text-white backdrop-blur-sm group-hover:block">
                      {item.Filetype}
                    </h1>
                  </Link>
                </ContextMenuTrigger>
                <ContextMenuContent className="border-none bg-zinc-800">
                  <ContextMenuItem
                    className="cursor-pointer font-jetbrains font-light text-zinc-200 focus:bg-prim"
                    onClick={() => {
                      if (item.Type === "Image" || item.Type === "GIF") {
                        console.log(item.ThumbnailURL);
                        window.open(item.ThumbnailURL, "_blank");
                      } else {
                        window.open(item.File, "_blank");
                      }
                    }}
                  >
                    Download {item.Filetype}
                  </ContextMenuItem>
                  <ContextMenuItem
                    className="cursor-pointer font-jetbrains font-light text-zinc-200 focus:bg-prim"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        item.Type === "Image" || item.Type === "GIF"
                          ? item.ThumbnailURL!
                          : item.File!
                      );
                    }}
                  >
                    Copy {item.Type} URL
                  </ContextMenuItem>
                  <ContextMenuSeparator className="bg-zinc-700 focus:bg-prim" />

                  <ContextMenuSub>
                    <ContextMenuSubTrigger className="font-jetbrains font-light text-zinc-200 focus:bg-prim">
                      Tags
                    </ContextMenuSubTrigger>
                    <ContextMenuSubContent className="border-none bg-zinc-800">
                      <ContextMenuLabel className="font-jetbrains font-light text-zinc-200 focus:bg-prim">
                        {item.Tags.join(", ")}
                      </ContextMenuLabel>
                    </ContextMenuSubContent>
                  </ContextMenuSub>
                  {item.Source && (
                    <ContextMenuSub>
                      <ContextMenuSubTrigger className="font-jetbrains font-light text-zinc-200 focus:bg-prim">
                        Source
                      </ContextMenuSubTrigger>
                      <ContextMenuSubContent className="border-none bg-zinc-800">
                        <ContextMenuLabel className="font-jetbrains font-light text-zinc-200 focus:bg-prim">
                          <Link
                            href={item.Source as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-prim hover:underline"
                          >
                            {item.Source}
                          </Link>
                        </ContextMenuLabel>
                      </ContextMenuSubContent>
                    </ContextMenuSub>
                  )}
                  <ContextMenuSub>
                    <ContextMenuSubTrigger className="font-jetbrains font-light text-zinc-200 focus:bg-prim">
                      Submitted by
                    </ContextMenuSubTrigger>
                    <ContextMenuSubContent className="border-none bg-zinc-800">
                      <ContextMenuLabel className="font-jetbrains font-light text-zinc-200 focus:bg-prim">
                        <Link
                          href={
                            item["Social Link"] ? item["Social Link"] : "/info"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-prim hover:underline"
                        >
                          {item.ENS ?? "cc0-lib"}
                        </Link>
                      </ContextMenuLabel>
                    </ContextMenuSubContent>
                  </ContextMenuSub>
                  <ContextMenuSeparator className="bg-zinc-700 focus:bg-prim" />
                  <ContextMenuItem className="cursor-pointer font-jetbrains font-light text-zinc-200 focus:bg-prim">
                    <Link href={`/${slugify(item.Title)}`}>More info</Link>
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            );
          })}
        </div>
      )}
      <div ref={loadingRef} />

      <div className="fixed bottom-0 left-0 z-10 mb-60 flex flex-col">
        <input
          onChange={handleSearch}
          ref={inputRef}
          value={query}
          id="search"
          type="text"
          autoComplete="off"
          autoCorrect="off"
          className="duration-250 focus:ring-none peer pointer-events-auto mx-4 h-20 w-full bg-transparent px-6 font-rubik text-4xl text-white drop-shadow-md transition-all ease-linear selection:bg-zinc-800 selection:text-sec placeholder:text-zinc-600 focus:rounded-sm focus:bg-zinc-800 focus:bg-opacity-50 focus:outline-none focus:backdrop-blur-md sm:mx-20 sm:h-40 sm:max-w-xl sm:text-8xl"
          placeholder="search here"
        />
        <span className="duration-250 z-20 mx-20 -mt-6 hidden w-max bg-zinc-900 text-zinc-700 opacity-0 transition-all ease-linear peer-placeholder-shown:opacity-100 peer-focus:opacity-0 sm:block sm:px-8 sm:py-2">
          ctrl+k / cmd+k to search
        </span>
      </div>
      <footer className="fixed bottom-0 mb-12 flex w-full flex-row items-center justify-between px-12 sm:px-20">
        <div
          className="group flex cursor-pointer flex-col items-center gap-2 sm:hidden"
          id="filterMobile"
          onClick={() => {
            filterPanelRef.current?.classList.remove("hidden");
          }}
        >
          <LayoutDashboard className="h-8 w-8 group-hover:stroke-prim" />
        </div>
        <div
          className="group hidden cursor-pointer flex-row items-center gap-2 sm:flex"
          id="filter"
        >
          <LayoutDashboard className="h-8 w-8 group-hover:stroke-prim" />

          <div className="absolute ml-12">
            {types && (
              <ul className="group hidden flex-col items-center gap-1 lowercase sm:flex sm:flex-row">
                {types.map((type) => {
                  return (
                    <Link
                      key={type}
                      href={`/?type=${type.toLowerCase()}`}
                      className="opacity-0 group-hover:opacity-100 hover:text-prim"
                    >
                      {type}
                    </Link>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        <div onClick={handleRandomData} data-umami-event="random-data">
          <div
            className="group flex cursor-pointer flex-row items-center gap-2"
            id="random"
          >
            <Sparkles className="h-8 w-8 group-hover:stroke-prim" />
            <div className="absolute ml-12">
              <span className="duration-250 hidden opacity-0 transition-all ease-linear group-hover:opacity-100 sm:block">
                random
              </span>
            </div>
          </div>
        </div>
        <Link href="/contribute">
          <div
            className="group relative flex flex-row items-center gap-2"
            id="contribute"
          >
            <span className="duration-250 absolute right-12 hidden opacity-0 transition-all ease-linear group-hover:opacity-100 sm:block">
              contribute
            </span>

            <HelpingHand className="h-8 w-8 group-hover:stroke-prim" />
          </div>
        </Link>
      </footer>

      {trimmedData && data && page > 1 && (
        <div className="fixed bottom-0 z-10 mb-24">
          <div
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group flex cursor-pointer flex-row items-center gap-2"
          >
            {DEV_MODE && (
              <>{`${trimmedData.length}/${data.length} - page:${page}`}</>
            )}
            <ChevronsUp className="h-8 w-8 text-zinc-500 group-hover:stroke-prim" />
          </div>
        </div>
      )}

      <div
        ref={filterPanelRef}
        className="fixed inset-0 left-0 top-0 z-30 hidden h-full w-screen flex-col bg-zinc-800/90 backdrop-blur-sm sm:hidden"
      >
        <div className="h-screen max-w-full ">
          {types && (
            <ul className="flex h-screen w-full flex-col items-center justify-center gap-4 ">
              {types.map((type) => {
                return (
                  <Link
                    key={type}
                    onClick={() => {
                      filterPanelRef.current?.classList.add("hidden");
                    }}
                    href={`/?type=${type.toLowerCase()}`}
                    className=" text-4xl lowercase hover:text-prim"
                  >
                    {type}
                  </Link>
                );
              })}
            </ul>
          )}

          <div
            onClick={() => {
              filterPanelRef.current?.classList.add("hidden");
            }}
            className="absolute right-10 top-12 cursor-pointer"
          >
            <XCircle className="h-10 w-10 justify-center" />
          </div>
        </div>
      </div>

      <FrontPageTicker />
    </>
  );
};

const FrontPageTicker = () => {
  return (
    <Ticker position="bottom">
      <div className="flex flex-row">
        <div className="mr-64 flex flex-row gap-1 ">
          <Link
            href="/dashboard"
            rel="noreferrer noopener"
            className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
          >
            dashboard
          </Link>{" "}
          is now live. you can add, edit and view your submissions
        </div>
        <div className="mr-64 flex flex-row gap-1 ">
          Thank you Nouns DAO contributors and supporters.{" "}
          <Link
            href="https://nouns.wtf/vote/343"
            target="_blank"
            rel="noreferrer noopener"
            className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
          >
            proposal 343
          </Link>{" "}
          passed!
        </div>
        <div className="mr-64 flex flex-row gap-1 ">
          submit your{" "}
          <Link
            href="/contribute"
            rel="noreferrer noopener"
            className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
          >
            cc0 content
          </Link>
        </div>
        <div className="mr-64 flex flex-row gap-1 ">a nouns thing ⌐◨-◨</div>
        {/* <div className="mr-64 flex flex-row gap-1 ">
          new{" "}
          <Link
            href="/ai"
            rel="noreferrer noopener"
            className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
          >
            ai-assisted search
          </Link>{" "}
          feature is live
        </div> */}
        <div className="mr-64 flex flex-row gap-1 ">
          cc0-lib is funded by nouns dao
        </div>
      </div>
    </Ticker>
  );
};

export default FrontPage;
