import webpack from 'webpack';
import { webpackServerConfig } from '../config/webpack.server.config';

const compiler = webpack(webpackServerConfig);
compiler.run((error, state) => {
    if (error) {
        console.error(error);
        return;
    }
    const prodStatsOpts = {
        preset: 'normal',
        colors: true,
    };
    console.log(state.toString(prodStatsOpts));
});
