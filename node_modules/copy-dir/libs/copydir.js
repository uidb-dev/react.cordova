var fs = require('fs');
var path = require('path');
/*
  options: {
    utimes: false,  // Boolean | Object, keep utimes if true
    mode: false,    // Boolean | Number, keep file mode if true
    cover: true,    // Boolean, cover if file exists
    filter: true,   // Boolean | Function, file filter
  }
*/
function copydir(from, to, options, callback) {
  if (typeof options === 'function') {
    if(!callback) {
      callback = options;
      options = {
        filter: function() { return true; }
      };
    } else {
      options = {
        filter: options
      };
    }
  }
  if(typeof callback !== 'function') {
    callback = function() {};
  }
  if(typeof options.cover === 'undefined') {
    options.cover = true;
  }
  options.filter = typeof options.filter === 'function' ? options.filter : function(state, filepath, filename) {
    return options.filter;
  };
  fs.lstat(from, function(err, stats) {
    if (err) {
      callback(err);
    } else {
      var statsname = stats.isDirectory() ? 'directory' :
        stats.isFile() ? 'file' :
        stats.isSymbolicLink() ? 'symbolicLink' :
        '';
      var valid = options.filter(statsname, from, path.dirname(from), path.basename(from));
      if (statsname === 'directory' || statsname === 'symbolicLink') {
        // Directory or SymbolicLink
        if(valid) {
          fs.stat(to, function(err) {
            if(err) {
              if(err.code === 'ENOENT') {
                fs.mkdir(to, function(err) {
                  if(err) {
                    callback(err);
                  } else {
                    options.debug && console.log('>> ' + to);
                    rewrite(to, options, stats, function(err) {
                      if(err) {
                        callback(err);
                      } else {
                        listDirectory(from, to, options, callback);
                      }
                    });
                  }
                });
              } else {
                callback(err);
              }
            } else {
              rewrite(to, options, stats, function(err) {
                if(err) {
                  callback(err);
                } else {
                  listDirectory(from, to, options, callback);
                }
              });
            }
          });
        } else {
          callback();
        }
      } else if(stats.isFile()) {
        // File
        if(valid) {
          if(options.cover) {
            writeFile(from, to, options, stats, callback);
          } else {
            fs.stat(to, function(err) {
              if(err) {
                if(err.code === 'ENOENT') {
                  writeFile(from, to, options, stats, callback);
                } else {
                  callback(err);
                }
              } else {
                callback();
              }
            });
          }
        } else {
          callback();
        }
      } else {
        callback(new Error('stats invalid: '+ from));
      }
    }
  });
}

function listDirectory(from, to, options, callback) {
  fs.readdir(from, function(err, files) {
    if(err) {
      callback(err);
    } else {
      copyFromArray(files, from, to, options, callback);
    }
  });
}

function copyFromArray(files, from, to, options, callback) {
  if(files.length === 0) {
    callback(null);
  } else {
    var f = files.shift();
    copydir(path.join(from, f), path.join(to, f), options, function(err) {
      if(err) {
        callback(err);
      } else {
        copyFromArray(files, from, to, options, callback);
      }
    });
  }
}

function chmod(f, mode, callback) {
  if(mode) {
    fs.chmod(f, mode, callback);
  } else {
    callback();
  }
}

function utimes(f, mode, callback) {
  if(mode) {
    fs.utimes(f, mode.atime, mode.mtime, callback);
  } else {
    callback();
  }
}

function writeFile(from, to, options, stats, callback) {
  fs.readFile(from, 'binary', function(err, data) {
    if(err) {
      callback(err);
    } else {
      fs.writeFile(to, data, 'binary', function(err) {
        if(err) {
          callback(err);
        } else {
          options.debug && console.log('>> ' + to);
          rewrite(to, options, stats, callback);
        }
      });
    }
  });
}

function rewrite(f, options, stats, callback) {
  if(options.cover) {
    chmod(f, options.mode === true ? stats.mode : options.mode, function(err) {
      if(err) {
        callback(err);
      } else {
        utimes(f, options.utimes === true ? {
          atime: stats.atime,
          mtime: stats.mtime
        } : options.utimes, callback);
      }
    });
  } else {
    callback();
  }
}

module.exports = copydir;