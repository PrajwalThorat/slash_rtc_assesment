const { Client } = require("@elastic/elasticsearch");
require("dotenv").config();

const esClient = new Client({
  node: process.env.ES_HOST,
  auth: {
    username: process.env.ES_USERNAME || "elastic",
    password: process.env.ES_PASSWORD || "yourpassword",
  },
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = esClient;
