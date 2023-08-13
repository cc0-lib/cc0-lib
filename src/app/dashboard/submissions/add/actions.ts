"use server";

import { HOSTNAME, PREV_HOSTNAME, PREV_MODE } from "@/lib/constant";

export const addSubmission = async (data: {}) => {
  const preparedData = {
    secret: process.env.NOTION_SECRET_KEY,
    properties: data,
  };

  console.log(JSON.stringify(preparedData));

  const host = PREV_MODE ? PREV_HOSTNAME : HOSTNAME;
  const url = `${host}/api/notion`;

  try {
    const response = await fetch(url, {
      method: "POST",
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
