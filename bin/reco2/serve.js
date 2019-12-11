// const fs = require("fs");
// const path = require("path");
var colors = require('colors');


//------------------------------------bundleServe------------------------------------//
const bundleServe = async (reco) => {

    console.log(colors.blue('Emulator running...'));
    console.log('please wait, processing...');

    reco.state.child_process.exec(
        'cordova serve 8597'
        , { cwd: 'cordova' }
        , function (error) {

            if (error) {
                reco.setState({ error: true });
                console.error('reco-cli-bundleServe, error at cordova serve-run.');
                console.error('ERROR :' + error);
                return;
            }

        }).stdout.on('data', (dataCordo) => {

            if (dataCordo.includes("localhost")) {

                console.log("cordova serve.");
                reco.state.child_process.exec(
                    'npm run-script reactstart'
                    , function (error) {

                        if (error) {
                            reco.setState({ error: true });
                            console.error('reco-cli-bundleServe, error at react start serve.');
                            console.error('ERROR :' + error);
                            return;
                        }

                    }).stdout.on('data', (data) => {
                        if (data.includes("localhost")) {
                            console.log(colors.blue(data));
                        }
                        else { console.log(data); }

                    });

            }
        });
};


module.exports = bundleServe;