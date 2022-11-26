import type { GetServerSidePropsContext, GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";

const ProtectedPage = () => {
    return (
        <>
            <h1 className="text-xl"> you made it! </h1>
            <button
                onClick={() =>
                    signOut({
                        callbackUrl: "/",
                    })
                }
                className="rounded-md border p-2 hover:bg-slate-300 hover:shadow-md"
            >
                Sign Out
            </button>
        </>
    );
};

export default ProtectedPage;

export const getServerSideProps: GetServerSideProps = async (
    ctx: GetServerSidePropsContext
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
};
