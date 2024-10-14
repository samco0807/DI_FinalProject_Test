// backend/src/db/knex.ts
import knex from 'knex';
import config from './knexfile.ts';
import * as dotenv from 'dotenv';

dotenv.config();

const environment = process.env.NODE_ENV || 'development';
const connectionConfig = config[environment];

const db = knex(connectionConfig);

export default db;
