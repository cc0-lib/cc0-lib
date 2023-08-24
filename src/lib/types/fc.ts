export type Casts = {
  casts: Cast[];
  meta: CastsMeta;
};

export type Cast = {
  body: CastBody;
  meta: CastMeta;
  merkleRoot: string;
  uri: string;
};

export type CastBody = {
  data: CastBodyData;
  username: string;
  publishedAt: number;
};

export type CastBodyData = {
  text: string;
  image: null;
  replyParentMerkleRoot: null | string;
  threadMerkleRoot: string;
};

export type CastMeta = {
  displayName: string;
  avatar: string;
  isVerifiedAvatar: boolean;
  numReplyChildren: number;
  reactions: Reactions;
  recasts: Recasts;
  watches: Recasts;
  replyParentUsername: ReplyParentUsername;
  mentions: Mention[] | null;
};

export type Mention = {
  fid: number;
  pfp: Pfp;
  username: string;
  displayName: string;
};

export type Pfp = {
  url: string;
  verified: boolean;
};

export type Reactions = {
  count: number;
  type: string;
};

export type Recasts = {
  count: number;
};

export type ReplyParentUsername = {
  fid: number | null;
  username: string | null;
};

export type CastsMeta = {
  count: number;
  responseTime: number;
};

export type FilteredCast = {
  url: string;
  username: string;
  slug: string;
  merkle: string;
  replies: number;
};
