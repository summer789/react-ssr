/* eslint-disable import/no-unresolved */
import { useContext } from 'react';
// import __SERVER__ from 'ssrVar';
import { InitDataContext } from '../src/context';

export function useInitData() {
    const { initData } = useContext(InitDataContext);
    console.log('aa');
    // eslint-disable-next-line no-undef
    return initData;
}
