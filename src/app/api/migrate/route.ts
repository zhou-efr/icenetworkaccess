import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { migrate } from "../migration";

export const GET = auth(async function GET(req) {
    if (!req.auth) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    migrate();
    return NextResponse.json({ message: "Successfully migrated" }, { status: 200 });
})