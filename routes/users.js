const router = require("express").Router();
const User = require("../models/User");
const verify = require("./verifyToken");

router.get("/", verify, async (req, res) => {
  if (req.user.status !== "Admin") return res.status(401).send("access denied");

  try {
    const response = await User.find()
      .select("-password")
      .sort("-updatedAt");
    res.json(response);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:id", verify, async (req, res) => {
  try {
    const response = await User.findOne({ _id: req.params.id });
    if (response === null) return res.status(404).send("user not found");

    res.json(response);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/:id", verify, async (req, res) => {
  try {
    const response = await User.findOneAndUpdate(
      { _id: req.params.id },
      { location: req.body.location }
    );
    if (response === null) return res.status(404).send("user not found");

    res.send("location updated");
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/:id", verify, async (req, res) => {
  if (req.user.status !== "Admin") return res.status(401).send("access denied");

  try {
    const response = await User.findOneAndDelete({ _id: req.params.id });
    if (response === null) return res.status(404).send("user not found");

    res.send("user deleted");
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
