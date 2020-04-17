import _getPort from 'get-port';

export const getPort = async (defaultPort: number): Promise<number> => {
    const port = await _getPort({ port: defaultPort });
    if (port === defaultPort) {
        return port;
    }
    return getPort(defaultPort + 1);
};
