import List from './pages/list';
import Home from './pages/home';
import { IRouterItem } from '../../utils/interface';

export const routers: IRouterItem[] = [
    {
        path: '/',
        component: Home,
        exact: true,
    },
    {
        path: '/list',
        component: List,
        exact: true,
    },
];
