import webpack from 'webpack';
import { webpackProdConfig } from '../config/webpack.prod.config';

const compiler = webpack(webpackProdConfig);
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
