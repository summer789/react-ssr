import React from 'react';
import { ISFC } from '../../../../utils/interface';
import pageContainer from '../../components/pageContainer';
import './index.less';

interface IHomeProps {
    initData: {
        content: string;
    };
}

const Home: ISFC<IHomeProps> = ({ initData }) => {
    const { content = '没有数据' } = initData;
    function handleClick() {
        // eslint-disable-next-line no-alert
        alert('cccc');
    }

    return (
        <div className="home">
            <div role="button" tabIndex={0} onClick={handleClick}>
                {content}
            </div>
        </div>
    );
};

Home.fetchInitialProps = () => {
    return new Promise((resolve) => {
        resolve({
            data: {
                content: '这是首页',
            },
            tdk: {
                title: '首页',
                keywords: 'ssr 首页',
                description: '这是一个ssr的首页',
            },
        });
    });
};

export default pageContainer(Home);
