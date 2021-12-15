import Link from 'next/link';
import React, { FunctionComponent } from 'react';
import BaseLayout from '../components/Shared/Layout';

const Home: FunctionComponent = () => (
    <BaseLayout title="Create Next App">
        <Link href="/single-select">
            <a>Single Select</a>
        </Link>
    </BaseLayout>
);

export default Home;
