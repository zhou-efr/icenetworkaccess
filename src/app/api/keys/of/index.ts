import { apiGet } from "../../database";

export const getKeysOf = async (usermail: string): Promise<{[key: string]: string}[]> => {
    const query = `
    SELECT * from keys WHERE usermail = "${usermail}"
    `;

    let result: {[key: string]: string}[] = [];
    try {
        const res = await apiGet(query) as {[key: string]: string}[];
        console.log({
            query,
            res
        });
        if (!res) return [];
        result =  res.map((key: {[key: string]: string}) => {
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