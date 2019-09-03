var copydir = require('./libs/copydir');
var copydirSync = require('./libs/copydirSync');

copydir.sync = copydirSync;

module.exports = copydir;
