import React, { FunctionComponent } from 'react';
import { AppProps } from 'next/app';
import '../styles.scss';

// This default export is required in a new `pages/_app.js` file.
const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
};

export default MyApp;
