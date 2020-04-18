import { createContext } from 'react';
import { IPageData } from '../../../utils/interface';


export interface InitDataContextData {
    pageData: IPageData;
}

export const InitDataContext = createContext<InitDataContextData>({ pageData: {} as IPageData });
