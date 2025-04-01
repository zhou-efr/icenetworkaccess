
import { db } from "./database";

export const migrate = () => {
  db.serialize(() => {
   db.run(
    `
      CREATE TABLE IF NOT EXISTS keys (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usermail TEXT,
        description TEXT,
        serverpublic TEXT NOT NULL,
        preshared TEXT NOT NULL,
        userpublic TEXT NOT NULL,
        userprivate TEXT NOT NULL,
        userip TEXT NOT NULL,
        uuid TEXT UNIQUE NOT NULL
      );
    `,
    (err: Error) => {
     if (err) {
      console.error(err.message);
     }
     console.log("key table created successfully.");
    }
   );
   db.run(
    `
      CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usermail TEXT
      );
    `,
    (err: Error) => {
     if (err) {
      console.error(err.message);
     }
     console.log("admin table created successfully.");
    }
   );
   db.run(
    `
      CREATE TABLE IF NOT EXISTS parameters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        value TEXT,
        config TEXT,
        target TEXT
      );
    `, 
    // config is either user or server - is the parameter for the user or the serveur config
    // target is either peer or interface - same logic 
    (err: Error) => {
     if (err) {
      console.error(err.message);
     }
     console.log("admin table created successfully.");
    }
   );
  });
}