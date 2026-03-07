// To test file for SafePush scanning

const db_password = 'secret-db-password-123';
const mongoUri = 'mongodb+srv://user:pass@cluster0.mongodb.net/test';
const postgresUri = 'postgres://user:pass@localhost:5432/mydb';

function getUsers() {
  const query = 'SELECT * FROM users';
  console.log('Running query:', query);
}

const config = {
  db_pass: 'hardcoded-pass',
  url: 'mysql://root:password@127.0.0.1:3306/db'
};
