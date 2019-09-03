const fs = require('fs');

export function cli(args) {

    const dir = ".";
    const template = "recoTemp";


    const copydir=require("copy-dir");

    fs.readdir(args[1].substring(0, args[1].lastIndexOf(".bin")) + "templates\\" + template, (err, files) => {
        if (err) console.log(err);
        else files.forEach(file => {
            if (fs.existsSync(dir + "/react-js/src/" + file))
                fs.unlink(dir + "/react-js/src/" + file, (err) => {
                    if (err) console.log("ERROR: reco can't copy template files.(unlink) :" + err);
                });
                copydir.sync(args[1].substring(0, args[1].lastIndexOf(".bin")) + "templates\\" + template + "\\" + file, dir + "/react-js/src/" + file,{}, () => {
                if (err) console.log("ERROR: reco can't copy template files :" + err);
            });
        });
    });


}