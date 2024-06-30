import { Cast, Casts, FilteredCast } from "@/lib/types/fc";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const res = await fetch(
    "https://searchcaster.xyz/api/search?text=cc0-lib.wtf",
    {
      next: {
        revalidate: 3600,
      },
    }
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
        `https://searchcaster.xyz/api/search?merkleRoot=${cast.merkle}`,
        {
          next: {
            revalidate: 3600,
          },
        }
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
