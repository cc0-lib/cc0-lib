"use server";

export const updateSubmission = async (id: string, data: {}) => {
  const preparedData = {
    id,
    secret: process.env.NOTION_SECRET_KEY,
    properties: data,
  };

  console.log(JSON.stringify(preparedData));

  // let url = `https://cc0-lib.wtf/api/notion`;
  let url = `https://cc0-lib-git-submission-edit-nouns-archive.vercel.app/api/notion`;

  if (process.env.NODE_ENV === "development") {
    url = `http://localhost:1311/api/notion`;
  }

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preparedData),
    });

    const json = await response.json();

    return {
      status: response.status,
      data: json,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
    };
  }
};
