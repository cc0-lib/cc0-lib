import { NextResponse } from "next/server";

export async function GET(request) {
  const res = await fetch(
    "https://searchcaster.xyz/api/search?text=cc0-lib.wtf"
  );
  const data = await res.json();

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
    const slugg = url[0].split("/")[3];

    return slugg === slug;
  });

  if (castForSlug.length === 0) {
    return NextResponse.json(
      {
        message: "No cast found for this slug",
      },
      { status: 404 }
    );
  }

  const filteredCast = castForSlug.map((cast) => {
    const text = cast.cast.body.data.text;
    const url = text.match(/https:\/\/[^\s]+/g);
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
  });

  const castReplies = await Promise.all(
    filteredCast.map(async (cast) => {
      const res = await fetch(
        `https://searchcaster.xyz/api/search?merkleRoot=${cast.merkle}`
      );
      const data = await res.json();

      const result = data.casts
        .filter((c) => {
          return c.body.data.replyParentMerkleRoot === cast.merkle;
        })
        .map((rep) => {
          return {
            // cast: rep,
            // parentUrl: cast.url,
            // parentMerkle: cast.merkle,
            // parentUsername: cast.username,
            // parentSlug: cast.slug,
            text: rep.body.data.text,
            username: rep.body.username,
          };
        });

      return result;
    })
  );

  const replies = castReplies.flat();

  return NextResponse.json(replies);
}
