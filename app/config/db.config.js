require("dotenv").config({ path: __dirname + "/./../../.env" });
module.exports = {
  HOST: process.env.HOST,
  PORT: process.env.MONGODBG_PORT,
  DB: process.env.DB,
};
