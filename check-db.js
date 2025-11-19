const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function checkDatabase() {
    try {
        console.log('Checking branches...');
        const branches = await pool.query('SELECT branch_id, branch_name FROM branches ORDER BY branch_id');
        console.log('Branches found:');
        branches.rows.forEach(branch => {
            console.log('  - ID:', branch.branch_id, 'Name:', branch.branch_name);
        });
        
        console.log('Checking branches structure...');
        const branchesStructure = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'branches' 
            ORDER BY ordinal_position
        `);
        console.log('Branches structure:');
        branchesStructure.rows.forEach(col => {
            console.log('  - ' + col.column_name + ' (' + col.data_type + ')');
        });
        
        console.log('Checking products structure...');
        const productsStructure = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'products' 
                                                                                     ture:');
        productsStructure.rows.forEach(col => {
            console.log('  - ' + col.column_name + ' (' + col.data_type + ')');
        });
        
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await pool.end();
    }
}

checkDatabase();
