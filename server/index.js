const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

// Enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json("WORKING!");
});

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/openai", require("./routes/openaiRoutes"));

app.listen(port, () => console.log(`Server started on port ${port}`));
