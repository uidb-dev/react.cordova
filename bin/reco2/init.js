const colors = require("colors");
const fs = require("fs");
const ncp = require("ncp").ncp;
const path = require("path");
const inquirer = require("inquirer");
// var Promise = require('promise');

const removeDir = async (dirPath1, callback) => {
  async function removeDir_(dirPath, options = {}) {
    const { removeContentOnly = false, drillDownSymlinks = false } = options,
      { promisify } = require("util"),
      readdirAsync = promisify(fs.readdir),
      unlinkAsync = promisify(fs.unlink),
      rmdirAsync = promisify(fs.rmdir),
      lstatAsync = promisify(fs.lstat); // fs.lstat can detect symlinks, fs.stat can't
    let files;

    try {
      files = await readdirAsync(dirPath);
    } catch (e) {
      reco.setState({ error: true });
      throw new Error(e);
    }

    if (files.length) {
      for (let fileName of files) {
        let filePath = path.join(dirPath, fileName),
          fileStat = await lstatAsync(filePath),
          isSymlink = fileStat.isSymbolicLink(),
          isDir = fileStat.isDirectory();

        if (isDir || (isSymlink && drillDownSymlinks)) {
          await removeDir_(filePath);
        } else {
          await unlinkAsync(filePath);
        }
      }
    }

    if (!removeContentOnly) await rmdirAsync(dirPath);

    if (!fs.existsSync(dirPath1)) {
      if (callback) callback(dirPath1);
      else return;
    }
  }
  removeDir_(dirPath1);
};

//------------------------------------init------------------------------------//
const init = async (reco) => {
  // welcome message
  console.log(colors.cyan.bold("Welcome to reco!") + "");

  // # frameworkQuestion
  const choicesOptions_framework = ["react.js", "vue.js"];
  const default_framework = choicesOptions_framework[0];
  // # templateQuestion
  const choicesOptions_template = ["example template", "Empty"];
  const default_template = choicesOptions_template[1];

  // # questions
  const questions = [];
  // questions.push({
  //   type: "list",
  //   name: "framework",
  //   message: "Please select framework to use:",
  //   choices: choicesOptions_framework,
  //    default:  default_framework,
  // });
  const  isWin = process.platform === "win32";
  questions.push({
    type: "list",
    name: "template",
    message: "Please select project template",
    choices: choicesOptions_template,
     default: default_template,
  });

  if(isWin){

 
  const outPath = inquirer
    .prompt(questions)
    .then((answers) => {
      // Use user feedback
       const withTemplate = answers.template === choicesOptions_template[0];
       const template = withTemplate ? "recoTemp" : "empty";
       //const framework = answers.framework;
       buildNewProj({reco,template,withTemplate
        //,framework
      })
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("error.isTtyError: ", error.isTtyError);
        // throw error;
        // Prompt couldn't be rendered in the current environment
      } else {
        console.log("error: ", error);
        // throw error;
        // Something else went wrong
      }
    });

  }else{
    // not win
    buildNewProj({reco,withTemplate:false })
  }

  // buildNewProj(reco, template);
};

const buildNewProj = ({reco, template,withTemplate,framework}) => {
  let rootDir = reco.state.args.slice(2)[2];
  while (rootDir.indexOf(" ") >= 0) {
    rootDir = rootDir.replace(" ", "_");
  }
  rootDir = rootDir.toLocaleLowerCase();

  if (fs.existsSync(`${rootDir}/package.json`)) {
    console.log( colors.blue.bold(
      'if you wont to start a new project delete all react.cordova folders and the package.json in this directory and run agin:   reco init <com.myAppId> <"my app name">'
     ) );
    console.error(colors.red.bold("exist project."));
    return;
  }

  console.log();
  console.log("---------reco start to build react-app---------");

  let intervalPoint_isWork = setInterval(() => {
    process.stdout.write(".");
  }, 4000);

  reco.state.child_process
    .exec("npx create-react-app " + rootDir, function (error, stdout, stderr) {
      if (error) {
        reco.setState({ error: true });
        console.error("reco-cli-init-react ERROR : " + error);
        return;
      }
      if (stdout) console.log(stdout.toString());
      if (stderr) console.log(stderr.toString());
    })
    .stdout.on("data", (data) => {
      // console.log(data.toString());
    })
    .on("close", function () {
      clearInterval(intervalPoint_isWork);

      reco.state.child_process
        .exec(
          withTemplate
            ? "npm i cordova_script navigation-controller react-browser-notifications"
            : "npm i cordova_script navigation-controller",
          { cwd: "./" + rootDir },
          function (error, stdout, stderr) {
            if (error) {
              reco.setState({ error: true });
              console.error(
                "reco-cli-init--install-navigation-controller ERROR : " +
                  error
              );
              return;
            }
            console.log(stdout);
          }
        )
        .on("data", (data) => {
          // console.log(data.toString());
        })
        .on("close", () => {
          //-- ./react/public/index.html --//
          fs.readFile(rootDir + "/public/index.html", function (err, data) {
            // res.writeHead(200, {'Content-Type': 'text/html'});
            // res.write(data);
            // res.end();
            if (err) {
              reco.setState({ error: true });
              console.log("error: ", err);
            }

            let dataString = data.toString();

            dataString = dataString.replace(
              dataString.substr(
                dataString.indexOf(`<meta name="viewport"`),
                dataString
                  .substr(dataString.indexOf(`<meta name="viewport"`))
                  .indexOf("/>") + 2
              ),
              ` <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, shrink-to-fit=no" />`
            );

            fs.writeFile(
              rootDir + "/public/index.html",
              dataString,
              function (err) {
                if (err) {
                  return console.log(err);
                } else {
                  console.log(
                    rootDir +
                      "/public/index.html ready to by mobile app with cordova"
                  );
                }
              }
            );
          });
          //-----------

          const jsonfile = require("jsonfile");
          const filePackageJson_Root = "./" + rootDir + "/package.json";
          let reactPackageJson = "";
          jsonfile
            .readFile(filePackageJson_Root)
            .then((obj) => {
              obj.homepage = "./";
              obj.scripts.reactstart = obj.scripts.start;
              obj.scripts.start = "reco serve";
              obj.scripts.build =
                "reco checkversion && react-scripts build && reco copy && cordova build";
              reactPackageJson = obj;
              jsonfile.writeFile(filePackageJson_Root, obj, function (err) {
                if (err) {
                  console.error(
                    "ERROR: !important error, add reco scripts to package.json.  on write",
                    err
                  );
                  return;
                } else {
                  console.log("done to add reco scripts to package.json");

                 const indexFile=`
import React from "react";
import ReactDOM from 'react-dom/client';
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "cordova_script";
                                  
                 
                 
document.addEventListener(
"deviceready",
() => {
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
<App />
</React.StrictMode>
);
},
false
);
                 
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
                 `


                 const  isWin = process.platform === "win32";
                //  if(!isWin)
              if(true)
               {  fs.writeFile(
                  "./" + rootDir + "/src/index.js",
                  indexFile,
                  function (err) {
                    if (err) {
                      return console.log(err);
                    } else {
                      console.log(
                        rootDir +
                          "/src/index.js ready to work with cordova"
                      );
                    }
                  }
                )}else{
                  const copydir = require("copy-dir");

                  fs.readdir(
                    reco.state.args[1].substring(
                      0,
                      reco.state.args[1].lastIndexOf(".bin")
                    ) +
                      "templates\\" +
                      template,
                    (err, files) => {
                      if (err) console.log(err);
                      else
                        files.forEach((file) => {
                          if (fs.existsSync("./" + rootDir + "/src/" + file))
                            fs.unlink(
                              "./" + rootDir + "/src/" + file,
                              (err) => {
                                if (err)
                                  console.log(
                                    "ERROR: reco can't copy template files.(unlink) :" +
                                      err
                                  );
                              }
                            );
                          copydir.sync(
                            reco.state.args[1].substring(
                              0,
                              reco.state.args[1].lastIndexOf(".bin")
                            ) +
                              "templates\\" +
                              template +
                              "\\" +
                              file,
                            "./" + rootDir + "/src/" + file,
                            {},
                            () => {
                                      if (err)
                                console.log(
                                  "ERROR: reco can't copy template files :" +
                                    err
                                );
                            }
                          );
                        });
                    }
                  );



                  fs.readdir(
                    reco.state.args[1].substring(
                      0,
                      reco.state.args[1].lastIndexOf(".bin")
                    ),
                    (err, files) => {
                      if (err) console.log(err);
                      else
                        files.forEach((file) => {
                          if (fs.existsSync("./" + rootDir + "/./README.md"))
                            fs.unlink(
                              "./" + rootDir + "/./README.md",
                              (err) => {
                                if (err)
                                  console.log(
                                    "ERROR: reco can't copy template files.(unlink) README.md :" +
                                      err
                                  );
                              }
                            );
                          copydir.sync(
                            reco.state.args[1].substring(
                              0,
                              reco.state.args[1].lastIndexOf(".bin")
                            ) + "\\README.md",
                            "./" + rootDir + "/README.md",
                            {},
                            () => {
                              if (err)
                                console.log(
                                  "ERROR: reco can't copy template files :" +
                                    err
                                );
                            }
                          );
                        });
                    }
                  );

                }
              

             
                  //---------reco start to build cordova-app---------//
                  console.log();
                  console.log(
                    "---------reco start to build cordova-app---------"
                  );
                  console.log();
                  reco.state.child_process
                    .exec(
                      "cordova create cordova " +
                        reco.state.clientArgsAfter_Space,
                      { cwd: "./" + rootDir },
                      function (error, stdout, stderr) {
                        if (error) {
                          reco.setState({ error: true });
                          console.error(
                            "reco-cli-init-cordova-(cordova create cordova) ERROR :" +
                              error
                          );
                          return;
                        }
                        console.log(stdout);
                      }
                    )
                    .on("data", (data) => {
                      // console.log(data.toString());
                    })
                        .on("close", function () {
                          reco.state.child_process
                            .exec(
                              "cordova platform", // add ios
                              { cwd: "./" + rootDir + "/cordova" },
                              function (error, stdout, stderr) {
                                if (error) {
                                  reco.setState({ error: true });
                                  console.error(
                                    "reco-cli-init-cordova--(cordova platform add ios) ERROR :" +
                                      error
                                  );
                                  return;
                                }
                                console.log(stdout);
                              }
                            )
                            .stdout.on("data", (data) => {
                              // console.log(data.toString());
                            })
                            .on("close", function () {
                              reco.state.child_process
                                .exec(
                                  "cordova platform add browser",
                                  { cwd: "./" + rootDir + "/cordova" },
                                  function (error, stdout, stderr) {
                                    if (error) {
                                      reco.setState({ error: true });
                                      console.error(
                                        "reco-cli-init-cordova--(cordova platform add browser) ERROR :" +
                                          error
                                      );
                                      return;
                                    }
                                    console.log(stdout);
                                  }
                                )
                                .stdout.on("data", (data) => {
                                  // console.log(data.toString());
                                })
                                .on("close", function () {
                                  reco.state.child_process
                                    .exec(
                                      "cordova platform ls",
                                      { cwd: "./" + rootDir + "/cordova" },
                                      function (error, stdout, stderr) {
                                        if (error) {
                                          reco.setState({ error: true });
                                          console.error(
                                            "reco-cli-init-cordova--(cordova platform ls) ERROR :" +
                                              error
                                          );
                                          return;
                                        }
                                        console.log(stdout);
                                      }
                                    )
                                    .on("data", (data) => {
                                      // console.log(data.toString());
                                    })
                                    .on("close", function () {
                                      const cordovaEnd = async () => {
                                        const filePackageJson_Cordova =
                                          "./" +
                                          rootDir +
                                          "/cordova/package.json";
                                        jsonfile
                                          .readFile(filePackageJson_Cordova)
                                          .then(async (cordovaPackageJson) => {
                                            const packageJsonLoop = (
                                              obj1,
                                              obj2
                                            ) => {
                                              // return new Promise(function (resolve, reject) {
                                              try {
                                                for (var key in obj1) {
                                                  if (
                                                    Array.isArray(obj1[key])
                                                  ) {
                                                    if (
                                                      Array.isArray(obj2[key])
                                                    ) {
                                                      obj1[key].forEach(
                                                        (element) => {
                                                          obj2[key].push(
                                                            element
                                                          );
                                                        }
                                                      );
                                                    } else {
                                                      obj2[key] = obj1[key];
                                                    }
                                                  } else if (
                                                    typeof obj1[key] !==
                                                    "object"
                                                  ) {
                                                    obj2[key] = obj1[key];
                                                  } else {
                                                    if (obj2[key]) {
                                                      obj2[key] =
                                                        packageJsonLoop(
                                                          obj1[key],
                                                          obj2[key]
                                                        );
                                                    } else {
                                                      obj2[key] = obj1[key];
                                                    }
                                                  }
                                                }

                                                // resolve(obj2);
                                                return obj2;
                                                // });
                                              } catch (error) {
                                                console.error(error);
                                              }
                                            };

                                            await packageJsonLoop(
                                              cordovaPackageJson,
                                              reactPackageJson
                                            );
                                            reactPackageJson.author =
                                              "DataCyber-OrChuban, react.cordova: Apache Cordova Team and React.js";

                                            jsonfile.writeFile(
                                              filePackageJson_Root,
                                              reactPackageJson,
                                              async function (err) {
                                                if (err) {
                                                  console.error(
                                                    "ERROR: !important error. Unification package.json.  on write",
                                                    err
                                                  );
                                                  return;
                                                } else {
                                                  console.log(
                                                    "created new bundle package.json"
                                                  );

                                                  fs.unlinkSync(
                                                    "./" +
                                                      rootDir +
                                                      "/cordova/package.json"
                                                  );
                                                  fs.unlinkSync(
                                                    "./" +
                                                      rootDir +
                                                      "/cordova/package-lock.json"
                                                  );
                                                  await removeDir(
                                                    "./" +
                                                      rootDir +
                                                      "/cordova/node_modules",
                                                    async () => {
                                                      await ncp(
                                                        "./" +
                                                          rootDir +
                                                          "/cordova",
                                                        "./" + rootDir,
                                                        async function (err) {
                                                          if (err) {
                                                            reco.setState({
                                                              error: true,
                                                            });
                                                            return console.error(
                                                              "ERROR ncp1, copy cordova files to root :   " +
                                                                err
                                                            );
                                                          }
                                                          removeDir(
                                                            "./" +
                                                              rootDir +
                                                              "/cordova"
                                                          );

                                                          //-------------

                                                          reco.state.child_process
                                                            .exec(
                                                              "npm i",
                                                              {
                                                                cwd:
                                                                  "./" +
                                                                  rootDir,
                                                              },
                                                              function (
                                                                error,
                                                                stdout,
                                                                stderr
                                                              ) {
                                                                if (error) {
                                                                  reco.setState(
                                                                    {
                                                                      error: true,
                                                                    }
                                                                  );
                                                                  console.error(
                                                                    "reco-install-new-package ERROR : " +
                                                                      error
                                                                  );
                                                                  return;
                                                                }
                                                                console.log(
                                                                  stdout
                                                                );
                                                              }
                                                            )
                                                            .on(
                                                              "close",
                                                              function () {
                                                                reco.state.child_process
                                                                  .exec(
                                                                    "npm run build",
                                                                    {
                                                                      cwd:
                                                                        "./" +
                                                                        rootDir,
                                                                    },
                                                                    function (
                                                                      error,
                                                                      stdout,
                                                                      stderr
                                                                    ) {
                                                                      if (
                                                                        error
                                                                      ) {
                                                                        reco.setState(
                                                                          {
                                                                            error: true,
                                                                          }
                                                                        );
                                                                        console.error(
                                                                          "reco-react-cli ERROR : " +
                                                                            error
                                                                        );
                                                                        return;
                                                                      }
                                                                      console.log(
                                                                        stdout
                                                                      );
                                                                    }
                                                                  )
                                                                  .on(
                                                                    "close",
                                                                    function () {
                                                                      // end!!!
                                                                      if (
                                                                        !reco
                                                                          .state
                                                                          .error
                                                                      ) {
                                                                        reco.succeeded();
                                                                        console.log();
                                                                        console.log(
                                                                          "run 'cd " +
                                                                            rootDir +
                                                                            "'"
                                                                        );
                                                                      }
                                                                    }
                                                                  );
                                                              }
                                                            );
                                                        }
                                                      );
                                                    }
                                                  );
                                                  ncp.limit = 9999999999999999999;
                                                }
                                              }
                                            );
                                          });
                                      };

                                      if (withTemplate) {
                                        reco.state.child_process
                                          .exec(
                                            "cordova plugin add cordova-plugin-local-notification",
                                            {
                                              cwd: "./" + rootDir + "/cordova",
                                            },
                                            function (error, stdout, stderr) {
                                              if (error) {
                                                reco.setState({ error: true });
                                                console.error(
                                                  "reco-cli-init-cordova--(cordova platform ls) ERROR :" +
                                                    error
                                                );
                                                return;
                                              }
                                              console.log(stdout);
                                            }
                                          )
                                          .on("data", (data) => {
                                            // console.log(data.toString());
                                          })
                                          .on("close", function () {
                                            cordovaEnd();
                                          });
                                      } else {
                                        cordovaEnd();
                                      }
                                    });
                                });
                            });
                        });
                  

                  //--
                }
              });
            })
            .catch((error) => {
              officeService("error", "init", error);
              reco.setState({ error: true });
              console.error(
                "reco-cli-init=> ERROR: ERROR: !important error, add reco scripts to package.json. on read",
                error
              );
            });
        });
    });
};

module.exports = init;
