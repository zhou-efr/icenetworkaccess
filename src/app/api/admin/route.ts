import { getToken, JWT } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
import { apiPost, apiGet } from "../database";
import { getAdmins } from ".";

export async function POST(req: NextRequest) {
    const token : JWT | null = await getToken({ req: req, secret: process.env.AUTH_SECRET })
    if (!token) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    const body = await req.json() as { usermail: string };
    const { usermail } = body;

    // TODO : sanitize
    const admins = await getAdmins();
    if (!admins.includes(token?.email as string)) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })

    const query = `
        INSERT INTO admins(usermail)
        VALUES(?);
    `;
    const values = [usermail];
    
    let status, respBody;
    try {
        await apiPost(query, values);
        status = 200;
        respBody = { message: "Successfully created admin" };
    } catch (error: any) {
        console.error(error.message);
        status = 400;
        respBody = { error: error.message as string };
    }
    return NextResponse.json(
        respBody,
        {
            status,
        }
    );
};

export async function GET(req: NextRequest) {
    const token : JWT | null = await getToken({ req: req, secret: process.env.AUTH_SECRET })
    if (!token) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    const admins = await getAdmins();
    if (!admins.includes(token?.email as string)) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    const query = `
    SELECT * from admins;
    `;

    let status, body;
    try {
        const admins = await apiGet(query) as {[key: string]: string}[];
        status = 200;
        body = admins;
    } catch (error: any) {
        console.error(error.message);
        status = 400;
        body = { error: error.message as string };
    }
    return NextResponse.json(
        body,
        {
            status,
        }
    );
}

export async function DELETE(req: NextRequest) {
    const token : JWT | null = await getToken({ req: req, secret: process.env.AUTH_SECRET })
    if (!token) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    const admins = await getAdmins();
    if (!admins.includes(token?.email as string)) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    const body = await req.json();
    const { usermail } = body;
    const query = `
        DELETE FROM admins
        WHERE usermail = ?;
    `;
    // userid to number
    const values = [usermail];
    let status, respBody;
    await apiPost(query, values)
        .then(() => {
            status = 200;
            respBody = { message: "Successfully deleted admin" };
        })
        .catch((err) => {
            status = 400;
            respBody = err;
        });
    return NextResponse.json(respBody, {
        status, 
    }); 
}
