const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// SQLite Database Setup
const db = new sqlite3.Database('./weather.db');

// Create a table for storing weather data
db.run('CREATE TABLE IF NOT EXISTS weather (id INTEGER PRIMARY KEY, city TEXT, temperature REAL, description TEXT)');

// Routes
app.get('/weather', (req, res) => {
  db.all('SELECT * FROM weather', [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

app.post('/weather', (req, res) => {
  const { city, temperature, description } = req.body;
  db.run('INSERT INTO weather (city, temperature, description) VALUES (?, ?, ?)', [city, temperature, description], function(err) {
    if (err) {
      return console.log(err.message);
    }
    res.json({ id: this.lastID });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
