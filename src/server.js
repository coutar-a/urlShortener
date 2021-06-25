require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { hashUrl } = require("./utils/hash");
const { ShortenedUrl } = require("./db/models");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "..", "build")));

app.options("*", cors());

app.get("/api/:hash", async (req, res) => {
  try {
    const existingUrl = await ShortenedUrl.findOne({
      hash: req.params.hash,
    }).exec();
    if (!existingUrl) {
      res.status(404);
      return;
    }
    res.redirect(301, existingUrl.url);
  } catch (error) {
    res.status(500)
  }

});

app.post("/api/shortenURL", async (req, res) => {
  if (!req.body.url) {
    res.status(400);
    return;
  }
  const shortHash = hashUrl(req.body.url);
  try {
    const existingUrl = await ShortenedUrl.findOne({ hash: shortHash }).exec();
    if (!existingUrl) {
      const newUrl = new ShortenedUrl({ hash: shortHash, url: req.body.url });
      await newUrl.save();
      res.status(200);
      res.send({ url: newUrl.url, hash: newUrl.hash });
      return;
    }
    res.status(200);
    res.send({ url: existingUrl.url, hash: existingUrl.hash });
  } catch (error) {
    res.status(500)
  }
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Server listening at http://localhost:${process.env.SERVER_PORT}`
  );
});
