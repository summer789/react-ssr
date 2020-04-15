import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { IRouterItem } from '../../utils/interface';

interface IAppProps {
    routers: IRouterItem[];
}

const App: FC<IAppProps> = ({ routers }) => {
    return (
        <Switch>
            {routers.map((item) => (
                <Route key={item.path} {...item} />
            ))}
        </Switch>
    );
};

export default App;
