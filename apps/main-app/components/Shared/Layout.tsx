import Head from 'next/head';
import React, { FunctionComponent } from 'react';

type BaseLayoutProps = {
    title: string;
}

const BaseLayout: FunctionComponent<BaseLayoutProps> = ({ title, children }) => (
    <div>
        <Head>
            <title>{title}</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        {children}
    </div>
);

export default BaseLayout;
