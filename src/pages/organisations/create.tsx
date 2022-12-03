import { GetServerSideProps, type InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import { useRef } from "react";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

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

type CreateOrganisationPageProps = InferGetServerSidePropsType<
    typeof getServerSideProps
>;

const CreateOrganisationPage: React.FC<CreateOrganisationPageProps> = ({
    session,
}) => {
    const router = useRouter();
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const locationRef = useRef<HTMLSelectElement>(null);

    const locations = trpc.locations.listLocations.useQuery();
    const organisationMutation =
        trpc.organisations.createOrganisation.useMutation();

    const handleNewOrganisation = async () => {
        if (!nameRef.current) {
            return;
        }

        organisationMutation.mutate({
            name: nameRef.current.value,
            description: descriptionRef.current?.value,
            location: locationRef.current?.value,
        });
    };

    return (
        <div>
            <h1 className="p-2 text-2xl font-bold">Create Organisation</h1>
            <div className="flex justify-center">
                <div className="flex w-1/2 flex-col border-2 border-dashed border-indigo-800 p-2">
                    <label htmlFor="name">Name: </label>
                    <input
                        ref={nameRef}
                        type="text"
                        className="rounded border border-solid border-slate-700 p-2"
                    />
                </div>
                <div className="flex w-1/2 flex-col border-2 border-dashed border-indigo-800 p-2">
                    <label htmlFor="name">Location: </label>
                    <select
                        className="rounded border border-solid border-slate-700 p-2"
                        ref={locationRef}
                    >
                        <option key={"noneLocation"} value="" />
                        {locations.data?.map((location) => (
                            <option key={location.id} value={location.id}>
                                {location.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex flex-col border-2 border-dashed border-lime-400 p-2">
                <label htmlFor="description">Description: </label>
                <textarea
                    className="rounded border border-solid border-slate-700 p-2"
                    ref={descriptionRef}
                />
            </div>
            <div className="flex flex-col border-2 border-dashed border-cyan-500 p-2">
                <div className="flex justify-end gap-2">
                    <button
                        className="w-40 rounded bg-rose-700 p-2 text-white shadow-lg hover:bg-rose-900"
                        onClick={(e) => {
                            e.preventDefault();
                            router.push("/organisations");
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className="w-40 rounded bg-violet-700 p-2 text-white shadow-lg hover:bg-violet-900"
                        onClick={() => handleNewOrganisation()}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateOrganisationPage;
