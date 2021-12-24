import Link from 'next/link';
import { ReactElement } from 'react';
import HeadLayout from '../components/Shared/Layouts/HeadLayout';

const Home = () => (
    <Link href="/single-select">
        <a>Single Select</a>
    </Link>
);

Home.getContainer = (page: ReactElement) => (
    <HeadLayout title={'Create Next App'}>
        {page}
    </HeadLayout>
);

export default Home;
