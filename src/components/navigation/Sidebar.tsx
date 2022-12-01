import { useState } from "react";

const Sidebar = () => {
    return (
        <aside id="sidebarWrapper">
            <nav className="h-[calc(100vh-56px)] w-72 border-2 border-dashed border-orange-400">
                {sideBarItems
                    ? sideBarItems.map((sideBarItem) => (
                          <ExpandableSidebarItem {...sideBarItem} />
                      ))
                    : null}
            </nav>
        </aside>
    );
};

// used for the sidebar "headers" like secret, organisation, plants, etc
const ExpandableSidebarItem: React.FC<SidebarItem> = ({
    items,
    name,
    path,
}) => {
    const [showItems, setShowItems] = useState(false);

    return (
        <>
            <div className="border-2 border-dashed border-purple-700 p-2 text-center">
                <button onClick={() => setShowItems(!showItems)}>{name}</button>
            </div>
            {showItems ? (
                <ul>
                    {items.map((item) => (
                        <SidebarItem {...item} />
                    ))}
                </ul>
            ) : null}
        </>
    );
};

// used for the list items available in a "header"
const SidebarItem: React.FC<ChildSidebarItem> = ({ name, path }) => {
    return (
        <li className="border-2 border-dashed border-purple-900 p-1">{name}</li>
    );
};

// temp data for now
const sideBarItems = [
    {
        name: "Secrets",
        items: [
            {
                name: "Create Secret",
                path: "/secrets/create",
            },
            {
                name: "View Secrets",
                path: "/secrets",
            },
        ],
        path: "/secrets",
    },
];

type SidebarItem = {
    name: string;
    items: ChildSidebarItem[];
    path: string;
};

type ChildSidebarItem = {
    name: string;
    path: string;
};
export default Sidebar;
