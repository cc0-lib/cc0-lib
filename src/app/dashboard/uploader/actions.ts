"use server";

export const fetchUploadedData = async (ens: string) => {
  const url = "https://node1.bundlr.network/graphql";
  const requestBody = {
    query: `
    query {
      transactions(tags: [{ name: "Uploader", values: ["${ens}"] }],
      order: DESC
      ) {
        edges {
          node {
            id
            address
            timestamp
            tags {
              name
              value
            }
          }
        }
      }
    }
    `,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
    next: {
      revalidate: 10,
    },
  });

  const { data } = await res.json();

  const uploadedData = data.transactions.edges;

  // filter out undefined nodes
  const filteredData = uploadedData.filter((e) => e.node !== undefined);

  return filteredData;
};
