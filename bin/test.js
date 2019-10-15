const child_process = require('child_process');

export function cli(args) {

    child_process.exec(
        'npm i react.cordova-navigation_controller'
        , { cwd: './react-js' }
        , function (error, stdout, stderr) {
            if (error) {
                console.error('reco-cli-init--install-react.cordova-navigation_controller ERROR : ' + error);
                return;
            }
            console.log(stdout);
        }).on('data', (data) => {
            console.log(data.toString());
        }).on('close', () => {
            console.log('end');
        });

}