const router = require("express").Router();
const List = require("../models/list");
const verify = require("../verifyToken");

//CREATE
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    try {
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//UPDATE
router.put("/update", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const { _id, type, title, genre } = req.body;

    const value = { type, title, genre };

    try {
      await List.updateOne(
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
      await List.findByIdAndDelete(req.params.id);
      res.status(201).json("The list has been delete...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET BY ID
router.get("/find/:id", verify, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/", verify, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
