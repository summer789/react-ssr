import Home from './pages/home';
import { IRouterItem } from '../../utils/interface';

export const routers: IRouterItem[] = [
    {
        path: '/',
        component: Home,
        exact: true,
    },
];
