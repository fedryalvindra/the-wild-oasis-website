// import { NextResponse } from "next/server";

// // get access to incoming request
// export function middleware(request) {
//   console.log(request);

//   // redirect - (request.url : current url)
//   // middleware run for every single route
//   return NextResponse.redirect(new URL("/about", request.url));
// }

import { auth } from "@/app/_lib/auth";
export const middleware = auth;

// only run middleware for certain route: using matcher
// add array for every route that middleware actully run
export const config = {
  matcher: ["/account"],
};
