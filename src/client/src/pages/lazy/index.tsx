import React from 'react';
import pageContainer from '../../components/pageContainer';
import { ISFC } from '../../../../utils/interface';

const Lazy: ISFC = () => {
    return <div>fsfsdfsdf</div>;
};

Lazy.fetchInitialProps = () => {
    return new Promise((resolve) => {
        resolve({
            data: {
                content: '这是懒加载页面',
            },
            tdk: {
                title: '这是懒加载页面',
                keywords: 'ssr 这是懒加载页面',
                description: '这是一个ssr的这是懒加载页面',
            },
        });
    });
};

export default pageContainer(Lazy);
