import Head from 'next/head';

const GameLayout = props => {
    return(
        <section data-testid="base-layout">
            <Head>
                <title>{props.pageTitle}</title>
                <meta charSet='UFT-8' />
                <meta name='viewport' content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
            </Head>
            <div> {props.children} </div>
        </section>
    );
};

export default GameLayout;
