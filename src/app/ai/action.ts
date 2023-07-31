"use server";

const count = 10;

export const getLCResults = async (query: string): Promise<Item[]> => {
  "use server";

  try {
    let url = `https://cc0-lib.wtf/api/lc/search?q=${query}&n=${count}&d=true`;

    // if development, use local api
    if (process.env.NODE_ENV === "development") {
      url = `http://localhost:1311/api/lc/search?q=${query}&n=${count}&d=true}`;
    }

    const res = await fetch(url);

    const response = (await res.json()) as LCResponse;

    return response.data as Item[];
  } catch (error) {
    throw new Error(error);
  }
};
