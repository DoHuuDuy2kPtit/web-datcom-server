const bodyparser = require('body-parser');
const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const { Model } = require('objection');

const routes = require('./app/routes');
const knex = require('./database/knex');

dotenv.config({ path: '.env' });

const app = express();
const server = http.createServer(app);
const PORT = 3000;

Model.knex(knex);

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

Object.keys(routes).map((route) => app.use('/api', routes[route]));

app.use((req, res) => {
  res.status(404).send('Api not found');
})

server.listen(PORT, () => {
  console.log(`Server listening at http://locahost:${PORT}`);
})