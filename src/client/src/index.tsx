/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React, { ReactElement } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import { routers } from './routeConfig';
import { matchRoute } from '../../utils/common';
import { DyHOCFn } from '../../utils/interface';

async function render() {
    const dataDom = document.querySelector<HTMLTextAreaElement>('#ssrTextInitData');
    let initData = {};
    try {
        initData = JSON.parse(dataDom ? dataDom.value : '');
    } catch (error) {
        console.warn(error);
    }
    window.__INIT_DATA__ = Object.freeze(initData);

    const currentRoute = matchRoute(window.location.pathname, routers);
    if (!currentRoute?.component?.name) {
        await ((currentRoute?.component as DyHOCFn)() as ReactElement).props.loader();
    }

    ReactDom.hydrate(
        <BrowserRouter>
            <App routers={routers} />
        </BrowserRouter>,
        document.getElementById('root'),
    );
}

render();

// if ((module as any).hot) {
//     (module as any).hot.accept();
// }
