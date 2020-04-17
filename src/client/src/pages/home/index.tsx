import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ISFC } from '../../../../utils/interface';
import { useInitData } from '../../../hooks/useInitData';

interface IHomeState {
    content: string;
}

const Home: ISFC = () => {
    const initData = useInitData();
    const [state, setState] = useState<IHomeState>({ ...(initData || {}) } as IHomeState);
    const { content } = state;
    useEffect(() => {
        async function fetchData() {
            const data = Home.fetchInitialProps();
            setState((preState) => ({ ...preState, ...data }));
        }
        if (!initData) {
            fetchData();
        }
    }, [initData]);
    function handleClick() {
        // eslint-disable-next-line no-alert
        alert('cccc');
    }

    return (
        <div>
            <div role="button" tabIndex={0} onClick={handleClick}>
                {content}
            </div>
        </div>
    );
};

Home.fetchInitialProps = () => {
    return new Promise((resolve, reject) => {
        resolve({
            content: '这是首页',
        });
    });
};

export default Home;
