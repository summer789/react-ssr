import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import { routers } from './routeConfig';

ReactDom.hydrate(
    <BrowserRouter>
        <App routers={routers} />
    </BrowserRouter>,
    document.getElementById('root'),
);
