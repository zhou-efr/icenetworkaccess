import { apiGet } from "../database";

export const getKeys = async () => {
    const query = `
    SELECT * from keys;
    `;

    try {
        return await apiGet(query)
    }catch (error: any) {
        console.error(error.message);
        return [];
    }
}