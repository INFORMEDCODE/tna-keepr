import { useState } from "react";
import Link from "next/link";

const Sidebar = () => {
    return (
        <aside id="sidebarWrapper">
            <nav className="h-[calc(100vh-56px)] w-72 border-2 border-dashed border-orange-400">
                {sideBarItems
                    ? sideBarItems.map((sideBarItem) => (
                          <ExpandableSidebarItem
                              {...sideBarItem}
                              key={sideBarItem.name}
                          />
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
                        <SidebarItem {...item} key={item.name} />
                    ))}
                </ul>
            ) : null}
        </>
    );
};

// used for the list items available in a "header"
const SidebarItem: React.FC<ChildSidebarItem> = ({ name, path }) => {
    return (
        <Link href={path}>
            <li className="border-2 border-dashed border-purple-900 p-1">
                {name}
            </li>
        </Link>
    );
};

// temp data for now
const sideBarItems = [
    {
        name: "Organisations",
        items: [
            {
                name: "Create Organisation",
                path: "/organisations/create",
            },
            {
                name: "View Organisations",
                path: "/organisations",
            },
        ],
    },
    {
        name: "Boxes",
        items: [
            {
                name: "Create Box",
                path: "/boxes/create",
            },
            {
                name: "View Boxes",
                path: "/boxes",
            },
        ],
    },
    {
        name: "Items",
        items: [
            {
                name: "Create Item",
                path: "/items/create",
            },
            {
                name: "View Items",
                path: "/items",
            },
        ],
    },
];

type SidebarItem = {
    name: string;
    items: ChildSidebarItem[];
    path?: string;
};

type ChildSidebarItem = {
    name: string;
    path: string;
};
export default Sidebar;
