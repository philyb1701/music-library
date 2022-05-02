const mysql = require('mysql2/promise');

// require path to handle file paths
const path = require('path');

// extract any command line arguments from argv
const args = process.argv.slice(2)[0];

// use args to determine if .env or .env.test should be loaded
const envFile = args === 'test' ? '../.env.test' : '../.env';

require('dotenv').config({
  path: path.join(__dirname, '../.env.test'),
});

const { DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, DB_PORT } = process.env;

// This asynchronous function will run before app
const teardownDatabase = async () => {
  try {
    //connect to the database
    const db = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      port: DB_PORT,
    });

    //drop the database if it exists
    await db.query(`DROP DATABASE ${DB_NAME}`);
    db.close();
  } catch (err) {
    //if something goes wrong, console.log the error and the current environment variables
    console.log(
      'Your environment variables might be wrong. Please double check .env file'
    );
    console.log('Environment variables are:', {
      DB_PASSWORD,
      DB_NAME,
      DB_USER,
      DB_HOST,
      DB_PORT,
    });
    console.log(err);
  }
};

//run the async function
teardownDatabase();
