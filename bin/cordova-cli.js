const fs = require("fs");
const path = require("path");
//import path from "path";



let reco = {

    constructor: (args) => {

        reco.state = {
            args: args,
            clientArgsAfter: "",
            child_process: require('child_process'),
        }

        //----- save the args after index 
        var clientArgsAfter = "";
        for (let index = 0; index < args.slice(2).length; index++)
            clientArgsAfter += (args.slice(2)[index] + " ");
        reco.setState({ clientArgsAfter: clientArgsAfter });

        ///------////

        reco.cordova();



    },


    //------------------------------------cordova------------------------------------//
    cordova: () => {
        reco.state.child_process.exec(
            'cordova ' + reco.state.clientArgsAfter
            , { cwd: 'cordova' }
            , function (error, stdout, stderr) {
                if (error) {
                    console.error('reco-cli-cordova ERROR : ' + error);
                    return;
                }
                console.log(stdout);
            }).stdout.on('data', (data) => {
                console.log(data.toString());
            });

    },

    //------------------------------------info------------------------------------//
    info: () => {
        console.log(' info=> https://github.com/orchoban/react.cordova');
        console.log();
        reco.map();

    },

    //------------------------------------credit------------------------------------//
    credit: () => {
        console.log(`
       #####Created by Or Chuban (Choban)#####
        info=> https://github.com/orchoban/react.cordova`);
    },

    //------------------------------------succeeded------------------------------------//
    succeeded: () => {
        console.log();
        console.log("----------------------------------------------");
        console.log('---------------!reco succeeded!---------------');
        console.log("----------------------------------------------");
        console.log();
        reco.credit();
    },






    //-------------------------------------------------------------------------------//
    //------------------------------------helpers------------------------------------//
    //-------------------------------------------------------------------------------//
    setState: (state) => {
        for (var item in state) {
            reco.state[item] = state[item]
        }
    },




}






export function cli(args) {


    if ((fs.existsSync("./cordova") && fs.existsSync("./react")) || args.slice(2)[0] === "init") {
        reco.constructor(args);
    }
}