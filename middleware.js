import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  // Get the token from cookies
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  // Define the URL for redirection
  const url = request.nextUrl.clone();

  // Define the list of admin emails
  const adminEmails = [
    "print5onlinestore@gmail.com",
    "manoj@gmail.com",
    "azar@magizhdigitalmarketing.com",
  ];

  // If the route is for the dashboard page
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!token || !adminEmails.includes(token.email)) {
      // Redirect non-admin users or unauthenticated users to the home page
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  // If the user is authenticated, hide the login page and redirect to dashboard if accessing login
  if (token && request.nextUrl.pathname === "/login") {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Proceed with the request if the conditions above are not met
  return NextResponse.next();
}

// Define the paths to apply this middleware
export const config = {
  matcher: ["/admin/:path*", "/login"],
};
