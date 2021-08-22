const mysql = require('mysql2');
// Add mysql database connection
const db = mysql.createPool({
  host: 'mysql_db', // the host name MYSQL_DATABASE: node_mysql
  user: 'MYSQL_USER', // database user MYSQL_USER: MYSQL_USER
  password: 'MYSQL_PASSWORD', // database user password MYSQL_PASSWORD: MYSQL_PASSWORD
  database: 'books' // database name MYSQL_HOST_IP: mysql_db
});

const runQuery = (_query, params = []) => {
  return new Promise((resolve, reject) => {
    try {
      db.query(_query, params, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    } catch (error) {
      console.log({ error });
      reject(error);
    }
  });
};

module.exports = {
  db,
  runQuery
};
