import chalk from 'chalk';
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
        // sse 路由
        path: '/__webpack_hmr',
        // 编译出错会在网页中显示出错信息遮罩
        overlay: true,
        // webpack 卡住自动刷新页面
        reload: true,
    };

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
