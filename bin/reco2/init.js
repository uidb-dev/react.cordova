const fs = require("fs");


    //------------------------------------init------------------------------------//
   const init= async (reco) => {

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

    };


module.exports = init;