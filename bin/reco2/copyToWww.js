// const fs = require("fs");
// const path = require("path");
// var colors = require('colors');

const copy = async (reco) => {

    console.log();
    console.log('reco start');
    console.log();

    reco.state.callBack_replaceWwwRootDir = function () {


        console.log();
        console.log('reco start to build cordova');
        console.log();

    };

    reco.replaceWwwRootDir(".");

};

module.exports = copy;