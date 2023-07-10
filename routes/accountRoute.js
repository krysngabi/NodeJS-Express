const express = require("express");
const router = express.Router();
const { connection } = require("../database/connection");

router.get("/", (req, res) => {
  res.json({ accounts: "tokos" });
});

router.get("/db/testconnection", function (req, res) {
  // console.log(replaceStr('ngabi', 'a', 'k'))
  connection.query("SELECT * FROM tb_user", function (err, result) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

module.exports = router;
