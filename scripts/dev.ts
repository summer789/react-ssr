import { spawn } from 'child_process';
import chalk from 'chalk';

console.log(chalk.bgBlue('server starting'));

const runStart = spawn('yarn', ['run', 'start']);
const runServer = spawn('yarn', ['run', 'server']);

function runNodeServer() {}
