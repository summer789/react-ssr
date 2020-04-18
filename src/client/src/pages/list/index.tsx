import React from 'react';
import { mockData } from '../../../../utils/mock';
import { IMackDataItem, ISFC } from '../../../../utils/interface';
import pageContainer from '../../components/pageContainer';

interface IListProps {
    initData: {
        list: IMackDataItem[];
    }
}

const List: ISFC<IListProps> = ({ initData: { list = [] } }) => {
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
                data: {
                    list: mockData,
                },
                tdk: {
                    title: '列表',
                    keywords: 'ssr list',
                    description: '这是ssr list page',
                },

            });
        }, 300);
    });
};

export default pageContainer(List);
