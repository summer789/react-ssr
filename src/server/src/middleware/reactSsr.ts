import Application = require('koa');

const reactSsr: Application.Middleware = async (ctx, next) => {
    ctx.body = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
    </head>
    <body>
        <div id="root">
           react -ssr
        </div>
    </body>
    </html>
    <script type="text/javascript" src="main.js"></script>
    `;
    await next();
};

export default reactSsr;
