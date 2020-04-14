import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
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

export default Home;
