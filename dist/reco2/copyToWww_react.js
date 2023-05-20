// const fs = require("fs");
// const path = require("path");
// var colors = require('colors');

const copy = async reco => {
  try {
    console.log();
    console.log('reco start');
    console.log();
    reco.state.callBack_replaceWwwRootDir = function () {
      console.log();
      console.log('reco build cordova');
      console.log();
    };
    reco.replaceWwwRootDir(".");
  } catch (error) {
    officeService("error", "copy.js", error);
    console.error("react.cordova copy :", error);
  }
};
module.exports = copy;