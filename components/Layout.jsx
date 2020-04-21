import * as PropTypes from 'prop-types';
import React from 'react';
import './Layout.module.scss';
import Head from 'next/head';

const BaseLayout = (props) => <div>
    <Head>
        <title>{props.title}</title>
        <link rel="icon" href="/favicon.ico" />
    </Head>
    {props.children}
</div>;

BaseLayout.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any
};

export default BaseLayout;
