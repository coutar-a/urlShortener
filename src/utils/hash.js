const { createHash } = require("crypto");

const hashUrl = (url) => {
  const hash = createHash("md5");
  return hash.update(url).digest("hex")
};

module.exports = {hashUrl}