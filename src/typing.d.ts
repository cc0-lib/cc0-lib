type Item = {
  id: string;
  Source: string;
  Type: string;
  "Social Link": string;
  Filetype: string;
  ENS: string;
  Description: string;
  Thumbnails: ItemThumbnail[];
  Tags: string[];
  ID: number;
  Title: string;
  File: string;
};

type ItemThumbnail = {
  name: string;
  url: string;
  rawUrl: string;
};

type FCReply = {
  text: string;
  username: string;
};

type ExtendedItem = Item & {
  createdAt: string;
  lastEdited: string;
};
