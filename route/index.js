const express = require("express");
const sha256 = require("sha256");

const router = express.Router();

router.get("/", function (req, res) {
  //SET THE LICENSE INFO
  const licence_owner = process.env.JSPM_LICENSE_OWNER;
  const licence_key = process.env.JSPM_LICENSE_KEY;

  //DO NOT MODIFY THE FOLLOWING CODE
  const timestamp = req.query.timestamp;
  const licence_hash = sha256(licence_key + timestamp);
  res.send(licence_owner + "|" + licence_hash);
});

module.exports = router;
