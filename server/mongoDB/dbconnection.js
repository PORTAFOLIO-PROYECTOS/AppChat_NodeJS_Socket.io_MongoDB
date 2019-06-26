const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const url = "mongodb+srv://hugoroca:cutu*2021@cluster0-xu1hg.mongodb.net/test";

const connect = mongoose.connect(url, { useNewUrlParser: true });

module.exports = connect;