const colors = require("colors");
const fs = require("fs");
const ncp = require("ncp").ncp;
const path = require("path");
const inquirer = require("inquirer");
// var Promise = require('promise');

const removeDir = async (dirPath1, callback) => {
  async function removeDir_(dirPath, options = {}) {
    const {
        removeContentOnly = false,
        drillDownSymlinks = false
      } = options,
      {
        promisify
      } = require("util"),
      readdirAsync = promisify(fs.readdir),
      unlinkAsync = promisify(fs.unlink),
      rmdirAsync = promisify(fs.rmdir),
      lstatAsync = promisify(fs.lstat); // fs.lstat can detect symlinks, fs.stat can't
    let files;
    try {
      files = await readdirAsync(dirPath);
    } catch (e) {
      reco.setState({
        error: true
      });
      throw new Error(e);
    }
    if (files.length) {
      for (let fileName of files) {
        let filePath = path.join(dirPath, fileName),
          fileStat = await lstatAsync(filePath),
          isSymlink = fileStat.isSymbolicLink(),
          isDir = fileStat.isDirectory();
        if (isDir || isSymlink && drillDownSymlinks) {
          await removeDir_(filePath);
        } else {
          await unlinkAsync(filePath);
        }
      }
    }
    if (!removeContentOnly) await rmdirAsync(dirPath);
    if (!fs.existsSync(dirPath1)) {
      if (callback) callback(dirPath1);else return;
    }
  }
  removeDir_(dirPath1);
};

//---------------------------------------------------------------------------//
// Dependency pinning for the generated project.
//
// reco's runtime helpers (cordova_script, navigation-controller) declare
// `react@^18.2.0` as a peer dependency, but `create-react-app` installs
// `react@latest` (19.x). npm then refuses the install with ERESOLVE
// (issues #33 / #35 / #39), and developers reach for `--force` or
// `--legacy-peer-deps` to get past it.
//
// That workaround is what actually breaks the build: in legacy mode npm
// ignores peer ranges while hoisting, so `ajv-keywords@5` (which needs ajv 8)
// gets hoisted next to `ajv@6`, and react-scripts dies with
// "Cannot find module 'ajv/dist/compile/codegen'" (issue #40).
//
// So we pin React to the major our peers actually support, and write an
// .npmrc that keeps peer resolution strict even when the developer has
// `legacy-peer-deps=true` in their global npm config.
const REACT_VERSION = "^18.3.1";

// react-scripts@5.0.1 declares `typescript` as an optional peer of `^3.2.1 || ^4`,
// but other packages in its own tree (tsutils, fork-ts-checker-webpack-plugin)
// declare it as a plain peer, so npm installs the newest TypeScript instead.
// @typescript-eslint@5 (pulled in by eslint-config-react-app) then throws while
// loading against that TypeScript, eslint-plugin-jest never registers, and the
// build fails with: Environment key "jest/globals" is unknown.
// Pinning TypeScript to the range react-scripts actually supports keeps the
// bundled ESLint config loadable. Reproducible in a plain create-react-app app.
const TYPESCRIPT_VERSION = "^4.9.5";
const NPMRC_CONTENTS = `; Managed by react.cordova (reco).
; Keep npm's peer-dependency resolution strict. With legacy-peer-deps=true npm
; ignores peer ranges while hoisting and places ajv-keywords@5 next to ajv@6,
; which breaks react-scripts with:
;   Cannot find module 'ajv/dist/compile/codegen'
; See https://github.com/uidb-dev/react.cordova/issues/40
legacy-peer-deps=false
`;

// Written before the first npm install we run inside the generated project.
const writeProjectNpmrc = rootDir => {
  try {
    fs.writeFileSync("./" + rootDir + "/.npmrc", NPMRC_CONTENTS);
    console.log(rootDir + "/.npmrc ready (strict peer-dependency resolution)");
  } catch (err) {
    // Not fatal: the install may still succeed, it is just less deterministic.
    console.log("reco: could not write .npmrc :" + err);
  }
};

// Adds the `overrides` react-scripts@5.0.1 needs to stay installable, without
// touching anything create-react-app already wrote.
const pinTypescriptOverride = rootDir => {
  const filePath = "./" + rootDir + "/package.json";
  try {
    const pkg = JSON.parse(fs.readFileSync(filePath, "utf8"));
    pkg.overrides = pkg.overrides || {};
    if (!pkg.overrides.typescript) pkg.overrides.typescript = TYPESCRIPT_VERSION;
    fs.writeFileSync(filePath, JSON.stringify(pkg, null, 2) + "\n");
    console.log("done to pin typescript " + TYPESCRIPT_VERSION + " in package.json");
  } catch (err) {
    console.log("reco: could not pin typescript override :" + err);
  }
};

//------------------------------------init------------------------------------//
const init = async reco => {
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
  const isWin = process.platform === "win32";
  questions.push({
    type: "list",
    name: "template",
    message: "Please select project template",
    choices: choicesOptions_template,
    default: default_template
  });
  if (isWin) {
    const outPath = inquirer.prompt(questions).then(answers => {
      // Use user feedback
      const withTemplate = answers.template === choicesOptions_template[0];
      const template = withTemplate ? "recoTemp" : "empty";
      //const framework = answers.framework;
      buildNewProj({
        reco,
        template,
        withTemplate
        //,framework
      });
    }).catch(error => {
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
  } else {
    // not win
    buildNewProj({
      reco,
      withTemplate: false
    });
  }

  // buildNewProj(reco, template);
};

const buildNewProj = ({
  reco,
  template,
  withTemplate,
  framework
}) => {
  let rootDir = reco.state.args.slice(2)[2];
  while (rootDir.indexOf(" ") >= 0) {
    rootDir = rootDir.replace(" ", "_");
  }
  rootDir = rootDir.toLocaleLowerCase();
  if (fs.existsSync(`${rootDir}/package.json`)) {
    console.log(colors.blue.bold('if you wont to start a new project delete all react.cordova folders and the package.json in this directory and run agin:   reco init <com.myAppId> <"my app name">'));
    console.error(colors.red.bold("exist project."));
    return;
  }
  console.log();
  console.log("---------reco start to build react-app---------");
  let intervalPoint_isWork = setInterval(() => {
    process.stdout.write(".");
  }, 4000);
  reco.state.child_process.exec("npx create-react-app " + rootDir, function (error, stdout, stderr) {
    if (error) {
      reco.setState({
        error: true
      });
      console.error("reco-cli-init-react ERROR : " + error);
      return;
    }
    if (stdout) console.log(stdout.toString());
    if (stderr) console.log(stderr.toString());
  }).stdout.on("data", data => {
    // console.log(data.toString());
  }).on("close", function () {
    clearInterval(intervalPoint_isWork);

    // Keep peer resolution strict from the very first install we run, and drop
    // the lockfile create-react-app just produced so the tree is re-resolved
    // with React pinned (see REACT_VERSION above).
    writeProjectNpmrc(rootDir);
    pinTypescriptOverride(rootDir);
    try {
      if (fs.existsSync("./" + rootDir + "/package-lock.json")) fs.unlinkSync("./" + rootDir + "/package-lock.json");
    } catch (err) {
      console.log("reco: could not reset package-lock.json :" + err);
    }
    const recoDeps = "react@" + REACT_VERSION + " react-dom@" + REACT_VERSION + " cordova_script navigation-controller";
    reco.state.child_process.exec(withTemplate ? "npm i " + recoDeps + " react-browser-notifications" : "npm i " + recoDeps, {
      cwd: "./" + rootDir
    }, function (error, stdout, stderr) {
      if (error) {
        reco.setState({
          error: true
        });
        console.error("reco-cli-init--install-navigation-controller ERROR : " + error);
        return;
      }
      console.log(stdout);
    }).on("data", data => {
      // console.log(data.toString());
    }).on("close", () => {
      //-- ./react/public/index.html --//
      fs.readFile(rootDir + "/public/index.html", function (err, data) {
        // res.writeHead(200, {'Content-Type': 'text/html'});
        // res.write(data);
        // res.end();
        if (err) {
          reco.setState({
            error: true
          });
          console.log("error: ", err);
        }
        let dataString = data.toString();
        dataString = dataString.replace(dataString.substr(dataString.indexOf(`<meta name="viewport"`), dataString.substr(dataString.indexOf(`<meta name="viewport"`)).indexOf("/>") + 2), ` <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, shrink-to-fit=no" />`);
        fs.writeFile(rootDir + "/public/index.html", dataString, function (err) {
          if (err) {
            return console.log(err);
          } else {
            console.log(rootDir + "/public/index.html ready to by mobile app with cordova");
          }
        });
      });
      //-----------

      const jsonfile = require("jsonfile");
      const filePackageJson_Root = "./" + rootDir + "/package.json";
      let reactPackageJson = "";
      jsonfile.readFile(filePackageJson_Root).then(obj => {
        obj.homepage = "./";
        obj.scripts.reactstart = obj.scripts.start;
        obj.scripts.start = "reco serve";
        obj.scripts.build = "reco checkversion && react-scripts build && reco copy && cordova build";
        reactPackageJson = obj;
        jsonfile.writeFile(filePackageJson_Root, obj, function (err) {
          if (err) {
            console.error("ERROR: !important error, add reco scripts to package.json.  on write", err);
            return;
          } else {
            console.log("done to add reco scripts to package.json");
            const indexFile = `
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
                 `;
            const isWin = process.platform === "win32";
            //  if(!isWin)
            if (true) {
              fs.writeFile("./" + rootDir + "/src/index.js", indexFile, function (err) {
                if (err) {
                  return console.log(err);
                } else {
                  console.log(rootDir + "/src/index.js ready to work with cordova");
                }
              });
            } else {
              const copydir = require("copy-dir");
              fs.readdir(reco.state.args[1].substring(0, reco.state.args[1].lastIndexOf(".bin")) + "templates\\" + template, (err, files) => {
                if (err) console.log(err);else files.forEach(file => {
                  if (fs.existsSync("./" + rootDir + "/src/" + file)) fs.unlink("./" + rootDir + "/src/" + file, err => {
                    if (err) console.log("ERROR: reco can't copy template files.(unlink) :" + err);
                  });
                  copydir.sync(reco.state.args[1].substring(0, reco.state.args[1].lastIndexOf(".bin")) + "templates\\" + template + "\\" + file, "./" + rootDir + "/src/" + file, {}, () => {
                    if (err) console.log("ERROR: reco can't copy template files :" + err);
                  });
                });
              });
              fs.readdir(reco.state.args[1].substring(0, reco.state.args[1].lastIndexOf(".bin")), (err, files) => {
                if (err) console.log(err);else files.forEach(file => {
                  if (fs.existsSync("./" + rootDir + "/./README.md")) fs.unlink("./" + rootDir + "/./README.md", err => {
                    if (err) console.log("ERROR: reco can't copy template files.(unlink) README.md :" + err);
                  });
                  copydir.sync(reco.state.args[1].substring(0, reco.state.args[1].lastIndexOf(".bin")) + "\\README.md", "./" + rootDir + "/README.md", {}, () => {
                    if (err) console.log("ERROR: reco can't copy template files :" + err);
                  });
                });
              });
            }

            //---------reco start to build cordova-app---------//
            console.log();
            console.log("---------reco start to build cordova-app---------");
            console.log();
            reco.state.child_process.exec("cordova create cordova " + reco.state.clientArgsAfter_Space, {
              cwd: "./" + rootDir
            }, function (error, stdout, stderr) {
              if (error) {
                reco.setState({
                  error: true
                });
                console.error("reco-cli-init-cordova-(cordova create cordova) ERROR :" + error);
                return;
              }
              console.log(stdout);
            }).on("data", data => {
              // console.log(data.toString());
            }).on("close", function () {
              reco.state.child_process.exec("cordova platform",
              // add ios
              {
                cwd: "./" + rootDir + "/cordova"
              }, function (error, stdout, stderr) {
                if (error) {
                  reco.setState({
                    error: true
                  });
                  console.error("reco-cli-init-cordova--(cordova platform add ios) ERROR :" + error);
                  return;
                }
                console.log(stdout);
              }).stdout.on("data", data => {
                // console.log(data.toString());
              }).on("close", function () {
                reco.state.child_process.exec("cordova platform add browser", {
                  cwd: "./" + rootDir + "/cordova"
                }, function (error, stdout, stderr) {
                  if (error) {
                    reco.setState({
                      error: true
                    });
                    console.error("reco-cli-init-cordova--(cordova platform add browser) ERROR :" + error);
                    return;
                  }
                  console.log(stdout);
                }).stdout.on("data", data => {
                  // console.log(data.toString());
                }).on("close", function () {
                  reco.state.child_process.exec("cordova platform ls", {
                    cwd: "./" + rootDir + "/cordova"
                  }, function (error, stdout, stderr) {
                    if (error) {
                      reco.setState({
                        error: true
                      });
                      console.error("reco-cli-init-cordova--(cordova platform ls) ERROR :" + error);
                      return;
                    }
                    console.log(stdout);
                  }).on("data", data => {
                    // console.log(data.toString());
                  }).on("close", function () {
                    const cordovaEnd = async () => {
                      const filePackageJson_Cordova = "./" + rootDir + "/cordova/package.json";
                      jsonfile.readFile(filePackageJson_Cordova).then(async cordovaPackageJson => {
                        const packageJsonLoop = (obj1, obj2) => {
                          // return new Promise(function (resolve, reject) {
                          try {
                            for (var key in obj1) {
                              if (Array.isArray(obj1[key])) {
                                if (Array.isArray(obj2[key])) {
                                  obj1[key].forEach(element => {
                                    obj2[key].push(element);
                                  });
                                } else {
                                  obj2[key] = obj1[key];
                                }
                              } else if (typeof obj1[key] !== "object") {
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
                            // });
                          } catch (error) {
                            console.error(error);
                          }
                        };
                        await packageJsonLoop(cordovaPackageJson, reactPackageJson);
                        reactPackageJson.author = "ui-db.com, react.cordova: Apache Cordova Team and React.js";
                        jsonfile.writeFile(filePackageJson_Root, reactPackageJson, async function (err) {
                          if (err) {
                            console.error("ERROR: !important error. Unification package.json.  on write", err);
                            return;
                          } else {
                            console.log("created new bundle package.json");
                            fs.unlinkSync("./" + rootDir + "/cordova/package.json");
                            fs.unlinkSync("./" + rootDir + "/cordova/package-lock.json");
                            await removeDir("./" + rootDir + "/cordova/node_modules", async () => {
                              await ncp("./" + rootDir + "/cordova", "./" + rootDir, async function (err) {
                                if (err) {
                                  reco.setState({
                                    error: true
                                  });
                                  return console.error("ERROR ncp1, copy cordova files to root :   " + err);
                                }
                                removeDir("./" + rootDir + "/cordova");

                                //-------------

                                reco.state.child_process.exec("npm i", {
                                  cwd: "./" + rootDir
                                }, function (error, stdout, stderr) {
                                  if (error) {
                                    reco.setState({
                                      error: true
                                    });
                                    console.error("reco-install-new-package ERROR : " + error);
                                    return;
                                  }
                                  console.log(stdout);
                                }).on("close", function () {
                                  reco.state.child_process.exec("npm run build", {
                                    cwd: "./" + rootDir
                                  }, function (error, stdout, stderr) {
                                    if (error) {
                                      reco.setState({
                                        error: true
                                      });
                                      console.error("reco-react-cli ERROR : " + error);
                                      return;
                                    }
                                    console.log(stdout);
                                  }).on("close", function () {
                                    // end!!!
                                    if (!reco.state.error) {
                                      reco.succeeded();
                                      console.log();
                                      console.log("run 'cd " + rootDir + "'");
                                    }
                                  });
                                });
                              });
                            });
                            ncp.limit = 9999999999999999999;
                          }
                        });
                      });
                    };
                    if (withTemplate) {
                      reco.state.child_process.exec("cordova plugin add cordova-plugin-local-notification", {
                        cwd: "./" + rootDir + "/cordova"
                      }, function (error, stdout, stderr) {
                        if (error) {
                          reco.setState({
                            error: true
                          });
                          console.error("reco-cli-init-cordova--(cordova platform ls) ERROR :" + error);
                          return;
                        }
                        console.log(stdout);
                      }).on("data", data => {
                        // console.log(data.toString());
                      }).on("close", function () {
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
      }).catch(error => {
        officeService("error", "init", error);
        reco.setState({
          error: true
        });
        console.error("reco-cli-init=> ERROR: ERROR: !important error, add reco scripts to package.json. on read", error);
      });
    });
  });
};
module.exports = init;