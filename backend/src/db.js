import 'dotenv/config';
import pg from 'pg';

const {
  DATABASE_URL,
  PGHOST,
  PGUSER,
  PGPASSWORD,
  PGDATABASE,
  PGPORT,
  PGSSLMODE
} = process.env;

const config = DATABASE_URL
  ? { connectionString: DATABASE_URL, ssl: PGSSLMODE ? { rejectUnauthorized: false } : false }
  : {
      host: PGHOST || 'localhost',
      user: PGUSER || 'postgres',
      password: PGPASSWORD || 'postgres',
      database: PGDATABASE || 'dojo_app',
      port: Number(PGPORT) || 5432,
      ssl: PGSSLMODE ? { rejectUnauthorized: false } : false
    };

export const pool = new pg.Pool(config);

export const query = (text, params) => pool.query(text, params);
