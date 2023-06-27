import "server-only";

const getAllItems = async () => {
  const res = await fetch(
    "https://notion-api.splitbee.io/v1/table/872d317db9c64d3d88195b217cb3dc2f",
    {
      next: {
        revalidate: 60,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data from DB");
  }
  const data = await res.json();

  return data;
};

export default getAllItems;
