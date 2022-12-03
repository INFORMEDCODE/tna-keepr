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

type OrganisationsLandingPageProps = InferGetServerSidePropsType<
    typeof getServerSideProps
>;

const OrganisationsLandingPage: React.FC<OrganisationsLandingPageProps> = ({ session }) => {
    return (
        <div>
            <h1 className="p-2 text-2xl font-bold">Organisations</h1>
        </div>
    );
};

export default OrganisationsLandingPage;
