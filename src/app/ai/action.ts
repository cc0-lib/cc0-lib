"use server";

import { HOSTNAME, PREV_HOSTNAME, PREV_MODE } from "@/lib/constant";

const count = 10;

export const getLCResults = async (query: string): Promise<Item[]> => {
  "use server";

  try {
    const host = PREV_MODE ? PREV_HOSTNAME : HOSTNAME;
    const url = `${host}/api/lc/search?q=${query}&n=${count}&d=true`;

    const res = await fetch(url);

    const response = (await res.json()) as LCResponse;

    return response.data as Item[];
  } catch (error) {
    throw new Error(error);
  }
};
