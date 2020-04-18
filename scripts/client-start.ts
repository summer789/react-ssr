import webpack from 'webpack';
import chalk from 'chalk';
import { webpackDevConfig } from '../config/webpack.dev.config';
import { CLIENT_CODE_COMPILER_COMPLETED } from '../utils/constant';


console.log('starting client code compile');

const compiler = webpack(webpackDevConfig);
compiler.watch(
    {
        aggregateTimeout: 300,
        ignored: /node_modules/,
        poll: 2000,
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
    console.log(`\n${chalk.greenBright(CLIENT_CODE_COMPILER_COMPLETED)} watching`);
});

