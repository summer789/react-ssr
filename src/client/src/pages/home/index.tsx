import React from 'react';
import { Link } from 'react-router-dom';
import { ISFC } from '../../../../utils/interface';
import { useInitData } from '../../../hooks/useInitData';

const Home: ISFC = () => {
    useInitData();
    function handleClick() {
        // eslint-disable-next-line no-alert
        alert('cccc');
    }

    return (
        <div>
            <ul>
                <li>
                    <Link to="/">首页</Link>
                </li>
                <li>
                    <Link to="/list">列表</Link>
                </li>
            </ul>
            <div role="button" tabIndex={0} onClick={handleClick}>
                this is ssr app monian
            </div>
        </div>
    );
};

Home.fetchInitialProps = () => {
    return new Promise((resolve, reject) => {
        resolve({
            data: '123',
        });
    });
};

export default Home;
