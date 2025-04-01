import { apiGet, apiPost } from "../database";

export const getAdmins = async (): Promise<string[]> => {
    const query = `
    SELECT * from admins;
    `;

    const admins = await apiGet(query) as any[];

    if (admins.length == 0) {
        const admins = [
            "association@ice-efrei.fr",
            "killian.zhou@ice-efrei.fr"
        ]
        for (const admin of admins){
            const query = `
            INSERT INTO admins(usermail)
            VALUES(?);
            `;
            const values = [admin];
            await apiPost(query, values);
        }
        return await getAdmins();
    } 
    
    return admins.map((admin) => admin.usermail);
}

export const getAdminTable = async () => {
    const query = `
    SELECT * from admins;
    `;

    const admins = await apiGet(query) as any[];

    if (admins.length == 0) {
        const admins = [
            "association@ice-efrei.fr",
            "killian.zhou@ice-efrei.fr"
        ]
        for (const admin of admins){
            const query = `
            INSERT INTO admins(usermail)
            VALUES(?);
            `;
            const values = [admin];
            await apiPost(query, values);
        }
        return await getAdmins();
    } 
    
    return admins;
}
