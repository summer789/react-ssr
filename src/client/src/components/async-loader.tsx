import React, { SFC } from 'react';
import AsyncComponent from './async-component';
import { AsyncLoaderProps } from '../../../utils/interface';

const AsyncLoader = (props: AsyncLoaderProps) => {
    return (childProps: any) => (
        <AsyncComponent {...props}>
            {(Cmp) => {
                // console.log('Cmp',Cmp);
                return <Cmp {...childProps} />;
            }}
        </AsyncComponent>
    );
};

export default AsyncLoader;
