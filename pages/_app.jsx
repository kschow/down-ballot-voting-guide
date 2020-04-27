import React from 'react';
import * as PropTypes from 'prop-types';
import '../styles.scss';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

MyApp.propTypes = {
    Component: PropTypes.func || PropTypes.element,
    pageProps: PropTypes.object
};
