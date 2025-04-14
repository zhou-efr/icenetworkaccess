import path from "path";
import sqlite3 from "sqlite3";

const dbPath = path.join(process.cwd(), "INA.db");
export const db = new sqlite3.Database(
 dbPath,
 sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
 (err) => {
  if (err) {
   console.error(err.message);
  }
  console.log("Connected to the INA database.");
 }
);

export const apiGet = async (query: string) => {
    return await new Promise((resolve, reject) => {
     db.all(query, (err: Error, row:{[key: string]: string}[]) => {
      if (err) {
       console.log(err);
       return reject(err);
      }
      return resolve(row);
     });
    });
   };
   
export const apiPost = async (query: string, values: string[]) => {
    return await new Promise((resolve, reject) => {
        db.run(query, values, function (err) {
        if (err) {
        console.log(err);
        reject(err);
        }
        resolve(null);
        });
    });
};
