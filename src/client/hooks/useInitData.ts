import { useContext } from 'react';
import { InitDataContext } from '../src/context';

export function useInitData() {
    const { initData } = useContext(InitDataContext);
    return initData;
}
