const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); // Import the UUID library

const app = express();
const port = process.env.PORT || 3000;

const db = mysql.createPool({
  host: 'bapqcxs4rj7ja1hh5ccs-mysql.services.clever-cloud.com',
  user: 'uij3zyohd2m8plgn',
  password: 'G031iGC5CxJMyjjdaiM1',
  database: 'bapqcxs4rj7ja1hh5ccs'
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('Connected to MySQL database');
  connection.release();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve the HTML form for adding a user
app.get('/addUser', (req, res) => {
  // Render the "Add User" form
  res.render('addUserForm');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle the HTML form submission for adding a user
app.post('/addUser', (req, res) => {
  const { name, surname, password } = req.body;

  // Insert the user into the database
  const sql = 'INSERT INTO users (AD, SOYAD, PASSWORDS) VALUES (?, ?, ?)';
  const values = [name, surname, password];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).send('Error inserting user');
    }
    console.log('User inserted');
    res.redirect('/');
  });
});

// API route to fetch all users
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).send('Error fetching users');
    }
    res.json(results);
  });
});

// Route to handle the HTML form submission for deleting a user
app.post('/deleteUser', (req, res) => {
  const userIdToDelete = req.body.deleteId;

  db.query(
    'DELETE FROM users WHERE ID = ?',
    [userIdToDelete],
    (err, result) => {
      if (err) {
        console.error('Error deleting user:', err);
        return res.status(500).send('Error deleting user');
      }
      console.log('User deleted');
      res.redirect('/');
    }
  );
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
