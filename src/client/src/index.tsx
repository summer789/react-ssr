import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import { routers } from './routeConfig';
import { InitDataContext } from './context';

function render() {
    const dataDom = document.querySelector<HTMLTextAreaElement>('#ssrTextInitData');
    let initData = {};
    try {
        initData = JSON.parse(dataDom ? dataDom.value : '');
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(error);
    }

    ReactDom.hydrate(
        <BrowserRouter>
            <InitDataContext.Provider value={{ initData }}>
                <App routers={routers} />
            </InitDataContext.Provider>
        </BrowserRouter>,
        document.getElementById('root'),
    );
}

render();
