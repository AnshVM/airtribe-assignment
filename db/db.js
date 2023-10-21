import pg from "pg";

// reads environment variabels for connection information
const pool = new pg.Pool()

export const query = (text,params) => pool.query(text, params);

//for queries that return only one record
export const one = async(text, params) => {
    const res = await pool.query(text,params)
    return res.rows[0]
}