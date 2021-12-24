import { ReactElement, ReactNode } from 'react';
import { AppProps } from 'next/app';
import '../styles.scss';
import { NextPage } from 'next';

type NextPageWithContainer = NextPage & {
    getContainer?: (page: ReactElement) => ReactNode
}

type AppPropsWithContainer = AppProps & {
    Component: NextPageWithContainer
}

// This default export is required in a new `pages/_app.js` file.
const MyApp = ({ Component, pageProps }: AppPropsWithContainer) => {
    const getContainer = Component.getContainer ?? ((page) => page);

    return getContainer(<Component {...pageProps} />);
};

export default MyApp;
