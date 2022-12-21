import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import TypeActions from "../../components/shared/TypeActions";

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

type ItemsLandingPageProps = InferGetServerSidePropsType<
    typeof getServerSideProps
>;

const ItemsLandingPage: React.FC<ItemsLandingPageProps> = ({ session }) => {
    // the action that is performed when new is clicked on this page; should be passed to the TypeActions
    const newAction = () => {
        console.log("new action");
    };

    return (
        <div>
            <TypeActions isSelected={false} selectedItem={[]} />
            <h1 className="p-2 text-2xl font-bold">Items</h1>
        </div>
    );
};

export default ItemsLandingPage;
