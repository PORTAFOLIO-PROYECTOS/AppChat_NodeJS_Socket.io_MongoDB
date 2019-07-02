const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const url = "localhost:1111/test"; //conexion mongo

const connect = mongoose.connect(url, { useNewUrlParser: true });

module.exports = connect;
