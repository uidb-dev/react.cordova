const fs = require("fs");
const path = require("path");
//import path from "path";



let reco = {

    constructor: (args) => {

        reco.state = {
            args: args,
            clientArgsAfter: "",
            callBack_replaceWwwRootDir: () => { },
            child_process: require('child_process'),
        }

        //----- save the args after index 
        var clientArgsAfter = "";
        for (let index = 0; index < args.slice(2).length; index++)
            clientArgsAfter += (args.slice(2)[index] + " ");
        reco.setState({ clientArgsAfter: clientArgsAfter });

        ///------////

                reco.react();

        

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

    //-------------------------remove all files and folders in =>./cordova/www--------------------------//
    replaceWwwRootDir:
        async (dirPath = './cordova/www', options = {}) => {
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
                    reco.state.callBack_replaceWwwRootDir(); // callBack();
                });
            }

        },


    //------------------------------------recoFiles------------------------------------//
    recoFiles: (callBack = () => console.log("reco!!!")) => {



        //-- ./react/public/index.html --//
        fs.readFile('./react/public/index.html', function (err, data) {
            // res.writeHead(200, {'Content-Type': 'text/html'});
            // res.write(data);
            // res.end();
            if (err) console.log("error: ", err);

            const dataString = data.toString().replace("<head>",
                `<head> 
            <script type="text/javascript" src="./cordova.js"></script>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, shrink-to-fit=no">
            <meta name="viewport" content="user-scalable=no, initial-scale=1,
                  maximum-scale=1, minimum-scale=1, target-densitydpi=device-dpi" />
            `)
            fs.writeFile("./react/public/index.html", dataString, function (err) {
                if (err) {
                    return console.log(err);
                } else {
                    console.log("./react/public/index.html ready to by mobile app with cordova");

                    //-- react package.json --//
                    const jsonfile = require('jsonfile');
                    const file = './react/package.json';
                    jsonfile.readFile(file)
                        .then(obj => {

                            obj.homepage = "./";
                            jsonfile.writeFile(file, obj, function (err) {
                                if (err) {
                                    console.error("ERROR: add homepage to react package.json . ", err);
                                    return;
                                } else {
                                    console.log("updete homepage in react package.json , now it's ready to by mobile app with cordova.");
                                    callBack();
                                }
                            })
                        })
                        .catch(error => console.error("reco-cli-recoFiles=> ERROR: ", error))
                }
            });
        });

    },



}






export function cli(args) {


        if ((fs.existsSync("./cordova") && fs.existsSync("./react")) || args.slice(2)[0] === "init") {
            reco.constructor(args);
        }
}