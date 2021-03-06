import Application from 'koa';
import React from 'react';
import { StaticRouter } from 'react-router';
import { renderToString } from 'react-dom/server';
import App from '../../../client/src/app';
import { routers } from '../../../client/src/routeConfig';
import { matchRoute } from '../../../utils/common';
import { InitDataContext } from '../../../client/src/context';
import { IPageData, SSRHOC } from '../../../utils/interface';
import { getAssets } from '../common/assets';
import { getStaticRouters } from '../common/get-static-routes';

const defaultTdk = {
    title: 'react ssr',
    keywords: '',
    description: '',
};

const reactSsr: Application.Middleware = async (ctx, next) => {
    const {
        request: { path },
    } = ctx;

    const assets = getAssets();
    const staticRoutes = await getStaticRouters(routers);
    const currentRoute = matchRoute(path, staticRoutes);
    const fetchData = (currentRoute?.component as SSRHOC)?.fetchInitialProps;
    let pageData: IPageData = {} as IPageData;
    if (fetchData) {
        pageData = await fetchData();
    }

    const { tdk = defaultTdk } = pageData;

    const context = {
        pageData,
    };
    const html = renderToString(
        <StaticRouter location={path}>
            <InitDataContext.Provider value={context}>
                <App routers={staticRoutes} />
            </InitDataContext.Provider>
        </StaticRouter>,
    );
    ctx.body = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>${tdk.title}</title>
        <meta name="keywords" content="${tdk.keywords}" />
        <meta name="description" content="${tdk.description}" />
        ${assets.css.join('')}
    </head>
    <body>
        <div id="root">
           ${html}
        </div>
        <textarea id="ssrTextInitData" style="display:none;">
        ${JSON.stringify(pageData)}
    </textarea>
    </body>
    ${assets.js.join('')}
    </html>
    `;
    await next();
};

export default reactSsr;
