// import { constants } from 'zlib';

// import arg from 'arg';
// var react = require('./react');



let reco = {

    constructor: (args) => {

        reco.state = {
            clientArgsAfter: "",
            callBack_replaceWwwRootDir: null,
            child_process: require('child_process'),
        }

        //----- save the args after index 
        var clientArgsAfter = "";
        for (let index = 1; index < args.slice(2).length; index++)
            clientArgsAfter += (args.slice(2)[index] + " ");
        reco.setState({ clientArgsAfter: clientArgsAfter });


        ///------////
        switch (args.slice(2)[0]) {
            case "init":
                reco.init();
                break;
            case "build":
                reco.build();
                break;
            case "react":
                reco.react();
                break;
            case "start":
                reco.reactStart();
                break;
            case "test":
                reco.reactTest();
                break;
            case "install":
                reco.reactInstall();
                break;
            case "i":
                reco.reactInstall();
                break;
            case "cordova":
                reco.cordova();
                break;
            case "-info":
                reco.info();
                break;
            default:
            // code block
        }

    },

    //------------------------------------build------------------------------------//
    build: () => {
        reco.state.child_process.exec(
            'npm run build'
            , { cwd: 'react' }
            , function (error, stdout, stderr) {
                if (error) {
                    console.error('reco-react-cli ERROR : ' + error);
                    return;
                }
                console.log(stdout);
            }).on('close', function () {

                reco.state.callBack_replaceWwwRootDir = function () {
                    console.log('reco start to build cordova');
                    reco.state.child_process.exec(
                        'cordova build ' + reco.state.clientArgsAfter
                        , { cwd: 'cordova' }
                        , function (error, stdout, stderr) {
                            if (error) {
                                console.error('reco-cli-build-cordova ERROR : ' + error);
                                return;
                            }
                            console.log(stdout);

                        }).on('close', function () {
                            reco.credit();
                        });

                };

                reco.replaceWwwRootDir();

            });

    },

    //------------------------------------init------------------------------------//
    init: () => {
        reco.state.child_process.exec(
            'cordova create cordova ' + reco.state.clientArgsAfter
            , function (error, stdout, stderr) {
                if (error) {
                    console.error('reco-cli-init-cordova-(cordova create cordova) ERROR :' + error);
                    return;
                }
                console.log(stdout);
            }).on('data', (data) => {
                console.log(data.toString());
            })
            .on('close', function () {

                reco.state.child_process.exec(
                    'cordova platform add android'
                    , { cwd: 'cordova' }
                    , function (error, stdout, stderr) {
                        if (error) {
                            console.error('reco-cli-init-cordova--(cordova platform add android) ERROR :' + error);
                            return;
                        }
                        console.log(stdout);
                    }).on('data', (data) => {
                        console.log(data.toString());
                    }).on('close', function () {

                        reco.state.child_process.exec(
                            'cordova platform add ios'
                            , { cwd: 'cordova' }
                            , function (error, stdout, stderr) {
                                if (error) {
                                    console.error('reco-cli-init-cordova--(cordova platform add ios) ERROR :' + error);
                                    return;
                                }
                                console.log(stdout);
                            }).on('data', (data) => {
                                console.log(data.toString());
                            }).on('close', function () {

                                reco.state.child_process.exec(
                                    'cordova platform ls'
                                    , { cwd: 'cordova' }
                                    , function (error, stdout, stderr) {
                                        if (error) {
                                            console.error('reco-cli-init-cordova--(cordova platform ls) ERROR :' + error);
                                            return;
                                        }
                                        console.log(stdout);
                                    }).on('data', (data) => {
                                        console.log(data.toString());
                                    }).on('close', function () {

                                        reco.state.callBack_replaceWwwRootDir = function () {
                                            reco.credit();
                                        };
                                        reco.replaceWwwRootDir();
                                    });
                            });
                    });

            });
    },

    //------------------------------------react------------------------------------//
    react: () => {
        reco.state.child_process.exec(
            'npm ' + reco.state.clientArgsAfter
            , { cwd: 'react' }
            , function (error, stdout, stderr) {
                if (error) {
                    console.error('reco-cli-react ERROR : ' + error);
                    return;
                }
                console.log(stdout);
            });

    },

    //------------------------------------react start------------------------------------//
    reactStart: () => {
        reco.state.child_process.exec(
            'npm start'
            , { cwd: 'react' }
            , function (error, stdout, stderr) {
                if (error) {
                    console.error('reco-cli-reactStart ERROR : ' + error);
                    return;
                }
                console.log(stdout);
            });
    },


    //------------------------------------react test------------------------------------//
    reactTest: () => {
        reco.state.child_process.exec(
            'npm test'
            , { cwd: 'react' }
            , function (error, stdout, stderr) {
                if (error) {
                    console.error('reco-cli-reactTest ERROR : ' + error);
                    return;
                }
                console.log(stdout);
            });

    },

    //------------------------------------react install------------------------------------//
    reactInstall: () => {
        reco.state.child_process.exec(
            'npm i ' + reco.state.clientArgsAfter
            , { cwd: 'react' }
            , function (error, stdout, stderr) {
                if (error) {
                    console.error('reco-cli-reactInstall ERROR : ' + error);
                    return;
                }
                console.log(stdout);
            });

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
            });
    },

    //------------------------------------info------------------------------------//
    info: () => {
        console.log(' info=> https://github.com/orchoban/react.cordova');
    },


    //------------------------------------credit------------------------------------//
    credit: () => {
        console.log(`
       #####Created by Or Chuban (Choban)#####
        info=> https://github.com/orchoban/react.cordova`);
    },







    //------------------------------------helpers------------------------------------//
    setState: (state) => {
        for (var item in state) {
            reco.state[item] = state[item]
        }
    },

    //--remove all files and folders in =>./cordova/www--//

    replaceWwwRootDir:
        async (dirPath = './cordova/www', callBack, options = {}) => {
            const
                { removeContentOnly = false, drillDownSymlinks = false } = options,
                { promisify } = require('util'),
                path = require('path'),
                fs = require('fs'),
                readdirAsync = promisify(fs.readdir),
                unlinkAsync = promisify(fs.unlink),
                rmdirAsync = promisify(fs.rmdir),
                lstatAsync = promisify(fs.lstat) // fs.lstat can detect symlinks, fs.stat can't
            let
                files

            try {
                files = await readdirAsync(dirPath)
            } catch (e) {
                throw new Error(e)
            }

            if (files.length) {
                for (let fileName of files) {
                    let
                        filePath = path.join(dirPath, fileName),
                        fileStat = await lstatAsync(filePath),
                        isSymlink = fileStat.isSymbolicLink(),
                        isDir = fileStat.isDirectory()

                    if (isDir || (isSymlink && drillDownSymlinks)) {
                        await reco.replaceWwwRootDir(filePath)
                    } else {
                        await unlinkAsync(filePath)
                    }
                }
            }

            if (!removeContentOnly)
                await rmdirAsync(dirPath);


            if (!fs.existsSync('cordova/www')) {
                var ncp = require('ncp').ncp;

                ncp.limit = 9999999999999;

                ncp("./react/build", "./cordova/www", function (err) {
                    if (err) {
                        return console.error(err);
                    }
                    reco.state.callBack_replaceWwwRootDir();
                });
            }

        }


}



// var child_process = require('child_process');
// child_process.exec('"reco.bat" ' + args.slice(2)[0], function (error, stdout, stderr) {
//     console.log('cli-reco EROOR: ' + error + " " + stdout + " " + stderr);
// });






export function cli(args) {
    reco.constructor(args);
}