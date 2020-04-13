// const fs = require('fs');

// const cwd = process.cwd();
// console.log(fs.realpathSync(cwd));
// console.log(cwd);
// console.log(__dirname);
const cp = require('child_process');
// spawn
const ls = cp.spawn('ls' /* command */, ['-lh', '/usr'] /* args */, {} /* options, [optional] */);
ls.stdout.on('data', function (data) {
    console.log(`stdoutaaaaaaaaaaaaaaaa: ${data}\n`);
});

// ls.stderr.on('data', function (data) {
//     console.log(`stderrbbbbbbbbbbbbbbb: ${data}`);
// });

// ls.on('exit', function (code) {
//     console.log(`child process exited with code ${code}`);
// });

// exec
// cp.exec('ls -lh /usr' /* command */, {} /* options, [optiona]l */, function (err, stdout, stderr) {
//     console.log(`stdout: ${stdout}`);
//     console.log(`stderr: ${stderr}`);
// });
