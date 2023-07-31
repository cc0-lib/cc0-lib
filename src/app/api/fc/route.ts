import { NextRequest, NextResponse } from "next/server";

type Casts = {
  casts: Cast[];
  meta: CastsMeta;
};

type Cast = {
  body: CastBody;
  meta: CastMeta;
  merkleRoot: string;
  uri: string;
};

type CastBody = {
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

type CastMeta = {
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

type Mention = {
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

type ReplyParentUsername = {
  fid: number | null;
  username: string | null;
};

type CastsMeta = {
  count: number;
  responseTime: number;
};

type FilteredCast = {
  url: string;
  username: string;
  slug: string;
  merkle: string;
  replies: number;
};

export async function GET(request: NextRequest) {
  const res = await fetch(
    "https://searchcaster.xyz/api/search?text=cc0-lib.wtf"
  );
  const data: Casts = await res.json();

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      {
        message: "No slug provided",
      },
      { status: 400 }
    );
  }

  const casts = data.casts.map((cast) => {
    return {
      cast,
    };
  });

  const castsWithURL = casts.filter((cast) => {
    return cast.cast.body.data.text.includes("https://");
  });

  const castForSlug = castsWithURL.filter((cast) => {
    const text = cast.cast.body.data.text;
    const url = text.match(/https:\/\/[^\s]+/g);
    if (url && url.length > 1) {
      const slugg = url[0].split("/")[3];
      return slugg === slug;
    }
  });

  if (castForSlug.length === 0) {
    return NextResponse.json(
      {
        message: "No cast found for this slug",
      },
      { status: 404 }
    );
  }

  const filteredCast = castForSlug.map((cast): FilteredCast => {
    const text = cast.cast.body.data.text;
    const url = text.match(/https:\/\/[^\s]+/g);
    if (url && url.length > 1) {
      const slug = url[0].split("/")[3];
      const username = cast.cast.body.username;
      const meta = cast.cast.meta;
      const merkle = cast.cast.merkleRoot;
      const replies = meta.numReplyChildren;

      return {
        url: url[0],
        username,
        slug,
        merkle,
        replies,
      };
    } else {
      return {
        url: "",
        username: "",
        slug: "",
        merkle: "",
        replies: 0,
      };
    }
  });

  const castReplies = await Promise.all(
    filteredCast.map(async (cast: FilteredCast) => {
      const res = await fetch(
        `https://searchcaster.xyz/api/search?merkleRoot=${cast.merkle}`
      );
      const data = await res.json();

      const result = data.casts
        .filter((c: Cast) => {
          return c.body.data.replyParentMerkleRoot === cast.merkle;
        })
        .map((rep: Cast): FCReply => {
          return {
            text: rep.body.data.text,
            username: rep.body.username,
          };
        });

      return result as FCReply[];
    })
  );

  const replies = castReplies.flat();

  return NextResponse.json(replies);
}
