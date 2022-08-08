import Head from 'next/head';
import Image from 'next/image';
import Layout from './components/layout';
import * as configcat from 'configcat-js-ssr';
import amplitude from 'amplitude-js';

export async function getServerSideProps () {
    const configcatClient = configcat.createClient("YOUR-SDK-KEY");
    // feature flag key
    const ffKey = "showdownloadsize";

    // the identifier should be a unique value like a username; I'm using a random number here
    const userId = 343467;
    // set userId as the identifier
    const showSizeFlag = await configcatClient.getValueAsync(ffKey, false, { identifier: userId });
    // add userId to the props object, we'll need it in the HomePage function later
    return { props: { showSizeFlag, ffKey, userId } };
}


export default function HomePage ( { showSizeFlag, ffKey, userId } ) {

    const amplitudeInstance = amplitude.getInstance().init("YOUR-API-KEY", userId);

    const identity = new amplitude.Identify();

    identity.set(ffKey, showSizeFlag);
    amplitude.getInstance().identify(identity);

    function handleClick () {
        amplitude.getInstance(amplitudeInstance).logEvent('Download Button Clicked!');
    }
    // markup here
    return (
        <div>
            <Head>
                <title>Books</title>
            </Head>
            <Layout>
                <div className="container">
                    <h1>Computer Science Stuff</h1>
                    <Image
                        src="/images/book.svg"
                        width="250"
                        height="200"
                    />
                    <div className="button__area">       
                        <button id="download" onClick={handleClick}>
                            Download PDF{ showSizeFlag &&<span> (5MB)</span>}
                        </button>
                    </div>    
                </div>
            
                <style jsx>{`
                    h1 {
                        font-size: 2rem;
                        text-align: center;
                    }

                    .button__area {
                        margin: 0.5rem;
                        display: flex;
                    }
                    
                    #download {
                        border-width: 0px;
                        border-radius: 10px;
                        margin-top: 0.5rem;
                        padding: 0.25em 0.5em;
                        background-color: #3535E6;
                        font-family: 'General Sans';
                        font-size: 1.25em;
                        color: white;
                    }
                    
                    #download:hover {
                        cursor: pointer;
                    }
                    
                    ul {
                        list-style: none;
                    }
                `}
                </style>
            </Layout>
        </div>
    );
};