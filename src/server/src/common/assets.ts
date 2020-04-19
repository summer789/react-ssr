/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

import manifestJson from '@build/client/manifest.json';

interface IAssets {
    js: string[];
    css: string[];
}

export const getAssets = () => {
    const assets: IAssets = {
        js: [],
        css: [],
    };

    if (!__PROD__) {
        assets.js.push('<script type="text/javascript"  src="/js/main.js"></script>');
        assets.css.push('<link rel="stylesheet" type="text/css" href="/css/main.css" />');
    } else {
        Object.keys(manifestJson).forEach((item) => {
            const filePath = (manifestJson as any)[item];
            if (/\.js$/.test(filePath)) {
                assets.js.push(`<script type="text/javascript"  src="${filePath}"></script>`);
            }
            if (/\.css$/.test(filePath)) {
                assets.js.push(`<link rel="stylesheet" type="text/css" href="${filePath}" />`);
            }
        });
    }
    return assets;
};
