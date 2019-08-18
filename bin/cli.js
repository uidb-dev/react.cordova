const fs = require("fs");
const path = require("path");
//import path from "path";



let reco = {

    constructor: (args) => {

        reco.state = {
            args: args,
            clientArgsAfter: "",
            clientArgsAfter_Space: "",
            callBack_replaceWwwRootDir: () => { },
            child_process: require('child_process'),
            error: false
        }

        //----- save the args after index 
        var clientArgsAfter = "";
        for (let index = 1; index < args.slice(2).length; index++)
            clientArgsAfter += (args.slice(2)[index] + " ");
        reco.setState({ clientArgsAfter: clientArgsAfter });
        //--
        let clientArgsAfter_Space = "";
        for (let index = 1; index < args.slice(2).length; index++)
            clientArgsAfter_Space += ('"' + args.slice(2)[index] + '"' + ' ');
        reco.setState({ clientArgsAfter_Space: clientArgsAfter_Space });


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
            case "plugin":
                reco.cordovaPlugin();
                break;
            case "-info":
                reco.info();
                break;
            case "":
                reco.map();
                break;
            default:
                console.log();
                console.log(args.slice(2)[0], "it is not exec in reco cli");
                console.log('try => ');
                reco.map();
                break;
        }


    },

    //------------------------------------build------------------------------------//
    build: () => {
        console.log();
        console.log('start build react');
        console.log();
        reco.state.child_process.exec(
            'npm run build'
            , { cwd: 'react-js' }
            , function (error, stdout, stderr) {
                if (error) {
                    console.error('reco-react-cli ERROR : ' + error);
                    return;
                }
                console.log(stdout);
            }).on('close', function () {

                console.log();
                console.log('reco start to build cordova');
                console.log();

                reco.state.callBack_replaceWwwRootDir = function () {

                    reco.state.child_process.exec(
                        'cordova build ' + reco.state.clientArgsAfter
                        , { cwd: 'cordova' }
                        , function (error, stdout, stderr) {
                            if (error) {
                                console.error('reco-cli-build-cordova ERROR : ' + error);
                                reco.setState({ error: true });
                                return;
                            }
                            if (stdout) console.log(stdout);
                            if (stderr) console.log(stderr);

                        }).on('close', function () {
                            if (!reco.state.error) reco.succeeded();
                        }).stdout.on('data', (data) => {
                            console.log(data.toString().replace("reco", "react"));
                        });

                };

                reco.replaceWwwRootDir();

            });

    },

    //------------------------------------init------------------------------------//
    init: async () => {

        const choicesOptions = ['Reco template', 'Empty'];
        const defaultTemplate = choicesOptions[0];

        const inquirer = require('inquirer');
        const questions = [];
        questions.push({
            type: 'list',
            name: 'template',
            message: 'Please select project template',
            choices: choicesOptions,
            default: defaultTemplate,
        });

        const answers = await inquirer.prompt(questions);
        const withTemplate = answers.template === choicesOptions[0];


        let folderName = reco.state.args.slice(2)[2];
        while (folderName.indexOf(" ") >= 0) {
            folderName = folderName.replace(" ", "_");
        }

        const dir = "./" + folderName;

        if (fs.existsSync(dir)) {
            return
        } else {
            fs.mkdirSync(dir);
        }

        if (fs.existsSync(dir + "/react-js") || fs.existsSync(dir + "/cordova")) {
            console.log("exists reco project.");
            console.log('if you wont to start a new project delete all folders in this directory and run agin:   reco init <com.myAppId> <"my app name">');
            return;
        }

        console.log();
        console.log('---------reco start to build react-app---------');
        reco.state.child_process.exec(
            'npx create-react-app react-js'
            , { cwd: dir }
            , function (error, stdout, stderr) {
                if (error) {
                    reco.setState({ error: true });
                    console.error('reco-cli-init-react ERROR : ' + error);
                    return;
                }
                if (stdout)
                    console.log(stdout.toString());
                if (stderr)
                    console.log(stderr.toString());

            }).stdout.on('data', (data) => {
                console.log(data.toString());
            })
            .on('close', function () {


                // fs.renameSync(`./reco`, `./react`
                //     , function (error, stdout, stderr) {
                //         if (error) {
                //             reco.setState({ error: true });
                //             console.error('reco-cli-init-renameReactFolder ERROR : ' + error);
                //             return;
                //         }
                //         console.log(stdout);

                //     }
                // );

                reco.state.child_process.exec(
                    'npm i react.cordova-navigation_controller'
                    , { cwd: dir + '/react-js' }
                    , function (error, stdout, stderr) {
                        if (error) {
                            reco.setState({ error: true });
                            console.error('reco-cli-init--install-react.cordova-navigation_controller ERROR : ' + error);
                            return;
                        }
                        console.log(stdout);
                    }).on('data', (data) => {
                        console.log(data.toString());
                    }).on('close', () => {


                        //--
                        //---------reco start to build cordova-app---------//
                        console.log();
                        console.log('---------reco start to build cordova-app---------');
                        console.log();
                        reco.state.child_process.exec(
                            'cordova create cordova ' + reco.state.clientArgsAfter_Space
                            , { cwd: dir }
                            , function (error, stdout, stderr) {
                                if (error) {
                                    reco.setState({ error: true });
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
                                    , { cwd: dir + '/cordova' }
                                    , function (error, stdout, stderr) {
                                        if (error) {
                                            reco.setState({ error: true });
                                            console.error('reco-cli-init-cordova--(cordova platform add android) ERROR :' + error);
                                            return;
                                        }
                                        console.log(stdout);
                                    }).on('data', (data) => {
                                        console.log(data.toString());
                                    }).on('close', function () {

                                        reco.state.child_process.exec(
                                            'cordova platform add ios'
                                            , { cwd: dir + '/cordova' }
                                            , function (error, stdout, stderr) {
                                                if (error) {
                                                    reco.setState({ error: true });
                                                    console.error('reco-cli-init-cordova--(cordova platform add ios) ERROR :' + error);
                                                    return;
                                                }
                                                console.log(stdout);
                                            }).on('data', (data) => {
                                                console.log(data.toString());
                                            }).on('close', function () {

                                                reco.state.child_process.exec(
                                                    'cordova platform add browser'
                                                    , { cwd: dir + '/cordova' }
                                                    , function (error, stdout, stderr) {
                                                        if (error) {
                                                            reco.setState({ error: true });
                                                            console.error('reco-cli-init-cordova--(cordova platform add browser) ERROR :' + error);
                                                            return;
                                                        }
                                                        console.log(stdout);
                                                    }).on('data', (data) => {
                                                        console.log(data.toString());
                                                    }).on('close', function () {



                                                        reco.state.child_process.exec(
                                                            'cordova platform ls'
                                                            , { cwd: dir + '/cordova' }
                                                            , function (error, stdout, stderr) {
                                                                if (error) {
                                                                    reco.setState({ error: true });
                                                                    console.error('reco-cli-init-cordova--(cordova platform ls) ERROR :' + error);
                                                                    return;
                                                                }
                                                                console.log(stdout);
                                                            }).on('data', (data) => {
                                                                console.log(data.toString());
                                                            }).on('close', function () {

                                                                reco.state.child_process.exec(
                                                                    'npm run build'
                                                                    , { cwd: dir + '/react-js' }
                                                                    , function (error, stdout, stderr) {
                                                                        if (error) {
                                                                            reco.setState({ error: true });
                                                                            console.error('reco-react-cli ERROR : ' + error);
                                                                            return;
                                                                        }
                                                                        console.log(stdout);
                                                                    }).on('close', function () {
                                                                        reco.state.callBack_replaceWwwRootDir = function () {
                                                                            if (!reco.state.error) {
                                                                                reco.succeeded();
                                                                                console.log();
                                                                                console.log("run 'cd " + dir.replace("./", "") + "'")
                                                                            }

                                                                        };
                                                                        reco.recoFiles(dir);
                                                                    });
                                                            });

                                                    });


                                            });
                                    });

                            });

                        //-- 

                    });

            });

    },

    //------------------------------------react------------------------------------//
    react: () => {
        reco.state.child_process.exec(
            'npm ' + reco.state.clientArgsAfter
            , { cwd: 'react-js' }
            , function (error, stdout, stderr) {
                if (error) {
                    reco.setState({ error: true });
                    console.error('reco-cli-react ERROR : ' + error);
                    return;
                }
                console.log(stdout);
            }).on('data', (data) => {
                console.log(data.toString());
            });

    },

    //------------------------------------react start------------------------------------//
    reactStart: () => {
        reco.state.child_process.exec(
            'npm start'
            , { cwd: 'react-js' }
            , function (error, stdout, stderr) {
                if (error) {
                    reco.setState({ error: true });
                    console.error('reco-cli-reactStart ERROR : ' + error);
                    return;
                }
                console.log(stdout);
            }).stdout.on('data', (data) => {
                console.log(data.toString());
                return;
            });
        // .on('data', (data) => {
        //     console.log(data.toString());
        //     return;
        // });
    },


    //------------------------------------react test------------------------------------//
    reactTest: () => {
        reco.state.child_process.exec(
            'npm test'
            , { cwd: 'react-js' }
            , function (error, stdout, stderr) {
                if (error) {
                    reco.setState({ error: true });
                    console.error('reco-cli-reactTest ERROR : ' + error);
                    return;
                }
                console.log(stdout);
            }).on('data', (data) => {
                console.log(data.toString());
            });

    },

    //------------------------------------react install------------------------------------//
    reactInstall: () => {
        reco.state.child_process.exec(
            'npm i ' + reco.state.clientArgsAfter
            , { cwd: 'react-js' }
            , function (error, stdout, stderr) {
                if (error) {
                    reco.setState({ error: true });
                    console.error('reco-cli-reactInstall ERROR : ' + error);
                    return;
                }
                console.log(stdout);
            }).on('data', (data) => {
                console.log(data.toString());
            });

    },

    //------------------------------------cordova------------------------------------//
    cordova: () => {

        reco.state.child_process.exec(
            'cordova ' + reco.state.clientArgsAfter
            , { cwd: 'cordova' }
            , function (error, stdout, stderr) {
                if (error) {
                    reco.setState({ error: true });
                    console.error('reco-cli-cordova ERROR : ' + error);
                    return;
                }
            }).on('data', (data) => {
                console.log(data.toString());
            });
    },

    //------------------------------------cordovaPlugin------------------------------------//
    cordovaPlugin: () => {

        reco.state.child_process.exec(
            'cordova plugin ' + reco.state.clientArgsAfter
            , { cwd: 'cordova' }
            , function (error, stdout, stderr) {
                if (error) {
                    reco.setState({ error: true });
                    console.error('reco-cli-cordovaPlugin ERROR : ' + error);
                    return;
                }
            }).on('data', (data) => {
                console.log(data.toString());
            });
    },

    //------------------------------------info------------------------------------//
    info: () => {
        console.log(' info=> https://github.com/orchoban/react.cordova');
        console.log();
        reco.map();

    },

    //------------------------------------map------------------------------------//
    map: () => {
        console.log('--------init--------');
        console.log('  create new project.  both react-app and cordova-app and then will merge one into the other: ');
        console.log('reco init com.example.hello "Hello World"');
        console.log('--------------------');

        console.log('-------build--------');
        console.log(`  build react-app and cordova-app: `);
        console.log('reco build');
        console.log('reco build <cordova-platform>');
        console.log('--------------------');

        console.log('-------react--------');
        console.log(`  to run any react command: `);
        console.log('reco react <command>');
        console.log('--------------------');

        console.log('-------start--------');
        console.log(` start react server live in the browser: `);
        console.log('reco start');
        console.log('--------------------');

        console.log('-------test--------');
        console.log(` react test: `);
        console.log('reco test');
        console.log('--------------------');

        console.log('-------install--------');
        console.log(` install react package npm: `);
        console.log('reco install   ||   reco i ');
        console.log('--------------------');

        console.log('-------plugin--------');
        console.log(` add cordova plugin: `);
        console.log('reco plugin add <cordova-plugin>');
        console.log('--------------------');

        console.log('-------remove--------');
        console.log(` remove cordova plugin: `);
        console.log('reco plugin remove <cordova-plugin>    ||    reco plugin rm <cordova-plugin>');
        console.log('--------------------');

        console.log('-------cordova--------');
        console.log(` to run any cordova command: `);
        console.log('reco cordova');
        console.log('--------------------');

        console.log('reco -info');


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

    //-------------------------remove all files and folders in =>./cordova/www--------------------------//
    replaceWwwRootDir: (dirPath1 = './cordova/www') => {

        const ncp = require('ncp').ncp;

        if (fs.existsSync("./cordova/www")) {
            async function rmWwwRootDir(dirPath, options = {}) {
                const
                    { removeContentOnly = false, drillDownSymlinks = false } = options,
                    { promisify } = require('util'),
                    readdirAsync = promisify(fs.readdir),
                    unlinkAsync = promisify(fs.unlink),
                    rmdirAsync = promisify(fs.rmdir),
                    lstatAsync = promisify(fs.lstat) // fs.lstat can detect symlinks, fs.stat can't
                let
                    files

                try {
                    files = await readdirAsync(dirPath)
                } catch (e) {
                    reco.setState({ error: true });
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
                            await rmWwwRootDir(filePath)
                        } else {
                            await unlinkAsync(filePath)
                        }
                    }
                }

                if (!removeContentOnly)
                    await rmdirAsync(dirPath);


                if (!fs.existsSync(dirPath1)) {

                    ncp.limit = 9999999999999999999;

                    let parentDir = dirPath1.startsWith("./cordova") 
                    ? "./" : dirPath1.substring(0, dirPath1.indexOf("/cordova")) + "/"
                    
                    ncp(parentDir + "react-js/build", parentDir + "cordova/www", function (err) {
                        if (err) {
                            reco.setState({ error: true });
                            return console.error("ERROR ncp1, copy react-js/build tocordova/www :   " + err);
                        }
                        reco.state.callBack_replaceWwwRootDir(); // callBack();
                    });
                }

            }
            rmWwwRootDir(dirPath1);
        } else {
            let parentDir = dirPath1.startsWith("./cordova") ? "./" : dirPath1.substring(0, dirPath1.indexOf("/cordova")) + "/";
            ncp(parentDir + "react-js/build", parentDir + "cordova/www", function (err) {
                if (err) {
                    reco.setState({ error: true });
                    return console.error("ERROR ncp2, copy react-js/build tocordova/www :   " + err);
                }
                reco.state.callBack_replaceWwwRootDir(); // callBack();
            });
        }

    },


    //------------------------------------recoFiles------------------------------------//
    recoFiles: (dir) => {



        //-- ./react/public/index.html --//
        fs.readFile(dir + "/react-js/public/index.html", function (err, data) {
            // res.writeHead(200, {'Content-Type': 'text/html'});
            // res.write(data);
            // res.end();
            if (err) {
                reco.setState({ error: true });
                console.log("error: ", err);
            }

            const dataString = data.toString().replace("<head>",
                `<head> 
            <script type="text/javascript" src="./cordova.js"></script>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, shrink-to-fit=no">
            <meta name="viewport" content="user-scalable=no, initial-scale=1,
                  maximum-scale=1, minimum-scale=1, target-densitydpi=device-dpi" />
            `)
            fs.writeFile(dir + "/react-js/public/index.html", dataString, function (err) {
                if (err) {
                    return console.log(err);
                } else {
                    console.log(dir + "/react-js/public/index.html ready to by mobile app with cordova");

                    //-- react package.json --//
                    const jsonfile = require('jsonfile');
                    const file = dir + '/react-js/package.json';
                    jsonfile.readFile(file)
                        .then(obj => {

                            obj.homepage = "./";
                            jsonfile.writeFile(file, obj, function (err) {
                                if (err) {
                                    console.error("ERROR: add homepage to react package.json . ", err);
                                    return;
                                } else {
                                    console.log("updete homepage in react-js package.json , now it's ready to by mobile app with cordova.");
                                    reco.replaceWwwRootDir(dir + '/cordova/www');
                                }
                            })
                        })
                        .catch(error => {
                            reco.setState({ error: true });
                            console.error("reco-cli-recoFiles=> ERROR: ", error);
                        })
                }
            });
        });

    },



}






export function cli(args) {


    //fix to the new virsion (after v1.2.0 the react folder name it's "react-js")
    if (fs.existsSync("./react"))
        fs.renameSync(`./react`, `./react-js`
            , function (error, stdout, stderr) {
                if (error) {
                    reco.setState({ error: true });
                    console.error('reco-cli-init-renameReactFolder ERROR : ' + error);
                    return;
                }
                console.log(stdout);

            }
        );

    if ((fs.existsSync("./cordova") && fs.existsSync("./react-js")) || args.slice(2)[0] === "init") {
        reco.constructor(args);
    } else {

        console.log("");
        console.log("");
        console.log("");
        console.log("it is not reco based project");
        console.log("");
        console.log('try to run =>  reco init <com.myAppId> <"my app name">');
        console.log("");
    }
}