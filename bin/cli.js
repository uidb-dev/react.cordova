const fs = require("fs");
// const path = require("path");
// var colors = require('colors');
// var os = require('os');
//import path from "path";
var reco1 = require("./reco1");
var reco2 = require("./reco2");
const officeService = require("./office");

// Commands that answer a question about reco itself and so must work from any
// directory, not just from inside a generated project. "init", "version" and
// "help" were always in this list; the aliases the CLI already accepts
// (`-v`, `--version`, `-help`, `checkversion`, ...) were not, so running them
// outside a project printed "it is not reco based project" instead of an
// answer.
const PROJECT_INDEPENDENT_COMMANDS = [
  "init",
  "version",
  "v",
  "-v",
  "-version",
  "--v",
  "--version",
  "checkversion",
  "help",
  "-help",
  "info",
  "-info",
];

function cli(args) {
  officeService(args.slice(2)[0]);

  //fix to the new virsion (after v1.2.0 the react folder name it's "react-js")
  if (fs.existsSync("./react"))
    fs.renameSync(`./react`, `./react-js`, function (error, stdout, stderr) {
      if (error) {
        // reco1.setState({ error: true });
        console.error("reco-cli-init-renameReactFolder ERROR : " + error);
        return;
      }
      console.log(stdout);
    });

  const isRecoV1Project =
    fs.existsSync("./cordova") && fs.existsSync("./react-js");

  if (isRecoV1Project) {
    reco1.constructor(args);
  }
  if (
    (fs.existsSync("package.json") &&
      !fs.existsSync("./cordova") &&
      !fs.existsSync("./react-js")) ||
    args.slice(2)[0] === "init" ||
    args.slice(2)[0] === "version" ||
    args.slice(2)[0] === "help" ||
    (!isRecoV1Project &&
      PROJECT_INDEPENDENT_COMMANDS.indexOf(args.slice(2)[0]) !== -1)
  ) {
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

module.exports = { cli };
