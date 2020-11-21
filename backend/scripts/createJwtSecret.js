const crypto = require("crypto");
const fs = require("fs");
crypto.randomBytes(256, function (ex, buf) {
  if (ex) throw ex;
  const secretKey = buf.toString("base64");
  console.log(secretKey);
  fs.appendFileSync(".env", `\nJWT_SECRET = ${secretKey}`);
});
