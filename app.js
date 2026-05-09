const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/assignment8");

app.use("/books", require("./routes/books"));
app.use("/collection", require("./routes/collections"));

app.listen(3000, () => console.log("Server running"));