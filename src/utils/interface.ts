import { FunctionComponent, ComponentClass } from 'react';

export interface IRouterItem {
    path: string;
    exact: boolean;
    component: SSRHOC;
}

export interface IMackDataItem {
    title: string;
    desc: string;
}


export interface ITdkData {
    title: string;
    keywords: string;
    description: string;
}

export interface IPageData {
    data: any;
    tdk: ITdkData;
}

export interface ISFC<T = any> extends FunctionComponent<T> {
    fetchInitialProps(): Promise<IPageData>;
}

export interface SSRHOC extends ComponentClass {
    fetchInitialProps(): Promise<IPageData>;
}
