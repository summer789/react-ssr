import { FunctionComponent, ComponentClass } from 'react';

export interface IRouterItem {
    path: string;
    exact: boolean;
    component: ISFC<any>;
}

export interface IMackDataItem {
    title: string;
    desc: string;
}

export interface ISFC<T = any> extends FunctionComponent<T> {
    fetchInitialProps(): Promise<any>;
}
