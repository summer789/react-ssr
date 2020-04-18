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
        context!: React.ContextType<typeof InitDataContext>;
        state = {
            pageData: {} as IPageData,
        };

        static async fetchInitialProps() {
            return TargetComponent?.fetchInitialProps();
        }

        fetchInitialProps = async () => {
            const res = await HoComponent.fetchInitialProps();
            if (res) {
                this.setState({
                    pageData: res,
                });
            }
        }
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

        render() {
            let data = {} ;
            let tdk = {} as ITdkData;

            if (__SERVER__) {
                data = this.context.pageData.data;
                tdk = this.context.pageData.tdk;
            } else {
                data = this.state.pageData.data ?? {};
                tdk = this.state.pageData.tdk ?? {};
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
    }
}

export default pageContainer;