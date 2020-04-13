import { FunctionComponent, ComponentClass } from 'react';

export interface IRouterItem {
    path: string;
    exact: boolean;
    component: ComponentClass<any, any> | FunctionComponent<any>;
}
