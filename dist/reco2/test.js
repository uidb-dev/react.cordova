const fs = require("fs");
const ncp = require('ncp').ncp;
const path = require("path");
var Promise = require('promise');

//------------------------------------init------------------------------------//
const test = async reco => {
  try {
    console.log("react.cordova=> ok");
  } catch (error) {
    officeService("error", "test", error);
    console.error(error);
  }
};
module.exports = test;