import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { apiPost } from "../../database";
import { getKeys } from "..";

export const POST = auth(async function POST(req) {
    if (!req.auth) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    const body = await req.json();
    const { usermail, description} = body;

    const keys = await getKeys();
    const available_keys = keys.filter((key) => !key.usermail);

    const selected_key = available_keys[0].uuid as string;
    const query = `
        UPDATE keys
        SET usermail = ?, description = ?
        WHERE uuid = ?;
    `;
    const values = [usermail, description, selected_key];
    let status, respBody;
    try{
        const res = await apiPost(query, values);
        if (!res) {
            status = 404;
            respBody = null;
            return NextResponse.json(respBody, {
                status,
            });
        }
        status = 200;
        respBody = { message: "Successfully assigned key" };
        return NextResponse.json(respBody, {
            status,
        });
    }catch (error: any) {
        console.error(error.message);
        return NextResponse.json(
            { error: error },
            {
                status: 400,
            }
        );
    }
    
});

export const GET = auth(async function GET(req) {
    if (!req.auth) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    const searchParams = req.nextUrl.searchParams
    const usermail = searchParams.get('usermail');

    if (!usermail) return NextResponse.json({ message: "No usermail provided" }, { status: 400 })

    const query = `
    SELECT * from keys WHERE usermail = ?;
    `;
    const values = [usermail];

    let status;
    let body : null | {[key: string]: any}[] | {[key: string]: any};
    try {
        const res = await apiPost(query, values) as {[key: string]: any}[];
        if (!res) {
            status = 404;
            body = null;
            return NextResponse.json(body, {
                status,
            });
        }
        status = 200;
        body = res.map((key: any) => {
            return {
                usermail: key.usermail,
                description: key.description,
            }
        })
        return NextResponse.json(body, {
            status,
        });
    } catch (error: any) {
        console.error(error.message);
        return NextResponse.json(
            { error: error },
            {
                status: 400,
            }
        );
    }
})