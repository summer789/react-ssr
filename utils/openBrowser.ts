import { Compiler } from 'webpack';
import open from 'open';

export const openBrowser = (compiler: Compiler, address: string) => {
    let isOpen = false;
    compiler.hooks.done.tap('OpenBrowserPlugin', (compilation) => {
        if (!isOpen && !compilation.hasErrors()) {
            open(address).then(() => (isOpen = true));
        }
    });
};
