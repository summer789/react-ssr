import React, { useState, FC, useEffect } from 'react';
import { mockData } from '../../../../utils/mock';
import { IMackDataItem, ISFC } from '../../../../utils/interface';

interface IListState {
    list: IMackDataItem[];
}

const List: ISFC<any> = () => {
    const [state, setState] = useState<IListState>({ list: [] });
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
    }, []);
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
            resolve(mockData);
        }, 300);
    });
};

export default List;
