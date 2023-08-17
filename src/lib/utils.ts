import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { DEV_MODE, HOSTNAME, PREV_HOSTNAME, PREV_MODE } from "./constant";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

export const shuffle = (array: any[]): any[] => {
  return array.sort(() => Math.random() - 0.5);
};

export const handleENSLeaderboard = (sourceData: Item[]) => {
  //count based on duplicate ENS
  const ensList = Array.from(
    new Set(
      sourceData
        .map((item) => {
          if (!item.ENS) return null;
          return item.ENS;
        })
        .flat()
        .filter((e) => e)
    )
  );

  const ensCount = ensList.map((ens) => {
    const count = sourceData.filter((item) => {
      if (!item.ENS) return false;
      return item.ENS.includes(ens as string);
    }).length;
    return { ens, count };
  });

  const sortedEnsCount = ensCount.sort((a, b) => {
    return b.count - a.count;
  });

  const topEns = sortedEnsCount.slice(0, 10);

  const topEnsData = topEns.map((ens) => {
    const data = sourceData.filter((item) => {
      if (!item.ENS) return false;
      return item.ENS.includes(ens.ens as string);
    });

    const count = sourceData.filter((item) => {
      if (!item.ENS) return false;
      return item.ENS.includes(ens.ens as string);
    }).length;

    return { ens: ens.ens, data: data, count: count };
  });

  return {
    top10: topEns,
    top10Data: topEnsData,
    full: sortedEnsCount,
  };
};

export const shortDomainName = (source: string) => {
  const domain = source
    .replace("http://", "")
    .replace("https://", "")
    .replace("www.", "")
    .split("/")[0];

  return domain;
};

export const getLikedItems = () => {
  if (typeof window === "undefined") return [];
  const localStorage = window.localStorage;
  // console.log(localStorage);
  //get from local storage, filter from key that has sentiment and value of like
  const sentimentItems = Object.keys(localStorage).filter((key) => {
    return key.includes("sentiment");
  });

  const likedItems = sentimentItems
    .filter((key) => {
      const isLiked = JSON.parse(localStorage.getItem(key) as string);
      return isLiked === "like";
    })
    .map((key) => {
      //remove -sentiment from key
      const slug = key.replace("-sentiment", "");
      //get the title from local storage
      return slug;
    });

  return likedItems;
};

const getParsedItems = async (data: Item[]): Promise<Item[]> => {
  const itemSchema = z.object({
    id: z.string(),
    Title: z.string(),
    Filetype: z.string(),
    Thumbnails: z.array(
      z.object({
        url: z.string(),
      })
    ),
    Type: z.string(),
    ENS: z.string().optional(),
    Tags: z.array(z.string()),
    Description: z.string(),
    Source: z.string(),
    ID: z.number(),
    "Social Link": z.string().optional(),
    File: z.string().optional(),
    Status: z.string().optional(),
    SubmissionStatus: z.string().optional(),
  });

  const parsedData = data.filter((item) => {
    try {
      itemSchema.parse(item);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  });

  const publishedData = parsedData.filter((item) => {
    return item.Status === "published";
  });

  return publishedData;
};

export const getPublishedItems = async () => {
  const host = PREV_MODE ? PREV_HOSTNAME : HOSTNAME;
  const url = `${host}/api/notion`;
  const res = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  if (res.status !== 200) {
    throw new Error("Failed to fetch data from DB");
  }

  const { data } = await res.json();

  const parsedData = await getParsedItems(data);

  if (parsedData.length === 0) {
    throw new Error("Failed to parse data from DB");
  }

  return parsedData as Item[];
};

export const getRawItems = async () => {
  const host = PREV_MODE ? PREV_HOSTNAME : HOSTNAME;
  const url = `${host}/api/notion`;
  const res = await fetch(url, {
    next: {
      revalidate: 1,
    },
  });

  if (res.status !== 200) {
    throw new Error("Failed to fetch data from DB");
  }

  const { data } = await res.json();

  return data as Item[];
};

export const getDraftItems = async () => {
  const host = PREV_MODE ? PREV_HOSTNAME : HOSTNAME;
  const url = `${host}/api/notion`;
  const res = await fetch(url, {
    next: {
      revalidate: 1,
    },
  });

  if (res.status !== 200) {
    throw new Error("Failed to fetch data from DB");
  }
  const { data } = await res.json();

  const draftItems = data.filter((item) => {
    return item.Status === "draft";
  });

  return draftItems as Item[];
};

export const getDateFromItem = async (id: string) => {
  const res = await fetch(`https://notion-api.splitbee.io/v1/page/${id}`);
  if (res.status !== 200) {
    throw new Error("Failed to fetch data from DB");
  }
  const data = await res.json();
  const item = data[id].value;

  return {
    createdAt: item.created_time,
    lastEdited: item.last_edited_time,
  };
};

export const getRepliesFromFC = async (slug: string) => {
  const host = PREV_MODE ? PREV_HOSTNAME : HOSTNAME;
  const url = `${host}/api/fc?slug=${slug}`;

  const res = await fetch(url);
  if (res.status !== 200) {
    return [];
  }
  const data: FCReply[] = await res.json();
  return data;
};

export const blobSize = (blob: Blob): string => {
  const kilobyte = 1024;
  const megabyte = kilobyte * 1024;
  const gigabyte = megabyte * 1024;
  const terabyte = gigabyte * 1024;

  let blobSize = "";
  if (blob.size < kilobyte) {
    blobSize = `${blob.size} bytes`;
  } else if (blob.size < megabyte) {
    blobSize = `${(blob.size / kilobyte).toFixed(2)} Kb`;
  } else if (blob.size < gigabyte) {
    blobSize = `${(blob.size / megabyte).toFixed(2)} Mb`;
  } else if (blob.size < terabyte) {
    blobSize = `${(blob.size / gigabyte).toFixed(2)} Gb`;
  } else {
    blobSize = `${(blob.size / terabyte).toFixed(2)} Tb`;
  }

  return blobSize;
};

type Blob = {
  size: number;
};

export const bytesToString = (bytes: number): string => {
  const kilobyte = 1024;
  const megabyte = kilobyte * 1024;
  const gigabyte = megabyte * 1024;
  const terabyte = gigabyte * 1024;

  let byteString = "";
  if (bytes < kilobyte) {
    byteString = `${bytes} bytes`;
  } else if (bytes < megabyte) {
    byteString = `${(bytes / kilobyte).toFixed(2)} Kb`;
  } else if (bytes < gigabyte) {
    byteString = `${(bytes / megabyte).toFixed(2)} Mb`;
  } else if (bytes < terabyte) {
    byteString = `${(bytes / gigabyte).toFixed(2)} Gb`;
  } else {
    byteString = `${(bytes / terabyte).toFixed(2)} Tb`;
  }

  return byteString;
};

export const copyToClipboard = (str: string) => {
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};
