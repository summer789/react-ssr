import React, { useState, useEffect, ReactNode, ReactElement } from 'react';

const TestDemo = () => <div>111</div>;

interface AsyncComponentProps {
    loader(): Promise<{ default: React.ComponentType }>;
    loading: React.ComponentType;
    children: (cpm: React.ComponentType) => ReactElement;
}

const AsyncComponent = (props: AsyncComponentProps) => {
    const { loader, loading, children } = props;
    const [cmp, set] = useState<React.ComponentType | null>(null);
    useEffect(() => {
        async function load() {
            const { default: currentCmp } = await loader();
            set(() => currentCmp);
        }
        if (!cmp) {
            load();
        }
    }, [cmp, loader]);
    return cmp ? children(cmp) : React.createElement(loading);
};

export default AsyncComponent;
