const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send("Email not found!");

    const cekPassword = await bcrypt.compare(req.body.password, user.password);
    if (!cekPassword) return res.status(401).send("Password incorrect!");

    const token = jwt.sign({ id: user.email, status: user.status }, process.env.JWT_SECRET_TOKEN);
    res.json({ email: user.email, status: user.status, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/register", verify, async (req, res) => {
  if (req.user.status !== "Admin") return res.status(401).send("access denied");

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    const newUser = new User(req.body);

    const response = await newUser.save();
    res.json(response);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
