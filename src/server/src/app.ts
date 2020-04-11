import Koa from 'koa';
import koaStatic from 'koa-static';
import { NODE_SERVER_PORT } from '../../utils/constant';
import { reactSsr, handleError } from './middleware';

const port = NODE_SERVER_PORT || process.env.PORT;

const app = new Koa();

app.use(handleError);
app.use(koaStatic(''));
app.use(reactSsr);
app.listen(port);

// eslint-disable-next-line no-console
console.log('server start', `http://localhost:${port}`);
