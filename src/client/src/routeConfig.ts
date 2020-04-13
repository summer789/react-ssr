import Home from './pages/home';
import { IRouterItem } from '../../common/interface';

export const routers: IRouterItem[] = [
    {
        path: '/',
        component: Home,
        exact: true,
    },
];
