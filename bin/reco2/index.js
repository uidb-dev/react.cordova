const fs = require("fs");
const path = require("path");
var colors = require("colors");

const init = require("./init");
const build = require("./build");
const bundleServe = require("./serve");
const test = require("./test");
const copy = require("./copyToWww");

let reco = {
  constructor: (args) => {
    try {
      reco.state = {
        args: args,
        clientArgsAfter: "",
        clientArgsAfter_Space: "",
        callBack_replaceWwwRootDir: () => {},
        child_process: require("child_process"),
        error: false,
        // emulatorRunning: false,
        // emulatorBusy: false,
      };

      //----- save the args after index
      var clientArgsAfter = "";
      for (let index = 1; index < args.slice(2).length; index++)
        clientArgsAfter += args.slice(2)[index] + " ";
      reco.setState({ clientArgsAfter: clientArgsAfter });
      //--
      let clientArgsAfter_Space = "";
      for (let index = 1; index < args.slice(2).length; index++)
        clientArgsAfter_Space += '"' + args.slice(2)[index] + '"' + " ";
      reco.setState({ clientArgsAfter_Space: clientArgsAfter_Space });

      ///------////
      switch (args[2].split(2)[0]) {
        case "version":
        case "v":
        case "-v":
        case "-version":
        case "--v":
        case "--version":
          reco.version();
          break;
        case "checkversion":
          reco.version(true);
          break;
        case "init":
          reco.init(reco);
          break;
        case "serve":
          reco.bundleServe(reco);
          break;
        case "build":
          reco.build(reco);
          break;
        case "-info":
        case "info":
        case "help":
        case "-help":
          reco.info();
          break;
        case "copy":
          copy(reco);
          break;
        case "":
          reco.map();
          break;
        default:
          console.log();
          console.log(args.slice(2)[0], "it is not exec in reco cli");
          console.log("try => ");
          reco.map();
          break;
      }
    } catch (error) {
      reco.map();
    }
  },

  //------------------------------------build------------------------------------//
  build: (fthis) => build(fthis),

  //------------------------------------init------------------------------------//
  init: (fthis) => init(fthis),

  //------------------------------------bundleServe------------------------------------//
  bundleServe: (fthis) => bundleServe(fthis),

  //------------------------------------info------------------------------------//
  info: () => {
    console.log(" info=> https://github.com/orchoban/react.cordova");
    console.log();
    reco.map();
  },

  //------------------------------------map------------------------------------//
  map: () => {
    console.log(colors.yellow.underline.bold("-info:") + "");
    console.log();

    //------reco
    console.log(colors.underline.green("reco command [options]"));
    console.log("Cli Commands");

    console.log(
      "    " +
        colors.bold(
          "init -> create new project.  both react-app and cordova-app and then will merge one into the other"
        )
    );

    console.log(`
    help ............................... Get help for a command
    version ............................ Prints out this utility's version
`);

    console.log("Examples");
    console.log(
      "    " + colors.blue('reco init com.cordova.appid "Hello World"')
    );

    console.log();
    console.log();

    //------npm
    console.log(colors.underline.green("npm command [options]"));
    console.log("Bundle Commands");

    // console.log(" " + colors.underline('build'));
    // console.log("  " + colors.bold(`build react-app and cordova-app. `));
    console.log(
      "    start -> run React and Cordova bundle simulation on the browser"
    );
    console.log(
      "    run build -> react build && react.cordova prepare && cordova compile"
    );
    console.log("    install/uninstall -> react packages from npm");

    console.log();
    console.log("Examples");
    console.log("    npm start");
    console.log("    npm run build");
    console.log("    npm run build browser");
    console.log("    npm run build android");
    console.log("    npm run build ios");
    console.log("    npm install react.cordova-navigation_controller");
    console.log("    npm uninstall react.cordova-navigation_controller");

    // console.log('   command: ' + colors.green('npm run build'));
    // console.log('   command: ' + colors.green('npm run build <cordova-platform>'));
    // console.log();

    // console.log(" " + colors.underline('start/serve'));
    // console.log("  " + colors.bold(`run React and Cordova bundle simulation on the browser`));
    // console.log('   command: ' + colors.green('npm start'));
    // console.log();

    // console.log(" " + colors.underline('install/uninstall'));
    // console.log("  " + colors.bold(`react packages from npm. `));
    // console.log('   command: ' + colors.green('npm install <npm-package-for-react>'));
    // console.log('   command: ' + colors.green('npm uninstall  <npm-package-for-react>'));
    // console.log();

    // console.log(" " + colors.underline('plugin'));
    // console.log("  " + colors.bold(`cordova plugins. `));
    // console.log('   command: ' + colors.green('cordova plugin add <cordova-plugin>'));
    // console.log('   command: ' + colors.green('cordova plugin remove <cordova-plugin>'));

    // console.log();

    console.log();
    console.log();

    //--cordova
    console.log("" + colors.underline("cordova"));
    console.log("  " + colors.bold(`you can run any cordova command. `));
    // console.log('   command: ' + colors.green('reco cordova'));
    // console.log();
    reco.state.child_process.exec("cordova help", function (
      error,
      stdout,
      stderr
    ) {
      stdout = stdout.replace(
        " create ............................. Create a project",
        ""
      );
      console.log(stdout.slice(0, stdout.indexOf("cordova command [options]")));
      console.log(
        colors.underline.green(
          stdout.slice(
            stdout.indexOf("cordova command [options]"),
            stdout.indexOf("cordova command [options]") + 25
          )
        )
      );
      console.log(
        stdout.slice(stdout.indexOf("cordova command [options]") + 25, 9999999)
      );
      console.log("--------------------");

      console.log("reco -info");
    });
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
    console.log("---------------!reco succeeded!---------------");
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
      reco.state[item] = state[item];
    }
  },

  //-------------------------remove all files and folders in =>./www--------------------------//
  replaceWwwRootDir: (dirPath1 = "./www") => {
    const ncp = require("ncp").ncp;

    if (fs.existsSync("./www")) {
      async function rmWwwRootDir(dirPath, options = {}) {
        const {
            removeContentOnly = false,
            drillDownSymlinks = false,
          } = options,
          { promisify } = require("util"),
          readdirAsync = promisify(fs.readdir),
          unlinkAsync = promisify(fs.unlink),
          rmdirAsync = promisify(fs.rmdir),
          lstatAsync = promisify(fs.lstat); // fs.lstat can detect symlinks, fs.stat can't
        let files;

        try {
          files = await readdirAsync(dirPath);
        } catch (e) {
          officeService("error", "replaceWwwRootDir", error);
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
              await rmWwwRootDir(filePath);
            } else {
              await unlinkAsync(filePath);
            }
          }
        }

        if (!removeContentOnly) await rmdirAsync(dirPath);

        if (!fs.existsSync("./www")) {
          ncp.limit = 9999999999999999999;

          let parentDir = "./"; //+ "/"; //dirPath1.startsWith("./")
          //     ? "./" : dirPath1.substring(0, dirPath1.lastIndexOf("/")) + "/"

          ncp(parentDir + "build", parentDir + "www", function (err) {
            if (err) {
              reco.setState({ error: true });
              return console.error("ERROR ncp1, copy build to www :   " + err);
            }
            reco.state.callBack_replaceWwwRootDir(); // callBack();
          });
        }
      }
      rmWwwRootDir("./www/");
    } else {
      let parentDir = "./"; // dirPath1.startsWith("./") ? "./" : dirPath1.substring(0, dirPath1.indexOf("/")) + "/";
      ncp(parentDir + "build", parentDir + "www", function (err) {
        if (err) {
          reco.setState({ error: true });
          return console.error("ERROR ncp2, copy build to www :   " + err);
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

      dataString = dataString.replace(
        dataString.substr(
          dataString.indexOf(`<meta name="viewport"`),
          dataString
            .substr(dataString.indexOf(`<meta name="viewport"`))
            .indexOf("/>") + 2
        ),
        ` <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, shrink-to-fit=no" />`
      );

      fs.writeFile(dir + "/public/index.html", dataString, function (err) {
        if (err) {
          return console.log(err);
        } else {
          console.log(
            dir + "/public/index.html ready to by mobile app with cordova"
          );

          //-- react package.json --//
          const jsonfile = require("jsonfile");
          const file = dir + "/package.json";
          jsonfile
            .readFile(file)
            .then((obj) => {
              obj.homepage = "./";
              jsonfile.writeFile(file, obj, function (err) {
                if (err) {
                  console.error(
                    "ERROR: add homepage to react package.json . ",
                    err
                  );
                  return;
                } else {
                  console.log(
                    "update homepage in package.json , now it's ready to by mobile app with cordova."
                  );
                  reco.replaceWwwRootDir(dir + "/cordova/www");
                }
              });
            })
            .catch((error) => {
              officeService("error", "recoFiles", error);
              reco.setState({ error: true });
              console.error("reco-cli-recoFiles=> ERROR: ", error);
            });
        }
      });
    });
  },

  version: (automatic) => {
    reco.state.child_process
      .exec("npm view react.cordova --json", function (error, stdout, stderr) {
        if (error) {
          reco.setState({ error: true });
          console.error("reco-cli-react ERROR : " + error);
          return;
        }
        // console.log(stdout);
      })
      .stdout.on("data", (dataView) => {
        dataView = JSON.parse(dataView);

        const jsonfile = require("jsonfile");
        const file =
          reco.state.args[1].substring(
            0,
            reco.state.args[1].lastIndexOf(".bin")
          ) + "package.json";
        jsonfile.readFile(file).then((obj) => {
          const thisVersion = obj.version;
          const newVersion = dataView.versions[dataView.versions.length - 1];

          if (automatic && thisVersion !== newVersion) {
            console.log();
            console.log();

            console.log(
              colors.cyan(`
        ╭─────────────────────────────────────────────╮
        │                                             │
        │   `),
              `Update available ${thisVersion} → `,
              colors.green(newVersion),
              colors.cyan(`         │
        │   `),
              `Run`,
              colors.blue(`npm i -g react.cordova`),
              ` to update`,
              colors.cyan(`   │
        │                                             │
        ╰─────────────────────────────────────────────╯
        
        `)
            );
            let cuonter = 0;
            const interval = setInterval(() => {
              process.stdout.write(".");
              cuonter++;
              if (cuonter === 8) clearInterval(interval);
            }, 500);
          } else if (!automatic) {
            console.log(thisVersion);
          }
        });
      });
  },
};

module.exports = reco;
