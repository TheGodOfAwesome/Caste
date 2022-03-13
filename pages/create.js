import Head from 'next/head';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import 'react-datetime/css/react-datetime.css';
import CreateCard from '../components/CreateCard';

export default function Create() {

    return (
        <div>
            <Head>
                <title>Caste</title>
                <meta name="description" content="" />
                <meta property="og:image" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <CreateCard/>
        </div>
    )
}