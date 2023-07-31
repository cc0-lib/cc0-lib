"use server";

const count = 10;

export const getLCResults = async (query: string): Promise<Item[]> => {
  "use server";

  try {
    const res = await fetch(
      `http://localhost:1311/api/lc/search?q=${query}&n=${count}&d=true`
    );

    const response = (await res.json()) as LCResponse;
    return response.data as Item[];
  } catch (error) {
    throw new Error(error);
  }
};
