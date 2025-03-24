// import { drizzle } from 'drizzle-orm/postgres-js';
// import postgres from 'postgres';

// import { env } from '~/env';
// import * as schema from './schema';

// /**
//  * Cache the database connection in development. This avoids creating a new connection on every HMR
//  * update.
//  */
// const globalForDb = globalThis as unknown as {
//     conn: postgres.Sql | undefined;
// };

// const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
// if (env.NODE_ENV !== 'production') globalForDb.conn = conn;

// export const db = drizzle(conn, { schema });

// src/db.ts
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';

import * as schema from './schema';

config({ path: '.env' }); // or .env.local

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql, schema });
