import mysql from 'mysql2';

const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fusionhub'
};

const pool = mysql.createPool(config);

// Test the connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Error connecting to the database:');
        console.error('→ Message:', err.message);
        console.error('→ Code:', err.code);
        if (err.code === 'ER_BAD_DB_ERROR') {
            console.error('⚠️  Hint: Make sure the database exists!');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('⚠️  Hint: Make sure XAMPP MySQL service is running!');
        }
        return;
    }
    console.log('✅ Database connected successfully');
    console.log(`Connected to database: ${config.database}`);
    console.log(`Connected as user: ${config.user}`);
    connection.release();
});

export default pool.promise(); 