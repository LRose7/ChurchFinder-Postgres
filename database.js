const Pool = require('pg').Pool;
require('dotenv').config();

const devConfig = {
    user: `${process.env.PG_USER}`,
    password: `${process.env.PG_PASSWORD}`,
    database: `${process.env.PG_DATABASE}`,
    host: `${process.env.PG_HOST}`,
    port: `${process.env.PG_PORT}`
}

const proConfig = {
    connectionString : process.env.Database_url //heroku addons
}

const pool = new Pool(process.env.NODE_ENV === 'production' ? proConfig : devConfig);

pool.connect(async () => {
    try {
        console.log('you are connected to churchfinder database');

    } catch (err) {
        console.error(err.message);
    }
});

module.exports = pool;