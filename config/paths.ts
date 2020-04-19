import path from 'path';

const resolveApp = (relativePath: string) => path.resolve(process.cwd(), relativePath);
export const paths = {
    serverAppSrc: resolveApp('src/server/src'),
    appSrc: resolveApp('src/client/src'),
    serverApp: resolveApp('src/server/src/app.ts'),
    appIndex: resolveApp('src/client/src/index.tsx'),
    build: resolveApp('build'),
    appTsConfig: resolveApp('tsconfig.json'),
    appOutputPath: resolveApp('build/client'),
    serverOutPutPath: resolveApp('build/server'),
};
