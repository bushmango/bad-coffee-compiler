// this is our js

var path = require('path')
let { exec } = require('child_process')
var watch = require('glob-watcher')

var p = path.join(__dirname, '../clearviewtms/client/**/*.coffee')
var p2 = path.join(__dirname, '../clearviewtms/both/**/*.coffee')
console.log(p)
console.log('wtf')

// Raw chokidar instance
var watcher = watch([p, p2], { ignoreInitial: true })

// Listen for the 'change' event to get `path`/`stat`
// No async completion available because this is the raw chokidar instance
watcher.on('change', function (path, stat) {
  // `path` is the path of the changed file
  // `stat` is an `fs.Stat` object (not always available)

  console.log('changed', path)
  let cmd = 'coffee -c ' + path
  console.log(cmd)
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.log('exec failed')
      return
    }
    console.log(`stdout: ${stdout}`)
    console.log(`stderr: ${stderr}`)
  })
})

// Listen for other events
// No async completion available because this is the raw chokidar instance
watcher.on('add', function (path, stat) {
  // `path` is the path of the changed file
  // `stat` is an `fs.Stat` object (not always available)
  console.log('added', path)
})
