import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

const BaseLayout = props => {
    return(
        <section data-testid="base-layout">
            <Head>
                <title>{props.pageTitle}</title>
                <meta charSet='UFT-8' />
                <meta name='viewport' content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
            </Head>
            <Header />
            <div className="d-flex flex-column min-vh-100"> {props.children} </div>
            <Footer />
        </section>
    );
};

export default BaseLayout;
