import React, { useState, FC, useEffect } from 'react';
import { mockData } from '../../../../utils/mock';
import { IMackDataItem, ISFC } from '../../../../utils/interface';
import { useInitData } from '../../../hooks/useInitData';

interface IListState {
    list: IMackDataItem[];
}

const List: ISFC<any> = () => {
    const initData = useInitData();
    const [state, setState] = useState<IListState>({ ...(initData ?? {}) });
    const { list } = state;
    useEffect(() => {
        async function fetchListData() {
            const res = await List.fetchInitialProps();
            if (Array.isArray(res)) {
                setState((preState) => ({
                    ...preState,
                    list: res,
                }));
            }
        }
        if (!initData) {
            fetchListData();
        }
    }, [initData]);
    return (
        <ul>
            {list.map(({ title, desc }) => (
                <li key={title}>
                    <div>{title}</div>
                    <div>{desc}</div>
                </li>
            ))}
        </ul>
    );
};

List.fetchInitialProps = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                list: mockData,
            });
        }, 300);
    });
};

export default List;
