"use server";

export const getSubmissionData = async (
  ens: string
): Promise<{
  data: Item[];
  count: number;
}> => {
  let url = `https://cc0-lib.wtf/api/data?ens=${ens}&raw=true`;

  if (process.env.NODE_ENV === "development") {
    url = `http://localhost:1311/api/data?ens=${ens}&raw=true`;
  }

  try {
    const res = await fetch(url, {
      next: {
        revalidate: 60,
      },
    });
    if (res.status !== 200) {
      return {
        data: [],
        count: 0,
      };
    }
    const { data: resData }: APIData = await res.json();

    if (resData && resData.length > 0) {
      return {
        data: resData,
        count: resData.length,
      };
    } else {
      return {
        data: [],
        count: 0,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      data: [],
      count: 0,
    };
  }
};
