import Header from "./Header";
import Sidebar from "./Sidebar";
import type { ReactNode } from "react";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <>
            <Header />
            <div className="flex flex-1 flex-row">
                <Sidebar />
                <main className="w-full">{children}</main>
            </div>
        </>
    );
};

export default Layout;
