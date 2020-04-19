import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import chalk from 'chalk';
import { debounce } from 'lodash';
import { delay } from '../utils/common';
import {
    CLIENT_CODE_COMPILER_COMPLETED,
    SERVER_CODE_COMPILER_COMPLETED,
    ENV_DEV,
} from '../utils/constant';

let clientCodeCompilerCompleted = false;

const runClientStart = spawn('yarn', ['run', 'client:start']);

const runServerStart = spawn('yarn', ['run', 'server:start']);

let runServer: ChildProcessWithoutNullStreams;

function startServer() {
    runServer = spawn('node', [`${process.cwd()}/build/server/server.js`]);
    runServer.stdout.on('data', (data) => {
        console.log(data.toString());
    });
    runServer.stderr.on('data', (data) => {
        console.log(data.toString());
    });
    runServer.on('exit', (code) => {
        console.log(`server  exit ${code}`);
    });
}

const controlRunServer = debounce(() => {
    runServer.kill();
    startServer();
}, 2000);

runServerStart.stdout.on('data', async (data) => {
    const str: string = data.toString();
    console.log(str);
    if (str.includes(SERVER_CODE_COMPILER_COMPLETED)) {
        if (!runServer) {
            while (!clientCodeCompilerCompleted) {
                await delay(2000);
            }
            startServer();
        } else {
            controlRunServer();
        }
    }
});

runServerStart.on('exit', () => {
    console.log('\nserver code watch exit');
});

runClientStart.stdout.on('data', (data) => {
    const str: string = data.toString();
    console.log(str);
    if (str.includes(CLIENT_CODE_COMPILER_COMPLETED)) {
        clientCodeCompilerCompleted = true;
        if (runServer) {
            controlRunServer();
        }
    }
});

runClientStart.on('exit', () => {
    console.log('\n client code watch exit');
});

process.on('exit', (code) => {
    console.log(chalk.red(`\n app exit ${code}`));
});

['SIGINT', 'SIGTERM'].forEach((sig) => {
    process.on(sig as NodeJS.Signals, () => {
        runClientStart.kill();
        if (runServerStart) {
            runServerStart.kill();
        }
        if (runServer) {
            runServer.kill();
        }
        process.exit(0);
    });
});
