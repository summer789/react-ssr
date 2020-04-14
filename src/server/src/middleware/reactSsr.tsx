import Application from 'koa';
import React from 'react';
import { StaticRouter } from 'react-router';
import { renderToString } from 'react-dom/server';
import App from '../../../client/src/app';
import { routers } from '../../../client/src/routeConfig';

const reactSsr: Application.Middleware = async (ctx, next) => {
    const html = renderToString(
        <StaticRouter>
            <App routers={routers} />
        </StaticRouter>,
    );
    ctx.body = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
    </head>
    <body>
        <div id="root">
           ${html}
        </div>
    </body>
    </html>
    <script type="text/javascript" src="bundle.js"></script>
    `;
    await next();
};

export default reactSsr;
