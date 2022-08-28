const router = require("express").Router();
const User = require("../models/user");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");

//GET ALL
router.get("/", verify, async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find().sort({ _id: -1 });
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to see all users!");
  }
});

//GET
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/update", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const { _id, username, img, isAdmin } = req.body;

    const value = { username, profilePic: img, isAdmin };

    try {
      await User.updateOne(
        {
          _id: _id,
        },
        {
          $set: { ...value },
          $currentDate: { lastModified: true },
        }
      );
      res.status(200).json("sucess");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to update account!");
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed delete account!");
  }
});

//GET USER STATS
router.get("/stats", async (req, res) => {
  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
