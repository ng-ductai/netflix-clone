const router = require("express").Router();
const Movie = require("../models/movie");
const verify = require("../verifyToken");

//CREATE
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
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
    console.log("fg", req.body);
    const {
      _id,
      title,
      desc,
      year,
      genre,
      limit,
      imgSm,
      trailer,
      img,
      video,
      isSeries,
    } = req.body;

    const value = {
      title,
      desc,
      year,
      genre,
      limit,
      imgSm,
      trailer,
      img,
      video,
      isSeries,
    };

    try {
      await Movie.updateOne(
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
    res.status(403).json("You are not allowed!");
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("The movie has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET
router.get("/find/:id", verify, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET RANDOM BANNER
router.get("/random", verify, async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", verify, async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET RECENTLY
router.get("/recently", verify, async (req, res) => {
  try {
    const movies = await Movie.aggregate([
      { $sort: { createdAt: -1, _id: -1 } },
      { $limit: 15 },
    ]);
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
