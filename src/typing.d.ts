type Item = {
  id: string;
  Source: string;
  Type: string;
  "Social Link"?: string;
  Filetype: string;
  ENS?: string;
  Description: string;
  Thumbnails: ItemThumbnail[];
  Tags: string[];
  ID: number;
  Title: string;
  File?: string;
  Status?: "published" | "draft";
  SubmissionStatus?: "draft" | "submitted" | "approved" | "rejected";
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

type LCResponse = {
  query: string;
  count: number;
  data?: Item[];
  items?: LCItem[];
};

type LCItem = {
  pageContent: string;
  metadata: {
    id: number;
  };
};
