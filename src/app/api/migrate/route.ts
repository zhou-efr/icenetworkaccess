import { NextRequest, NextResponse } from "next/server";
import { migrate } from "../migration";
import { JWT, getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
    const token : JWT | null = await getToken({ req: req, secret: process.env.AUTH_SECRET })
    if (!token) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    migrate();
    return NextResponse.json({ message: "Successfully migrated" }, { status: 200 });
}