import { ReactElement } from 'react';
import { IRouterItem, DyHOCFn, SSRHOC } from '../../../utils/interface';

export async function getStaticRouters(routes: IRouterItem[]): Promise<IRouterItem[]> {
    return Promise.all<IRouterItem>(
        routes.map((item) => {
            return new Promise((resolve, reject) => {
                if (!item.component.name) {
                    ((item.component as DyHOCFn)() as ReactElement).props
                        .loader()
                        .then((cmpModule: { default: SSRHOC }) => {
                            resolve({
                                ...item,
                                component: cmpModule.default,
                            });
                        })
                        .catch(reject);
                } else {
                    resolve(item);
                }
            });
        }),
    );
}
