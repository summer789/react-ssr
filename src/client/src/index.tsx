import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import { routers } from './routeConfig';

function render() {
    const dataDom = document.querySelector<HTMLTextAreaElement>('#ssrTextInitData');
    let initData = {};
    try {
        initData = JSON.parse(dataDom ? dataDom.value : '');
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(error);
    }

    // eslint-disable-next-line no-underscore-dangle
    window.__INIT_DATA__ = Object.freeze(initData);

    ReactDom.hydrate(
        <BrowserRouter>
            <App routers={routers} />
        </BrowserRouter>,
        document.getElementById('root'),
    );
}

render();

// console.log('aaa',(module as any).hot)

if (process.env.NODE_ENV === 'development' && (module as any).hot) {
    (module as any).hot.accept();
}
