import _getPort from 'get-port';

export const getPort = async (host: string, defaultPort: number): Promise<number> => {
    const port = await _getPort({ host, port: defaultPort });
    if (port === defaultPort) {
        return port;
    }
    return getPort(host, defaultPort + 1);
};
