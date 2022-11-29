import { type NextPage } from "next";
import Link from "next/link";
import Head from "next/head";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>TNA Keepr</title>
                <meta name="description" content="TNA Keepr" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="mx-auto text-center">
                <h1 className="text-3xl font-bold">TNA Keepr</h1>
                <h2 className="text-lg font-bold">
                    The one stop shop for organising your life. Get access to a
                    storage organiser; secret organiser; and a plant manager
                </h2>
                <Link passHref href="/auth/signin">
                    <button className="rounded-md border p-2 hover:bg-slate-300 hover:shadow-md">
                        Sign In
                    </button>
                </Link>
            </main>
        </>
    );
};

export default Home;
