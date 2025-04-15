import { NextRequest, NextResponse } from "next/server"
import { apiPost, apiGet } from "../database";
import { v4 as uuid } from 'uuid';
import { getAdmins } from "../admin";
import { KeyInterface } from ".";
import { JWT, getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
    const token : JWT | null = await getToken({ req: req, secret: process.env.AUTH_SECRET })
    if (!token) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    const admins = await getAdmins();
    if (!admins.includes(token?.email as string)) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    const body = await req.json();
    const { usermail, description, preshared, serverpublic, userpublic, userprivate, userip } = body;
    
    // Generate a unique identifier
    const id: string = uuid();
    
    // Prepare the SQL query with placeholders for dynamic values
    const query = `
        INSERT INTO keys(usermail, description, serverpublic, preshared, userpublic, userprivate, userip, uuid)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?);
    `;
    
    // Prepare the values to insert into the database
    const values = [
        usermail,
        description,
        serverpublic,
        preshared,
        userpublic,
        userprivate,
        userip,
        id
    ];

    let status, respBody;
    await apiPost(query, values)
        .then(() => {
            status = 200;
            respBody = { message: "Successfully created key" };
        })
        .catch((err) => {
            status = 400;
            respBody = err;
        });
    return NextResponse.json(respBody, {
        status, 
    });
}

export async function GET(req: NextRequest) {
    const token : JWT | null = await getToken({ req: req, secret: process.env.AUTH_SECRET })
    if (!token) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    const searchParams = req.nextUrl.searchParams;
    const uuid = searchParams.get("uuid");
    if (uuid) {
        const key = await getOneKey(uuid, token?.email as string);
        if (!key) return NextResponse.json({ message: "Key not found" }, { status: 404 })
        console.log("GET function - key:");
        console.log(key);
        return NextResponse.json(key, { status: 200 })
    }
        
    const admins = await getAdmins();
    if (!admins.includes(token?.email as string)) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    const query = `
    SELECT * from keys;
    `;

    let status, body;
    try {
        await apiGet(query)
            .then((res) => {
                status = 200;
                body = res;
            })
            .catch((err: Error) => {
                status = 400;
                body = { error: err };
            });
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
}

export async function DELETE(req: NextRequest) {
    const token : JWT | null = await getToken({ req: req, secret: process.env.AUTH_SECRET })
    if (!token) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    const admins = await getAdmins();
    if (!admins.includes(token?.email as string)) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    const body = await req.json();
    const { uuid } = body;
    const query = `
        DELETE FROM keys
        WHERE uuid = ?;
    `;
    // userid to number
    const values = [uuid];
    let status, respBody;
    await apiPost(query, values)
        .then(() => {
            status = 200;
            respBody = { message: "Successfully deleted key" };
        })
        .catch((err) => {
            status = 400;
            respBody = err;
        });
    return NextResponse.json(respBody, {
        status, 
    }); 
}

const getOneKey = async (uuid:string, usermail:string): Promise<KeyInterface | undefined> => {
    const query = `
    SELECT * from keys
    WHERE usermail = '${usermail}' AND uuid = '${uuid}';
    `;

    try {
        const key = await apiGet(query) as KeyInterface[];
        console.log(key);
        
        return key[0] as KeyInterface;
        
    }catch (error: any) {
        console.error(error.message);
        return undefined;
    }    
}