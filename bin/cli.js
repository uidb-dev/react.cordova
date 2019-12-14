const fs = require("fs");
const path = require("path");
var colors = require('colors');
var os = require('os');
//import path from "path";
var reco1 = require('./reco1');
var reco2 = require('./reco2');






export function cli(args) {

    //--react cmd
    if (args[1].includes(".bin\\react") || args[1].includes(".bin/react")) {

        let new_args = [];
        new_args.push(args[0]);
        new_args.push(args[1]);
        new_args.push("react");
        args.slice(2).forEach(arg => {
            new_args.push(arg);
        });

        args = new_args;
    }



    //fix to the new virsion (after v1.2.0 the react folder name it's "react-js")
    if (fs.existsSync("./react"))
        fs.renameSync(`./react`, `./react-js`
            , function (error, stdout, stderr) {
                if (error) {
                    // reco1.setState({ error: true });
                    console.error('reco-cli-init-renameReactFolder ERROR : ' + error);
                    return;
                }
                console.log(stdout);

            }
        );

    if ((fs.existsSync("./cordova") && fs.existsSync("./react-js"))) {
        reco1.constructor(args);
    } if ((fs.existsSync("package.json") && !fs.existsSync("./cordova") && !fs.existsSync("./react-js"))
        || args.slice(2)[0] === "init"|| args.slice(2)[0] === "version") {
        reco2.constructor(args);
    } else {

        console.log("");
        console.log("");
        console.log("");
        console.log("it is not reco based project");
        console.log("");
        console.log('try to run =>  reco init com.myAppId "my app name"');
        console.log("");
    }
}
