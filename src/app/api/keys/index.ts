import { apiGet } from "../database";

export const getKeys = async (): Promise<KeyInterface[]> => {
    const query = `
    SELECT * from keys;
    `;

    try {
        return await apiGet(query) as KeyInterface[];
    }catch (error: any) {
        console.error(error.message);
        return [];
    }
}


export interface KeyInterface {
    usermail?: string,
    description: string,
    serverpublic: string,
    preshared: string,
    userpublic: string,
    userprivate: string,
    userip: string
    uuid? : string
}
