var spawn = require('child_process').spawn
var os = require('os')

module.exports = function gitRemotes(dir, cb) {
  if (typeof dir === 'function') {
    cb = dir
    dir = process.cwd()
  }

  var gitRemote = spawn('git', ['remote', '-v'], { cwd: dir })
  var remotes = []

  gitRemote.stdout
    .on('data', function (data) {
      if (!data) return

      remotes = data.toString().split(os.EOL)
        .filter(function (remote) {
          return remote.match('(fetch)')
        })
        .map(function (remote) {
          var parts = remote.split('\t')
          if (parts.length < 2) return
          
          return {
            name: parts[0],
            url: parts[1].replace('(fetch)', '').trim()
          }
        })
    })
    .on('error', function returnError(err) {
      cb(err)
    })
    .on('end', function returnRemotesArray() {
      cb(null, remotes)
    })
}
