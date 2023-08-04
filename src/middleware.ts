import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const userToken = req.cookies.get("cc0-lib-siwe")?.value;

  if (!userToken) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
};

export const config = {
  matcher: ["/dashboard/submissions/:path*", "/dashboard/uploader"],
};
