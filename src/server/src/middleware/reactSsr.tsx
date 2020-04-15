import Application from 'koa';
import React from 'react';
import { StaticRouter } from 'react-router';
import { renderToString } from 'react-dom/server';
import App from '../../../client/src/app';
import { routers } from '../../../client/src/routeConfig';
import { matchRoute } from '../../../utils/common';
import { InitDataContext } from '../../../client/src/context';

const reactSsr: Application.Middleware = async (ctx, next) => {
    const {
        request: { path },
    } = ctx;

    const currentRoute = matchRoute(path, routers);
    const fetchData = currentRoute?.component?.fetchInitialProps;
    let initData = {};
    if (fetchData) {
        initData = await fetchData();
    }
    const context = {
        initData,
    };
    const html = renderToString(
        <StaticRouter context={context as any} location={path}>
            <InitDataContext.Provider value={context}>
                <App routers={routers} />
            </InitDataContext.Provider>
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
        <textarea id="ssrTextInitData" style="display:none;">
        ${JSON.stringify(initData)}
    </textarea>
    </body>
    </html>
    <script type="text/javascript" src="bundle.js"></script>
    `;
    await next();
};

export default reactSsr;
