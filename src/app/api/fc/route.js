import { NextResponse } from "next/server";

export async function GET(request) {
  const res = await fetch("https://searchcaster.xyz/api/search?text=cc0-lib", {
    next: {
      revalidate: 60,
    },
  });
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

  // return console.log(castForSlug[0]);

  const filteredCast = castForSlug.map((cast) => {
    const text = cast.cast.body.data.text;
    // regex to get url
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

  // const castRepliesRes = await fetch(
  //   `https://searchcaster.xyz/api/search?merkleRoot=${filteredCast[0].merkle}`
  // );

  // const castRepliesData = await castRepliesRes.json();

  // const filteredReplies = castRepliesData.casts.filter((c) => {
  //   return c.body.data.replyParentMerkleRoot === filteredCast[0].merkle;
  // });

  // const replies = filteredReplies.map((rep) => {
  //   return {
  //     //   cast: rep,
  //     // parentUrl: filteredCast[0].url,
  //     // parentMerkle: filteredCast[0].merkle,
  //     // parentUsername: filteredCast[0].username,
  //     // parentSlug: filteredCast[0].slug,
  //     text: rep.body.data.text,
  //     username: rep.body.username,
  //   };
  // });

  const castReplies = await Promise.all(
    filteredCast.map(async (cast) => {
      const res = await fetch(
        `https://searchcaster.xyz/api/search?merkleRoot=${cast.merkle}`
      );
      const data = await res.json();

      const filteredReplies = data.casts.filter((c) => {
        return c.body.data.replyParentMerkleRoot === cast.merkle;
      });

      const replies = filteredReplies.map((rep) => {
        return {
          //   cast: rep,
          // parentUrl: cast.url,
          // parentMerkle: cast.merkle,
          // parentUsername: cast.username,
          // parentSlug: cast.slug,
          text: rep.body.data.text,
          username: rep.body.username,
        };
      });

      return replies;
    })
  );

  // filter out empty array
  // const filteredCastReplies = replies.filter((cast) => {
  //   return cast.length > 0;
  // });

  // console.log(filteredCastReplies);

  // const validReplies = filteredCastReplies.filter((cast) => {
  //   return cast[0].parentSlug === slug;
  // });

  // combine all array into one
  const replies = castReplies.flat();

  return NextResponse.json(replies);

  // return NextResponse.json(data.casts)
}
