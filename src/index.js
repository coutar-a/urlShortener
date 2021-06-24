require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// TODO :
// - more error handling on url hash route
// figure out react
// figure out how to serve react via express

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { hashUrl } = require("./utils/hash");
const { ShortenedUrl } = require("./db/models");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/:hash", async (req, res) => {
  const existingUrl = await ShortenedUrl.findOne({
    hash: req.params.hash,
  }).exec();
  res.status(200);
  res.send({
    url: existingUrl?.url ?? null,
    hash: existingUrl?.hash ?? req.params.hash,
  });
});

app.post("/api/shortenURL", async (req, res) => {
  if (!req.body.url) {
    res.status(400);
    res.render("error", { error: new Error("Invalid url payload") });
  }
  const shortHash = hashUrl(req.body.url);
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
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.SERVER_PORT}`);
});
