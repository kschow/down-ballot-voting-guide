import React, { FunctionComponent } from 'react';
import '../styles.scss';

type MyAppProps = {
    Component: React.ComponentType;
    pageProps: object;
}
// This default export is required in a new `pages/_app.js` file.
const MyApp: FunctionComponent<MyAppProps> = ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
};

export default MyApp;
