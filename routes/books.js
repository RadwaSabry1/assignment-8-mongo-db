const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const mongoose = require("mongoose");

// 5 
router.post("/", async (req, res) => {
  const book = await Book.create(req.body);
  res.send(book);
});

// 6
router.post("/batch", async (req, res) => {
  const books = await Book.insertMany(req.body);
  res.send(books);
});

// 7 
router.post("/logs", async (req, res) => {
  await mongoose.connection.db.collection("logs").insertOne({
    message: "new log",
    date: new Date()
  });
  res.send("log added");
});

// 8
router.patch("/:title", async (req, res) => {
  const book = await Book.updateOne(
    { title: req.params.title },
    { $set: { year: 2022 } }
  );
  res.send(book);
});

// 
router.get("/title", async (req, res) => {
  const book = await Book.findOne({ title: req.query.title });
  res.send(book);
});

// 
router.get("/year", async (req, res) => {
  const books = await Book.find({
    year: { $gte: +req.query.from, $lte: +req.query.to }
  });
  res.send(books);
});

// 11 
router.get("/genre", async (req, res) => {
  const books = await Book.find({
    genres: req.query.genre
  });
  res.send(books);
});

// 
router.get("/skip-limit", async (req, res) => {
  const books = await Book.find()
    .sort({ year: -1 })
    .skip(2)
    .limit(3);
  res.send(books);
});

// 
router.get("/year-integer", async (req, res) => {
  const books = await Book.find({
    year: { $type: "int" }
  });
  res.send(books);
});

// 14 
router.get("/exclude-genres", async (req, res) => {
  const books = await Book.find({
    genres: { $nin: ["Horror", "Science Fiction"] }
  });
  res.send(books);
});

// 15 
router.delete("/before-year", async (req, res) => {
  const result = await Book.deleteMany({
    year: { $lt: +req.query.year }
  });
  res.send(result);
});

// 16 
router.get("/aggregate1", async (req, res) => {
  const result = await Book.aggregate([
    { $match: { year: { $gt: 2000 } } },
    { $sort: { year: -1 } }
  ]);
  res.send(result);
});

// 17 
router.get("/aggregate2", async (req, res) => {
  const result = await Book.aggregate([
    { $match: { year: { $gt: 2000 } } },
    {
      $project: {
        title: 1,
        author: 1,
        year: 1
      }
    }
  ]);
  res.send(result);
});

// 18 
router.get("/aggregate3", async (req, res) => {
  const result = await Book.aggregate([
    { $unwind: "$genres" }
  ]);
  res.send(result);
});

// 19 
router.get("/aggregate4", async (req, res) => {
  const result = await Book.aggregate([
    {
      $lookup: {
        from: "logs",
        localField: "_id",
        foreignField: "bookId",
        as: "logs"
      }
    }
  ]);
  res.send(result);
});

module.exports = router;