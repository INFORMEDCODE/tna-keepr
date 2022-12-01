import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";

const ProtectedPage: React.FC<ProtectedPageProps> = ({ session }) => {
    return (
        <>
            <h1 className="text-xl"> you made it! </h1>
        </>
    );
};

export default ProtectedPage;

export const getServerSideProps = (async (ctx) => {
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

type ProtectedPageProps = InferGetServerSidePropsType<
    typeof getServerSideProps
>;
