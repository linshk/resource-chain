const createError = require('http-errors');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000 || process.env.PORT;
const Web3 = require('web3');
const truffle_connect = require('./connection/app.js');
const bodyParser = require('body-parser');
const logger = require('morgan');

const Agent = require('./controller/Agent');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '/public')));

app.get('/api/getAccounts', (req, res) => {
  // logger.info("**** GET /getAccounts ****");
  truffle_connect.Agent.start(function (answer) {
    res.json(answer);
  })
});

app.use('/api', require('./routes'));

app.listen(port, () => {

  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  // truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

  console.log("Express Listening at http://localhost:" + port);

});