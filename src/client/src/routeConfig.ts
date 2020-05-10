import List from './pages/list';
import Home from './pages/home';
import Loading from './components/loading';
import { IRouterItem } from '../../utils/interface';
import AsyncLoader from './components/async-loader';

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
    {
        path: '/lazy',
        exact: true,
        component: AsyncLoader({
            loader: () => import('./pages/lazy'),
            loading: Loading,
        }),
    },
];
