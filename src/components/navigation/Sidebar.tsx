import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
    const router = useRouter();

    return (
        <aside id="sidebarWrapper">
            <nav className="flex h-[calc(100vh-56px)] w-72 flex-col gap-y-2 border-2 border-dashed border-orange-400 p-2">
                {sideBarItems
                    ? sideBarItems.map((sideBarItem) =>
                          sideBarItem.path == router.pathname ? (
                              <ActiveSidebarItem
                                  {...sideBarItem}
                                  key={sideBarItem.name}
                              />
                          ) : (
                              <SidebarItem
                                  {...sideBarItem}
                                  key={sideBarItem.name}
                              />
                          )
                      )
                    : null}
            </nav>
        </aside>
    );
};

const SidebarItem: React.FC<SidebarItem> = ({ name, path }) => {
    return (
        <Link href={path}>
            <div className="cursor-pointer rounded-lg border-2 border-solid border-black p-2 hover:bg-slate-200">
                {name}
            </div>
        </Link>
    );
};

const ActiveSidebarItem: React.FC<SidebarItem> = ({ name, path }) => {
    return (
        <Link href={path}>
            <div className="cursor-pointer rounded-lg border-2 border-solid border-black bg-slate-400 p-2 hover:bg-slate-200">
                {name}
            </div>
        </Link>
    );
};
// temp data for now
const sideBarItems = [
    {
        name: "All",
        path: "/secrets",
    },
    {
        name: "Organisations",
        path: "/organisations",
    },
    {
        name: "Boxes",
        path: "/boxes",
    },
    {
        name: "Items",
        path: "/items",
    },
    {
        name: "Locations",
        path: "/locations",
    },
];

type SidebarItem = {
    name: string;
    path: string;
};

export default Sidebar;
