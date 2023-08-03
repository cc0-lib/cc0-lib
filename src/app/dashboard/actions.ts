"use server";

export const getSubmissionData = async (
  ens: string
): Promise<{
  data: any[];
  count: number;
}> => {
  try {
    const res = await fetch(
      `http://localhost:1311/api/data?ens=${ens}&raw=true`,
      {
        next: {
          revalidate: 60,
        },
      }
    );
    if (res.status !== 200) {
      console.log(res.statusText);
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
