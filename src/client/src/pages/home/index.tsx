import React from 'react';

const Home = () => {
    function handleClick() {
        // eslint-disable-next-line no-alert
        alert('cccc');
    }

    return (
        <div role="button" tabIndex={0} onClick={handleClick}>
            this is app
        </div>
    );
};

export default Home;
