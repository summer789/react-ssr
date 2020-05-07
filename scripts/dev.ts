import chalk from 'chalk';
import cors from 'cors';
import webpack from 'webpack';
import express from 'express';
import logSymbols from 'log-symbols';
import historyFallback from 'connect-history-api-fallback';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { webpackDevConfig } from '../config/webpack.dev.config';
import { CLIENT_SERVER_PORT } from '../utils/constant';

function startApp() {
    const publicPath = webpackDevConfig.output?.publicPath!;
    const compiler = webpack(webpackDevConfig);
    const derServer = express();
    const devMiddlewareOptions: webpackDevMiddleware.Options = {
        publicPath,
        stats: 'minimal',
    };

    const hotMiddlewareOptions: webpackHotMiddleware.ClientOptions = {
        path: '/__webpack_hmr',
        reload: true,
    };

    derServer.use(cors());
    derServer.use(historyFallback());
    derServer.use(webpackDevMiddleware(compiler, devMiddlewareOptions));
    derServer.use(webpackHotMiddleware(compiler, hotMiddlewareOptions));

    const httpServer = derServer.listen(CLIENT_SERVER_PORT, (err) => {
        if (!err) {
            console.log(
                `${chalk.magenta.underline(`localhost:${CLIENT_SERVER_PORT}`)} ${
                    logSymbols.success
                }`,
            );
        } else {
            console.error(err);
        }
    });

    ['SIGINT', 'SIGTERM'].forEach((signal) => {
        process.on(signal as NodeJS.Signals, () => {
            httpServer.close();
            console.log('close dev server');
            process.exit(0);
        });
    });
}

startApp();
