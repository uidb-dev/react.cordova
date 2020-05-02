// const fs = require("fs");
// const path = require("path");
var colors = require("colors");
const officeService = require("../office");

//------------------------------------bundleServe------------------------------------//
const bundleServe = async (reco) => {
  try {
    reco.version(true);

    console.log(colors.blue("Emulator running..."));
    console.log("please wait, processing...");

    reco.state.child_process
      .exec(
        "cordova serve 8597",
        // , { cwd: 'cordova' }
        function (error) {
          if (error) {
            reco.setState({ error: true });
            console.error("reco-cli-bundleServe, error at cordova serve-run.");
            console.error("ERROR :" + error);
            return;
          }
        }
      )
      .on("close", () => {
        reco.version(true);
      })
      .stdout.on("data", (dataCordo) => {
        if (dataCordo.includes("localhost")) {
          console.log("cordova serve.");
          reco.state.child_process
            .exec("npm run-script reactstart", function (error) {
              if (error) {
                reco.setState({ error: true });
                console.error(
                  "reco-cli-bundleServe, error at react start serve."
                );
                console.error("ERROR :" + error);
                return;
              }
            })
            .stdout.on("data", (data) => {
              if (data.includes("localhost")) {
                console.log(colors.blue(data));
              } else {
                console.log(data);
              }
            });
        }
      });
  } catch (error) {
    officeService("error", "serve", error);
    console.error(error);
  }
};

module.exports = bundleServe;
