import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
    "/signin",
    "/signup",
    "/",
    "/home"
])

const isPublicApiRoute = createRouteMatcher([
    "/api/videos"
])

export default clerkMiddleware(async (auth, req) =>{
    const {userId} = await auth();
    const currentUrl = new URL(req.url)

    const isAccessingDashboard = currentUrl.pathname === '/home'
    const isApiRequest = currentUrl.pathname.startsWith("/api")

    // Loggedin accessing the public route and not on dashboard --> redirect to home page. 
    if(userId && isPublicRoute(req) && !isAccessingDashboard){
        return NextResponse.redirect(new URL("/home", req.url))
    }

    // Not logged in
    if(!userId){

        // if user is not logged in  and trying to access protected routes. 
        if(!isPublicRoute(req) && !isPublicApiRoute(req)){
            return NextResponse.redirect(new URL("/signin", req.url))
        }

        // if the request is for a protected API and the user is not logged in.
        if(isApiRequest && isPublicApiRoute(req)){
            return NextResponse.redirect(new URL("/signin", req.url))
        }
    }

    return NextResponse.next()
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", "/" , "/(api|trpc)(.*)"  
  ],
};