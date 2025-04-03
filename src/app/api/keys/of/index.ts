import { apiPost } from "../../database";

export const getKeysOf = async (usermail: string): Promise<{[key: string]: any}[]> => {
    const query = `
    SELECT * from keys WHERE usermail = ?;
    `;
    const values = [usermail];

    let result: {[key: string]: any}[] = [];
    try {
        const res = await apiPost(query, values) as {[key: string]: any}[];
        result =  res.map((key: any) => {
            return {
                usermail: key.usermail,
                description: key.description,
                uuid: key.uuid
            }
        })
    }catch (error: any) {
        console.error(error.message);
    }
        
    return result;
}