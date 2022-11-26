import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getProviders, signIn, getSession } from "next-auth/react";
import { useRef } from "react";

type SigninProps = {
    providers: any[];
};

const Signin: React.FC<SigninProps> = ({ providers }) => {
    return (
        <div className="relative overflow-hidden">
            <div
                id="wrapper"
                className="align-center fixed top-0 left-0 z-[2] flex h-[150%] w-[70%] translate-x-[-13%] translate-y-[-10%] rotate-[11deg] bg-indigo-800"
            ></div>
            <div
                id="content"
                className="align-center relative z-[2] flex h-screen w-full p-7 text-center font-bold"
            >
                <div
                    id="cardWrapper"
                    className="align-center z-[3] ml-[15%] flex w-96 flex-col justify-center text-xl"
                >
                    {/* add in some kind of logo here for app */}
                    <div
                        id="cardContent"
                        className="m-4 w-full rounded-[4px] bg-white p-4"
                    >
                        <>
                            <LoginCardContent />
                            <hr className="my-4" />
                            {providers &&
                                Object.values(providers).map(
                                    (provider, idx) => {
                                        if (
                                            provider.name != "Credentials" &&
                                            provider.name != "Email"
                                        ) {
                                            return (
                                                <div key={idx} className="mb-0">
                                                    <button
                                                        onClick={() =>
                                                            signIn(
                                                                provider.id,
                                                                {
                                                                    callbackUrl:
                                                                        "/protected",
                                                                }
                                                            )
                                                        }
                                                        className="relative my-1 inline-block h-11 w-full cursor-pointer touch-manipulation rounded border border-solid border-slate-900 bg-white py-1 px-[15px] text-center text-base font-normal leading-6 text-black shadow-sm transition-all delay-300 ease-in-out"
                                                    >{`Sign in with ${provider.name}`}</button>
                                                </div>
                                            );
                                        }
                                    }
                                )}
                        </>
                    </div>
                </div>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src="/macOS-Graphic-Dark.webp"
                className="absolute top-0 right-0 z-[1] min-h-full min-w-full object-cover"
                alt="Image Background"
            />
        </div>
    );
};

export default Signin;

const LoginCardContent: React.FC = () => {
    const emailRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <h1 className="text-lg">Sign In</h1>
            <input
                disabled={true}
                type="text"
                placeholder="Email - Not working; Use Provider Sign In"
                className="relative my-4 inline-block w-full rounded border border-solid border-slate-200 bg-white bg-none py-1 px-3 text-sm leading-7 text-black transition-all delay-300"
                ref={emailRef}
            />

            <button className="relative inline-block h-11 w-full cursor-pointer touch-manipulation rounded border border-solid border-slate-900 border-transparent bg-slate-900 py-1 px-[15px] text-center text-base font-normal leading-6 text-white shadow-sm transition-all delay-300 ease-in-out">
                Sign In
            </button>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (
    ctx: GetServerSidePropsContext
) => {
    const providers = await getProviders();
    const session = await getSession(ctx);

    // if you have a session already then don't stay here and go to the next page?
    if (session) {
        return {
            redirect: {
                destination: "/protected",
                permanent: false,
            },
        };
    }

    return {
        props: {
            providers,
            session: session ? session : null,
        },
    };
};
