const { app, db } = require('./app');

app.post('/addUser', (req, res) => {
  const { AD, SOYAD, PASSWORDS } = req.body;
  console.log('Received form data:', { AD, SOYAD, PASSWORDS });

  db.query(
    'INSERT INTO users (AD, SOYAD, PASSWORDS) VALUES (?, ?, ?)',
    [AD, SOYAD, PASSWORDS],
    (err, result) => {
      if (err) {
        console.error('Error inserting user:', err);
        return res.status(500).send('Error inserting user');
      }
      console.log('User inserted');
      res.redirect('/');
    }
  );
});
