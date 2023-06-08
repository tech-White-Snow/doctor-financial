const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const multer = require("multer");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const upload = multer({ dest: "uploads/" });

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

// Able to Access and Get Image
app.use("/uploads", express.static("uploads"));

// app.get("/api/images/:filename", (req, res) => {
//   const { filename } = req.params;
//   const publicUrl = `${req.protocol}://${req.get("host")}/uploads/${filename}`;
//   res.json({ url: publicUrl });
// });

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
  const { doctorID, curDate } = req.body;
  db.query(
    "SELECT pt_cards.*, patients.* FROM pt_cards JOIN patients ON pt_cards.patientid = patients.patientid WHERE pt_cards.doctorid = ? AND pt_cards.date >= ?",
    [doctorID, curDate],
    (err, rows) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).json({ data: rows });
      }
    }
  );
});

// get patient cards by date
app.post("/getptcardsbydate", (req, res) => {
  const { doctorID, viewDate } = req.body;
  if (doctorID && doctorID != undefined && viewDate && viewDate != undefined) {
    db.query(
      "SELECT pt_cards.*, patients.* FROM pt_cards JOIN patients ON pt_cards.patientid = patients.id WHERE pt_cards.doctorid = ? AND pt_cards.date LIKE CONCAT('%', ?, '%')",
      [doctorID, viewDate],
      (err, rows) => {
        if (err) {
          res.status(500).send(err.message);
        } else {
          res.status(200).json({ data: rows });
        }
      }
    );
  }
});

// get patient history
app.post("/getpthistory", (req, res) => {
  db.query(
    "SELECT * FROM pt_history WHERE id = ?",
    req.body.patientID,
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

  const formattedBirthday = new Date(birthday)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  const sql = `INSERT INTO patients (name, engname, birthday, sex, patientid, telephone, address, emergency, emergencynumber) VALUES (?, ?, DATE_FORMAT(?, "%Y-%m-%d %H:%i:%s"), ?, ?, ?, ?, ?, ?)`;

  const values = [
    chiname,
    engname,
    formattedBirthday,
    sex == "男" ? "1" : "0",
    id,
    telephone,
    address,
    emergency,
    emergencynumber,
  ];

  // Execute the query
  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(200).json({ message: "Error adding patient: " + err });
    } else {
      res.status(200).json({ message: "patient added successfully!" });
    }
  });
});

// update last patient history
app.post("/updatelastpthistory", (req, res) => {
  const { cardID, originPtHistory, newPtHistory } = req.body;

  const sql = `UPDATE pt_history SET detail = ? WHERE id = ? AND detail = ?`;

  const values = [newPtHistory, cardID, originPtHistory];

  // Execute the query
  db.query(sql, values, (err, result) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Error updating last patient history : " + err });
    } else {
      res
        .status(200)
        .json({ message: "last patient history updated successfully!" });
    }
  });
});

// get account lists
app.post("/getaccounts", (req, res) => {
  const sql = "SELECT * from users";

  db.query(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ message: "Error loading account list : " + err });
    } else {
      res.status(200).json({
        message: "Loading account list successfully!",
        list: rows,
      });
    }
  });
});

// add new account
app.post("/addaccount", (req, res) => {
  const { userAvatar, userName, userEmail, password, fullName, doctorID } =
    req.body;

  const sql = `INSERT INTO users (email, username, fullname, doctorid, avatar, password) VALUES (?, ?, ?, ?, ?, ?)`;

  const values = [
    userEmail,
    userName,
    fullName,
    doctorID,
    userAvatar,
    password,
  ];

  // Execute the query
  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error adding new account : " + err });
    } else {
      res.status(200).json({ message: "Adding New Account Successfully!" });
    }
  });
});

// update profile account
app.post("/updateaccount", (req, res) => {
  const {
    context,
    userAvatar,
    userName,
    userEmail,
    password,
    fullName,
    doctorID,
  } = req.body;

  const sql = `UPDATE users SET email = ?, username = ?, fullname = ?, doctorid = ?, avatar = ?, password = ? WHERE email = ?`;

  const values = [
    userEmail,
    userName,
    fullName,
    doctorID,
    userAvatar,
    password,
    context.email,
  ];

  // Execute the query
  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error updating account : " + err });
    } else {
      res.status(200).json({ message: "Updating Account Successfully!" });
    }
  });
});

// find patients by patientid and telephone number
app.post("/findpatients", (req, res) => {
  const searchtext = req.body.searchText;

  const sql = `SELECT * from patients WHERE patientid = ? OR telephone = ?`;
  const values = [searchtext, searchtext];

  // Execute the query
  db.query(sql, values, (err, rows) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Error finding patients by ID : " + err });
    } else {
      res.status(200).json({ data: rows });
    }
  });
});

// add new appointment
app.post("/addnewappointment", (req, res) => {
  const { doctorName, doctorID, patientID, dateTime } = req.body;

  const sql = `INSERT INTO pt_cards (cardid, doctorid, patientid, doctor, date) VALUES (?, ?, ?, ?, ?)`;
  const values = ["", doctorID, patientID, doctorName, dateTime];

  // Execute the query
  db.query(sql, values, (err, rows) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Error adding new appointment : " + err });
    } else {
      res.status(200).json({ message: "Adding new appointment succeed!" });
    }
  });
});

// delete patient card
app.post("/deleteptcard", (req, res) => {
  const context = req.body.context;

  const sql = `DELETE FROM pt_cards WHERE cardid = ?`;
  const values = [context.cardid];

  // Execute the query
  db.query(sql, values, (err, rows) => {
    if (err) {
      res.status(500).json({ message: "Error deleting patient card : " + err });
    } else {
      res.status(200).json({ message: "Deleteing patient card succeed!" });
    }
  });
});

// --------------------------------- Check Patient -------------------------------------------

// upload files
app.post("/upload", upload.single("file"), (req, res) => {
  const cardid = req.body.cardid;
  const filename = req.file.filename;

  // save in sql database
  const sql = `UPDATE pt_cards SET album = CONCAT(album, ?) WHERE cardid = ?`;
  const values = [", " + filename, cardid];

  db.query(sql, values, (err, rows) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Uploading Album Image failed : " + err });
    } else {
      res.status(200).json({ message: "Uploading Album Image succeed!" });
    }
  });
});

// update check patient detail
app.post("/updatecheckpatient", (req, res) => {
  const context = req.body.context;

  if (!context || !context.cardid) return;

  // update card information
  const sql = `UPDATE pt_cards SET albumtext = ?, disease = ?, diagnosis = ?, syndromes = ?, medicines = ?, remark = ? WHERE cardid = ?`;
  const values = [
    context.albumtext,
    context.disease,
    context.diagnosis,
    context.syndromes,
    context.medicines,
    context.remark,
    context.cardid,
  ];

  db.query(sql, values, (err, rows) => {
    if (err) {
      res.status(500).json({
        message: "Updating Check Patient Card Detail failed : " + err,
      });
    } else {
      res
        .status(200)
        .json({ message: "Updating Check Patient Card Detail succeed!" });
    }
  });
});

// upload Avatar
app.post("/uploadavatar", upload.single("file"), (req, res) => {
  const filename = req.file.filename;
  res.status(200).json({ filename: filename });
});

// Server running
app.listen(8000, () => {
  console.log("Server started on port 8000!");
});
