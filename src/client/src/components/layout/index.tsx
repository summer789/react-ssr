import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Layout: FC = ({ children }) => {
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
            {children}
        </div>
    );
};

export default Layout;
