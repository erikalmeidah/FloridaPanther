// server.js

require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Telemetry queries
app.post('/telemetryQuery1', (req, res) => {
  const {sex1} = req.body;

  if(!sex1) {
    return res.status(400).json({ error: 'Please provide all fields' });
  }

  const query = `
    SELECT X, Y, COUNT(*) AS VisitCount
    FROM Telemetry T
    INNER JOIN Panther P ON T.PantherID = P.PantherID
    WHERE P.Sex = ?
    GROUP BY X, Y
    ORDER BY VisitCount DESC
    LIMIT 10;
  `;

  db.execute(query, [sex1], (err, results) => {
    if(err) {
      console.error('Error executing query:', err);
      return res.status(500).json({error: 'Database query failed'});
    }

    res.json(results);
  });
});

// Mortality queries
app.post('/mortalityQuery1', (req, res) => {
  const {minAge1, maxAge1, sex1, minYear1, maxYear1} = req.body;

  if(!minAge1 || !maxAge1 || !sex1 || !minYear1 || !maxYear1) {
    return res.status(400).json({ error: 'Please provide all fields' });
  }

  const query = `
    SELECT X, Y, COUNT(*) as MortalityCount
    FROM Mortality
    INNER JOIN Panther ON Mortality.PantherID = Panther.PantherID
    WHERE Panther.Age BETWEEN ? AND ?
    AND Panther.Sex = ?
    AND Mortality.Year BETWEEN ? AND ?
    GROUP BY X, Y
    HAVING MortalityCount > 0;
  `;

  db.execute(query, [minAge1, maxAge1, sex1, minYear1, maxYear1], (err, results) => {
    if(err) {
      console.error('Error executing query:', err);
      return res.status(500).json({error: 'Database query failed'});
    }

    res.json(results);
  });
});

app.post('/mortalityQuery2', (req, res) => {
  const { minAge2, maxAge2, sex2 } = req.body;

  if (!minAge2 || !maxAge2 || !sex2) {
    return res.status(400).json({ error: 'Please provide all fields' });
  }

  const query = `
    SELECT Mortality.Cause, COUNT(*) AS CauseCount
    FROM Mortality
    INNER JOIN Panther ON Mortality.PantherID = Panther.PantherID
    WHERE Panther.Age BETWEEN ? AND ?
    AND Panther.Sex = ?
    GROUP BY Mortality.Cause
    ORDER BY CauseCount DESC;
  `;

  db.execute(query, [minAge2, maxAge2, sex2], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }

    res.json(results);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
