import { spawn, ChildProcessWithoutNullStreams, exec } from 'child_process';
import chalk from 'chalk';
import { CODE_COMPILE_COMPLETED } from '../utils/constant';

console.log(chalk.bgBlue('server starting'));

const runStart = spawn('yarn', ['run', 'start']);

let runServer: ChildProcessWithoutNullStreams;

runStart.stdout.on('data', (data) => {
    const str: string = data.toString();
    console.log(str);
    if (str.includes(CODE_COMPILE_COMPLETED) && !runServer) {
        runServer = spawn('yarn', ['run', 'server']);
        runServer.stdout.on('data', (data) => {
            console.log(data.toString());
        });
    }
});

process.on('exit', (code) => {
    console.log(chalk.red(`\n app exit ${code}`));
});

['SIGINT', 'SIGTERM'].forEach((sig) => {
    process.on(sig as NodeJS.Signals, () => {
        if (runServer) {
            runServer.kill();
        }
        process.exit();
    });
});
