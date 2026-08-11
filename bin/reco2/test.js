const fs = require("fs");
const ncp = require('ncp').ncp;
const path = require("path");


//------------------------------------init------------------------------------//
const test = async (reco) => {
    try {
        console.log("react.cordova=> ok");

    } catch (error) {
        officeService("error", "test", error);
        console.error(error);
    }

};


module.exports = test;