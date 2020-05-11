import Link from 'next/link';
import React from 'react';
import BaseLayout from '../components/Shared/Layout';

const Home = () => <BaseLayout title="Create Next App">
    <Link href="/single-select">
        <a>Single Select</a>
    </Link>
</BaseLayout>;

export default Home;
