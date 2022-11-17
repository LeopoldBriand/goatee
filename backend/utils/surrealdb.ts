import Surreal from "surrealdb.js";
import { config } from "dotenv";
config();

const db_url = process.env.SURREAL_DB_HOST || 'http://127.0.0.1:8000/rpc';
const db_user = process.env.SURREAL_DB_USER || 'root';
const db_pass = process.env.SURREAL_DB_PASSWORD || 'root';
const db = new Surreal(db_url);

export async function initDB() {
    try {
        console.log("Initializing database...");
        if (!db_user || !db_pass || !db_url) {
            throw new Error("SURREAL_DB_HOST, SURREAL_DB_USER or SURREAL_DB_PASSWORD env var not set")
        }
        console.log(`Connecting with ${db_user} username on ${db_url}`)
        await db
            .connect(db_url)
            .then(() => {
                console.log("Connected to database");
            })
            .catch((err) => {
                console.log("Error connecting to database", err);
            });
        
        await db
            .signin({
                user: db_user,
                pass: db_pass,
            })
            .then((res) => {
                console.log("Signed in to database", res);
            })
            .catch((err) => {
                console.log("Error signing in to database", err);
            });
        await db.use('goatee', 'goatee');
    } catch (err) {
        console.error(err);
    }
}
export default db;