
import { NextResponse } from "next/server";

export const config = { matcher : ["/"] };

export default function middleware(request) {
    return NextResponse.redirect(new URL("/home", request.url));
}