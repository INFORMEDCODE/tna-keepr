import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import FavouritesTable from "../../components/secrets/FavouritesTable";

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

type SecretsLandingPageProps = InferGetServerSidePropsType<
    typeof getServerSideProps
>;

const SecretsLandingPage: React.FC<SecretsLandingPageProps> = ({ session }) => {
    return (
        <div>
            <h1 className="p-2 text-2xl font-bold">Secrets</h1>
            <FavouritesTable />
        </div>
    );
};

export default SecretsLandingPage;
