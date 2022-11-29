import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import Header from "../components/Header";

const ProtectedPage = () => {
    return (
        <>
            <Header />
            <h1 className="text-xl"> you made it! </h1>
        </>
    );
};

export default ProtectedPage;

export const getServerSideProps = (async (
    ctx
) => {
    const session = await getSession(ctx);

    if (!session) {
        return {
            redirect: {
                destination: "/auth/signin",
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
        },
    };
}) satisfies GetServerSideProps;
