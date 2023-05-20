const fs = require("fs");
const child_process = require('child_process');
export function cordova(args) {
  let cordovaCLI = args[1];
  cordovaCLI = args[1].slice(0, args[1].indexOf("cordova"));
  cordovaCLI = cordovaCLI.replace("react.cordova", "cordova").replace(".bin", "bin");
  child_process.exec(cordovaCLI + " " + args[2], {
    maxBuffer: 5120 * 5120,
    cwd: "./cordova"
  }, function (error, stdout, stderr) {
    if (error) {
      console.error('reco-cli-cordova:' + error);
      return;
    }
  }).stdout.on('data', data => {
    console.log(data.toString());
  });
}