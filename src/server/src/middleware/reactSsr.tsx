import Application from 'koa';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Home from '../../../client/src/pages/home';

const reactSsr: Application.Middleware = async (ctx, next) => {
    const html = renderToString(<Home />);
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
