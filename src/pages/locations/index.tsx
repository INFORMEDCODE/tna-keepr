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

type LocationsLandingPageProps = InferGetServerSidePropsType<
    typeof getServerSideProps
>;

const LocationsLandingPage: React.FC<LocationsLandingPageProps> = ({
    session,
}) => {
    return (
        <div>
            <h1 className="p-2 text-2xl font-bold">Locations</h1>
        </div>
    );
};

export default LocationsLandingPage;
