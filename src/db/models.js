const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({ hash: String, url: String });

const ShortenedUrl = mongoose.model("ShortenedUrl", urlSchema);

module.exports = { ShortenedUrl };
