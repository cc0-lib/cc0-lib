import notion from "../notion";
import { convertToItem } from "./clean";

export const getSubmissionDataForENS = async (ensName: string) => {
  const { results } = await notion.databases.query({
    database_id: "0a1a89739fe7482c8a6e995b85eababf",
    filter: {
      property: "ENS",
      rich_text: {
        equals: ensName as string,
      },
    },
  });

  if (results.length === 0) {
    return null;
  }

  const submission = convertToItem(results);

  console.log("submission=>", submission);

  return submission;
};
