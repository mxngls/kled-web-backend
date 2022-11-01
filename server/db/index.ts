import { Pool, QueryResult, PoolClient } from "pg";
import * as dotenv from "dotenv"

// load environment variables
dotenv.config()

// default config
const pool = new Pool({
    host: "localhost",
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

// TO-DO: implement real error handling
pool.on("error", (err: Error, client: PoolClient) => console.log(err.message));


pool.on("connect", (() => console.log("㏈[database]: Connection sucessfull")))

const query = async (
    text: string,
    params: any,
    callback: (err: Error, result: QueryResult<any>) => void
) => {
    return pool.query(text, params, callback);
};

export default module.exports = { query };
