import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import IntroSection from '../components/IntroSection';
import ImageInfoCard from '../components/ImageInfoCard';
import ImagePartnerCard from '../components/ImagePartnerCard';
import IntroVideoSection from '../components/IntroVideoSection';
import BlurbSection from '../components/BlurbSection';
import CreateSection from '../components/CreateSection';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Caste</title>
        <meta property="og:image" content="https://caste.vercel.app/assets/image/logo_caste_square_black.png" />
        <meta name="description" content="Caste TCG" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div
        style={{ backgroundColor: "#000"}}
      >
        <IntroSection/>
        <BlurbSection/>
        <div id="create">
          <CreateSection/>
        </div>
      </div>
    </div>
  )
}
