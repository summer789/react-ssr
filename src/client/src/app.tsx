/* eslint-disable import/no-extraneous-dependencies */
import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { IRouterItem } from '../../utils/interface';
import Layout from './components/layout';

interface IAppProps {
    routers: IRouterItem[];
}

const App: FC<IAppProps> = ({ routers }) => {
    return (
        <Layout>
            <Switch>
                {routers.map((item: any) => (
                    <Route key={item.path} {...item} />
                ))}
            </Switch>
        </Layout>
    );
};

export default App;
