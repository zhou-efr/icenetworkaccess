import { apiGet } from "../database";

export const getKey = async (uuid: string): Promise<KeyInterface> => {
    const query = `
    SELECT * from keys
    WHERE uuid = "${uuid}";
    `;
    try {
        return (await apiGet(query) as KeyInterface[])[0] as KeyInterface;
    }catch (error: any) {
        console.error(error.message);
        return {} as KeyInterface;
    }
}


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
