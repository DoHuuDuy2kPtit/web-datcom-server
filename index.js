const bodyparser = require("body-parser");
const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const { Model } = require("objection");
dotenv.config({ path: ".env" });

const routes = require("./app/routes");
const knex = require("./database/knex");

const app = express();
const server = http.createServer(app);
const PORT = 3000;

Model.knex(knex);

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

Object.keys(routes).map((route) => app.use("/api", routes[route]));

app.use((req, res) => {
  res.status(404).send("Api not found");
});

server.listen(PORT, () => {
  console.log(`Server listening at http://locahost:${PORT}`);
});
