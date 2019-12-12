const fs = require("fs");
const ncp = require('ncp').ncp;
const path = require("path");
var Promise = require('promise');


//------------------------------------init------------------------------------//
const test = async (reco) => {


    const jsonfile = require('jsonfile');
    const filePackageJson_Root = './package-a.json';
    let reactPackageJson = "";
    jsonfile.readFile(filePackageJson_Root)
        .then(obj => {

            obj.scripts.reactstart = obj.scripts.start;
            obj.scripts.start = "reco serve";
            obj.scripts.build = "react-scripts build && reco build";
            reactPackageJson = obj;
            jsonfile.writeFile(filePackageJson_Root, obj, function (err) {
                if (err) {
                    console.error("ERROR: !important error, add reco scripts to package.json.  on write", err);
                    return;
                } else {
                    const filePackageJson_Cordova = './package-b.json';
                    jsonfile.readFile(filePackageJson_Cordova)
                        .then(async cordovaPackageJson => {

                            const packageJsonLoop = (obj1, obj2) => {
                                // const promise = new Promise(function (resolve, reject) {


                                try {
                                    // console.log("obj1: ", obj1);
                                    // console.log("obj2: ", obj2);


                                    for (var key in obj1) {
                                        console.log("key: ", key);

                                        if (Array.isArray(obj1[key])) {
                                            if (Array.isArray(obj2[key])) {
                                                obj1[key].forEach(element => {
                                                    obj2[key].push(element);
                                                });
                                            } else {
                                                obj2[key] = obj1[key];
                                            }
                                        } else if (typeof (obj1[key]) !== "object") {
                                            obj2[key] = obj1[key];
                                        } else {
                                            if (obj2[key]) {
                                                obj2[key] = packageJsonLoop(obj1[key], obj2[key]);
                                            } else {
                                                obj2[key] = obj1[key];
                                            }

                                        }
                                    }

                                    // resolve(obj2);
                                    return obj2;

                                } catch (error) {
                                    // reject(error)
                                    console.error(error);

                                }
                                // });

                              
                            };





                            await packageJsonLoop(cordovaPackageJson, reactPackageJson);
                            reactPackageJson.author = "DataCyber-OrChuban, react.cordova: Apache Cordova Team and React.js"
                            console.log(reactPackageJson);



                        })
                }
            })
        })
};


module.exports = test;