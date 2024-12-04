import { SQLDatabase } from "encore.dev/storage/sqldb";
import { drizzle } from 'drizzle-orm/node-postgres';

// Define a database named 'enrollment_db', using the database migrations
// in the "./migrations" folder. Encore automatically provisions,
// migrates, and connects to the database.
const DB = new SQLDatabase('enrollment_db', {
    migrations: './migrations',
});


const db = drizzle(DB.connectionString)

export { db };