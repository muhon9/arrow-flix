const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "../../.env") });

module.exports = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  mongoose: {
    url: process.env.MONGODB_URL,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  tmdb_api_key: process.env.TMDB_API_KEY,
};
