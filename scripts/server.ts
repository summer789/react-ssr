import webpack from 'webpack';
import chalk from 'chalk';
import { spawn } from 'child_process';
import { webpackServerConfig } from '../config/webpack.server.config';

const compiler = webpack(webpackServerConfig);
compiler.watch(
    {
        aggregateTimeout: 300, // 类似节流功能,聚合多个更改一起构建
        ignored: /node_modules/, //排除文件
        poll: 2000, //轮训的方式检查变更 单位：秒  ,如果监听没生效，可以试试这个选项.
    },
    (err, stats) => {
        let json = stats.toJson('minimal');
        if (json.errors) {
            json.errors.forEach((item) => {
                console.log(chalk.red(item));
            });
        }
        if (json.warnings) {
            json.warnings.forEach((item) => {
                console.log(chalk.yellowBright(item));
            });
        }
    },
);

compiler.hooks.done.tap('done', function (data) {
    console.log(`\n  ${chalk.greenBright('server code compiler done')}`);
    console.log(`${process.cwd()}/build/static/server/js/server.js`);
    const runServer = spawn('node', [`${process.cwd()}/build/static/server/js/server.js`]);
    runServer.stdout.pipe(process.stdin);
});

['SIGINT', 'SIGTERM'].forEach((sig) => {
    process.on(sig as NodeJS.Signals, () => {
        process.exit();
    });
});
