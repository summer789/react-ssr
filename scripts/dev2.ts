import webpack from 'webpack';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import WebpackDevServer from 'webpack-dev-server';
import { paths } from '../config/paths';
import { webpackDevConfig } from '../config/webpack.dev.config';
import { CLIENT_SERVER_PORT } from '../utils/constant';
const config: WebpackDevServer.Configuration = {
    quiet: true, //不显示构建日志
    contentBase: paths.appOutputPath,
    publicPath: webpackDevConfig.output?.publicPath,
    hot: true,
    open: false,
    port: CLIENT_SERVER_PORT,
    compress: true,
    historyApiFallback: true,
    clientLogLevel: 'none',
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 500,
        poll: 500,
    },
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
};

const compiler = webpack(webpackDevConfig);

const devServer = new WebpackDevServer(compiler, config);

const httpServer = devServer.listen(CLIENT_SERVER_PORT, 'localhost', (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(
        `${chalk.magenta.underline(`localhost:${CLIENT_SERVER_PORT}`)} ${logSymbols.success}`,
    );

    console.log('🚀 started');
});

['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal as NodeJS.Signals, () => {
        httpServer.close();
        console.log('close dev server');
        process.exit(0);
    });
});
