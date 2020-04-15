import { matchPath } from 'react-router';
import { IRouterItem } from './interface';

export function matchRoute(path: string, routerList: IRouterItem[]) {
    return routerList.find((item) => matchPath(path, item));
}
