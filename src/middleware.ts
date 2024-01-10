import { NextRequest, NextResponse } from "next/server";

const testPages = ["/draft", "/rive-test", "/loading-test"];

export const middleware = async (request: NextRequest) => {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  if (request.nextUrl.pathname === "/dashboard/uploader") {
    const userToken = request.cookies.get("cc0-lib-siwe")?.value;

    if (!userToken) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  /**
   * Redirect to the root path if the user is on a test page and not in development mode
   */
  if (process.env.NODE_ENV !== "development") {
    if (testPages.some((page) => request.nextUrl.pathname.startsWith(page))) {
      response = NextResponse.rewrite(new URL("/", request.url)); // assign modified response
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return response;
};

export const config = {
  matcher: ["/dashboard/uploader", ...testPages],
};
