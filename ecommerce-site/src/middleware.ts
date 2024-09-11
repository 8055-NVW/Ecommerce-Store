import { NextRequest, NextResponse } from "next/server";
import { isValidPassword } from "./lib/isValidPassword";


// Middleware for all /admin/* routes 
// We are adding the below to add a level of security to the admin routes
export async function middleware(req: NextRequest) {
    if(await isAuthenticated(req) === false) {
        return new NextResponse("Unauthorised", { status: 401,
            // This is built in browser authentication
             headers: {"WWW-Authenticate": "Basic"}});
    }
}

async function isAuthenticated(req: NextRequest) {
    // Check if the user is authenticated
    //? first we get the headers from the request
    const authHeaders = req.headers.get("authorization") || req.headers.get("Authorization");
    // If not, redirect to the login page
    if (authHeaders === null) {
        return false
    }
    // If the user is authenticated, return true
    // ? Buffer converts string to binary data
    const [username, password] = Buffer.from(authHeaders.split(" ")[1], "base64").toString().split(":");
    
    return username == process.env.ADMIN_USERNAME && (await isValidPassword(password, process.env.HASHED_ADMIN_PASSWORD as string));
}

export const config ={
    //! the :path* is a wildcard that will match any path after /admin/
    // so this will run anytime we visit a route that starts with /admin/
  matcher: "/admin/:path*",  
}