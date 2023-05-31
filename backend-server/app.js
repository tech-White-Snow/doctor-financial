const express = require("express");
const app = express();

// MySQL Configuration
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "patientsystem",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database!");
});

// connection.query('SELECT * FROM users', (err, results) => {
//   if (err) throw err;
//   console.log(results);
// });

// connection.end((err) => {
//   if (err) throw err;
//   console.log('MySQL connection closed!');
// });

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.post("/submit", (req, res) => {
  // Handle POST request
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.listen(8000, () => {
  console.log("Server started on port 8000!");
});
