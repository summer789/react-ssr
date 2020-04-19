import Koa from 'koa';
import path from 'path';
import koaStatic from 'koa-static';
import { NODE_SERVER_PORT } from '../../../utils/constant';
import { reactSsr, handleError } from './middleware';
import { getPort } from '../../../utils/getPort';

async function startServer() {
    const port = await getPort(NODE_SERVER_PORT || process.env.PORT);
    const app = new Koa();
    app.use(handleError);
    app.use(koaStatic(path.resolve(process.cwd(), 'build/client')));
    app.use(reactSsr);
    app.listen(port);
    // eslint-disable-next-line no-console
    console.log(process.env.NODE_ENV);
    console.log('server start', `http://localhost:${port}`);
}

startServer();
