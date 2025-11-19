const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function checkProducts() {
    try {
        // Проверим все колонки таблицы products
        const result = await pool.query('SELECT * FROM products LIMIT 1');
        console.log('Products columns sample:');
        console.log(result.rows[0]);
        
        // Проверим названия колонок
        const columns = await pool.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'products' 
            ORDER BY ordinal_position
        `);
        console.log('\nProducts column names:');
        columns.rows.forEach(col => {
            console.log('  - ' + col.column_name);
        });
        
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await pool.end();
    }
}

checkProducts();
