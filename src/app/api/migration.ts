
import { db } from "./database";

export const migrate = () => {
  db.serialize(() => {
   db.run(
    `
      CREATE TABLE IF NOT EXISTS keys (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usermail TEXT,
        description TEXT,
        presharedkey TEXT NOT NULL,
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
  });
}