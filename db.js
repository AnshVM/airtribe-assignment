import pg from "pg";

// reads environment variabels for connection information
const pool = new pg.Pool()

export const query = (text,params) => pool.query(text, params);
