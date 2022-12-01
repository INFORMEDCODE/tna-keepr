import React from "react";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/navigation/Layout";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
    ...appProps
}) => {
    const avoidsLayout = ["/auth/signin", "/"].includes(
        appProps.router.pathname
    );
    const LayoutComponent = avoidsLayout ? React.Fragment : Layout;

    return (
        <SessionProvider session={session}>
            <LayoutComponent>
                <Component {...pageProps} />
            </LayoutComponent>
        </SessionProvider>
    );
};

export default trpc.withTRPC(MyApp);
