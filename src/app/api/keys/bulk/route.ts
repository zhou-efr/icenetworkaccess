import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { apiPost } from "../../database";
import { v4 as uuid } from 'uuid';
import { getAdmins } from "../../admin";


export const POST = auth(async function POST(req) {
    if (!req.auth) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    const admins = await getAdmins();
    if (!admins.includes(req.auth.user?.email as string)) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    const body = await req.json();
    const { bulk } = body;
    console.log(bulk);
    

    let error = false;
    let status = 200, respBody = { message: "Successfully imported keys" };

    for (const key of bulk) {
        const { usermail, description, preshared, serverpublic, userpublic, userprivate, userip } = key;

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

        await apiPost(query, values)
            .catch((err) => {
                console.log(err);
                error = true;
            });
    }

    if (error) {
        status = 400;
        respBody = { message: "Error occured while trying to import keys" };
    }
        
    return NextResponse.json(respBody, {
        status, 
    });
});
