import { readFileSync } from "fs";
import pg from "pg";

// reads environment variabels for connection information
const pool = new pg.Pool()

export const query = async (text,params) => {
    return (await pool.query(text, params)).rows
};

export const runSqlFile = async(file,params) => {
    const sql = readFileSync(file).toString()
    return (await query(sql,params))
}
//for queries that return only one record
export const one = async(text, params) => {
    const res = await pool.query(text,params)
    return res.rows[0]
}

