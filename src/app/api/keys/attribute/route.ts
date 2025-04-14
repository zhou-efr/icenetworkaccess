import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { apiGet } from "../../database"

export const GET = auth(async function GET(req) {
    if (!req.auth) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    const searchParams = req.nextUrl.searchParams
    const description = searchParams.get('description');
    const usermail = req.auth.user?.email as string;

    console.log("attribute GET - usermail, description:");
    console.log(usermail);
    console.log(description);

    const query = `
    SELECT * from keys WHERE usermail = ""
    `;

    let body, status;
    try {
        const res = await apiGet(query) as {[key: string]: any}[];
        console.log("attribute GET - res:");
        console.log(res);
        
        if (!res || res.length === 0) {
            status = 404;
            body = null;
            return NextResponse.json(body, {
                status,
            });
        }
        status = 200;
        body = res[0];
        console.log("attribute GET - body:");
        console.log(body);

        const attribution_query = `
            UPDATE keys
            SET usermail = "${usermail}", description = "${description}"
            WHERE uuid = "${body.uuid}"
        `;
        await apiGet(attribution_query);
        return NextResponse.json(body, {
            status,
        });
    } catch (error: any) {
        console.error(error.message);
        return NextResponse.json(
            { error: error },
            {
                status: 400,
            });
    }
})
