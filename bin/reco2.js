const fs = require("fs");
const path = require("path");
var colors = require('colors');


let reco = {

    constructor: (args) => {


        try {

            reco.state = {
                args: args,
                clientArgsAfter: "",
                clientArgsAfter_Space: "",
                callBack_replaceWwwRootDir: () => { },
                child_process: require('child_process'),
                error: false,
                // emulatorRunning: false,
                // emulatorBusy: false,
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

            switch (args[2].split(2)[0]) {
                case "version":
                    reco.version();
                    break;
                case "init":
                    reco.init();
                    break;
                case "serve":
                    reco.bundleServe();
                    break;
                case "build":
                    reco.build();
                    break;
                case "cordova":
                    reco.cordova();
                    break;
                case "plugin":
                    reco.cordovaPlugin();
                    break;
                case "platform":
                    reco.cordovaPlatform();
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


        } catch (error) {
            reco.map();
        }



    },


    //------------------------------------build------------------------------------//
    build: () => {

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

        const answer = await inquirer.prompt(questions);
        const withTemplate = answer.template === choicesOptions[0];
        const template = withTemplate ? "recoTemp" : "empty";

        let folderName = reco.state.args.slice(2)[2];
        while (folderName.indexOf(" ") >= 0) {
            folderName = folderName.replace(" ", "_");
        }


        if (fs.existsSync("package.json")) {
            console.log("exists reco project.");
            console.log('if you wont to start a new project delete all react.cordova folders and the package.json in this directory and run agin:   reco init <com.myAppId> <"my app name">');
            return;
        }

        console.log();
        console.log('---------reco start to build react-app---------');
        reco.state.child_process.exec(
            'npx create-react-app ' + folderName
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

                reco.state.child_process.exec(
                    withTemplate ? 'npm i cordova_script react.cordova-navigation_controller react-browser-notifications'
                        : 'npm i cordova_script react.cordova-navigation_controller'
                    , { cwd: "./" + folderName }
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

                        const jsonfile = require('jsonfile');
                        const file = "./" + folderName + '/package.json';
                        jsonfile.readFile(file)
                            .then(obj => {

                                obj.scripts.reactstart = obj.scripts.start;
                                obj.scripts.start = "reco serve";
                                obj.scripts.build = "react-scripts build && reco build";
                                jsonfile.writeFile(file, obj, function (err) {
                                    if (err) {
                                        console.error("ERROR: !important error, add reco scripts to package.json.  on write", err);
                                        return;
                                    } else {
                                        console.log("add reco scripts to package.json.");

                                        //--
                                        const copydir = require("copy-dir");

                                        fs.readdir(reco.state.args[1].substring(0, reco.state.args[1].lastIndexOf(".bin")) + "templates\\" + template, (err, files) => {
                                            if (err) console.log(err);
                                            else files.forEach(file => {
                                                if (fs.existsSync("./" + folderName + "/src/" + file))
                                                    fs.unlink("./" + folderName + "/src/" + file, (err) => {
                                                        if (err) console.log("ERROR: reco can't copy template files.(unlink) :" + err);
                                                    });
                                                copydir.sync(reco.state.args[1].substring(0
                                                    , reco.state.args[1].lastIndexOf(".bin")) + "templates\\" + template + "\\" + file
                                                    , "./" + folderName + "/src/" + file, {}, () => {
                                                        if (err) console.log("ERROR: reco can't copy template files :" + err);
                                                    });
                                            });
                                        });

                                        //---------reco start to build cordova-app---------//
                                        console.log();
                                        console.log('---------reco start to build cordova-app---------');
                                        console.log();
                                        reco.state.child_process.exec(
                                            'cordova create cordova ' + reco.state.clientArgsAfter_Space
                                            , { cwd: "./" + folderName }
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
                                                    , { cwd: "./" + folderName + '/cordova' }
                                                    , function (error, stdout, stderr) {
                                                        if (error) {
                                                            reco.setState({ error: true });
                                                            console.error('reco-cli-init-cordova--(cordova platform add android) ERROR :' + error);
                                                            return;
                                                        }
                                                        console.log(stdout);
                                                    }).stdout.on('data', (data) => {
                                                        console.log(data.toString());
                                                    }).on('close', function () {

                                                        reco.state.child_process.exec(
                                                            'cordova platform add ios'
                                                            , { cwd: "./" + folderName + '/cordova' }
                                                            , function (error, stdout, stderr) {
                                                                if (error) {
                                                                    reco.setState({ error: true });
                                                                    console.error('reco-cli-init-cordova--(cordova platform add ios) ERROR :' + error);
                                                                    return;
                                                                }
                                                                console.log(stdout);
                                                            }).stdout.on('data', (data) => {
                                                                console.log(data.toString());
                                                            }).on('close', function () {

                                                                reco.state.child_process.exec(
                                                                    'cordova platform add browser'
                                                                    , { cwd: "./" + folderName + '/cordova' }
                                                                    , function (error, stdout, stderr) {
                                                                        if (error) {
                                                                            reco.setState({ error: true });
                                                                            console.error('reco-cli-init-cordova--(cordova platform add browser) ERROR :' + error);
                                                                            return;
                                                                        }
                                                                        console.log(stdout);
                                                                    }).stdout.on('data', (data) => {
                                                                        console.log(data.toString());
                                                                    }).on('close', function () {



                                                                        reco.state.child_process.exec(
                                                                            'cordova platform ls'
                                                                            , { cwd: "./" + folderName + '/cordova' }
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

                                                                                const build_App = () => {
                                                                                    reco.state.child_process.exec(
                                                                                        'npm run build'
                                                                                        , { cwd: "./" + folderName }
                                                                                        , function (error, stdout, stderr) {
                                                                                            if (error) {
                                                                                                reco.setState({ error: true });
                                                                                                console.error('reco-react-cli ERROR : ' + error);
                                                                                                return;
                                                                                            }
                                                                                            console.log(stdout);
                                                                                        }).on('close', function () {
                                                                                            // reco.state.callBack_replaceWwwRootDir = function () {
                                                                                            if (!reco.state.error) {
                                                                                                reco.succeeded();
                                                                                                console.log();
                                                                                                console.log("run 'cd " + folderName + "'")
                                                                                            }

                                                                                            // };
                                                                                            // reco.recoFiles("./" + folderName);
                                                                                        });
                                                                                }


                                                                                if (withTemplate) {
                                                                                    reco.state.child_process.exec(
                                                                                        'cordova plugin add cordova-plugin-local-notification'
                                                                                        , { cwd: "./" + folderName + '/cordova' }
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

                                                                                            build_App();
                                                                                        });
                                                                                } else {
                                                                                    build_App();
                                                                                }


                                                                            });

                                                                    });


                                                            });
                                                    });

                                            });

                                        //-- 

                                    }
                                })
                            })
                            .catch(error => {
                                reco.setState({ error: true });
                                console.error("reco-cli-init=> ERROR: ERROR: !important error, add reco scripts to package.json. on read", error);
                            })



                    });

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
            }).stdout.on('data', (data) => {
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
            }).stdout.on('data', (data) => {
                console.log(data.toString());
            });
    },
    //------------------------------------cordovaPlatform------------------------------------//
    cordovaPlatform: () => {

        reco.state.child_process.exec(
            'cordova platform ' + reco.state.clientArgsAfter
            , { cwd: 'cordova' }
            , function (error, stdout, stderr) {
                if (error) {
                    reco.setState({ error: true });
                    console.error('reco-cli-cordovaPlatform ERROR : ' + error);
                    return;
                }
            }).stdout.on('data', (data) => {
                console.log(data.toString());
            }).on('data', (data) => {
                console.log(data.toString());
            });
    },


    //------------------------------------bundleServe------------------------------------//
    bundleServe: () => {

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
    },


    //------------------------------------info------------------------------------//
    info: () => {
        console.log(' info=> https://github.com/orchoban/react.cordova');
        console.log();
        reco.map();

    },

    //------------------------------------map------------------------------------//
    map: () => {

        console.log(colors.yellow.underline.bold('-info:') + "");
        console.log();


        console.log(" " + colors.underline.bold('init'));
        console.log("  " + colors.bold('create new project.  both react-app and cordova-app and then will merge one into the other. '));
        console.log('   example command: ' + colors.green('reco init com.example.hello "Hello World"'));
        console.log();

        console.log(" " + colors.underline('build'));
        console.log("  " + colors.bold(`build react-app and cordova-app. `));
        console.log('   command: ' + colors.green('reco build'));
        console.log('   command: ' + colors.green('reco build <cordova-platform>'));
        console.log();

        console.log(" " + colors.underline('react'));
        console.log("  " + colors.bold(`to run any react command. `));
        console.log('   command: ' + colors.green('reco react <command>'));
        console.log();

        console.log(" " + colors.underline('start/serve'));
        console.log("  " + colors.bold(`run a React or Cordova simulation`));
        console.log('   command: ' + colors.green('reco start'));
        console.log();

        console.log(" " + colors.underline('test'));
        console.log("  " + colors.bold(`react test. `));
        console.log('   command: ' + colors.green('reco test'));
        console.log();

        console.log(" " + colors.underline('install/uninstall'));
        console.log("  " + colors.bold(`install react package from npm. `));
        console.log('   command: ' + colors.green('reco install <npm-package>'));
        console.log('   command: ' + colors.green('reco i <npm-package>'));
        console.log('   command: ' + colors.green('reco uninstall  <npm-package>'));
        console.log();

        console.log(" " + colors.underline('plugin'));
        console.log("  " + colors.bold(`add cordova plugin. `));
        console.log('   command: ' + colors.green('reco plugin add <cordova-plugin>'));
        console.log();

        console.log(" " + colors.underline('remove'));
        console.log("  " + colors.bold(`remove cordova plugin. `));
        console.log('   command: ' + colors.green('reco plugin remove <cordova-plugin>'));
        console.log('   command: ' + colors.green('reco plugin rm <cordova-plugin>'));

        console.log();

        console.log(" " + colors.underline('cordova'));
        console.log("  " + colors.bold(`to run any cordova command. `));
        console.log('   command: ' + colors.green('reco cordova'));
        console.log();

        console.log('--------------------');

        console.log('reco -info');


    },

    //------------------------------------credit------------------------------------//
    credit: () => {
        console.log(`
       #####Created by Or Chuban (Choban)#####
        info => https://github.com/orchoban/react.cordova`);
    },

    //------------------------------------succeeded------------------------------------//
    succeeded: () => {
        console.log();
        console.log("----------------------------------------------");
        console.log('---------------!reco succeeded!---------------');
        console.log("----------------------------------------------");
        console.log();
        reco.credit();

        reco.version(true);
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

                    ncp(parentDir + "build", parentDir + "cordova/www", function (err) {
                        if (err) {
                            reco.setState({ error: true });
                            return console.error("ERROR ncp1, copy build tocordova/www :   " + err);
                        }
                        reco.state.callBack_replaceWwwRootDir(); // callBack();
                    });
                }

            }
            rmWwwRootDir(dirPath1);
        } else {
            let parentDir = dirPath1.startsWith("./cordova") ? "./" : dirPath1.substring(0, dirPath1.indexOf("/cordova")) + "/";
            ncp(parentDir + "build", parentDir + "cordova/www", function (err) {
                if (err) {
                    reco.setState({ error: true });
                    return console.error("ERROR ncp2, copy build tocordova/www :   " + err);
                }
                reco.state.callBack_replaceWwwRootDir(); // callBack();
            });
        }

    },


    //------------------------------------recoFiles------------------------------------//
    recoFiles: (dir) => {



        //-- ./react/public/index.html --//
        fs.readFile(dir + "/public/index.html", function (err, data) {
            // res.writeHead(200, {'Content-Type': 'text/html'});
            // res.write(data);
            // res.end();
            if (err) {
                reco.setState({ error: true });
                console.log("error: ", err);
            }

            let dataString = data.toString();

            dataString = dataString.replace(dataString.substr(
                dataString.indexOf(`<meta name="viewport"`)
                , dataString.substr(dataString.indexOf(`<meta name="viewport"`)).indexOf("/>") + 2
            ), ` <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, shrink-to-fit=no" />`);


            fs.writeFile(dir + "/public/index.html", dataString, function (err) {
                if (err) {
                    return console.log(err);
                } else {
                    console.log(dir + "/public/index.html ready to by mobile app with cordova");

                    //-- react package.json --//
                    const jsonfile = require('jsonfile');
                    const file = dir + '/package.json';
                    jsonfile.readFile(file)
                        .then(obj => {

                            obj.homepage = "./";
                            jsonfile.writeFile(file, obj, function (err) {
                                if (err) {
                                    console.error("ERROR: add homepage to react package.json . ", err);
                                    return;
                                } else {
                                    console.log("update homepage in package.json , now it's ready to by mobile app with cordova.");
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

    version: (automatic) => {

        reco.state.child_process.exec(
            'npm view react.cordova --json'
            , function (error, stdout, stderr) {
                if (error) {
                    reco.setState({ error: true });
                    console.error('reco-cli-react ERROR : ' + error);
                    return;
                }
                // console.log(stdout);
            }).stdout.on('data', (dataView) => {
                dataView = JSON.parse(dataView);


                const jsonfile = require('jsonfile');
                const file = reco.state.args[1].substring(0, reco.state.args[1].lastIndexOf(".bin")) + "package.json";
                jsonfile.readFile(file)
                    .then(obj => {
                        const thisVersion = obj.version;
                        const newVersion = dataView.versions[dataView.versions.length - 1];

                        if (automatic && thisVersion !== newVersion) {

                            console.log();
                            console.log();

                            console.log(
                                colors.cyan(`
        ╭─────────────────────────────────────────────╮
        │                                             │
        │   `)
                                , `Update available ${thisVersion} → `
                                , colors.green(newVersion)
                                , colors.cyan(`         │
        │   `)
                                , `Run`
                                , colors.blue(`npm i -g react.cordova`)
                                , ` to update`
                                , colors.cyan(`   │
        │                                             │
        ╰─────────────────────────────────────────────╯
        
        `));
                        } else if (!automatic) {
                            console.log(thisVersion);

                        }

                    });



            });


    }



}


module.exports = reco;