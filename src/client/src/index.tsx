import React from 'react';
import ReactDom from 'react-dom';
import App from './app';
import { routers } from './routeConfig';

ReactDom.render(<App routers={routers} />, document.getElementById('root'));
