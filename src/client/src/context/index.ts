import { createContext } from 'react';

export const InitDataContext = createContext<{ initData?: any }>({ initData: undefined });
