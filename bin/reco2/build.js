// const fs = require("fs");
// const path = require("path");
// var colors = require('colors');

const build= async (reco) => {

    console.log();
    console.log('reco start to build cordova');
    console.log();

    reco.state.callBack_replaceWwwRootDir = function () {

        function execCB(error, stdout, stderr) {
            if (error) {
                console.error('reco-cli-build-cordova ERROR : ' + error);
                reco.setState({ error: true });
                return;
            }
            // if (stdout) console.log(stdout);
            // if (stderr) console.log(stderr);
        }

        // if (os.platform() === "darwin") {

        reco.state.child_process.exec(
            'cordova build ' + reco.state.clientArgsAfter
            , { maxBuffer: 5120 * 5120, cwd: 'cordova' }
            , execCB).on('close', function () {
                if (!reco.state.error) reco.succeeded();
            }).stdout.on('data', (data) => {
                console.log(data.toString().replace("reco", "react"));
            });
        // } else {
        //     reco.state.child_process.exec(
        //         'cordova build ' + reco.state.clientArgsAfter
        //         , { cwd: 'cordova' }
        //         , execCB).on('close', function () {
        //             if (!reco.state.error) reco.succeeded();
        //         }).stdout.on('data', (data) => {
        //             console.log(data.toString().replace("reco", "react"));
        //         });
        // }

    };

    reco.replaceWwwRootDir();


};

module.exports = build;