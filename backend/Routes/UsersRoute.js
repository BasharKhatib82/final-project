// UsersRoute.js
const express = require("express");
const dbSingleton = require("../utils/dbSingleton");
const bcrypt = require("bcrypt");

const connection = dbSingleton.getConnection();
const router = express.Router();

// התחברות משתמש
router.post("/userlogin", (req, res) => {
  const { user_id, password } = req.body;
  const sql = "SELECT * FROM users WHERE user_id = ?";

  connection.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.json({ loginStatus: false, Error: "Query error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: "משתמש לא קיים" });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (bcryptErr, match) => {
      if (bcryptErr) {
        console.error("Bcrypt Error:", bcryptErr);
        return res.status(500).json({ success: false, message: "שגיאת אימות" });
      }

      if (match) {
        req.session.user = { id: user.user_id };
        res.json({ success: true });
      } else {
        res.status(401).json({ success: false, message: "סיסמה שגויה" });
      }
    });
  });
});

// בדיקה אם משתמש מחובר
router.get("/check-auth", (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

// התנתקות משתמש
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("שגיאה בהתנתקות");
    }
    res.clearCookie("connect.sid");
    res.json({ success: true });
  });
});

// דוגמה להמשך - roles
router.get("/roles", (req, res) => {
  const sql = "SELECT * FROM roles_permissions";
  connection.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });
    return res.json({ Status: true, Result: result });
  });
});

// המשך שאר הראוטים (hours, leads, courses וכו') כמו שהכנת.

module.exports = { usersRouter: router };
