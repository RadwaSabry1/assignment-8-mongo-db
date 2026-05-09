const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// 1. 
router.post("/books", async (req, res) => {
  await mongoose.connection.db.createCollection("books", { validator: {
$jsonSchema: {
 bsonType: "object",
required: ["title"],
  properties: {
  title: {
bsonType: "string",
 minLength: 1
 }
 }
      }
    }
  });
  res.send("Books collection created");
});

// 2. 
router.post("/authors", async (req, res) => {
  await mongoose.connection.db.collection("authors").insertOne({
    name: "Author1"
  });
  res.send("Authors collection created");
});

// 3. 
router.post("/logs/capped", async (req, res) => {
  await mongoose.connection.db.createCollection("logs", {
    capped: true,
    size: 1024 * 1024
  });
  res.send("Capped logs created");
});

// 4. 
router.post("/books/index", async (req, res) => {
  await mongoose.connection.db.collection("books").createIndex({ title: 1 });
  res.send("Index created");
});

module.exports = router;