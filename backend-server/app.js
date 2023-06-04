const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const app = express();

app.use(cors());
app.use(bodyParser.json());

// MySQL Configuration
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "patientsystem",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database!");
});

// user authentication - login/signup
app.post("/login", (req, res) => {
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [req.body.currentEmail],
    (err, rows) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        const user = rows[0];
        if (!user) {
          res
            .status(400)
            .json({ auth: false, message: "No users found in the database" });
        } else {
          if (req.body.currentPassword == user.password) {
            // Password is correct, generate a token
            const secretKey = crypto.randomBytes(32).toString("hex");
            const token = jwt.sign({ user: user }, secretKey, {
              expiresIn: "1h",
            });
            res.status(200).json({
              auth: true,
              message: "User found succeed",
              token: token,
            });
          } else
            res
              .status(400)
              .json({ auth: false, message: "Incorrect password" });
        }
      }
    }
  );
});

// Server running
app.listen(8000, () => {
  console.log("Server started on port 8000!");
});
