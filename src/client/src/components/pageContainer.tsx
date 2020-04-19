/* eslint-disable no-underscore-dangle */
/* eslint-disable react/static-property-placement */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { ISFC, IPageData, ITdkData } from '../../../utils/interface';
import { InitDataContext } from '../context';

interface IHoComponentState {
    pageData: IPageData | undefined;
}

const pageContainer = (TargetComponent: ISFC) => {
    return class HoComponent extends Component<any, IHoComponentState> {
        static contextType = InitDataContext;

        static async fetchInitialProps() {
            return TargetComponent?.fetchInitialProps();
        }

        context!: React.ContextType<typeof InitDataContext>;

        state = {
            pageData: {} as IPageData,
        };

        componentDidMount() {
            if (window.__INIT_DATA__) {
                this.setState({
                    pageData: window.__INIT_DATA__,
                });
                window.__INIT_DATA__ = undefined;
            } else {
                this.fetchInitialProps();
            }
        }

        fetchInitialProps = async () => {
            const res = await HoComponent.fetchInitialProps();
            if (res) {
                this.setState({
                    pageData: res,
                });
            }
        };

        render() {
            let data = {};
            let tdk = {} as ITdkData;

            if (__SERVER__) {
                const { pageData } = this.context;
                data = pageData.data;
                tdk = pageData.tdk;
            } else {
                const { pageData } = this.state;
                data = pageData.data ?? {};
                tdk = pageData.tdk ?? {};
            }

            return (
                <>
                    <Helmet>
                        <title>{tdk.title}</title>
                        <meta name="description" content={tdk.description} />
                        <meta name="keywords" content={tdk.keywords} />
                    </Helmet>
                    <TargetComponent initData={data} />
                </>
            );
        }
    };
};

export default pageContainer;
