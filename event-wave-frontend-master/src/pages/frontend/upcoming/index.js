import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import './_about.scss';
import Banner from 'components/background/Banner';
import { useEffect } from 'react';
import Statements from './Statements';

export default function Index() {
    useEffect(() => {
        window.scroll(0, 0);
    }, [])
    return (
        <>
            <Navbar />
            <Banner title={"ALL YOU NEED TO KNOW"} pageTitle={'Upcoming EventWave'} page={'Upcoming Events'} />
            <Statements />
            <Footer />

        </>
    )
}
