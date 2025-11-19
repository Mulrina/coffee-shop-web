const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function simpleCheck() {
    try {
        const branches = await pool.query('SELECT branch_id, branch_name FROM branches');
        console.log('Branches:');
        console.log(branches.rows);
        
        const products = await pool.query('SELECT product_name, current_price FROM products LIMIT 3');
        console.log('Products sample:');
        console.log(products.rows);
        
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await pool.end();
    }
}

simpleCheck();
