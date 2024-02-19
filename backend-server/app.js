const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
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

// ----------------------------- user authentication - login/signup/password reset ---------------------------------
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

// Generate a JWT token for password reset
function generateResetToken(email) {
  return jwt.sign({ email }, "secret-key", { expiresIn: "1h" });
}

// Send password reset email
async function sendPasswordResetEmail(email, token) {
  try {
    const transporter = nodemailer.createTransport({
      // Configure the email transporter (e.g., Gmail, SMTP server)
      // ...
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "ngyentuandev@gmail.com",
        pass: "flztqkcsxpgxgdtc",
      },
    });
  
    const mailOptions = {
      from: "info@doctor.com",
      to: email,
      subject: "Password Reset",
      text: `Click the following link to reset your password: http://95.216.251.189:3000/resetpassword/${token}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.messageId);
  } catch (error) {
    console.error("Error sending password reset email : ", error);
  }
}

// API endpoint for password reset request
app.post("/resetpassword", (req, res) => {
  const { resetEmail } = req.body;
  if (!resetEmail) {
    return res.status(400).json({ message: "Email is required" });
  }
  db.query("SELECT * FROM users WHERE email = ?", [resetEmail], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      if (rows.length == 0) {
        return res
          .status(400)
          .json({ message: "No Verified Email not found!", status: false });
      } else {
        const token = generateResetToken(resetEmail);
        // user.resetToken = token;
        sendPasswordResetEmail(resetEmail, token);

        res
          .status(200)
          .json({ message: "Password reset email sent", status: true });
      }
    }
  });
});

// API endpoint for password update
app.post("/updatemailpassword", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email, and password are required" });
  }

  db.query(
    `UPDATE users SET password = ? WHERE email = ?`,
    [password, email],
    (err, rows) => {
      if (err) {
        res.status(500).json({message: err.message});
      } else {
        res.status(200).json({message: "Email Reset Password Successfully!"});
      }
    }
  )
});

// -----------------------------------------------------------------------------------------------------

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
      "SELECT pt_cards.*, patients.* FROM pt_cards JOIN patients ON pt_cards.patientid = patients.patientid WHERE pt_cards.doctorid = ? AND pt_cards.date LIKE CONCAT('%', ?, '%')",
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

// get patient card by patient ID for alubm
app.post("/getptcardbypatientid", (req, res) => {
  const patientID = req.body.patientID;

  db.query(
    `SELECT * from pt_cards WHERE patientid = ?`,
    [patientID],
    (err, rows) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).json({ data: rows });
      }
    }
  );
});

// remove selected album image
app.post("/removealbumimage", (req, res) => {
  const { cardID, rmImgName } = req.body;
  const rmImgNameStr = ", " + rmImgName;

  db.query(
    `UPDATE pt_cards SET album = REPLACE(album, ?, '') WHERE album LIKE CONCAT('%', ?, '%') AND cardid = ?`,
    [rmImgNameStr, rmImgNameStr, cardID],
    (err, rows) => {
      if (err) {
        res
          .status(500)
          .json({ message: "remove album image failed!" + err.message });
      } else {
        res.status(200).json({ message: "remove album image successfully!" });
      }
    }
  );
});

// get patient history
app.post("/getpthistory", (req, res) => {
  const { patientID, doctorID } = req.body;
  if (doctorID == "") {
    db.query(
      "SELECT * FROM pt_history WHERE id = ?",
      [patientID],
      (err, rows) => {
        if (err) {
          res.status(500).send(err.message);
        } else {
          res.status(200).json({ data: rows });
        }
      }
    );
  } else {
    db.query(
      "SELECT * FROM pt_history WHERE id = ? AND doctorid = ?",
      [patientID, doctorID],
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

// update patient card patient history
app.post("/updateptcardpasthistory", (req, res) => {
  const { cardid, historydata, historydate } = req.body;
  // update on DB
  db.query(
    `UPDATE pt_cards SET pasthistory = ?, pasthistorydate = ? WHERE cardid = ?`,
    [historydata, historydate, cardid],
    (err, rows) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Update patient history failed!" + err.message });
      } else {
        res
          .status(200)
          .json({ message: "Update patient history successfully!" });
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
    patientid,
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
    patientid,
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

// ------------------------------------------- Account Management ----------------------------------------------------

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

// get company profile information
app.post("/getcompanyinfo", (req, res) => {
  const sql = "SELECT * from company";

  db.query(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ message: "Error loading company info : " + err });
    } else {
      res.status(200).json({
        message: "Loading Company Profile successfully!",
        data: rows,
      });
    }
  });
});

// update company profile information
app.post("/updatecompanyprofile", (req, res) => {
  const { companyLogo, companyAddress, companyTelephone } = req.body;

  const sql = "UPDATE company SET logo = ?, address = ?, tel = ? WHERE id = 1";
  const values = [companyLogo, companyAddress, companyTelephone];

  db.query(sql, values, (err, rows) => {
    if (err) {
      res.status(500).json({ message: "Error updating company info : " + err });
    } else {
      res.status(200).json({
        message: "Updating Company Profile successfully!",
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

// delete account
app.post("/deleteaccount", (req, res) => {
  const email = req.body.email;

  const sql = `DELETE FROM users WHERE email = ?`;

  const values = [email];
  // Execute the query
  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error deleting account : " + err });
    } else {
      res.status(200).json({ message: "Deleting Account Successfully!" });
    }
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////

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
  const sql = `UPDATE pt_cards SET album = CONCAT(COALESCE(album, ''), ?) WHERE cardid = ?`;
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
  const {context, presentillness, presentillnessdate} = req.body;

  if (!context || !context.cardid) return;

  // update card information
  let sql = `UPDATE pt_cards SET albumtext = ?, disease = ?, diagnosis = ?, syndromes = ?, medicines = ?, remark = ?, pasthistory = ?, pasthistorydate =? WHERE cardid = ?`;
  const values = [
    context.albumtext,
    context.disease,
    context.diagnosis,
    context.syndromes,
    context.medicines,
    context.remark,
    context.pasthistory,
    context.pasthistorydate,
    context.cardid,
  ];

  db.query(sql, values, (err, rows) => {
    if (err) {
      return res.status(500).json({
        message: "Updating Check Patient Card Detail failed : " + err,
      });
    }

    // update present illness history
    sql = `SELECT * from pt_history WHERE date = ?`;
    db.query(sql, [presentillnessdate], (err, rows) => {
      if (err) {
        return res.status(500).json({
          message: "Found present illness error : " + err,
        });
      } 

      if (rows.length == 0) {
        const tsql = `INSERT INTO pt_history (id, detail, date, doctorid) VALUES (?,?,?,?)`;
        db.query(tsql, [context.patientid, presentillness, presentillnessdate, context.doctorid], (err, rows) => {
          if (err) {
            return res.status(500).json({message: "Updating present illness error : " + err});
          } 
          res.status(200).json({message: "Updating present illness succeed!"});
        });
      } else {
        const tsql = `UPDATE pt_history SET detail = ? WHERE date = ?`;
        db.query(tsql, [presentillness, presentillnessdate], (err, rows) => {
          if (err) {
            res.status(500).json({message: "Updating present illness error : " + err});
          } else {
            res.status(200).json({message: "Updating present illness succeed!"});
          }
        });
      }
    });
  });
});

// upload Avatar
app.post("/uploadavatar", upload.single("file"), (req, res) => {
  const filename = req.file.filename;
  console.log(req.file)
  
  res.status(200).json({ filename: filename });
});

// ------------------------------ Search Patient Card for Payment ---------------------------------
app.post("/getptcardpayment", (req, res) => {
  const { searchText, curDate, paidMode } = req.body;
  if (searchText) {
    db.query(
      `SELECT pt_cards.*, patients.* FROM pt_cards JOIN patients ON pt_cards.patientid = patients.patientid WHERE pt_cards.date < ? AND (COALESCE(pt_cards.albumtext, '') LIKE ? OR COALESCE(pt_cards.disease, '') LIKE ? OR COALESCE(pt_cards.diagnosis, '') LIKE ? OR COALESCE(pt_cards.syndromes, '') LIKE ? OR COALESCE(pt_cards.medicines, '') LIKE ?)`,
      [
        curDate,
        `%${searchText}%`,
        `%${searchText}%`,
        `%${searchText}%`,
        `%${searchText}%`,
        `%${searchText}%`,
      ],
      (err, rows) => {
        if (err) {
          res.status(500).send(err.message);
        } else {
          res.status(200).json({ data: rows });
        }
      }
    );
  } else {
    db.query(
      `SELECT pt_cards.*, patients.* FROM pt_cards JOIN patients ON pt_cards.patientid = patients.patientid WHERE pt_cards.date < ?${paidMode == 1 ? "AND pt_cards.paid = 0 " : ""}`,
      [curDate],
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

app.post("/checkptcardpaymentstate", (req, res) => {
  const cardid = req.body.cardid;
  db.query(
    "SELECT * FROM pt_cards WHERE cardid = ? AND paid = 0",
    [cardid],
    (err, rows) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        if (rows.length > 0) res.status(200).json({ status: "true" });
        else res.status(200).json({ status: "false" });
      }
    }
  );
});

app.post("/updatecardpaid", (req, res) => {
  const cardid = req.body.cardid;
  db.query(
    "UPDATE pt_cards SET paid = 1 WHERE cardid = ?",
    [cardid],
    (err, rows) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).json({ data: rows });
      }
    }
  );
});

// get patient cards
app.post("/getptcardsbyid", (req, res) => {
  const { cardid } = req.body;
  db.query(
    "SELECT pt_cards.*, patients.* FROM pt_cards JOIN patients ON pt_cards.patientid = patients.patientid WHERE pt_cards.cardid = ?",
    [cardid],
    (err, rows) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).json({ data: rows });
      }
    }
  );
});

// get patient cards by patientid
app.post("/getptcardsbypatientid", (req, res) => {
  const { patientid } = req.body;
  db.query(
    "SELECT pt_cards.*, patients.* FROM pt_cards JOIN patients ON pt_cards.patientid = patients.patientid WHERE pt_cards.patientid = ?",
    [patientid],
    (err, rows) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).json({ data: rows });
      }
    }
  );
});

// --------------------------------- Receipt, Recipe, Prescription -------------------------------
app.post("/updateptcardreceipt", (req, res) => {
  const { cardid, curReceipt, curToll } = req.body;
  db.query(
    `UPDATE pt_cards SET receipt = ?, toll = ? WHERE cardid = ?`,
    [curReceipt, curToll, cardid],
    (err, rows) => {
      if (err) res.status(500).send(err.message);
      else res.status(200).send({ data: rows });
    }
  );
});

app.post("/updateptcardprescription", (req, res) => {
  const { cardid, curPrescription } = req.body;
  db.query(
    `UPDATE pt_cards SET prescription = ? WHERE cardid = ?`,
    [curPrescription, cardid],
    (err, rows) => {
      if (err) res.status(500).send(err.message);
      else res.status(200).send({ data: rows });
    }
  );
});


// --------------------------------- Social Share Function -------------------------------
async function sendPasswordResetEmail(email, token) {
  try {
    const transporter = nodemailer.createTransport({
      // Configure the email transporter (e.g., Gmail, SMTP server)
      // ...
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "ngyentuandev@gmail.com",
        pass: "flztqkcsxpgxgdtc",
      },
    });
  
    const mailOptions = {
      from: "info@doctor.com",
      to: email,
      subject: "Password Reset",
      text: `Click the following link to reset your password: http://95.216.251.189:3000/resetpassword/${token}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.messageId);
  } catch (error) {
    console.error("Error sending password reset email : ", error);
  }
}

// Server running
app.listen(8000, () => {
  console.log("Server started on port 8000!");
});
