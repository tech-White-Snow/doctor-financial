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
              expiresIn: "30m",
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

// get patient cards
app.post("/getptcards", (req, res) => {
  db.query(
    "SELECT pt_cards.*, patients.* FROM pt_cards JOIN patients ON pt_cards.patientid = patients.id WHERE pt_cards.doctorid = ?",
    req.body.doctorID,
    (err, rows) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).json({ data: rows });
      }
    }
  );
});

// get patient history
app.post("/getpthistory", (req, res) => {
  db.query(
    "SELECT * FROM pt_history WHERE id = ?",
    req.body.cardID,
    (err, rows) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).json({ data: rows });
      }
    }
  );
});

// add new patient
app.post("/addnewpatient", (req, res) => {
  const {
    chiname,
    engname,
    birthday,
    sex,
    id,
    telephone,
    address,
    emergency,
    emergencynumber,
  } = req.body;

  const sql = `INSERT INTO patients (name, engname, birthday, sex, patientid, telephone, address, emergency, emergencynumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    chiname,
    engname,
    birthday,
    sex,
    id,
    telephone,
    address,
    emergency,
    emergencynumber,
  ];

  // Execute the query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding patient:", err);
      res.sendStatus(500); // Send a 500 Internal Server Error response
    } else {
      console.log("Patient added successfully");
      res.sendStatus(200); // Send a 200 OK response
    }
  });
});

// Server running
app.listen(8000, () => {
  console.log("Server started on port 8000!");
});
