// const fs = require("fs");
// const path = require("path");
// var colors = require('colors');

const copyvue = async (reco) => {
    try {
        console.log();
        console.log('reco start');
        console.log();

        reco.state.callBack_replaceWwwRootDir = function () {


            console.log();
            console.log('reco build cordova');
            console.log();

        };

        reco.replaceWwwRootDir(".","dist");


    } catch (error) {
        officeService("error", "copy.js", error);
        console.error("vue.cordova copy :", error);
    }
};

module.exports = copyvue;