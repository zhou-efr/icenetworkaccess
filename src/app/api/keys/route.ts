// https://krimsonhart.medium.com/how-i-built-my-portfolio-using-next-js-and-sqlite-db-part-2-37595ca4dc40

import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { apiPost, apiGet } from "../database";
import { v4 as uuid } from 'uuid';
import { getAdmins } from "../admin";

// // Function to check if a string is a valid base64 encoded string
// const isBase64 = (str: string) => /^[A-Za-z0-9+/=]+$/.test(str);

// // Function to check if the string is a valid IP address
// const isIP = (str: string) => {
//   const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\/[0-9]{1,2})?$/;
//   return ipPattern.test(str);
// };

// // Function to check if the string is a valid UUID
// const isUUID = (str: string) => {
//   const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
//   return uuidPattern.test(str);
// };

// // Sanitization function
// const sanitizeInputs = (body: KeyInterface) => {
//   // Sanitize email: simple check for non-empty string and remove extra spaces
//   const sanitizedEmail = (body.usermail && typeof body.usermail === 'string' && body.usermail.trim()) || '';
  
//   // Sanitize description: remove extra spaces if it's a non-empty string
//   const sanitizedDescription = (body.description && typeof body.description === 'string' && body.description.trim()) || '';
  
//   // Ensure base64 encoding for keys (sanitize if valid)
//   const sanitizedServerPublic = isBase64(body.serverpublic) ? body.serverpublic.trim() : '';
//   const sanitizedPreshared = isBase64(body.preshared) ? body.preshared.trim() : '';
//   const sanitizedUserPublic = isBase64(body.userpublic) ? body.userpublic.trim() : '';
//   const sanitizedUserPrivate = isBase64(body.userprivate) ? body.userprivate.trim() : '';
  
//   // Validate IP and ensure proper format (remove extra spaces)
//   const sanitizedUserIp = isIP(body.userip.split('/')[0]) ? body.userip.trim() : '';

  
//   // Return sanitized object
//   return {
//     usermail: sanitizedEmail,
//     description: sanitizedDescription,
//     serverpublic: sanitizedServerPublic,
//     preshared: sanitizedPreshared,
//     userpublic: sanitizedUserPublic,
//     userprivate: sanitizedUserPrivate,
//     userip: sanitizedUserIp
//   };
// };

export const POST = auth(async function POST(req) {
    if (!req.auth) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    const admins = await getAdmins();
    if (!admins.includes(req.auth.user?.email as string)) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
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
});

export const GET = auth(async function GET(req) {
    if (!req.auth) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    const admins = await getAdmins();
    if (!admins.includes(req.auth.user?.email as string)) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
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
})

export const DELETE = auth(async function DELETE(req) {
    if (!req.auth) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    const admins = await getAdmins();
    if (!admins.includes(req.auth.user?.email as string)) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
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
})

