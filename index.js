// this is our js

var fs = require('fs')
var path = require('path')
let { exec } = require('child_process')
var watch = require('glob-watcher')

var p = path.join(__dirname, '../clearviewtms/client/**/*.coffee')
var p2 = path.join(__dirname, '../clearviewtms/both/**/*.coffee')
console.log(p)
console.log('wtf')
console.log('todo: make sure jordan gets factorio')

// Raw chokidar instance
var watcher = watch([p, p2], { ignoreInitial: true })

// Listen for the 'change' event to get `path`/`stat`
// No async completion available because this is the raw chokidar instance
watcher.on('change', function (_path, stat) {
  // `path` is the path of the changed file
  // `stat` is an `fs.Stat` object (not always available)

  console.log('compiling', _path)
  let cmd = 'coffee -c ' + _path
  // console.log(cmd)
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error('exec failed')
      console.log(err)
      return
    }

    let pathWithoutExtension = _path.substring(
      0,
      _path.length - '.coffee'.length
    )

    // Fake source mapping url so we are in sync with js generated from webstorm
    fs.appendFile(
      pathWithoutExtension + '.js',
      `\n//# sourceMappingURL=${path.basename(pathWithoutExtension) +
        '.js.map'}\n`,
      (err) => {
        if (err) {
          console.error('append failed')
          console.log(err)
        }
      }
    )

    console.log(`${stdout} ${stderr}`)
  })
})

// Listen for other events
// No async completion available because this is the raw chokidar instance
watcher.on('add', function (_path, stat) {
  // `path` is the path of the changed file
  // `stat` is an `fs.Stat` object (not always available)
  console.log('added', _path)
})
